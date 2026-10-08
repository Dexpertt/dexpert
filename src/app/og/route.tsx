import { ImageResponse } from "next/og";


/** Dynamic Open Graph / Twitter card image: /og?title=... */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Scale Your Business With AI Automation").slice(0, 110);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 15% 20%, rgba(0,245,255,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(123,97,255,0.45), transparent 50%), #050816",
          color: "#eef2ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, border: "3px solid #00F5FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800, color: "#00F5FF" }}>D</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>D Expert</div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#9aa3c7" }}>
          <div style={{ display: "flex" }}>AI Voice Agents · Automation · Websites · Marketing</div>
          <div style={{ display: "flex", padding: "12px 24px", borderRadius: 999, background: "#00F5FF", color: "#050816", fontWeight: 700 }}>dexpert</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
