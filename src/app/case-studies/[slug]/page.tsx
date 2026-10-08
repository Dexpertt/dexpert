import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return buildMetadata({ title: `${c.title} | Case Study | D Expert`, description: c.summary, path: `/case-studies/${c.slug}`, type: "article" });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const others = caseStudies.filter((x) => x.slug !== c.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={articleSchema({ title: c.title, description: c.summary, path: `/case-studies/${c.slug}`, date: "2026-09-01" })} />
      <PageHero
        eyebrow={`Case Study · ${c.industry}`}
        title={c.title}
        description={c.summary}
        breadcrumbs={[
          { name: "Case Studies", path: "/case-studies" },
          { name: c.title, path: `/case-studies/${c.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs text-warning">Problem: {c.problem}</span>
          <Link href={c.relatedService.href} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary hover:bg-primary/20">
            Service: {c.relatedService.label}
          </Link>
        </div>
      </PageHero>

      <section className="pb-16">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <Reveal className="glass rounded-3xl p-8">
            <AlertTriangle className="size-7 text-warning" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold text-foreground">The situation</h2>
            <p className="mt-3 leading-relaxed text-muted">{c.context}</p>
          </Reveal>
          <Reveal className="glass border-gradient rounded-3xl p-8" delay={0.05}>
            <Lightbulb className="size-7 text-primary" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold text-foreground">The solution</h2>
            <p className="mt-3 leading-relaxed text-muted">{c.solution}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Components" title="What we put in place" />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.components.map((k) => (
              <StaggerItem key={k.title} className="glass rounded-3xl p-6">
                <Icon name={k.icon} className="size-7 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">{k.title}</h3>
                <p className="mt-2 text-sm text-muted">{k.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Timeline" title="How it rolled out" />
            <ol className="mt-8 flex flex-col gap-4">
              {c.timeline.map((t) => (
                <li key={t.phase} className="glass flex gap-5 rounded-2xl p-5">
                  <span className="w-24 shrink-0 font-mono text-sm text-primary">{t.phase}</span>
                  <span className="text-sm text-foreground/90">{t.detail}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Benefits" title="What changed" />
            <ul className="mt-8 flex flex-col gap-4">
              {c.benefits.map((b) => (
                <li key={b.title} className="glass border-gradient flex gap-4 rounded-2xl p-5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <span>
                    <span className="block font-semibold text-foreground">{b.title}</span>
                    <span className="block text-sm text-muted">{b.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="glass rounded-3xl p-8">
            <BookOpen className="size-7 text-secondary" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold text-foreground">Key learnings</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {c.learnings.map((l) => (
                <li key={l} className="flex gap-3 text-foreground/90">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="glass rounded-3xl p-8" delay={0.05}>
            <h2 className="text-xl font-semibold text-foreground">Technology</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {c.stack.map((s) => (
                <span key={s} className="rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-sm text-primary">{s}</span>
              ))}
            </div>
            <Button variant="outline" className="mt-8" asChild>
              <Link href={c.relatedService.href}>Explore {c.relatedService.label}</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionHeading align="left" eyebrow="More case studies" title="Keep reading" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/case-studies/${o.slug}`} className="glass rounded-3xl p-6 transition-colors hover:border-primary/30">
                <span className="text-xs uppercase tracking-wider text-primary">{o.industry}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{o.title}</h3>
                <p className="mt-2 text-sm text-muted">{o.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
