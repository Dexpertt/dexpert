import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getTool } from "@/content/tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { LocalSeoScanner } from "@/components/tools/local-seo-scanner";

const tool = getTool("local-seo-scanner");
export const metadata: Metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: tool.href, keywords: ["local SEO scanner", "Google Business Profile audit", "map pack ranking"] });

export default function Page() {
  return (
    <ToolShell title="Local SEO" highlight="Scanner" description={tool.description} path={tool.href} breadcrumb="Local SEO Scanner" schemaName={tool.title}>
      <LocalSeoScanner />
    </ToolShell>
  );
}
