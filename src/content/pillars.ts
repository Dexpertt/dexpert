export type PillarScene = "voice" | "workflow" | "chat" | "web" | "rocket" | "brand";

export type Pillar = {
  slug: string;
  path: string;
  eyebrow: string;
  title: string;
  highlight: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  scene: PillarScene;
  heroStats: { value: string; label: string }[];
  problems: { title: string; desc: string }[];
  offerings: { id: string; title: string; desc: string; icon: string; features: string[] }[];
  benefits: { title: string; desc: string; icon: string }[];
  process: { title: string; desc: string }[];
  deliverables: string[];
  industries: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  cta: { title: string; desc: string; primary: string; booking: "consultation" | "aiDemo" | "automation" | "marketing" };
  note?: string;
};

export const pillars: Pillar[] = [
  {
    slug: "ai-voice-agents",
    path: "/ai-voice-agents",
    eyebrow: "AI Voice Agents & Receptionists",
    title: "Answer Every Call.",
    highlight: "Even at 2 AM.",
    metaTitle: "AI Voice Agents & AI Receptionist Services | D Expert",
    metaDescription:
      "AI voice agents and AI receptionists that answer missed calls 24/7, book appointments, qualify leads and support your front desk. Built for clinics, restaurants, real estate and local businesses.",
    keywords: ["AI Voice Agent", "AI Receptionist", "AI phone answering", "missed call automation", "AI call assistant"],
    intro:
      "Your phone is your highest-intent lead source, and every unanswered call is a customer calling your competitor next. D Expert builds natural-sounding AI voice agents that pick up instantly, answer questions, book appointments and pass the right calls to your team, so your staff can give full attention to the customers in front of them.",
    scene: "voice",
    heroStats: [
      { value: "24/7", label: "Call coverage, including holidays" },
      { value: "< 1s", label: "Pick-up time on every call" },
      { value: "30+", label: "Languages and accents supported" },
    ],
    problems: [
      { title: "Calls ring out during busy hours", desc: "Your team is with a patient, a diner or a client, and the phone keeps ringing. Most callers will not leave a voicemail." },
      { title: "After-hours enquiries disappear", desc: "Evenings and weekends are when many people finally have time to call. If nobody answers, they book elsewhere." },
      { title: "Staff stuck on repetitive questions", desc: "Opening hours, pricing, directions and rescheduling eat hours that could go to higher-value work." },
    ],
    offerings: [
      { id: "receptionist", title: "AI Receptionist", icon: "PhoneIncoming", desc: "A friendly, on-brand voice that answers your main line, handles FAQs and books directly into your calendar.", features: ["24/7 call answering", "Appointment booking & rescheduling", "Calendar sync (Google, Outlook, Calendly)", "SMS & WhatsApp confirmations", "Warm transfer to staff"] },
      { id: "missed-call", title: "Missed-Call Recovery Agent", icon: "PhoneMissed", desc: "Steps in only when your team can't pick up, so no caller is ever left with a ringing phone.", features: ["Overflow & after-hours routing", "Instant call-back on missed calls", "Text-back with booking link", "Voicemail transcription", "Daily summary to owners"] },
      { id: "qualification", title: "Lead Qualification Agent", icon: "UserCheck", desc: "Asks your qualifying questions, scores the lead and routes hot prospects to the right salesperson.", features: ["Custom qualification scripts", "Lead scoring", "CRM record creation", "Instant hand-off to sales", "Outbound speed-to-lead calls"] },
      { id: "support", title: "Customer Support Voice Agent", icon: "Headphones", desc: "Resolves common support calls such as order status, policies and troubleshooting from your knowledge base.", features: ["Knowledge-base answers", "Order & booking lookups", "Ticket creation", "Escalation rules", "Multilingual support"] },
    ],
    benefits: [
      { title: "Capture more opportunities", desc: "Every caller gets answered, so high-intent enquiries don't leak to competitors.", icon: "Target" },
      { title: "Support your team", desc: "Staff stop juggling the phone and focus on in-person customers and complex cases.", icon: "Users" },
      { title: "Consistent experience", desc: "Same warm, accurate answer on the first call of the day and the hundredth.", icon: "BadgeCheck" },
      { title: "Full visibility", desc: "Recordings, transcripts and summaries for every call, synced to your CRM.", icon: "Eye" },
    ],
    process: [
      { title: "Call audit", desc: "We review your call volume, missed-call rate and the questions callers ask most." },
      { title: "Script & voice design", desc: "We write the conversation flows and choose a voice that matches your brand." },
      { title: "Integrations", desc: "Connect to your phone number, calendar, CRM and messaging channels." },
      { title: "Test & train", desc: "Hundreds of test calls across edge cases before any customer hears it." },
      { title: "Go live & improve", desc: "Launch with monitoring and weekly transcript reviews in the first month." },
    ],
    deliverables: ["Custom voice agent with branded greeting", "Conversation scripts & escalation rules", "Phone number setup or call forwarding", "Calendar & CRM integration", "SMS/WhatsApp follow-ups", "Call analytics dashboard", "Staff hand-off playbook", "30 days of optimisation"],
    industries: ["Dental Clinics", "Medical Clinics", "Restaurants", "Real Estate Agencies", "Law Firms", "Roofing Companies", "Contractors", "Gyms"],
    stack: ["Vapi", "Retell AI", "ElevenLabs", "Twilio", "OpenAI", "Claude", "GoHighLevel", "HubSpot", "Google Calendar", "Calendly"],
    faqs: [
      { q: "Will the AI voice agent replace my receptionist?", a: "No. Our voice agents are designed to support your team, not replace it. They handle overflow, after-hours and repetitive calls so your staff can focus on in-person customers and complex conversations. Any call can be transferred to a human instantly." },
      { q: "How natural does the AI sound?", a: "We use the latest neural voices with natural pauses, interruptions and a consistent tone. Most callers simply experience a helpful, professional receptionist. We always recommend being transparent that callers are speaking with an AI assistant." },
      { q: "Can it book appointments directly into my calendar?", a: "Yes. The agent checks real-time availability in Google Calendar, Outlook, Calendly, or your practice software where an integration exists, books the slot and sends a confirmation by SMS or WhatsApp." },
      { q: "Do I need a new phone number?", a: "No. You can forward your existing number when lines are busy, after hours, or for all calls. We can also provision a new local number if you prefer." },
      { q: "What happens when the AI doesn't know an answer?", a: "It follows your escalation rules: transfer to a staff member, take a detailed message, or schedule a call-back. Nothing is made up; answers come from the knowledge you approve." },
      { q: "How long does setup take?", a: "A focused receptionist agent typically goes live in 7–14 days, including scripting, integrations and testing. More complex multi-location or outbound setups take 3–4 weeks." },
    ],
    related: ["ai-receptionist-dental-clinic", "real-estate-lead-qualification-agent", "restaurant-website-ai-booking"],
    cta: { title: "Hear it handle a real call", desc: "Try our live demo agents for a dental clinic, a restaurant and a real estate agency, or book a demo configured for your business.", primary: "Book AI Demo", booking: "aiDemo" },
    note: "AI voice agents are built to support your staff and handle missed calls, not to replace your team.",
  },
  {
    slug: "ai-chatbots",
    path: "/ai-chatbots",
    eyebrow: "AI Chatbots & Assistants",
    title: "AI Chatbots That Actually",
    highlight: "Help and Sell.",
    metaTitle: "AI Chatbot Development Company | Website & WhatsApp Chatbots | D Expert",
    metaDescription:
      "Custom AI chatbots for websites and WhatsApp, trained on your business. Instant support, lead capture, sales assistance and appointment booking, with human hand-off.",
    keywords: ["AI Chatbot Development", "WhatsApp chatbot", "customer support chatbot", "AI sales agent", "AI assistant for business"],
    intro:
      "Modern customers expect answers in seconds, not tomorrow morning. Our AI chatbots are trained on your services, pricing, policies and FAQs, so they give accurate answers, capture contact details and book appointments on your website, WhatsApp and Instagram, then hand complex conversations to your team with full context.",
    scene: "chat",
    heroStats: [
      { value: "24/7", label: "Instant responses across channels" },
      { value: "4", label: "Channels: web, WhatsApp, Instagram, Messenger" },
      { value: "100%", label: "Conversations logged to your CRM" },
    ],
    problems: [
      { title: "Visitors leave with unanswered questions", desc: "A contact form that replies in 24 hours loses to a competitor that replies in 24 seconds." },
      { title: "Support inbox overload", desc: "The same 20 questions arrive every day and bury the conversations that need a human." },
      { title: "Leads that never get followed up", desc: "Chats start, details are shared, and then nobody follows up because nothing reached the CRM." },
    ],
    offerings: [
      { id: "support", title: "AI Customer Support Agent", icon: "Headphones", desc: "Answers product, policy and order questions from your own documents with sources you control.", features: ["Trained on your knowledge base", "Order & booking lookups", "Ticket creation", "Human hand-off with context", "Multilingual"] },
      { id: "sales", title: "AI Sales Agent", icon: "Target", desc: "Engages visitors, recommends the right service or product and books a call or checkout.", features: ["Product recommendations", "Objection handling", "Meeting booking", "Cart recovery", "Lead scoring"] },
      { id: "whatsapp", title: "WhatsApp AI Assistant", icon: "MessageCircle", desc: "Official WhatsApp Business API bot for enquiries, catalogues, reminders and payments.", features: ["Green-tick ready setup", "Catalogue & quick replies", "Broadcasts & reminders", "Payment links", "Shared team inbox"] },
      { id: "assistant", title: "AI Personal Assistant", icon: "Sparkles", desc: "An internal assistant for founders and teams: inbox triage, scheduling, research and summaries.", features: ["Email triage & drafts", "Meeting scheduling", "Daily briefings", "Document Q&A", "Task capture"] },
    ],
    benefits: [
      { title: "Instant responses", desc: "Every visitor gets an answer in seconds, day or night.", icon: "Zap" },
      { title: "More qualified leads", desc: "Chatbots ask the right questions and capture details before visitors bounce.", icon: "UserCheck" },
      { title: "Lighter support load", desc: "Routine questions are handled automatically so your team focuses on complex cases.", icon: "Inbox" },
      { title: "Insight from every chat", desc: "See what customers ask, where they hesitate and what they want next.", icon: "BarChart3" },
    ],
    process: [
      { title: "Knowledge gathering", desc: "We collect your FAQs, policies, service details and past conversations." },
      { title: "Conversation design", desc: "Define goals, tone, qualification questions and hand-off rules." },
      { title: "Build & train", desc: "Train the assistant, connect channels and integrate your CRM and calendar." },
      { title: "Quality testing", desc: "Stress-test with real questions and tricky edge cases before launch." },
      { title: "Launch & refine", desc: "Monitor conversations and keep improving answers every week." },
    ],
    deliverables: ["Custom-trained AI assistant", "Website widget in your brand style", "WhatsApp / Instagram integration", "CRM & calendar integration", "Human hand-off workflow", "Analytics dashboard", "Knowledge-base update process", "30 days of optimisation"],
    industries: ["Ecommerce", "Medical Clinics", "Real Estate Agencies", "Coaches", "Consultants", "Startups", "Restaurants", "Service Businesses"],
    stack: ["OpenAI", "Claude", "Voiceflow", "Botpress", "WhatsApp Cloud API", "ManyChat", "Intercom", "HubSpot", "Zapier", "Make"],
    faqs: [
      { q: "How is this different from a normal chatbot?", a: "Traditional chatbots follow rigid button menus. Our AI chatbots understand natural language, answer from your own content, remember context within a conversation and take actions such as booking or creating a CRM record." },
      { q: "Will the chatbot make things up?", a: "We restrict answers to your approved knowledge base, add guardrails and test extensively. When the bot isn't sure, it says so and offers a human hand-off." },
      { q: "Can it work on WhatsApp?", a: "Yes. We set up the official WhatsApp Business API so your assistant can handle enquiries, send reminders and share catalogues, with a shared inbox for your team." },
      { q: "Which languages are supported?", a: "English, Hindi, Hinglish and 30+ other languages. The assistant can reply in the language the customer writes in." },
      { q: "Do I own the data?", a: "Yes. Conversation data lives in your accounts and CRM. We set everything up under your ownership." },
    ],
    related: ["ai-company-knowledge-search", "ecommerce-automation-system", "restaurant-website-ai-booking"],
    cta: { title: "See a chatbot trained on your business", desc: "Book a demo and we'll show you an assistant built around your services and FAQs.", primary: "Book AI Demo", booking: "aiDemo" },
  },
  {
    slug: "automation-solutions",
    path: "/automation-solutions",
    eyebrow: "Automation Solutions",
    title: "Automate the Busywork.",
    highlight: "Scale the Business.",
    metaTitle: "Business Automation & CRM Automation Services | D Expert",
    metaDescription:
      "AI-powered business process automation: CRM automation, WhatsApp automation, email automation and appointment booking workflows that remove manual work and speed up follow-up.",
    keywords: ["Business Automation", "CRM Automation", "WhatsApp Automation", "workflow automation", "AI Automation Services"],
    intro:
      "Most growing businesses run on copy-paste: leads moved between apps by hand, follow-ups that depend on memory, reports rebuilt every Monday. We map your workflows and connect your tools with AI-powered automations, so data flows, follow-ups fire and your team gets hours back every week.",
    scene: "workflow",
    heroStats: [
      { value: "100+", label: "Automations built" },
      { value: "5,000+", label: "Apps we can connect" },
      { value: "Minutes", label: "Speed-to-lead, not days" },
    ],
    problems: [
      { title: "Leads go cold in the gaps", desc: "A form fills, an email sits unread, and by the time someone calls back the prospect has moved on." },
      { title: "Manual data entry everywhere", desc: "The same information typed into the CRM, the spreadsheet, the invoice and the WhatsApp message." },
      { title: "No single source of truth", desc: "Nobody knows which leads were contacted, which deals are stuck, or what the numbers really are." },
    ],
    offerings: [
      { id: "crm", title: "CRM Automation", icon: "Database", desc: "Pipelines that move themselves: auto-assignment, tasks, tags, reminders and deal updates.", features: ["CRM setup & migration", "Lead routing & assignment", "Pipeline stage automation", "Task & reminder rules", "Dashboards & reports"] },
      { id: "whatsapp", title: "WhatsApp Automation", icon: "MessageCircle", desc: "Official API flows for instant lead replies, reminders, confirmations and re-engagement.", features: ["Instant lead auto-reply", "Appointment reminders", "Payment & order updates", "Broadcast campaigns", "Chatbot + team inbox"] },
      { id: "email", title: "Email Automation", icon: "Mail", desc: "Nurture sequences, onboarding, win-back and review requests, personalised and on time.", features: ["Welcome & nurture sequences", "Behaviour-triggered emails", "Review requests", "Re-engagement campaigns", "Deliverability setup"] },
      { id: "booking", title: "Appointment Booking Automation", icon: "CalendarCheck", desc: "Self-serve booking with confirmations, reminders and no-show recovery across channels.", features: ["Online booking pages", "Calendar sync", "SMS/WhatsApp reminders", "No-show follow-up", "Rescheduling links"] },
      { id: "process", title: "Business Process Automation", icon: "Workflow", desc: "Quotes, invoices, onboarding, approvals and reporting, automated end to end.", features: ["Quote & invoice generation", "Client onboarding flows", "Document processing with AI", "Approval workflows", "Automated reporting"] },
      { id: "ai-ops", title: "AI Operations Agents", icon: "BrainCircuit", desc: "AI that reads, classifies and acts: emails sorted, documents summarised, data extracted.", features: ["Email classification", "Document data extraction", "Meeting notes to CRM", "AI summaries", "Smart alerts"] },
    ],
    benefits: [
      { title: "Hours saved weekly", desc: "Remove repetitive admin so your team spends time on customers and growth.", icon: "Clock" },
      { title: "Faster follow-up", desc: "Leads get a reply in seconds, which dramatically improves contact rates.", icon: "Zap" },
      { title: "Fewer errors", desc: "Data moves automatically, without typos, missed steps or forgotten tasks.", icon: "ShieldCheck" },
      { title: "Scale without chaos", desc: "Handle more customers without adding headcount at the same rate.", icon: "TrendingUp" },
    ],
    process: [
      { title: "Workflow mapping", desc: "We document how leads, customers and data move through your business today." },
      { title: "Opportunity scoring", desc: "Rank automations by time saved, revenue impact and ease of build." },
      { title: "Build & integrate", desc: "Implement in n8n, Make, Zapier or your CRM's native automation with error handling." },
      { title: "Test & document", desc: "Test every path and hand over clear documentation and training." },
      { title: "Monitor & expand", desc: "Monitor runs, fix edge cases and roll out the next set of automations." },
    ],
    deliverables: ["Workflow audit & automation roadmap", "CRM configuration", "Automation builds with error alerts", "WhatsApp & email sequences", "Booking & reminder flows", "Team training & SOPs", "Automation monitoring", "Monthly optimisation report"],
    industries: ["Service Businesses", "Real Estate Agencies", "Ecommerce", "Medical Clinics", "Consultants", "Coaches", "Startups", "SMBs"],
    stack: ["n8n", "Make", "Zapier", "GoHighLevel", "HubSpot", "Zoho CRM", "Pipedrive", "WhatsApp Cloud API", "Google Workspace", "OpenAI"],
    faqs: [
      { q: "Which tools can you automate?", a: "Almost anything with an API: CRMs (HubSpot, Zoho, GoHighLevel, Pipedrive, Salesforce), Google Workspace, Microsoft 365, WhatsApp, Shopify, WooCommerce, Stripe, Razorpay, Calendly, Slack and thousands more via n8n, Make or Zapier." },
      { q: "Do I need to change my current software?", a: "Usually not. We start with the tools you already use and only recommend changes when they unlock a clear benefit." },
      { q: "What if an automation breaks?", a: "Every workflow includes error handling and alerts. On a care plan, we monitor runs and fix issues proactively." },
      { q: "How quickly will I see results?", a: "Quick wins such as instant lead replies and appointment reminders typically go live within the first 1–2 weeks." },
      { q: "Is my data secure?", a: "We follow least-privilege access, use your own accounts wherever possible and never store customer data longer than necessary." },
    ],
    related: ["ecommerce-automation-system", "real-estate-lead-qualification-agent", "ai-company-knowledge-search"],
    cta: { title: "Find your top automation wins", desc: "Take the free automation audit, or book a call and we'll map your workflows together.", primary: "Book Automation Call", booking: "automation" },
  },
  {
    slug: "website-design",
    path: "/website-design",
    eyebrow: "Website Design & Development",
    title: "Websites Engineered",
    highlight: "to Convert.",
    metaTitle: "Website Design Company | High-Converting Websites & Landing Pages | D Expert",
    metaDescription:
      "Premium website design and development: fast Next.js websites, landing pages and sales funnels built for SEO, trust and conversions, with CRM and automation built in.",
    keywords: ["Website Design Company", "website development", "landing page design", "sales funnel", "Next.js agency"],
    intro:
      "Your website is your hardest-working salesperson, or your most expensive brochure. We design and build premium, lightning-fast websites that earn trust in the first five seconds, make the next step obvious and plug straight into your CRM, chatbot and booking system.",
    scene: "web",
    heroStats: [
      { value: "30+", label: "Websites launched" },
      { value: "95+", label: "PageSpeed target on every build" },
      { value: "< 1s", label: "Target load time on modern devices" },
    ],
    problems: [
      { title: "Beautiful but not converting", desc: "Traffic arrives, looks around and leaves, because the page never makes a clear offer." },
      { title: "Slow and hard to find", desc: "Heavy themes and plugins hurt Core Web Vitals, rankings and ad costs." },
      { title: "Disconnected from sales", desc: "Form submissions land in an inbox and wait, instead of triggering instant follow-up." },
    ],
    offerings: [
      { id: "design", title: "Website Design", icon: "Palette", desc: "Premium UI/UX built around your customer's journey and your brand.", features: ["Conversion-focused UX", "Custom visual design", "Mobile-first layouts", "Copywriting", "Accessibility (WCAG 2.1 AA)"] },
      { id: "development", title: "Website Development", icon: "Code2", desc: "Next.js and headless builds that are fast, secure and easy to edit.", features: ["Next.js / React", "Headless CMS", "Technical SEO", "Analytics & tracking", "Hosting & security"] },
      { id: "landing-pages", title: "Landing Pages", icon: "LayoutTemplate", desc: "Single-goal pages for ads and launches, built to test and iterate quickly.", features: ["Offer & copy strategy", "A/B testing", "Fast load for ad quality", "Form & call tracking", "Thank-you page automation"] },
      { id: "funnels", title: "Sales Funnels", icon: "Filter", desc: "From lead magnet to booked call or purchase, every step designed and automated.", features: ["Lead magnets", "Multi-step funnels", "Upsells & order bumps", "Email & WhatsApp follow-up", "Funnel analytics"] },
    ],
    benefits: [
      { title: "More enquiries", desc: "Clear offers, trust signals and frictionless forms turn visitors into leads.", icon: "MousePointerClick" },
      { title: "Higher rankings", desc: "Clean code, Core Web Vitals and structured data give SEO a head start.", icon: "Search" },
      { title: "Lower ad costs", desc: "Fast, relevant landing pages improve Quality Score and conversion rates.", icon: "Wallet" },
      { title: "Easy to manage", desc: "Edit content yourself without breaking the design.", icon: "Settings2" },
    ],
    process: [
      { title: "Strategy", desc: "Goals, audience, competitors, sitemap and conversion plan." },
      { title: "Wireframes & copy", desc: "Structure and messaging before pixels." },
      { title: "Visual design", desc: "High-fidelity designs for desktop and mobile." },
      { title: "Development", desc: "Build, integrate CRM, chat and booking, and optimise performance." },
      { title: "Launch & grow", desc: "QA, SEO launch checklist, analytics and ongoing CRO." },
    ],
    deliverables: ["Sitemap & conversion strategy", "Custom design (desktop + mobile)", "SEO-ready copywriting", "Next.js development", "CMS & training", "On-page & technical SEO", "Analytics, pixels & call tracking", "CRM, chatbot & booking integration"],
    industries: ["Dental Clinics", "Roofing Companies", "Contractors", "Real Estate Agencies", "Law Firms", "Restaurants", "Startups", "Ecommerce"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Sanity", "WordPress", "Webflow", "Vercel"],
    faqs: [
      { q: "How long does a website take?", a: "Landing pages take 1–2 weeks. Business websites of 5–15 pages typically take 3–6 weeks depending on content and integrations." },
      { q: "Will I be able to edit the website myself?", a: "Yes. We set up an easy CMS and train your team, so you can update text, images, blog posts and offers without a developer." },
      { q: "Do you write the content?", a: "Yes. Conversion copywriting is included in every website project, with SEO keywords researched for your market." },
      { q: "Is SEO included?", a: "Technical and on-page SEO are included: metadata, schema, sitemaps, speed optimisation and Google Search Console setup." },
      { q: "Can you redesign my existing site?", a: "Absolutely. We audit what's working, keep your rankings safe with proper redirects, and rebuild for speed and conversions." },
    ],
    related: ["roofing-company-website", "dental-clinic-website", "luxury-real-estate-website", "contractor-website"],
    cta: { title: "Get a free website audit first", desc: "See your SEO, speed, trust and conversion scores in under a minute, then talk to us about the fix.", primary: "Book Free Strategy Call", booking: "consultation" },
  },
  {
    slug: "digital-marketing",
    path: "/digital-marketing",
    eyebrow: "Digital Marketing & Lead Generation",
    title: "Predictable Leads.",
    highlight: "Measurable Growth.",
    metaTitle: "Digital Marketing Agency | Google Ads, Meta Ads & Lead Generation | D Expert",
    metaDescription:
      "Performance-driven digital marketing: Google Ads, Meta Ads, local SEO and lead generation systems with automated follow-up and transparent reporting.",
    keywords: ["Digital Marketing Agency", "Google Ads Services", "Meta Ads Services", "Lead Generation Agency", "local SEO services"],
    intro:
      "Ads are easy to run and hard to make profitable. We build full-funnel acquisition systems: the right campaigns, landing pages that convert, tracking you can trust and automated follow-up, so every rupee or dollar of ad spend has the best possible chance to become revenue.",
    scene: "rocket",
    heroStats: [
      { value: "Full-funnel", label: "Ads, pages, tracking and follow-up" },
      { value: "Weekly", label: "Optimisation on every account" },
      { value: "100%", label: "Transparent reporting in your accounts" },
    ],
    problems: [
      { title: "Spending without knowing what works", desc: "Without proper conversion tracking, budgets are optimised on guesses." },
      { title: "Cheap leads that never buy", desc: "Low-quality leads waste sales time because campaigns target clicks, not customers." },
      { title: "Leads that aren't followed up", desc: "The fastest responder usually wins, and most businesses reply hours too late." },
    ],
    offerings: [
      { id: "google-ads", title: "Google Ads", icon: "Search", desc: "Search, Performance Max, local and YouTube campaigns built around high-intent keywords.", features: ["Keyword & competitor research", "Search & PMax campaigns", "Local service campaigns", "Negative keyword management", "Offline conversion tracking"] },
      { id: "meta-ads", title: "Meta Ads", icon: "Megaphone", desc: "Facebook and Instagram campaigns that create demand, generate leads and retarget.", features: ["Creative strategy & ad design", "Lead forms & WhatsApp ads", "Lookalike audiences", "Retargeting funnels", "Conversions API setup"] },
      { id: "lead-generation", title: "Lead Generation Systems", icon: "Users", desc: "Ads, landing pages, lead magnets and automated follow-up working as one system.", features: ["Offer & funnel strategy", "Landing pages", "Instant WhatsApp/SMS reply", "Lead scoring & routing", "Pipeline reporting"] },
      { id: "local", title: "Local SEO & Local Growth", icon: "MapPin", desc: "Rank in the Google map pack and turn local searches into calls and visits.", features: ["Google Business Profile optimisation", "Review generation system", "Local citations", "Location pages", "Local rank tracking"] },
      { id: "seo", title: "SEO & Content", icon: "FileText", desc: "Technical SEO and expert content that compounds into free traffic.", features: ["Technical SEO audits", "Keyword strategy", "Content production", "Link building", "Monthly reporting"] },
      { id: "analytics", title: "Tracking & Analytics", icon: "ChartLine", desc: "GA4, Tag Manager, pixels and call tracking set up properly from day one.", features: ["GA4 & GTM setup", "Meta Pixel & CAPI", "Call tracking", "CRM attribution", "Looker Studio dashboards"] },
    ],
    benefits: [
      { title: "Lower cost per lead", desc: "Better targeting, landing pages and Quality Scores reduce acquisition costs.", icon: "Wallet" },
      { title: "Higher lead quality", desc: "Campaigns optimised on real sales data, not just form fills.", icon: "Trophy" },
      { title: "Faster follow-up", desc: "Automated replies reach leads within seconds of enquiring.", icon: "Zap" },
      { title: "Clear reporting", desc: "Know exactly what you spent, what you got and what's next.", icon: "BarChart3" },
    ],
    process: [
      { title: "Audit", desc: "Review accounts, tracking, landing pages and competitors." },
      { title: "Strategy", desc: "Offers, channels, budgets, targets and creative direction." },
      { title: "Launch", desc: "Build campaigns, pages and tracking, and connect follow-up automation." },
      { title: "Optimise", desc: "Weekly bid, audience, creative and landing page improvements." },
      { title: "Scale", desc: "Increase budgets on what's proven and expand to new channels." },
    ],
    deliverables: ["Marketing & tracking audit", "Campaign strategy & media plan", "Ad creatives & copy", "Landing pages", "Conversion tracking setup", "Automated lead follow-up", "Weekly optimisation", "Monthly performance report & call"],
    industries: ["Dental Clinics", "Roofing Companies", "Contractors", "Real Estate Agencies", "Law Firms", "Gyms", "Ecommerce", "Local Businesses"],
    stack: ["Google Ads", "Meta Ads Manager", "GA4", "Google Tag Manager", "Looker Studio", "SEMrush", "Ahrefs", "CallRail", "HubSpot", "GoHighLevel"],
    faqs: [
      { q: "What ad budget do I need?", a: "It depends on your market and goals. Many local businesses start with ₹30,000–₹1,00,000 per month (or $500–$2,000) in ad spend. We'll recommend a budget during your strategy call." },
      { q: "Google Ads or Meta Ads: which is better?", a: "Google Ads captures people already searching for your service; Meta Ads creates demand and retargets. Most businesses benefit from both, weighted by their offer and market. Read our full comparison on the blog." },
      { q: "Do you guarantee results?", a: "No honest agency can guarantee specific numbers, because results depend on your market, offer and budget. We guarantee transparent work, proper tracking and continuous optimisation." },
      { q: "Do I own my ad accounts?", a: "Always. Campaigns run in your accounts and you keep full access to all data and creatives." },
      { q: "How soon will I see leads?", a: "Search campaigns can generate enquiries within days of launch. Expect 4–8 weeks of optimisation for stable, efficient performance." },
    ],
    related: ["roofing-company-website", "contractor-website", "luxury-real-estate-website"],
    cta: { title: "Get a marketing strategy session", desc: "We'll review your ads, tracking and funnel, and show you the three biggest opportunities.", primary: "Book Marketing Session", booking: "marketing" },
  },
  {
    slug: "branding",
    path: "/branding",
    eyebrow: "Brand Building & Growth Systems",
    title: "Build a Brand People",
    highlight: "Trust Instantly.",
    metaTitle: "Brand Building, Google Business Profile & Startup Growth | D Expert",
    metaDescription:
      "Brand strategy, visual identity, Google Business Profile setup and complete growth systems for startups and local businesses. Look premium, get found and win trust.",
    keywords: ["brand building agency", "Google Business Profile setup", "startup growth systems", "local business growth", "brand identity design"],
    intro:
      "People buy from businesses they trust, and trust is built in moments: your logo, your Google profile, your reviews, your website, the way you reply. We build brands and growth systems that make you look as good as you are and turn that first impression into enquiries.",
    scene: "brand",
    heroStats: [
      { value: "360°", label: "Brand, web, local and automation" },
      { value: "5 sec", label: "To win or lose a first impression" },
      { value: "Map pack", label: "Visibility for local searches" },
    ],
    problems: [
      { title: "You look smaller than you are", desc: "An inconsistent logo, dated website and empty Google profile undersell great work." },
      { title: "Invisible on Google Maps", desc: "Customers search \"near me\" and find your competitors first." },
      { title: "No clear message", desc: "If customers can't tell why you're different in one sentence, they compare on price." },
    ],
    offerings: [
      { id: "strategy", title: "Brand Strategy", icon: "Compass", desc: "Positioning, audience, messaging and a brand story that makes choosing you easy.", features: ["Positioning workshop", "Ideal customer profiles", "Messaging framework", "Tagline & tone of voice", "Competitor analysis"] },
      { id: "identity", title: "Visual Identity", icon: "Palette", desc: "Logo, colour, type and a design system that looks premium everywhere.", features: ["Logo suite", "Colour & typography", "Brand guidelines", "Social templates", "Stationery & signage"] },
      { id: "gbp", title: "Google Business Profile Setup", icon: "MapPin", desc: "Fully optimised profiles with categories, services, photos, posts and a review engine.", features: ["Profile setup & verification", "Category & service optimisation", "Photo & post strategy", "Automated review requests", "Q&A management"] },
      { id: "startups", title: "Startup Growth Systems", icon: "Rocket", desc: "Everything a new venture needs to launch: brand, website, funnel, CRM and automation.", features: ["Brand & launch website", "Lead funnel", "CRM & automation stack", "Launch campaigns", "Investor-ready pitch visuals"] },
      { id: "local", title: "Local Business Growth", icon: "Store", desc: "A complete local system: Google profile, website, reviews, ads and follow-up.", features: ["Local SEO", "Review generation", "Local ads", "Missed-call text-back", "Monthly growth report"] },
    ],
    benefits: [
      { title: "Premium perception", desc: "Charge what you're worth with a brand that looks established.", icon: "Crown" },
      { title: "Local visibility", desc: "Show up when nearby customers search for your service.", icon: "MapPin" },
      { title: "Social proof on autopilot", desc: "Automated review requests build a steady stream of 5-star reviews.", icon: "Star" },
      { title: "Consistency everywhere", desc: "One recognisable brand across web, social, print and signage.", icon: "Layers" },
    ],
    process: [
      { title: "Discovery", desc: "Workshops on your story, customers, competitors and goals." },
      { title: "Strategy", desc: "Positioning, messaging and the brand platform." },
      { title: "Identity", desc: "Logo, visual system and guidelines." },
      { title: "Rollout", desc: "Website, Google profile, social and marketing assets." },
      { title: "Growth", desc: "Reviews, local SEO and campaigns that build momentum." },
    ],
    deliverables: ["Brand strategy document", "Logo & visual identity", "Brand guidelines", "Google Business Profile optimisation", "Review generation automation", "Social media kit", "Website integration", "Launch plan"],
    industries: ["Startups", "Local Businesses", "Restaurants", "Gyms", "Coaches", "Consultants", "Dental Clinics", "Real Estate Agencies"],
    stack: ["Figma", "Adobe Illustrator", "Google Business Profile", "BrightLocal", "Canva", "Next.js", "GoHighLevel", "Later"],
    faqs: [
      { q: "Do I need a full rebrand?", a: "Not always. Many businesses need a refresh: a cleaner logo, consistent colours and clearer messaging. We'll recommend the smallest change that makes the biggest impact." },
      { q: "How long does Google Business Profile optimisation take to work?", a: "Profile improvements apply immediately; ranking gains usually build over 4–12 weeks as reviews, posts and citations accumulate." },
      { q: "Can you help us launch a startup from scratch?", a: "Yes. Our Startup Growth System covers brand, website, funnel, CRM and launch campaigns so you start with a professional foundation." },
      { q: "Will I get the source files?", a: "Yes. You receive all final logo files, brand guidelines and design source files." },
    ],
    related: ["luxury-real-estate-website", "dental-clinic-website", "restaurant-website-ai-booking"],
    cta: { title: "Let's build a brand worth choosing", desc: "Book a free strategy call and we'll review your brand, Google profile and website together.", primary: "Book Free Strategy Call", booking: "consultation" },
  },
];

export function getPillar(slug: string) {
  const p = pillars.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown pillar ${slug}`);
  return p;
}
