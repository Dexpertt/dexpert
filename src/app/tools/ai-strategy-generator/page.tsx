import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getTool } from "@/content/tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { StrategyGenerator } from "@/components/tools/strategy-generator";

const tool = getTool("ai-strategy-generator");
export const metadata: Metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: tool.href, keywords: ["AI strategy generator", "AI growth plan", "AI business strategy", "90 day marketing plan"] });

export default function Page() {
  return (
    <ToolShell title="AI Strategy" highlight="Generator" description={tool.description} path={tool.href} breadcrumb="AI Strategy Generator" schemaName={tool.title}>
      <StrategyGenerator />
    </ToolShell>
  );
}
