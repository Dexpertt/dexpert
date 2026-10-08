import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getTool } from "@/content/tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { WebsiteGrader } from "@/components/tools/website-grader";
import { FAQSection } from "@/components/sections/faq-section";

const tool = getTool("website-grader");
export const metadata: Metadata = buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: tool.href, keywords: ["website grader", "free SEO audit", "website audit tool"] });

const faqs = [
  { q: "How does the Website Grader work?", a: "We fetch your homepage like a mobile browser would and check over 50 signals across SEO, speed, mobile readiness, lead capture, conversion, trust, local SEO and accessibility. Scores are weighted by their impact on getting enquiries." },
  { q: "Is it really free?", a: "Yes. The audit is free and instant. We'll email you a copy and may follow up once to offer help, with no obligation." },
  { q: "Why is my speed score different from Google PageSpeed?", a: "We measure server response and page weight from our servers. When enabled, we also blend in Google Lighthouse data. Results vary by location and time, so treat scores as directional." },
  { q: "What should I fix first?", a: "Start with the priority roadmap. It orders fixes by impact: foundations first, then lead capture, then automation." },
];

export default function Page() {
  return (
    <ToolShell title="Free Website" highlight="Grader" description={tool.description} path={tool.href} breadcrumb="Website Grader" schemaName={tool.title}>
      <WebsiteGrader />
      <FAQSection faqs={faqs} title="About the Website Grader" />
    </ToolShell>
  );
}
