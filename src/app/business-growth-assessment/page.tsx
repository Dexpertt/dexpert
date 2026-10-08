import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ToolShell } from "@/components/tools/tool-shell";
import { GrowthAssessment } from "@/components/tools/growth-assessment";

export const metadata: Metadata = buildMetadata({
  title: "Free Business Growth Assessment | Score Your Growth Engine | D Expert",
  description: "Answer 12 quick questions and score your business across website, lead capture, follow-up, marketing, reputation and operations, with your top 3 growth priorities.",
  path: "/business-growth-assessment",
  keywords: ["business growth assessment", "growth score", "small business assessment", "marketing assessment"],
});

export default function Page() {
  return (
    <ToolShell
      title="Business Growth"
      highlight="Assessment"
      description="Twelve quick questions, two minutes, no sign-up. Get a growth score across six pillars, see exactly where leads and time are slipping away, and your top three priorities."
      path="/business-growth-assessment"
      breadcrumb="Growth Assessment"
      schemaName="D Expert Business Growth Assessment"
    >
      <GrowthAssessment />
    </ToolShell>
  );
}
