import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/content/case-studies";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies | AI Voice Agents, Automation & Marketing | D Expert",
  description:
    "How D Expert helps businesses with AI voice agents for healthcare, local business growth systems, full-funnel digital marketing and AI customer support agents.",
  path: "/case-studies",
  keywords: ["AI case studies", "AI receptionist case study", "digital marketing case study"],
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={
          <>
            Real problems. <span className="text-gradient-animated">Systematic fixes.</span>
          </>
        }
        description="A closer look at how we diagnose growth leaks and build AI, automation and marketing systems that close them."
        breadcrumbs={[{ name: "Case Studies", path: "/case-studies" }]}
      />
      <section className="pb-16">
        <div className="container-x flex flex-col gap-6">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.04}>
              <Link href={`/case-studies/${c.slug}`} className="glass group grid overflow-hidden rounded-[2rem] transition-all hover:border-primary/30 hover:shadow-glow md:grid-cols-[1fr_1.3fr]">
                <div className="relative flex min-h-56 items-center justify-center p-8" style={{ background: `radial-gradient(circle at 30% 30%, ${c.colors[0]}40, transparent 60%), radial-gradient(circle at 70% 70%, ${c.colors[1]}45, transparent 60%), #0a0f24` }}>
                  <div className="grid grid-cols-2 gap-3">
                    {c.components.map((k) => (
                      <div key={k.title} className="glass flex items-center gap-2 rounded-xl px-3 py-2.5">
                        <Icon name={k.icon} className="size-4 text-primary" />
                        <span className="text-xs text-foreground">{k.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary">Case study {i + 1} · {c.industry}</span>
                    <ArrowUpRight className="size-5 text-subtle group-hover:text-primary" aria-hidden />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{c.title}</h2>
                  <p className="text-muted">{c.summary}</p>
                  <div className="mt-auto grid gap-3 border-t border-white/8 pt-4 sm:grid-cols-2">
                    <p className="text-sm">
                      <span className="block text-xs uppercase tracking-wider text-subtle">Problem</span>
                      <span className="text-foreground">{c.problem}</span>
                    </p>
                    <p className="text-sm">
                      <span className="block text-xs uppercase tracking-wider text-subtle">Benefits</span>
                      <span className="text-foreground">{c.benefits.map((b) => b.title).join(" · ")}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection title="Your business could be the next case study" />
    </>
  );
}
