export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  href: string;
  category: "ai" | "automation" | "web" | "marketing" | "brand";
};

export const serviceCategories = [
  { id: "ai", label: "AI Agents" },
  { id: "automation", label: "Automation" },
  { id: "web", label: "Web & Funnels" },
  { id: "marketing", label: "Marketing" },
  { id: "brand", label: "Brand & Growth" },
] as const;

/** Every service D Expert offers. Each one routes to the pillar page that sells it. */
export const allServices: ServiceItem[] = [
  { slug: "ai-automation", title: "AI Automation", short: "Connect your tools and let AI handle the repetitive work between them.", icon: "BrainCircuit", href: "/automation-solutions", category: "automation" },
  { slug: "ai-voice-agents", title: "AI Voice Agents", short: "Natural-sounding agents that answer, qualify and route calls around the clock.", icon: "AudioLines", href: "/ai-voice-agents", category: "ai" },
  { slug: "ai-receptionists", title: "AI Receptionists", short: "Never miss a call again. Bookings, FAQs and messages handled 24/7.", icon: "PhoneIncoming", href: "/ai-voice-agents#receptionist", category: "ai" },
  { slug: "ai-customer-support-agents", title: "AI Customer Support Agents", short: "Instant, accurate answers from your own knowledge base, with human hand-off.", icon: "Headphones", href: "/ai-chatbots#support", category: "ai" },
  { slug: "ai-lead-qualification-agents", title: "AI Lead Qualification Agents", short: "Ask the right questions, score every lead and send hot ones straight to sales.", icon: "UserCheck", href: "/ai-voice-agents#qualification", category: "ai" },
  { slug: "ai-sales-agents", title: "AI Sales Agents", short: "Follow up in seconds, handle objections and book meetings while you sleep.", icon: "Target", href: "/ai-chatbots#sales", category: "ai" },
  { slug: "ai-personal-assistants", title: "AI Personal Assistants", short: "Inbox triage, scheduling, reminders and research for busy founders.", icon: "Sparkles", href: "/ai-chatbots#assistant", category: "ai" },
  { slug: "ai-chatbots", title: "AI Chatbots", short: "Website and WhatsApp chatbots trained on your business that convert visitors.", icon: "MessagesSquare", href: "/ai-chatbots", category: "ai" },
  { slug: "crm-automation", title: "CRM Automation", short: "Pipelines that update themselves, with tasks, tags and follow-ups on autopilot.", icon: "Database", href: "/automation-solutions#crm", category: "automation" },
  { slug: "whatsapp-automation", title: "WhatsApp Automation", short: "Official WhatsApp API flows for leads, reminders, catalogues and support.", icon: "MessageCircle", href: "/automation-solutions#whatsapp", category: "automation" },
  { slug: "email-automation", title: "Email Automation", short: "Nurture sequences, win-backs and onboarding emails that send themselves.", icon: "Mail", href: "/automation-solutions#email", category: "automation" },
  { slug: "appointment-booking-automation", title: "Appointment Booking Automation", short: "Calendar sync, confirmations, reminders and no-show recovery.", icon: "CalendarCheck", href: "/automation-solutions#booking", category: "automation" },
  { slug: "business-process-automation", title: "Business Process Automation", short: "Invoices, reports, onboarding and approvals without the spreadsheets.", icon: "Workflow", href: "/automation-solutions#process", category: "automation" },
  { slug: "website-design", title: "Website Design", short: "Premium, conversion-focused design that builds trust in seconds.", icon: "Palette", href: "/website-design", category: "web" },
  { slug: "website-development", title: "Website Development", short: "Lightning-fast Next.js sites with SEO, analytics and CRM built in.", icon: "Code2", href: "/website-design#development", category: "web" },
  { slug: "landing-pages", title: "Landing Pages", short: "Single-goal pages engineered for paid traffic and high conversion rates.", icon: "LayoutTemplate", href: "/website-design#landing-pages", category: "web" },
  { slug: "sales-funnels", title: "Sales Funnels", short: "Lead magnet to booked call, with every step tracked and automated.", icon: "Filter", href: "/website-design#funnels", category: "web" },
  { slug: "brand-building", title: "Brand Building", short: "Positioning, identity and messaging that make you the obvious choice.", icon: "Gem", href: "/branding", category: "brand" },
  { slug: "google-business-profile", title: "Google Business Profile Setup", short: "Optimised profiles, review systems and local posts to win the map pack.", icon: "MapPin", href: "/branding#gbp", category: "brand" },
  { slug: "google-ads", title: "Google Ads", short: "High-intent search and Performance Max campaigns built around profit.", icon: "Search", href: "/digital-marketing#google-ads", category: "marketing" },
  { slug: "meta-ads", title: "Meta Ads", short: "Scroll-stopping Facebook and Instagram campaigns with full-funnel tracking.", icon: "Megaphone", href: "/digital-marketing#meta-ads", category: "marketing" },
  { slug: "lead-generation", title: "Lead Generation", short: "Predictable pipelines of qualified leads, followed up automatically.", icon: "Users", href: "/digital-marketing#lead-generation", category: "marketing" },
  { slug: "digital-marketing", title: "Digital Marketing", short: "SEO, content, ads and analytics working as one growth engine.", icon: "TrendingUp", href: "/digital-marketing", category: "marketing" },
  { slug: "startup-growth-systems", title: "Startup Growth Systems", short: "Launch-ready brand, site, funnel and automation stack for new ventures.", icon: "Rocket", href: "/branding#startups", category: "brand" },
  { slug: "local-business-growth", title: "Local Business Growth", short: "Website, Google profile, reviews and follow-up that fill your calendar.", icon: "Store", href: "/digital-marketing#local", category: "marketing" },
];

/** The 11 services featured on the home page. */
export const homeServices = [
  { title: "AI Voice Agents", desc: "Answer every call, qualify callers and book appointments 24/7, so your team can focus on the people in front of them.", icon: "AudioLines", href: "/ai-voice-agents", tag: "Most requested", span: "lg" },
  { title: "AI Chatbots", desc: "Website and WhatsApp assistants trained on your business that answer instantly and capture leads.", icon: "MessagesSquare", href: "/ai-chatbots", span: "md" },
  { title: "AI Automation", desc: "Connect your apps and let AI handle data entry, follow-ups and reporting.", icon: "BrainCircuit", href: "/automation-solutions", span: "md" },
  { title: "CRM Automation", desc: "Self-updating pipelines with automatic tasks, reminders and lead routing.", icon: "Database", href: "/automation-solutions#crm", span: "sm" },
  { title: "Website Development", desc: "Fast, SEO-ready Next.js websites that load in under a second.", icon: "Code2", href: "/website-design#development", span: "sm" },
  { title: "Web Design", desc: "Premium, high-trust design that turns visitors into enquiries.", icon: "Palette", href: "/website-design", span: "sm" },
  { title: "Brand Building", desc: "Positioning, identity and messaging that make you the obvious choice.", icon: "Gem", href: "/branding", span: "sm" },
  { title: "Google Ads", desc: "Capture buyers at the exact moment they search for what you sell.", icon: "Search", href: "/digital-marketing#google-ads", span: "sm" },
  { title: "Meta Ads", desc: "Facebook and Instagram campaigns that create demand and retarget it.", icon: "Megaphone", href: "/digital-marketing#meta-ads", span: "sm" },
  { title: "Lead Generation", desc: "Predictable flows of qualified leads with automatic follow-up.", icon: "Users", href: "/digital-marketing#lead-generation", span: "sm" },
  { title: "Digital Marketing", desc: "SEO, content, ads and analytics working as one growth engine.", icon: "TrendingUp", href: "/digital-marketing", span: "sm" },
] as const;

export const industries = [
  { name: "Dental Clinics", icon: "Smile", pain: "Missed calls during procedures cost new patients." },
  { name: "Medical Clinics", icon: "Stethoscope", pain: "Front desks overwhelmed by routine scheduling calls." },
  { name: "Restaurants", icon: "UtensilsCrossed", pain: "Reservation calls during the dinner rush go unanswered." },
  { name: "Roofing Companies", icon: "Home", pain: "Storm-season leads go to whoever answers first." },
  { name: "Contractors", icon: "HardHat", pain: "Quote requests slip through while crews are on site." },
  { name: "Real Estate Agencies", icon: "Building2", pain: "Portal leads go cold within minutes without follow-up." },
  { name: "Law Firms", icon: "Scale", pain: "Intake calls after hours walk to the next firm." },
  { name: "Gyms", icon: "Dumbbell", pain: "Trial sign-ups never convert without nurture." },
  { name: "Consultants", icon: "Briefcase", pain: "Hours lost to scheduling and admin instead of billing." },
  { name: "Coaches", icon: "GraduationCap", pain: "Discovery calls booked with unqualified prospects." },
  { name: "Local Businesses", icon: "Store", pain: "Invisible on Google Maps and slow to reply." },
  { name: "Ecommerce", icon: "ShoppingBag", pain: "Support tickets and abandoned carts pile up." },
  { name: "Service Businesses", icon: "Wrench", pain: "Manual quoting, invoicing and reminders." },
  { name: "Startups", icon: "Rocket", pain: "Need enterprise-grade systems on a lean budget." },
  { name: "SMBs", icon: "Users", pain: "Growing faster than the team can keep up." },
];

export const processSteps = [
  { step: "01", title: "Discover", desc: "A free strategy call and audit of your calls, website, funnel and workflows to find the biggest leaks.", icon: "Compass" },
  { step: "02", title: "Design", desc: "A clear blueprint: which AI agents, automations and campaigns to build, with expected impact and timeline.", icon: "PenTool" },
  { step: "03", title: "Build", desc: "We build, integrate with your CRM, calendar and phone system, and test against real scenarios.", icon: "Cog" },
  { step: "04", title: "Launch", desc: "Go live with monitoring, staff training and a hand-off playbook so your team stays in control.", icon: "Rocket" },
  { step: "05", title: "Optimise", desc: "Monthly reviews of transcripts, conversions and campaign data to keep improving results.", icon: "TrendingUp" },
];
