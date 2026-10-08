import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ToolShell } from "@/components/tools/tool-shell";
import { RoiSuite } from "@/components/tools/roi-suite";
import { LeadMagnetSection } from "@/components/sections/lead-magnet-section";

export const metadata: Metadata = buildMetadata({
  title: "Free ROI Calculators | Website, Marketing, AI Automation & Lead Gen | D Expert",
  description:
    "Free interactive ROI calculators: website ROI, marketing ROI, AI automation ROI, AI voice agent ROI and lead generation ROI, with charts and plain-English explanations.",
  path: "/free-tools",
  keywords: ["ROI calculator", "marketing ROI calculator", "automation ROI", "website ROI calculator"],
});

export default function Page() {
  return (
    <ToolShell
      title="Free ROI"
      highlight="Calculator Suite"
      description="Five interactive calculators that show what a better website, smarter marketing, AI automation, an AI voice agent and faster lead follow-up could be worth to your business."
      path="/free-tools"
      breadcrumb="ROI Calculators"
      schemaName="D Expert ROI Calculator Suite"
    >
      <RoiSuite />
      <div className="mt-16 -mx-5 md:-mx-8">
        <LeadMagnetSection />
      </div>
    </ToolShell>
  );
}
