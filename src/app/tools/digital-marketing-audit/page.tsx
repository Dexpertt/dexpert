import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getTool } from "@/content/tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { MarketingAudit } from "@/components/tools/marketing-audit";

const tool = getTool("digital-marketing-audit");
export const metadata: Metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: tool.href, keywords: ["digital marketing audit", "Google Ads audit", "Meta Ads audit"] });

export default function Page() {
  return (
    <ToolShell title="Digital Marketing" highlight="Audit" description={tool.description} path={tool.href} breadcrumb="Digital Marketing Audit" schemaName={tool.title}>
      <MarketingAudit />
    </ToolShell>
  );
}
