import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getTool } from "@/content/tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { AutomationAdvisor } from "@/components/tools/automation-advisor";

const tool = getTool("automation-audit");
export const metadata: Metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: tool.href, keywords: ["automation audit", "business automation advisor", "AI automation opportunities"] });

export default function Page() {
  return (
    <ToolShell title="Business Automation" highlight="Advisor" description={tool.description} path={tool.href} breadcrumb="Automation Audit" schemaName={tool.title}>
      <AutomationAdvisor />
    </ToolShell>
  );
}
