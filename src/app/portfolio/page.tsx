import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { CTASection } from "@/components/sections/cta-section";
import { TrustStats } from "@/components/sections/home/trust-stats";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio | AI Agents, Automation & Website Projects | D Expert",
  description:
    "Explore D Expert projects: AI receptionists, lead qualification agents, AI chatbots, ecommerce automation, and high-converting websites for dental clinics, roofers, contractors, real estate and restaurants.",
  path: "/portfolio",
  keywords: ["AI agency portfolio", "website design portfolio", "AI automation case examples"],
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Work that <span className="text-gradient-animated">answers, books & sells</span>
          </>
        }
        description="AI voice agents, chatbots, automation systems, websites and campaigns built for clinics, local service businesses, real estate, ecommerce and startups."
        breadcrumbs={[{ name: "Portfolio", path: "/portfolio" }]}
      />
      <section className="pb-16">
        <div className="container-x">
          <PortfolioGrid />
        </div>
      </section>
      <TrustStats />
      <CTASection title="Want results like these?" description="Tell us about your business and we'll show you exactly what we'd build, and what it could do for you." />
    </>
  );
}
