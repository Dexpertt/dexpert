import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Quote, Star, Target, Lightbulb } from "lucide-react";
import { projects, getProject } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { ProjectVisual } from "@/components/portfolio/project-visual";
import { ProjectCard } from "@/components/portfolio/project-card";
import { VideoEmbed } from "@/components/shared/video-embed";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { BookButton } from "@/components/shared/cta-buttons";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.title} | D Expert Portfolio`,
    description: p.summary,
    path: `/portfolio/${p.slug}`,
    keywords: [...p.categories, p.industry],
  });
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const others = projects.filter((x) => x.slug !== p.slug && x.categories.some((c) => p.categories.includes(c))).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${p.industry} · ${p.year}`}
        title={p.title}
        description={p.summary}
        breadcrumbs={[
          { name: "Portfolio", path: "/portfolio" },
          { name: p.title, path: `/portfolio/${p.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          {p.categories.map((c) => (
            <span key={c} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">{c}</span>
          ))}
        </div>
      </PageHero>

      {/* Hero banner */}
      <section className="pb-16">
        <div className="container-x">
          <Reveal>
            <ProjectVisual kind={p.mockup} colors={p.colors} title={p.title} className="aspect-[16/8] rounded-[2rem] border border-white/10" />
          </Reveal>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {p.results.map((r) => (
              <div key={r.label} className="glass rounded-2xl p-5 text-center">
                <dd className="text-xl font-semibold text-gradient md:text-2xl">{r.value}</dd>
                <dt className="mt-1 text-xs text-muted">{r.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Challenge / Solution */}
      <section className="py-16">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <Reveal className="glass rounded-3xl p-8">
            <Target className="size-7 text-warning" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold text-foreground">The challenge</h2>
            <p className="mt-3 leading-relaxed text-muted">{p.challenge}</p>
          </Reveal>
          <Reveal className="glass border-gradient rounded-3xl p-8" delay={0.05}>
            <Lightbulb className="size-7 text-primary" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold text-foreground">The solution</h2>
            <p className="mt-3 leading-relaxed text-muted">{p.solution}</p>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Key features" title="What we built" />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.features.map((f) => (
              <StaggerItem key={f.title} className="glass rounded-3xl p-6">
                <CheckCircle2 className="size-6 text-accent" aria-hidden />
                <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Gallery + device mockups */}
      <section className="py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title="Inside the project" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {p.gallery.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.05}>
                <figure className="glass overflow-hidden rounded-3xl">
                  <ProjectVisual kind={i === 1 ? (p.mockup === "web" ? "chat" : "dashboard") : p.mockup} colors={i === 2 ? [p.colors[1], p.colors[0]] : p.colors} title={g.title} variant={i} className="aspect-[4/3]" />
                  <figcaption className="p-5">
                    <p className="font-medium text-foreground">{g.title}</p>
                    <p className="text-sm text-muted">{g.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="relative mt-10 grid items-end gap-6 md:grid-cols-[2fr_1fr]">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-subtle">Desktop</p>
              <ProjectVisual kind="web" colors={p.colors} title={`${p.title} on desktop`} className="aspect-[16/10] rounded-3xl border border-white/10" />
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-subtle">Mobile</p>
              <ProjectVisual kind={p.mockup === "web" ? "chat" : p.mockup === "dashboard" ? "voice" : p.mockup} colors={p.colors} title={`${p.title} on mobile`} className="aspect-[9/12] rounded-3xl border border-white/10" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Video demo */}
      <section className="py-16">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <VideoEmbed
            source={p.video ?? { type: "youtube", id: "" }}
            title={`${p.title} video demo`}
            placeholder={<ProjectVisual kind={p.mockup} colors={p.colors} title={`${p.title} demo`} className="absolute inset-0" />}
          />
          <div className="flex flex-col gap-4">
            <SectionHeading align="left" eyebrow="Video demo" title="See it working" description="Want a live walkthrough of this system configured for your business? Book a demo and we'll show you in real time." />
            <BookButton booking="aiDemo" size="lg" className="w-fit">Book a live walkthrough</BookButton>
          </div>
        </div>
      </section>

      {/* Stack + outcomes */}
      <section className="py-16">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <Reveal className="glass rounded-3xl p-8">
            <h2 className="text-xl font-semibold text-foreground">Technology stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-sm text-primary">{s}</span>
              ))}
            </div>
          </Reveal>
          <Reveal className="glass rounded-3xl p-8" delay={0.05}>
            <h2 className="text-xl font-semibold text-foreground">Results</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {p.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-foreground/90">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16">
        <div className="container-x">
          <Reveal className="glass-strong border-gradient mx-auto max-w-4xl rounded-[2rem] p-8 text-center md:p-14">
            <Quote className="mx-auto size-10 text-primary/60" aria-hidden />
            <div className="mt-4 flex justify-center gap-1" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-warning text-warning" aria-hidden />
              ))}
            </div>
            <blockquote className="mt-6 text-xl leading-relaxed text-foreground md:text-2xl">&ldquo;{p.testimonial.quote}&rdquo;</blockquote>
            <p className="mt-6 font-medium text-foreground">{p.testimonial.name}</p>
            <p className="text-sm text-muted">{p.testimonial.role}</p>
          </Reveal>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-16">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading align="left" eyebrow="More work" title="Related projects" />
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/portfolio">
                  <ArrowLeft /> All projects
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {others.map((o) => (
                <ProjectCard key={o.slug} project={o} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title={`Want a system like this for your ${p.industry.toLowerCase()} business?`} primary="Book Free Strategy Call" secondary={{ label: "See all projects", href: "/portfolio" }} />
    </>
  );
}
