import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getTool } from "@/content/tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { SavingsCalculator } from "@/components/tools/savings-calculator";

const tool = getTool("automation-savings-calculator");
export const metadata: Metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: tool.href, keywords: ["automation savings calculator", "time saved automation"] });

export default function Page() {
  return (
    <ToolShell title="Automation Savings" highlight="Calculator" description={tool.description} path={tool.href} breadcrumb="Automation Savings Calculator" schemaName={tool.title}>
      <SavingsCalculator />
    </ToolShell>
  );
}
