import { NextResponse, type NextRequest } from "next/server";
import {
  explainError,
  getConversationToken,
  getDemoAgentId,
  getSignedUrl,
  getVoicePreviewUrl,
  isVoiceDemoConfigured,
  resolveVoiceId,
} from "@/lib/elevenlabs";

export const dynamic = "force-dynamic";

/** Soft per-instance rate limit so the demo can't be used to burn voice credits. */
const HOUR = 60 * 60 * 1000;
const LIMIT = Number(process.env.VOICE_DEMO_CALLS_PER_HOUR || 12);
const hits = new Map<string, number[]>();

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < HOUR);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

/**
 * GET → { configured }.
 * GET ?check=1 → a real connection test with a plain-language result (open it in the browser to debug setup).
 * GET ?preview=<voice key> → { previewUrl } for the voice sample button.
 */
export async function GET(req: NextRequest) {
  const configured = isVoiceDemoConfigured();
  if (req.nextUrl.searchParams.get("check")) {
    if (!configured) {
      return NextResponse.json({ ok: false, problem: "ELEVENLABS_API_KEY is not set for this deployment. Add it in Vercel (Production and Preview), then redeploy." });
    }
    try {
      const [en, multi] = await Promise.all([getDemoAgentId("en"), getDemoAgentId("multi")]);
      await getConversationToken(en);
      return NextResponse.json({ ok: true, message: "Live voice demo is ready.", agents: { english: en, multilingual: multi } });
    } catch (e) {
      console.error("[voice-session] check", e);
      return NextResponse.json({ ok: false, problem: explainError(e) });
    }
  }
  const key = req.nextUrl.searchParams.get("preview");
  if (!key) return NextResponse.json({ configured });
  if (!configured) return NextResponse.json({ previewUrl: null });
  const voiceId = resolveVoiceId(key);
  if (!voiceId) return NextResponse.json({ error: "Unknown voice" }, { status: 400 });
  try {
    const previewUrl = await getVoicePreviewUrl(voiceId);
    return NextResponse.json({ previewUrl }, { headers: { "Cache-Control": "public, max-age=3600" } });
  } catch (e) {
    console.error("[voice-session] preview", e);
    return NextResponse.json({ previewUrl: null });
  }
}

/** POST { voice, transport } → a short-lived token to start a live call with the demo agent. */
export async function POST(req: NextRequest) {
  if (!isVoiceDemoConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  let body: { voice?: string; transport?: string; language?: string } = {};
  try {
    body = await req.json();
  } catch {}
  const voiceId = resolveVoiceId(String(body.voice ?? ""));
  if (!voiceId) return NextResponse.json({ error: "Unknown voice" }, { status: 400 });

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const agentId = await getDemoAgentId(body.language && body.language !== "en" ? "multi" : "en");
    if (body.transport === "websocket") {
      return NextResponse.json({ signedUrl: await getSignedUrl(agentId), voiceId });
    }
    return NextResponse.json({ conversationToken: await getConversationToken(agentId), voiceId });
  } catch (e) {
    console.error("[voice-session]", e);
    return NextResponse.json({ error: "provider_error", detail: explainError(e) }, { status: 502 });
  }
}
