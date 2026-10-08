export type ToolInfo = {
  slug: string;
  href: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  outputs: string[];
  badge?: string;
  metaTitle: string;
  metaDescription: string;
};

export const tools: ToolInfo[] = [
  {
    slug: "website-grader",
    href: "/website-grader",
    title: "Website Audit Tool",
    short: "Grade your website on SEO, speed, trust and conversions.",
    description: "Scan any website and get SEO, speed, mobile, lead generation, conversion, trust, Google Business Profile and accessibility scores, with a plain-English explanation and a priority roadmap.",
    icon: "Gauge",
    outputs: ["9 scores", "Why you're losing leads", "Priority roadmap"],
    badge: "Most popular",
    metaTitle: "Free Website Grader & SEO Audit Tool | D Expert",
    metaDescription: "Free website audit: get your SEO, speed, mobile, lead generation, conversion, trust and accessibility scores with a plain-English growth roadmap in under a minute.",
  },
  {
    slug: "competitor-analysis",
    href: "/tools/competitor-analysis",
    title: "Competitor Analysis Tool",
    short: "Compare your website head-to-head with a competitor.",
    description: "Compare your website against a competitor on SEO, speed, content, trust and lead generation, and get your opportunities, ranking potential and an action plan.",
    icon: "Scale",
    outputs: ["Side-by-side scores", "Opportunities", "Action plan"],
    metaTitle: "Free Competitor Website Analysis Tool | D Expert",
    metaDescription: "Compare your website with a competitor's: SEO, speed, content, trust and lead generation side by side, with opportunities and an action plan.",
  },
  {
    slug: "automation-audit",
    href: "/automation-audit",
    title: "Business Automation Advisor",
    short: "Find what your business should automate first.",
    description: "Tell us about your team, leads and pain points and get your automation opportunities, estimated time and cost savings, and a 90-day roadmap.",
    icon: "Bot",
    outputs: ["Automation opportunities", "Time & cost savings", "90-day roadmap"],
    metaTitle: "Free Business Automation Audit & Advisor | D Expert",
    metaDescription: "Discover your best AI and automation opportunities: customer support, lead, appointment, CRM, email and WhatsApp automation with savings estimates and a 90-day roadmap.",
  },
  {
    slug: "ai-roi-calculator",
    href: "/ai-roi-calculator",
    title: "AI Voice Agent ROI Calculator",
    short: "See the revenue you lose to missed calls.",
    description: "Enter your calls, missed calls, sale value and conversion rate to see your monthly and annual revenue opportunity, lead recovery and support hours covered.",
    icon: "Calculator",
    outputs: ["Monthly & annual opportunity", "Lead recovery", "Visual graphs"],
    metaTitle: "AI Voice Agent ROI Calculator | Missed Call Revenue | D Expert",
    metaDescription: "Calculate how much revenue missed calls cost your business and the opportunity an AI voice agent or AI receptionist could recover.",
  },
  {
    slug: "automation-savings-calculator",
    href: "/tools/automation-savings-calculator",
    title: "Automation Savings Calculator",
    short: "Calculate hours and money saved by automation.",
    description: "Estimate time saved, money saved, productivity and efficiency gains from automating repetitive tasks across your team.",
    icon: "Timer",
    outputs: ["Time saved", "Money saved", "Productivity gain"],
    metaTitle: "Automation Savings Calculator | Time & Cost Savings | D Expert",
    metaDescription: "Estimate how many hours and how much money your business could save by automating repetitive work, plus productivity and efficiency gains.",
  },
  {
    slug: "local-seo-scanner",
    href: "/tools/local-seo-scanner",
    title: "Local SEO Scanner",
    short: "Score your Google Business Profile and local visibility.",
    description: "Assess your Google Business Profile, reviews, local rankings and website local signals for a Local SEO score and growth opportunities.",
    icon: "MapPin",
    outputs: ["Local SEO score", "Review analysis", "Growth opportunities"],
    metaTitle: "Free Local SEO Scanner & Google Business Profile Audit | D Expert",
    metaDescription: "Check your local SEO: Google Business Profile completeness, reviews, local rankings and website signals, with a score and growth opportunities.",
  },
  {
    slug: "digital-marketing-audit",
    href: "/tools/digital-marketing-audit",
    title: "Digital Marketing Audit",
    short: "Audit your ads, landing pages and tracking.",
    description: "Analyse your Google Ads, Meta Ads, landing pages, conversion tracking and remarketing, and get a prioritised audit report.",
    icon: "Megaphone",
    outputs: ["Channel scores", "Tracking check", "Audit report"],
    metaTitle: "Free Digital Marketing Audit | Google & Meta Ads | D Expert",
    metaDescription: "Audit your Google Ads, Meta Ads, landing pages, conversion tracking and remarketing setup, and get a prioritised improvement plan.",
  },
  {
    slug: "ai-strategy-generator",
    href: "/tools/ai-strategy-generator",
    title: "AI Strategy Generator",
    short: "Get a 90-day AI growth plan for your business.",
    description: "Share your business details, goals and challenges and get a 90-day AI growth plan covering automation, marketing, support and lead generation.",
    icon: "BrainCircuit",
    outputs: ["90-day plan", "Automation opportunities", "Lead generation plan"],
    badge: "New",
    metaTitle: "Free AI Strategy Generator | 90-Day AI Growth Plan | D Expert",
    metaDescription: "Generate a 90-day AI growth plan for your business: automation opportunities, marketing improvements, support upgrades and a lead generation plan.",
  },
];

export const extraTools = [
  { href: "/business-growth-assessment", title: "Business Growth Assessment", short: "Score your growth engine across 6 pillars in 2 minutes.", icon: "Rocket" },
  { href: "/free-tools", title: "ROI Calculator Suite", short: "Website, marketing, automation, voice agent and lead gen ROI.", icon: "ChartLine" },
  { href: "/voice-agent-demo", title: "AI Voice Agent Demo", short: "Hear AI receptionists handle real calls.", icon: "AudioLines" },
];

export function getTool(slug: string) {
  const t = tools.find((x) => x.slug === slug);
  if (!t) throw new Error(`Unknown tool ${slug}`);
  return t;
}
