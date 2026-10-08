import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/content/portfolio";
import { caseStudies } from "@/content/case-studies";
import { posts } from "@/content/blog";
import { tools } from "@/content/tools";

const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/ai-voice-agents", priority: 0.95, freq: "monthly" },
  { path: "/ai-chatbots", priority: 0.9, freq: "monthly" },
  { path: "/automation-solutions", priority: 0.9, freq: "monthly" },
  { path: "/website-design", priority: 0.85, freq: "monthly" },
  { path: "/digital-marketing", priority: 0.85, freq: "monthly" },
  { path: "/branding", priority: 0.8, freq: "monthly" },
  { path: "/portfolio", priority: 0.8, freq: "monthly" },
  { path: "/case-studies", priority: 0.8, freq: "monthly" },
  { path: "/pricing", priority: 0.85, freq: "monthly" },
  { path: "/blog", priority: 0.7, freq: "weekly" },
  { path: "/founder", priority: 0.7, freq: "yearly" },
  { path: "/about", priority: 0.7, freq: "yearly" },
  { path: "/contact", priority: 0.8, freq: "yearly" },
  { path: "/book-consultation", priority: 0.9, freq: "yearly" },
  { path: "/tools", priority: 0.8, freq: "monthly" },
  { path: "/free-tools", priority: 0.75, freq: "monthly" },
  { path: "/business-growth-assessment", priority: 0.75, freq: "monthly" },
  { path: "/voice-agent-demo", priority: 0.85, freq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const toolPaths = tools.map((t) => t.href).filter((p) => !staticRoutes.some((s) => s.path === p));
  return [
    ...staticRoutes.map((r) => ({ url: `${site.url}${r.path}`, lastModified: now, changeFrequency: r.freq, priority: r.priority })),
    ...toolPaths.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...projects.map((p) => ({ url: `${site.url}/portfolio/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...caseStudies.map((c) => ({ url: `${site.url}/case-studies/${c.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.65 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
