import type { Metadata } from "next";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { personSchema } from "@/lib/schema";
import { founderStory, founderMission, founderExperience, founderPhilosophy, founderWhy } from "@/content/founder";
import { industries } from "@/content/services";
import { trustStats } from "@/content/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { Counter } from "@/components/shared/counter";
import { BookButton } from "@/components/shared/cta-buttons";
import { SkillMeters } from "@/components/founder/skill-meters";
import { FounderTimeline } from "@/components/founder/timeline";
import { VideoIntro } from "@/components/sections/home/video-intro";
import { CTASection } from "@/components/sections/cta-section";
import { IdleVoiceOrb } from "@/components/voice/idle-voice-orb";

export const metadata: Metadata = buildMetadata({
  title: "Meet Pankaj Thakur | Automation & Digital Marketing Expert | D Expert",
  description:
    "Pankaj Thakur is the founder of D Expert, an AI automation and digital marketing expert in New Delhi helping businesses scale with AI voice agents, chatbots, CRM automation and performance marketing.",
  path: "/founder",
  type: "profile",
  keywords: ["Pankaj Thakur", "AI automation expert India", "digital marketing expert New Delhi"],
});

export default function FounderPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      {/* Hero */}
      <section className="noise relative isolate overflow-hidden pb-20 pt-32 md:pt-40">
        <div className="grid-bg absolute inset-0 -z-20" aria-hidden />
        <div className="glow-orb -z-10 left-1/3 top-10 size-[600px] bg-secondary/25" aria-hidden />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="flex flex-col gap-6">
            <Breadcrumbs items={[{ name: "Founder", path: "/founder" }]} />
            <Badge>Founder, D Expert</Badge>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-7xl">
              Meet <span className="text-gradient-animated">Pankaj Thakur</span>
            </h1>
            <p className="text-xl text-foreground/90">{site.founder.role}</p>
            <p className="max-w-xl leading-relaxed text-muted">{site.founder.shortBio}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-2"><MapPin className="size-4 text-primary" aria-hidden /> New Delhi, India</span>
              <a href={`tel:${site.phoneRaw}`} className="flex items-center gap-2 hover:text-primary"><Phone className="size-4 text-primary" aria-hidden /> {site.phone}</a>
            </div>
            <div className="flex flex-wrap gap-3">
              <BookButton size="lg">Book a call with Pankaj</BookButton>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-auto aspect-[4/5] w-full max-w-md">
            {/* TODO(owner): replace with a professional portrait at /public/images/pankaj-thakur.jpg */}
            <div className="glass border-gradient absolute inset-0 overflow-hidden rounded-[2.5rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,245,255,0.25),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(123,97,255,0.45),transparent_60%)]" />
              <IdleVoiceOrb className="absolute inset-x-0 top-0 h-3/4" />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl glass-strong p-5">
                <p className="text-lg font-semibold text-foreground">Pankaj Thakur</p>
                <p className="text-sm text-muted">Founder · AI Automation &amp; Growth</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["AI Agents", "Automation", "Ads", "Web"].map((t) => (
                    <span key={t} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] text-primary">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story + Mission */}
      <section className="py-20" aria-labelledby="story-title">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading align="left" eyebrow="Personal story" title={<span id="story-title">Why I started D Expert</span>} />
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
            {founderStory.map((p) => (
              <Reveal key={p.slice(0, 20)}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12" aria-labelledby="mission-title">
        <div className="container-x">
          <Reveal className="glass-strong border-gradient rounded-[2rem] p-10 text-center md:p-16">
            <Badge variant="violet">Mission</Badge>
            <h2 id="mission-title" className="mx-auto mt-6 max-w-4xl text-2xl font-semibold leading-snug text-foreground md:text-4xl">
              &ldquo;{founderMission}&rdquo;
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20" aria-labelledby="exp-title">
        <div className="container-x">
          <SectionHeading eyebrow="Experience" title={<span id="exp-title">Hands-on across the whole growth stack</span>} />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {founderExperience.map((e) => (
              <StaggerItem key={e.title} className="glass rounded-3xl p-6">
                <h3 className="font-semibold text-foreground">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20" aria-labelledby="skills-title">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading align="left" eyebrow="Skills" title={<span id="skills-title">Expertise you can measure</span>} description="Depth across AI, automation and marketing means your systems are designed to work together from day one." />
          <Reveal className="glass rounded-[2rem] p-8">
            <SkillMeters />
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20" aria-labelledby="ind-title">
        <div className="container-x">
          <SectionHeading eyebrow="Industries served" title={<span id="ind-title">Businesses Pankaj has helped grow</span>} />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {industries.map((i) => (
              <span key={i.name} className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-foreground">
                <Icon name={i.icon} className="size-4 text-primary" /> {i.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20" aria-labelledby="phil-title">
        <div className="container-x">
          <SectionHeading eyebrow="Philosophy" title={<span id="phil-title">How I think about AI and growth</span>} />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {founderPhilosophy.map((p) => (
              <StaggerItem key={p.title} className="glass border-gradient rounded-3xl p-6">
                <Icon name={p.icon} className="size-7 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline + Results */}
      <section className="py-20" aria-labelledby="tl-title">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Timeline" title={<span id="tl-title">The journey so far</span>} />
            <div className="mt-12">
              <FounderTimeline />
            </div>
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Results" title="By the numbers" />
            <div className="mt-12 grid grid-cols-2 gap-4">
              {trustStats.map((s) => (
                <div key={s.label} className="glass rounded-3xl p-6">
                  <p className="text-4xl font-semibold text-gradient">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="glass mt-6 rounded-3xl p-7">
              <h3 className="text-lg font-semibold text-foreground">Why work with Pankaj</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {founderWhy.map((w) => (
                  <li key={w} className="flex gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <VideoIntro />
      <CTASection title="Let's talk about your growth" description="Book a free 30-minute call with Pankaj. You'll leave with clear next steps, whether or not we work together." primary="Book a call with Pankaj" />
    </>
  );
}
