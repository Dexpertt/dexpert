import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Sparkles, Timer } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { tools, extraTools } from "@/content/tools";
import { PageHero } from "@/components/shared/page-hero";
import { Icon } from "@/components/shared/icon";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/site";
import { LeadMagnetSection } from "@/components/sections/lead-magnet-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Free Business Growth Tools | Website Audit, AI ROI & Automation | D Expert",
  description:
    "Free tools to grow your business: website audit, competitor analysis, automation advisor, AI voice agent ROI calculator, local SEO scanner, marketing audit and AI strategy generator.",
  path: "/tools",
  keywords: ["free business tools", "website audit tool", "AI ROI calculator", "automation audit", "free marketing tools"],
});

const perks = [
  { icon: Timer, text: "Results in under 2 minutes" },
  { icon: Lock, text: "No sign-up required" },
  { icon: Sparkles, text: "Plain-English recommendations" },
];

export default function Page() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "D Expert Business Growth Tools",
    itemListElement: [...tools, ...extraTools].map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.title, url: absoluteUrl(t.href) })),
  };
  return (
    <>
      <JsonLd data={itemList} />
      <PageHero
        eyebrow="Free tools"
        title={
          <>
            D Expert Business <span className="text-gradient-animated">Growth Tools</span>
          </>
        }
        description="Find out where your business is losing leads, time and money, and what to fix first. Every tool is free and built on the same frameworks we use with clients."
        breadcrumbs={[{ name: "Tools", path: "/tools" }]}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {perks.map((p) => (
            <li key={p.text} className="flex items-center gap-2">
              <p.icon className="size-4 text-accent" aria-hidden /> {p.text}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="pb-20" aria-label="Growth tools">
        <div className="container-x">
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((t, i) => (
              <StaggerItem key={t.slug} className={i === 0 ? "lg:col-span-2" : ""}>
                <Link href={t.href} className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-colors hover:border-primary/40">
                  <span className="glow-orb -right-16 -top-16 size-48 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/25 text-primary">
                      <Icon name={t.icon} className="size-6" />
                    </span>
                    {t.badge && <Badge variant={t.badge === "New" ? "accent" : "default"}>{t.badge}</Badge>}
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-foreground">{t.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {t.outputs.map((o) => (
                      <li key={o} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-foreground/80">
                        <CheckCircle2 className="size-3 text-accent" aria-hidden /> {o}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Use free tool <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <h2 className="mb-6 mt-16 text-2xl font-semibold text-foreground">More ways to check your growth</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {extraTools.map((t) => (
              <Link key={t.href} href={t.href} className="glass border-gradient group flex gap-4 rounded-3xl p-6 hover:border-primary/40">
                <Icon name={t.icon} className="mt-0.5 size-6 shrink-0 text-accent" />
                <span>
                  <span className="flex items-center gap-1.5 font-semibold text-foreground">
                    {t.title} <ArrowRight className="size-4 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden />
                  </span>
                  <span className="mt-1 block text-sm text-muted">{t.short}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadMagnetSection />
      <CTASection title="Prefer a human review?" description="Book a free 30-minute strategy call. Pankaj will audit your website, calls and follow-up and show you the fastest wins." />
    </>
  );
}
