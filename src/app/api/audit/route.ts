import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeWebsite } from "@/lib/audit/analyze";
import { buildReport } from "@/lib/audit/report";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({ url: z.string().trim().min(4).max(300) });

export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Please enter a valid website address." }, { status: 400 });
  try {
    const signals = await analyzeWebsite(parsed.data.url);
    if (signals.status >= 400) {
      return NextResponse.json(
        { ok: false, error: `That website responded with an error (HTTP ${signals.status}). Check the address and try again.` },
        { status: 422 },
      );
    }
    return NextResponse.json({ ok: true, report: buildReport(signals) });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    const friendly =
      /public website/.test(msg)
        ? msg
        : /timeout|aborted/i.test(msg)
          ? "That website took too long to respond. It may be very slow or blocking automated checks."
          : "We couldn't reach that website. Check the address (e.g. yourbusiness.com) and try again.";
    return NextResponse.json({ ok: false, error: friendly }, { status: 422 });
  }
}
