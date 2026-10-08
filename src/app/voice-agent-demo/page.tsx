import type { Metadata } from "next";
import { CalendarCheck, Clock, Headphones, PhoneMissed, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { VoiceDemoCenter } from "@/components/voice/voice-demo-center";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareToolSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "AI Voice Agent Demo | Hear an AI Receptionist Handle Calls | D Expert",
  description:
    "Try live AI voice agent demos for a dental clinic, a restaurant and a real estate agency. Talk with your microphone or tap replies and see how AI handles missed and after-hours calls.",
  path: "/voice-agent-demo",
  keywords: ["AI voice agent demo", "AI receptionist demo", "AI phone answering", "missed call AI", "voice bot India"],
});

const support = [
  { icon: PhoneMissed, title: "Missed-call recovery", desc: "Calls that would have gone to voicemail get answered, so new customers don't call the next business on Google." },
  { icon: Clock, title: "After-hours cover", desc: "Evenings, weekends and holidays are covered, with bookings and messages waiting for your team in the morning." },
  { icon: Users, title: "Overflow when you're busy", desc: "When the front desk is with a customer, the agent picks up the second and third lines instead of leaving them ringing." },
  { icon: Headphones, title: "Smooth hand-off to people", desc: "Urgent, complex or sensitive calls go straight to a staff member with a summary, so nobody has to repeat themselves." },
];

const faqs = [
  { q: "Will an AI voice agent replace my receptionist?", a: "No. We design voice agents to support your team: they answer missed, overflow and after-hours calls and take repetitive bookings off your staff's plate. Your people stay in charge of customers who need a human touch, and every agent can transfer a call to a person." },
  { q: "Does it sound robotic?", a: "Production agents use natural, human-like voices with realistic pacing and can speak English, Hindi and Hinglish. This demo uses your browser's built-in voice so it works instantly without any sign-up." },
  { q: "Can it book into my existing calendar or CRM?", a: "Yes. We connect agents to Google Calendar, Calendly, practice-management and booking systems, and CRMs such as GoHighLevel, HubSpot and Zoho, so bookings and call notes appear where your team already works." },
  { q: "What happens if the AI doesn't know the answer?", a: "It says so politely, takes a message or transfers the call to a staff member. Agents only answer from information you approve, and we review transcripts regularly to improve them." },
  { q: "Can I keep my existing phone number?", a: "Yes. Most setups simply forward unanswered or after-hours calls to the agent, so your number and current phone system stay the same." },
  { q: "Is my microphone audio recorded in this demo?", a: "No. Speech recognition runs in your browser to pick the matching reply, and nothing you say is stored or sent to D Expert." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareToolSchema({ name: "D Expert AI Voice Agent Demo", description: "Interactive AI voice agent demos for dental clinics, restaurants and real estate agencies.", path: "/voice-agent-demo" })} />
      <PageHero
        eyebrow="Live demo"
        title={
          <>
            Hear an AI voice agent <span className="text-gradient-animated">handle real calls</span>
          </>
        }
        description="Pick a business, press call and talk to the AI assistant with your microphone, or let the demo play. See how missed and after-hours calls become booked appointments while your team stays focused on customers."
        breadcrumbs={[
          { name: "AI Voice Agents", path: "/ai-voice-agents" },
          { name: "Voice Agent Demo", path: "/voice-agent-demo" },
        ]}
        className="pb-10"
      />

      <section className="pb-20" aria-label="Voice agent demos">
        <div className="container-x">
          <VoiceDemoCenter />
        </div>
      </section>

      <section className="py-20" aria-labelledby="support-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Support, not replacement"
            title={
              <span id="support-title">
                An extra pair of hands <span className="text-gradient">on every call</span>
              </span>
            }
            description="AI voice agents take the calls your team can't get to, so every customer gets an answer and your staff can focus on the people in front of them."
          />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {support.map((s) => (
              <StaggerItem key={s.title} className="glass border-gradient rounded-3xl p-6">
                <s.icon className="size-7 text-primary" aria-hidden />
                <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="glass mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-3xl p-6 text-center sm:flex-row sm:text-left">
            <CalendarCheck className="size-8 shrink-0 text-accent" aria-hidden />
            <p className="text-sm leading-relaxed text-muted">
              <span className="text-foreground">Want to hear it with your own business details?</span> Book an AI demo and we&apos;ll set up a sample agent trained on your services, timings and FAQs.
            </p>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="AI voice agent questions" />
      <CTASection title="Never miss another customer call" description="Book a free AI demo. We'll show you an agent built around your business and how it hands calls to your team." primary="Book AI Demo" booking="aiDemo" />
    </>
  );
}
