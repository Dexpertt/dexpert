/**
 * Pricing plans. TODO(owner): confirm prices before launch.
 * Prices are monthly retainers; setup fees listed separately.
 */
export type Plan = {
  id: string;
  name: string;
  tagline: string;
  priceINR: number | null;
  priceUSD: number | null;
  setupINR?: number;
  setupUSD?: number;
  bestFor: string;
  features: string[];
  deliverables: string[];
  support: string;
  cta: string;
  highlighted?: boolean;
  badge?: string;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Get found, look premium and never miss an enquiry.",
    priceINR: 19999,
    priceUSD: 349,
    setupINR: 24999,
    setupUSD: 499,
    bestFor: "Local businesses and solo professionals getting started",
    features: [
      "Conversion-focused website (up to 6 pages)",
      "Google Business Profile optimisation",
      "AI website chatbot (FAQs + lead capture)",
      "Missed-call text-back",
      "Basic CRM with lead pipeline",
      "Monthly performance snapshot",
    ],
    deliverables: ["Website + hosting", "Chatbot trained on 30 FAQs", "Review request automation", "GA4 + Search Console"],
    support: "Email & WhatsApp support, 48-hour response",
    cta: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Turn your website into a predictable lead engine.",
    priceINR: 49999,
    priceUSD: 799,
    setupINR: 49999,
    setupUSD: 899,
    bestFor: "Growing businesses ready to invest in leads",
    features: [
      "Everything in Starter",
      "Google Ads or Meta Ads management (1 platform)",
      "2 high-converting landing pages",
      "WhatsApp & email follow-up automation",
      "Appointment booking + reminders",
      "Local SEO (2 location pages / month)",
      "Monthly strategy call",
    ],
    deliverables: ["Campaign setup + creatives", "Conversion tracking", "5 automation workflows", "Monthly report"],
    support: "Priority WhatsApp support, 24-hour response",
    cta: "Choose Growth",
    badge: "Popular",
  },
  {
    id: "automation-pro",
    name: "Automation Pro",
    tagline: "AI agents and automation that work while you sleep.",
    priceINR: 99999,
    priceUSD: 1499,
    setupINR: 99999,
    setupUSD: 1799,
    bestFor: "Businesses with high call or enquiry volume",
    features: [
      "Everything in Growth",
      "24/7 AI voice receptionist (up to 1,000 min / month)",
      "AI customer support or sales chatbot (web + WhatsApp)",
      "CRM automation & lead scoring",
      "Up to 15 automation workflows",
      "Google + Meta Ads management",
      "Bi-weekly optimisation calls",
    ],
    deliverables: ["Voice agent + phone setup", "Knowledge base training", "CRM build-out", "Automation monitoring"],
    support: "Dedicated Slack/WhatsApp channel, same-day response",
    cta: "Go Automation Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "A custom AI and growth partner for complex operations.",
    priceINR: null,
    priceUSD: null,
    bestFor: "Multi-location brands, scale-ups and enterprises",
    features: [
      "Everything in Automation Pro",
      "Custom AI agents (voice, chat, internal)",
      "Unlimited workflows & integrations",
      "Multi-location & multilingual deployments",
      "Custom dashboards & data warehouse",
      "Security review, SSO & data processing agreements",
      "Full-funnel performance marketing",
      "Quarterly strategy workshops with Pankaj",
    ],
    deliverables: ["Solution architecture", "Dedicated project manager", "SLA-backed support", "Team training & SOPs"],
    support: "Dedicated account team, SLA-backed response times",
    cta: "Talk to Pankaj",
    highlighted: true,
    badge: "Best value at scale",
  },
];

export const pricingComparison: { feature: string; values: (string | boolean)[] }[] = [
  { feature: "Conversion-focused website", values: [true, true, true, true] },
  { feature: "Google Business Profile optimisation", values: [true, true, true, true] },
  { feature: "AI chatbot", values: ["FAQ bot", "FAQ bot", "Support/sales agent", "Custom agents"] },
  { feature: "AI voice receptionist", values: [false, false, "1,000 min/mo", "Custom volume"] },
  { feature: "Automation workflows", values: ["2", "5", "15", "Unlimited"] },
  { feature: "Ad management", values: [false, "1 platform", "Google + Meta", "Full-funnel"] },
  { feature: "Landing pages", values: [false, "2", "4", "Unlimited"] },
  { feature: "CRM", values: ["Basic", "Standard", "Advanced + scoring", "Custom"] },
  { feature: "Strategy calls", values: [false, "Monthly", "Bi-weekly", "Weekly + quarterly workshop"] },
  { feature: "Support", values: ["48h", "24h", "Same day", "SLA"] },
];

export const pricingFaqs = [
  { q: "Are there long-term contracts?", a: "Monthly plans have a 3-month minimum so we have time to build, launch and optimise properly. After that, plans are month-to-month with 30 days' notice." },
  { q: "Is ad spend included?", a: "No. Ad spend is paid directly to Google and Meta from your own accounts, so you keep full control and transparency." },
  { q: "What does the setup fee cover?", a: "Strategy, design, build, integrations, AI training and testing. It's a one-time fee charged at the start of the engagement." },
  { q: "Can I buy a single service?", a: "Yes. Websites, voice agents, chatbots and automation projects are also available as one-time projects. Book a call for a custom quote." },
  { q: "Are AI usage costs included?", a: "Plans include the stated AI minutes and conversations. Higher volumes are billed at cost with no markup surprises; we'll forecast usage with you." },
  { q: "Do prices include GST?", a: "INR prices are exclusive of 18% GST. USD prices apply to international clients." },
];
