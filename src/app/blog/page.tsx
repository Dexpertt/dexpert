import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { posts } from "@/content/blog";
import { PageHero } from "@/components/shared/page-hero";
import { PostCard } from "@/components/shared/post-card";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { LeadMagnetSection } from "@/components/sections/lead-magnet-section";

export const metadata: Metadata = buildMetadata({
  title: "Blog | AI Automation, AI Voice Agents & Digital Marketing Insights | D Expert",
  description:
    "Practical guides on AI voice agents, AI automation, chatbots, CRM automation, Google Ads vs Meta Ads and local SEO from the D Expert team.",
  path: "/blog",
  keywords: ["AI automation blog", "AI voice agent guide", "digital marketing tips"],
});

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [first, ...rest] = sorted;
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Insights on <span className="text-gradient-animated">AI, automation & growth</span>
          </>
        }
        description="Plain-English guides for business owners who want to use AI and digital marketing without the hype."
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section className="pb-16">
        <div className="container-x">
          <div className="mb-6">
            <PostCard post={first} />
          </div>
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <StaggerItem key={p.slug}>
                <PostCard post={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <LeadMagnetSection />
    </>
  );
}
