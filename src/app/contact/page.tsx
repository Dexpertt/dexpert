import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactGlobeSection } from "@/components/sections/contact-globe-section";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Contact D Expert | AI Automation Agency in New Delhi",
  description: `Contact D Expert for AI voice agents, automation, websites and digital marketing. Call or WhatsApp ${site.phone}, or send us a message. Based in New Delhi, serving clients worldwide.`,
  path: "/contact",
  keywords: ["contact AI agency", "AI automation agency New Delhi"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <span className="text-gradient-animated">your growth</span>
          </>
        }
        description="Tell us what's slowing your business down. We reply within one business day, and usually much faster on WhatsApp."
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <section className="pb-16">
        <div className="container-x grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="glass rounded-[2rem] p-6 md:p-10">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Send a message</h2>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.05} className="flex flex-col gap-4">
            <div className="glass rounded-[2rem] p-7">
              <h2 className="text-lg font-semibold text-foreground">Reach us directly</h2>
              <ul className="mt-5 flex flex-col gap-4 text-sm">
                <li>
                  <a href={`tel:${site.phoneRaw}`} className="flex items-center gap-3 text-foreground hover:text-primary">
                    <Phone className="size-5 text-primary" aria-hidden /> {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-foreground hover:text-primary">
                    <Mail className="size-5 text-primary" aria-hidden /> {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <MapPin className="size-5 text-primary" aria-hidden /> New Delhi, India
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <Clock className="size-5 text-primary" aria-hidden /> {site.hoursLabel}
                </li>
              </ul>
            </div>
            <div className="glass rounded-[2rem] p-7">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <MessageCircle className="size-5 text-accent" aria-hidden /> Quick WhatsApp
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {whatsappMessages.map((m) => (
                  <a key={m} href={whatsappLink(m)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs text-accent hover:bg-accent/15">
                    {m}
                  </a>
                ))}
              </div>
            </div>
            <div className="glass overflow-hidden rounded-[2rem]">
              <iframe
                title="D Expert location: New Delhi"
                src="https://www.google.com/maps?q=New+Delhi,+India&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full grayscale invert-[0.9] hue-rotate-180"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <ContactGlobeSection />
    </>
  );
}
