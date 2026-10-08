export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  problem: string;
  context: string;
  solution: string;
  components: { title: string; desc: string; icon: string }[];
  timeline: { phase: string; detail: string }[];
  benefits: { title: string; desc: string }[];
  learnings: string[];
  stack: string[];
  relatedService: { label: string; href: string };
  colors: [string, string];
};

/**
 * Case studies describe the approach and qualitative outcomes.
 * TODO(owner): add verified metrics (with client permission) before launch.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-voice-agent-for-healthcare",
    title: "AI Voice Agent for Healthcare",
    industry: "Healthcare & Clinics",
    summary: "How a 24/7 AI receptionist helped a busy clinic handle after-hours calls and give patients a faster response.",
    problem: "Missed after-hours calls",
    context:
      "The clinic's front desk closed at 7 PM, but patients kept calling: to book check-ups, ask about symptoms and timings, or reschedule. Voicemails piled up overnight, call-backs started late, and many callers had already booked elsewhere. Staff began each morning behind.",
    solution:
      "We introduced a 24/7 AI receptionist that takes over after hours and on overflow during the day. It answers questions from a clinic-approved knowledge base, books and reschedules appointments in the calendar, and flags anything urgent for a human. Clinical advice is never given; callers with urgent symptoms are directed to emergency services or the on-call number.",
    components: [
      { title: "24/7 AI Receptionist", desc: "Natural voice agent on overflow and after-hours routing.", icon: "PhoneIncoming" },
      { title: "Calendar Booking", desc: "Live availability, booking and rescheduling.", icon: "CalendarCheck" },
      { title: "Safety Escalation", desc: "Urgent keywords trigger transfer or emergency guidance.", icon: "ShieldCheck" },
      { title: "Morning Digest", desc: "Summary of overnight calls, bookings and call-backs for staff.", icon: "FileText" },
    ],
    timeline: [
      { phase: "Week 1", detail: "Call audit, FAQ collection and escalation rules agreed with clinicians." },
      { phase: "Week 2", detail: "Voice, scripts and calendar integration built; 200+ test calls." },
      { phase: "Week 3", detail: "After-hours go-live with daily transcript reviews." },
      { phase: "Week 4+", detail: "Overflow routing added during peak daytime hours." },
    ],
    benefits: [
      { title: "Better response times", desc: "Every caller answered immediately, at any hour." },
      { title: "Improved appointment opportunities", desc: "After-hours callers can book on the spot instead of waiting for a call-back." },
      { title: "Calmer mornings", desc: "Staff start the day with a clear summary instead of a voicemail backlog." },
    ],
    learnings: [
      "Clear escalation rules matter more than clever scripts in healthcare.",
      "Patients respond well when told upfront they're speaking with an AI assistant.",
      "Starting with after-hours only builds staff confidence before adding daytime overflow.",
    ],
    stack: ["Vapi", "ElevenLabs", "Twilio", "Google Calendar", "n8n", "OpenAI"],
    relatedService: { label: "AI Voice Agents", href: "/ai-voice-agents" },
    colors: ["#00F5FF", "#7B61FF"],
  },
  {
    slug: "local-business-growth-system",
    title: "Local Business Growth System",
    industry: "Local Service Business",
    summary: "A complete local growth engine: new website, optimised Google Business Profile, lead funnel and automated follow-up.",
    problem: "Invisible locally and slow to follow up",
    context:
      "A well-reviewed local service business relied on word of mouth. Their website was outdated, their Google Business Profile was incomplete, and enquiries from the contact form often waited a day for a reply.",
    solution:
      "We built an integrated system: a fast new website with service and area pages, a fully optimised Google Business Profile with a review-request engine, a quote funnel, and automation that replies to every enquiry within seconds and reminds the team to follow up.",
    components: [
      { title: "Website", desc: "Fast, mobile-first site with service and location pages.", icon: "MonitorSmartphone" },
      { title: "Google Business Profile", desc: "Categories, services, photos, posts and Q&A optimised.", icon: "MapPin" },
      { title: "Lead Funnel", desc: "Multi-step quote form capturing job details and urgency.", icon: "Filter" },
      { title: "Automated Follow-Up", desc: "Instant SMS/WhatsApp reply, CRM task and review requests.", icon: "Repeat" },
    ],
    timeline: [
      { phase: "Weeks 1–2", detail: "Brand refresh, sitemap, copy and Google profile clean-up." },
      { phase: "Weeks 3–4", detail: "Website build, funnel and CRM automation." },
      { phase: "Week 5", detail: "Launch, review campaign to past customers." },
      { phase: "Ongoing", detail: "Monthly local SEO, posts and reporting." },
    ],
    benefits: [
      { title: "Stronger local visibility", desc: "A complete, active profile and location pages support map-pack rankings." },
      { title: "Faster replies", desc: "Every enquiry receives an instant acknowledgement and a scheduled call." },
      { title: "Steady review growth", desc: "Automated requests turn happy customers into public proof." },
    ],
    learnings: [
      "A complete Google profile is the highest-leverage local asset.",
      "Instant replies matter as much as the ad that generated the lead.",
      "Systems beat campaigns: each piece makes the others work better.",
    ],
    stack: ["Next.js", "Google Business Profile", "GoHighLevel", "WhatsApp Cloud API", "BrightLocal"],
    relatedService: { label: "Local Business Growth", href: "/branding#local" },
    colors: ["#00FF9D", "#00F5FF"],
  },
  {
    slug: "digital-marketing-campaign",
    title: "Digital Marketing Campaign",
    industry: "Professional Services",
    summary: "A full-funnel paid campaign combining Google Ads, Meta Ads, focused landing pages and CRM workflows.",
    problem: "Ad spend with unclear returns",
    context:
      "The business was running ads that sent traffic to their homepage, with no conversion tracking beyond form fills. They couldn't tell which campaigns produced customers, so budget decisions were guesswork.",
    solution:
      "We rebuilt the funnel from tracking up: GA4, Tag Manager, Meta Conversions API and CRM attribution; dedicated landing pages per offer; restructured Google Search campaigns around buyer intent; and Meta campaigns for awareness and retargeting. CRM workflows follow up every lead and feed outcomes back to the ad platforms.",
    components: [
      { title: "Google Ads", desc: "Intent-based search campaigns with tight ad groups.", icon: "Search" },
      { title: "Meta Ads", desc: "Prospecting and retargeting with tested creatives.", icon: "Megaphone" },
      { title: "Landing Pages", desc: "One page per offer, built to convert.", icon: "LayoutTemplate" },
      { title: "CRM Workflows", desc: "Lead routing, follow-up and offline conversion import.", icon: "Workflow" },
    ],
    timeline: [
      { phase: "Week 1", detail: "Audit, tracking plan and offer strategy." },
      { phase: "Week 2", detail: "Tracking implementation and landing pages." },
      { phase: "Week 3", detail: "Campaign launch with conservative budgets." },
      { phase: "Weeks 4–8", detail: "Weekly optimisation and budget reallocation to winners." },
    ],
    benefits: [
      { title: "Clear attribution", desc: "Every lead traced to its campaign, ad and keyword." },
      { title: "Smarter budgets", desc: "Spend shifted to campaigns that produced customers, not just clicks." },
      { title: "Consistent follow-up", desc: "Automated workflows ensure no lead is forgotten." },
    ],
    learnings: [
      "Tracking first, then scale.",
      "Dedicated landing pages outperform the homepage for paid traffic.",
      "Feeding sales outcomes back to ad platforms improves lead quality.",
    ],
    stack: ["Google Ads", "Meta Ads", "GA4", "Google Tag Manager", "HubSpot", "Looker Studio"],
    relatedService: { label: "Digital Marketing", href: "/digital-marketing" },
    colors: ["#7B61FF", "#00FF9D"],
  },
  {
    slug: "ai-customer-support-agent",
    title: "AI Customer Support Agent",
    industry: "Ecommerce",
    summary: "An AI assistant that resolves repetitive support requests instantly and routes complex ones to the team.",
    problem: "Repetitive support requests",
    context:
      "A growing online store received the same questions every day: order status, delivery times, returns and sizing. The small team spent most of its day on copy-paste replies, and response times stretched into days during sales.",
    solution:
      "We deployed an AI support assistant on the website and WhatsApp, trained on store policies and connected to live order data. It answers instantly, processes simple return requests, and hands over complex conversations to the team with the full context.",
    components: [
      { title: "AI Assistant", desc: "Trained on policies, FAQs and product data.", icon: "Bot" },
      { title: "Live Order Lookup", desc: "Real-time status and tracking from the store backend.", icon: "ShoppingCart" },
      { title: "Human Hand-off", desc: "Escalation to a shared inbox with conversation history.", icon: "Users" },
      { title: "Insights", desc: "Weekly report of top questions and gaps.", icon: "BarChart3" },
    ],
    timeline: [
      { phase: "Week 1", detail: "Ticket analysis and knowledge base preparation." },
      { phase: "Week 2", detail: "Assistant build, order integration and guardrails." },
      { phase: "Week 3", detail: "Soft launch on website, then WhatsApp." },
      { phase: "Ongoing", detail: "Weekly knowledge updates from new questions." },
    ],
    benefits: [
      { title: "24/7 support", desc: "Customers get answers at midnight and during sale rushes." },
      { title: "Faster response times", desc: "Routine questions answered in seconds instead of hours." },
      { title: "Team focus", desc: "Staff spend their time on complex issues and VIP customers." },
    ],
    learnings: [
      "Live data integrations turn a chatbot into a real support agent.",
      "Clear hand-off rules protect customer trust.",
      "Top-question reports reveal fixes for the website and product pages too.",
    ],
    stack: ["OpenAI", "Shopify", "WhatsApp Cloud API", "Intercom", "n8n"],
    relatedService: { label: "AI Chatbots", href: "/ai-chatbots" },
    colors: ["#00F5FF", "#00FF9D"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
