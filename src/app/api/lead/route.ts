import { NextResponse } from "next/server";
import { leadEnvelopeSchema } from "@/lib/validation";

export const runtime = "nodejs";

// Simple in-memory rate limit per IP (per server instance).
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/**
 * Receives every lead (contact form, lead magnet, tool results) and forwards it
 * to the CRM webhook in CRM_WEBHOOK_URL (GoHighLevel, HubSpot, Zapier, Make, n8n…).
 */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadEnvelopeSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot hits and malformed payloads are dropped quietly.
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const lead = {
    ...parsed.data,
    company_website: undefined,
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? undefined,
    referer: req.headers.get("referer") ?? undefined,
  };

  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CRM_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.CRM_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) console.error("[lead] CRM webhook responded", res.status);
    } catch (err) {
      console.error("[lead] CRM webhook failed", err);
    }
  } else {
    console.info("[lead] CRM_WEBHOOK_URL not set; lead received:", JSON.stringify({ source: lead.source, page: lead.page }));
  }

  return NextResponse.json({ ok: true });
}
