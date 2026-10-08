import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { allServices, serviceCategories } from "@/content/services";
import { pillars } from "@/content/pillars";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon";
import { BookButton, LeadMagnetButton } from "@/components/shared/cta-buttons";
import { Industries } from "@/components/sections/home/industries";
import { ProcessSection } from "@/components/sections/home/process-section";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "AI Automation, AI Agents & Digital Marketing Services | D Expert",
  description:
    "25 services under one roof: AI voice agents, AI receptionists, chatbots, CRM, WhatsApp & email automation, websites, landing pages, funnels, branding, Google Ads, Meta Ads and lead generation.",
  path: "/services",
  keywords: ["AI Automation Services", "digital marketing services", "AI agency services"],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={allServices.slice(0, 12).map((s) => serviceSchema({ name: s.title, description: s.short, path: s.href.split("#")[0] }))} />
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything you need to <span className="text-gradient-animated">scale with AI</span>
          </>
        }
        description="AI agents that answer and sell, automations that remove busywork, websites that convert, and marketing that brings the right customers. Pick one service, or let us build the whole system."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookButton size="lg" />
          <LeadMagnetButton size="lg" variant="secondary" />
        </div>
      </PageHero>

      <section className="pb-12" aria-labelledby="pillars-title">
        <div className="container-x">
          <h2 id="pillars-title" className="sr-only">Core solutions</h2>
          <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <StaggerItem key={p.slug}>
                <Link href={p.path} className="glass border-gradient group flex h-full flex-col gap-4 rounded-3xl p-7 transition-all hover:-translate-y-1 hover:shadow-glow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary">{p.eyebrow}</span>
                    <ArrowUpRight className="size-5 text-subtle group-hover:text-primary" aria-hidden />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {p.title} <span className="text-gradient">{p.highlight}</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{p.metaDescription}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {serviceCategories.map((cat) => (
        <section key={cat.id} className="py-12" aria-labelledby={`cat-${cat.id}`}>
          <div className="container-x">
            <SectionHeading align="left" eyebrow={cat.label} title={<span id={`cat-${cat.id}`}>{categoryTitle[cat.id]}</span>} />
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
              {allServices
                .filter((s) => s.category === cat.id)
                .map((s) => (
                  <StaggerItem key={s.slug}>
                    <Link href={s.href} className="glass group flex h-full gap-4 rounded-2xl p-5 transition-colors hover:border-primary/30">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon name={s.icon} className="size-5" />
                      </span>
                      <span>
                        <span className="flex items-center gap-1.5 font-semibold text-foreground">
                          {s.title}
                          <ArrowUpRight className="size-3.5 text-subtle opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">{s.short}</span>
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
            </Stagger>
          </div>
        </section>
      ))}

      <Industries />
      <ProcessSection />
      <CTASection />
    </>
  );
}

const categoryTitle: Record<string, string> = {
  ai: "AI agents that work around the clock",
  automation: "Automation that removes the busywork",
  web: "Websites & funnels built to convert",
  marketing: "Marketing that brings the right customers",
  brand: "Brand & growth systems",
};
