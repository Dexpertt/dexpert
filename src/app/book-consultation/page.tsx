import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { BookingCenter } from "@/components/booking/booking-center";
import { SectionHeading } from "@/components/shared/section-heading";
import { FAQSection } from "@/components/sections/faq-section";
import { Testimonials } from "@/components/sections/home/testimonials";

export const metadata: Metadata = buildMetadata({
  title: "Book a Free Consultation | AI Demo & Strategy Call | D Expert",
  description:
    "Book a free strategy call, AI demo, automation call or marketing strategy session with Pankaj Thakur, founder of D Expert.",
  path: "/book-consultation",
  keywords: ["book AI consultation", "free strategy call", "AI demo"],
});

const expect = [
  "A quick review of your website, calls and lead flow before the call",
  "The 3 biggest growth leaks we see, in plain English",
  "Which AI agents and automations would help most, and which wouldn't",
  "A realistic timeline and budget range, with no hard sell",
];

const faqs = [
  { q: "Is the consultation really free?", a: "Yes. The strategy call is free with no obligation. If we're not the right fit, we'll still give you useful next steps." },
  { q: "Who will I speak with?", a: "You'll speak directly with Pankaj Thakur, founder of D Expert, or a senior specialist for technical demos." },
  { q: "What should I prepare?", a: "Just your website address and a rough idea of your monthly enquiries and biggest frustrations. We'll do the rest." },
  { q: "Which time zones do you support?", a: "All of them. Calendly shows times in your local time zone, and we regularly meet clients in India, the US, UK, UAE and Australia." },
];

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a consultation"
        title={
          <>
            Pick a time. <span className="text-gradient-animated">Get a growth plan.</span>
          </>
        }
        description="Choose the conversation that fits: a free strategy call, a live AI demo, an automation deep-dive or a marketing strategy session."
        breadcrumbs={[{ name: "Book Consultation", path: "/book-consultation" }]}
      />
      <section className="pb-16">
        <div className="container-x">
          <BookingCenter />
        </div>
      </section>
      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <SectionHeading align="left" eyebrow="What to expect" title="30 minutes that pay for themselves" />
          <ul className="flex flex-col gap-4">
            {expect.map((e) => (
              <li key={e} className="glass flex gap-3 rounded-2xl p-5 text-foreground">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> {e}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Testimonials />
      <FAQSection faqs={faqs} title="Booking questions" />
    </>
  );
}
