import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { pricingFaqs } from "@/content/pricing";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { PricingCards, ComparisonTable, CurrencyToggle } from "@/components/pricing/pricing-cards";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Pricing | AI Automation, AI Voice Agent & Marketing Plans | D Expert",
  description:
    "Transparent plans for AI automation, AI voice receptionists, chatbots, websites and digital marketing: Starter, Growth, Automation Pro and Enterprise.",
  path: "/pricing",
  keywords: ["AI automation pricing", "AI receptionist cost", "digital marketing packages India"],
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Simple plans. <span className="text-gradient-animated">Serious growth.</span>
          </>
        }
        description="Choose a plan that fits your stage, or talk to Pankaj about a custom Enterprise build. Every plan is built in accounts you own, with no lock-in after the initial term."
        breadcrumbs={[{ name: "Pricing", path: "/pricing" }]}
      >
        <CurrencyToggle />
      </PageHero>
      <section className="pb-16">
        <div className="container-x">
          <PricingCards />
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted">
            <ShieldCheck className="size-4 text-accent" aria-hidden /> INR prices exclude 18% GST. Ad spend and third-party usage above plan limits billed at cost.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Compare plans" title="Everything side by side" />
          <div className="mt-10">
            <ComparisonTable />
          </div>
        </div>
      </section>
      <FAQSection faqs={pricingFaqs} title="Pricing questions" />
      <CTASection title="Not sure which plan fits?" description="Book a free strategy call and we'll recommend the right plan, or a one-time project, based on your goals and budget." />
    </>
  );
}
