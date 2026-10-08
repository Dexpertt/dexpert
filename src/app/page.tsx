import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/home/hero";
import { TrustStats } from "@/components/sections/home/trust-stats";
import { LogoMarquee } from "@/components/sections/home/logo-marquee";
import { ServicesBento } from "@/components/sections/home/services-bento";
import { VoiceSection } from "@/components/sections/home/voice-section";
import { AutomationSection } from "@/components/sections/home/automation-section";
import { Industries } from "@/components/sections/home/industries";
import { GrowthSection } from "@/components/sections/home/growth-section";
import { ProcessSection } from "@/components/sections/home/process-section";
import { VideoIntro } from "@/components/sections/home/video-intro";
import { FeaturedWork } from "@/components/sections/home/featured-work";
import { Testimonials } from "@/components/sections/home/testimonials";
import { ToolsPromo } from "@/components/sections/home/tools-promo";
import { LeadMagnetSection } from "@/components/sections/lead-magnet-section";
import { ContactGlobeSection } from "@/components/sections/contact-globe-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { homeFaqs } from "@/content/faqs";

export const metadata: Metadata = buildMetadata({
  title: "D Expert | AI Automation, AI Voice Agents & Digital Marketing Agency",
  description:
    "Scale your business with AI automation. D Expert builds AI voice agents, AI receptionists, chatbots, CRM & WhatsApp automation, websites and Google & Meta Ads that capture more leads. Based in New Delhi.",
  path: "/",
  keywords: ["AI automation agency", "AI receptionist", "AI voice agent India"],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStats />
      <LogoMarquee />
      <ServicesBento />
      <VoiceSection />
      <AutomationSection />
      <Industries />
      <GrowthSection />
      <ProcessSection />
      <VideoIntro />
      <FeaturedWork />
      <Testimonials />
      <ToolsPromo />
      <LeadMagnetSection />
      <FAQSection faqs={homeFaqs} description="Straight answers about AI agents, automation, timelines and pricing." />
      <ContactGlobeSection />
      <CTASection />
    </>
  );
}
