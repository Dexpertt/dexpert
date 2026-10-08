import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getTool } from "@/content/tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { CompetitorAnalysis } from "@/components/tools/competitor-analysis";

const tool = getTool("competitor-analysis");
export const metadata: Metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: tool.href, keywords: ["competitor analysis tool", "compare websites"] });

export default function Page() {
  return (
    <ToolShell title="Competitor" highlight="Analysis" description={tool.description} path={tool.href} breadcrumb="Competitor Analysis" schemaName={tool.title}>
      <CompetitorAnalysis />
    </ToolShell>
  );
}
