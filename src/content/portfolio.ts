export const portfolioFilters = [
  "All",
  "Web Design",
  "AI Automation",
  "AI Voice Agents",
  "AI Chatbots",
  "Branding",
  "Marketing",
  "Lead Generation",
] as const;

export type PortfolioFilter = (typeof portfolioFilters)[number];

export type MockupKind = "voice" | "dashboard" | "chat" | "web" | "search" | "travel" | "commerce";

export type Project = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  categories: Exclude<PortfolioFilter, "All">[];
  summary: string;
  challenge: string;
  solution: string;
  features: { title: string; desc: string }[];
  gallery: { title: string; caption: string }[];
  stack: string[];
  results: { label: string; value: string }[];
  outcomes: string[];
  testimonial: { quote: string; name: string; role: string };
  mockup: MockupKind;
  colors: [string, string];
  /** Optional demo video: YouTube id, Vimeo id or /videos/file.mp4 */
  video?: { type: "youtube" | "vimeo" | "file"; id: string };
};

/**
 * Portfolio projects. Client names are anonymised descriptions.
 * TODO(owner): replace testimonials and results with verified client data before launch.
 */
export const projects: Project[] = [
  {
    slug: "ai-receptionist-dental-clinic",
    title: "AI Receptionist for a Dental Clinic",
    client: "Multi-chair dental practice",
    industry: "Dental Clinics",
    year: "2025",
    categories: ["AI Voice Agents", "AI Automation"],
    summary: "A 24/7 AI voice receptionist that answers every call, books appointments into the practice calendar and sends SMS reminders.",
    challenge:
      "The front desk was handling walk-ins, insurance questions and the phone at the same time. During procedures and after hours, calls rang out, and missed calls were turning into lost appointments, especially from new patients searching on Google in the evening.",
    solution:
      "We deployed an AI voice receptionist on overflow and after-hours routing. It greets callers in the clinic's tone, answers common questions about treatments, timings and location, books or reschedules appointments with live calendar sync, and sends SMS confirmations and reminders. Emergencies and complex insurance questions are transferred to staff or logged for a priority call-back.",
    features: [
      { title: "24/7 Calls", desc: "Every call answered within a second, including evenings, Sundays and holidays." },
      { title: "Appointment Booking", desc: "Books, reschedules and cancels appointments based on real-time availability." },
      { title: "Calendar Sync", desc: "Two-way sync with the clinic's calendar, so staff always see the latest schedule." },
      { title: "SMS Reminders", desc: "Automatic confirmations and reminders that reduce no-shows." },
    ],
    gallery: [
      { title: "Live call console", caption: "Real-time transcript and call summary for staff." },
      { title: "Booking flow", caption: "Caller intent to confirmed slot in under two minutes." },
      { title: "Daily summary", caption: "Morning digest of calls, bookings and call-backs." },
    ],
    stack: ["Vapi", "ElevenLabs", "Twilio", "Google Calendar", "OpenAI", "n8n"],
    results: [
      { label: "Call coverage", value: "24/7" },
      { label: "Pick-up time", value: "< 1s" },
      { label: "Reminders sent", value: "Automatic" },
    ],
    outcomes: ["Improved call handling", "Better patient experience", "Front desk freed to focus on patients in the clinic"],
    testimonial: { quote: "Our team used to dread the phone during busy hours. Now every call is answered and the morning summary tells us exactly who to call back.", name: "Dr. Ananya Mehra", role: "Practice Owner, Dental Clinic" },
    mockup: "voice",
    colors: ["#00F5FF", "#7B61FF"],
  },
  {
    slug: "real-estate-lead-qualification-agent",
    title: "Real Estate Lead Qualification Agent",
    client: "Residential real estate agency",
    industry: "Real Estate Agencies",
    year: "2025",
    categories: ["AI Voice Agents", "AI Automation", "Lead Generation"],
    summary: "An AI agent that calls new portal and ad leads within a minute, qualifies budget and timeline, syncs the CRM and books viewings.",
    challenge:
      "The agency bought leads from portals and Meta ads, but agents were busy on site visits. Leads waited hours for a call, by which time many had spoken to other brokers.",
    solution:
      "We built a speed-to-lead system: every new lead triggers an AI voice call and WhatsApp message within 60 seconds. The agent confirms requirements, budget, location and timeline, scores the lead, creates or updates the CRM record and books a viewing with the right agent.",
    features: [
      { title: "Lead Capture", desc: "Leads from portals, Meta lead forms and the website flow into one pipeline." },
      { title: "CRM Sync", desc: "Qualification answers, call recordings and scores saved automatically." },
      { title: "Appointment Booking", desc: "Viewings booked into each agent's calendar based on location and availability." },
    ],
    gallery: [
      { title: "Lead pipeline", caption: "Every lead scored and routed automatically." },
      { title: "Qualification call", caption: "Natural conversation with structured data capture." },
      { title: "Agent dashboard", caption: "Hot leads surfaced first each morning." },
    ],
    stack: ["Retell AI", "GoHighLevel", "WhatsApp Cloud API", "Meta Lead Ads", "Make", "OpenAI"],
    results: [
      { label: "Speed to lead", value: "< 60s" },
      { label: "Leads qualified", value: "Every lead" },
      { label: "CRM updates", value: "Automatic" },
    ],
    outcomes: ["Leads contacted while still interested", "Agents spend time on qualified buyers", "Clean, complete CRM data"],
    testimonial: { quote: "Leads now get a call before they've even closed the portal tab. My agents only talk to people who are actually ready to view.", name: "Rohit Malhotra", role: "Director, Real Estate Agency" },
    mockup: "dashboard",
    colors: ["#7B61FF", "#00FF9D"],
  },
  {
    slug: "ai-travel-planner",
    title: "AI Travel Planner",
    client: "Boutique travel company",
    industry: "Travel",
    year: "2025",
    categories: ["AI Chatbots", "AI Automation"],
    summary: "A conversational AI planner that builds custom itineraries with budgets and recommendations, then hands them to a travel consultant.",
    challenge:
      "Consultants spent hours building first-draft itineraries for enquiries that often never booked, which slowed responses to serious travellers.",
    solution:
      "We built an AI travel planner that chats with travellers about dates, interests, pace and budget, generates a day-by-day itinerary with cost estimates and recommendations, and sends a polished PDF plus the lead to a consultant to finalise.",
    features: [
      { title: "Custom Itineraries", desc: "Day-by-day plans based on interests, pace and travel style." },
      { title: "Budget Planning", desc: "Estimated costs for stays, transport and activities within the traveller's budget." },
      { title: "Recommendations", desc: "Curated hotels, restaurants and experiences from the company's partner list." },
    ],
    gallery: [
      { title: "Planner chat", caption: "Natural conversation that captures preferences." },
      { title: "Itinerary view", caption: "Beautiful day-by-day plan with costs." },
      { title: "Consultant hand-off", caption: "Qualified enquiries routed with full context." },
    ],
    stack: ["Next.js", "OpenAI", "Claude", "Supabase", "Resend", "HubSpot"],
    results: [
      { label: "First draft itinerary", value: "Minutes" },
      { label: "Availability", value: "24/7" },
      { label: "Hand-off context", value: "Complete" },
    ],
    outcomes: ["Faster first responses to travellers", "Consultants focus on finalising and selling", "Richer enquiry data"],
    testimonial: { quote: "Travellers love getting a real plan instantly, and our consultants start every conversation already knowing what the client wants.", name: "Sara Khan", role: "Founder, Travel Company" },
    mockup: "travel",
    colors: ["#00FF9D", "#00F5FF"],
  },
  {
    slug: "ai-company-knowledge-search",
    title: "AI Company Knowledge Search",
    client: "Professional services firm",
    industry: "Consultants",
    year: "2024",
    categories: ["AI Automation", "AI Chatbots"],
    summary: "An internal AI assistant that searches policies, proposals and SOPs and answers staff questions with cited sources.",
    challenge:
      "Knowledge was scattered across Google Drive, email and old proposals. New hires asked the same questions repeatedly and senior staff lost hours finding documents.",
    solution:
      "We built a private retrieval-augmented AI search that indexes approved documents, respects access permissions and answers questions in plain language with links to the source documents.",
    features: [
      { title: "Document Search", desc: "Semantic search across Drive, PDFs, docs and spreadsheets." },
      { title: "Internal Knowledge Base", desc: "Answers grounded in company documents with citations." },
      { title: "Access Controls", desc: "Staff only see answers from documents they're allowed to access." },
    ],
    gallery: [
      { title: "Ask anything", caption: "Plain-language questions, cited answers." },
      { title: "Source viewer", caption: "Jump straight to the exact paragraph." },
      { title: "Admin panel", caption: "Manage indexed sources and permissions." },
    ],
    stack: ["Next.js", "Claude", "pgvector", "Supabase", "Google Drive API", "Vercel"],
    results: [
      { label: "Answers", value: "With sources" },
      { label: "Onboarding", value: "Self-serve" },
      { label: "Search", value: "Seconds" },
    ],
    outcomes: ["Less time searching for documents", "Faster onboarding for new staff", "Consistent answers across the team"],
    testimonial: { quote: "It's like having our most experienced team member available to everyone, every minute of the day.", name: "Vikram Iyer", role: "Managing Partner, Consulting Firm" },
    mockup: "search",
    colors: ["#00F5FF", "#00FF9D"],
  },
  {
    slug: "ecommerce-automation-system",
    title: "Ecommerce Automation System",
    client: "D2C lifestyle brand",
    industry: "Ecommerce",
    year: "2025",
    categories: ["AI Automation", "AI Chatbots", "Marketing"],
    summary: "Order workflows, lifecycle email automation and an AI support agent that handles order-status and returns questions.",
    challenge:
      "The team was copying orders between Shopify, the courier dashboard and spreadsheets, and the support inbox was full of \"where is my order?\" messages.",
    solution:
      "We automated order routing, shipping updates and inventory alerts; built lifecycle email and WhatsApp flows for abandoned carts, post-purchase and win-back; and launched an AI support agent that answers order and returns questions using live order data.",
    features: [
      { title: "Order Workflows", desc: "Automatic routing, courier booking, tracking updates and low-stock alerts." },
      { title: "Email Automation", desc: "Abandoned cart, welcome, post-purchase review and win-back sequences." },
      { title: "Customer Support", desc: "AI agent on web and WhatsApp with live order lookups and human hand-off." },
    ],
    gallery: [
      { title: "Order automation map", caption: "Every order processed without manual steps." },
      { title: "Lifecycle flows", caption: "Personalised email and WhatsApp journeys." },
      { title: "Support agent", caption: "Instant order status on WhatsApp." },
    ],
    stack: ["Shopify", "Klaviyo", "WhatsApp Cloud API", "n8n", "OpenAI", "Shiprocket"],
    results: [
      { label: "Order processing", value: "Automated" },
      { label: "Support", value: "24/7" },
      { label: "Lifecycle flows", value: "6 live" },
    ],
    outcomes: ["Hours of manual order work removed each week", "Faster answers for customers", "Recovered abandoned carts automatically"],
    testimonial: { quote: "We stopped drowning in order emails. The AI handles tracking questions and our team finally has time for product and marketing.", name: "Neha Kapoor", role: "Co-founder, D2C Brand" },
    mockup: "commerce",
    colors: ["#7B61FF", "#00F5FF"],
  },
  {
    slug: "roofing-company-website",
    title: "Roofing Company Website",
    client: "Residential roofing contractor",
    industry: "Roofing Companies",
    year: "2025",
    categories: ["Web Design", "Lead Generation", "Marketing"],
    summary: "A high-converting roofing website with local SEO, instant quote forms and missed-call text-back.",
    challenge:
      "The old website was slow, didn't rank for local searches and buried the quote form, so storm-season enquiries went to competitors.",
    solution:
      "We designed a fast, trust-first website with service-area pages, before/after galleries, financing information and a multi-step quote form. Every enquiry triggers an instant SMS and CRM task, and missed calls get an automatic text-back.",
    features: [
      { title: "Lead Generation", desc: "Multi-step quote forms and click-to-call on every page." },
      { title: "SEO", desc: "Service and location pages with schema, built to rank in the map pack." },
      { title: "Quote Forms", desc: "Photo uploads, roof type and urgency captured up front." },
    ],
    gallery: [
      { title: "Homepage hero", caption: "Clear offer, trust badges and instant quote CTA." },
      { title: "Quote funnel", caption: "Four short steps to a qualified request." },
      { title: "Service areas", caption: "Location pages that rank locally." },
    ],
    stack: ["Next.js", "Tailwind CSS", "Sanity", "GoHighLevel", "Google Business Profile", "CallRail"],
    results: [
      { label: "PageSpeed", value: "95+" },
      { label: "Quote follow-up", value: "Instant" },
      { label: "Location pages", value: "12" },
    ],
    outcomes: ["Clear, fast path from search to quote", "Every enquiry followed up instantly", "Stronger local search presence"],
    testimonial: { quote: "The new site looks like a big company built it, and the quote requests come in already qualified with photos.", name: "Mark Daniels", role: "Owner, Roofing Company" },
    mockup: "web",
    colors: ["#FFC75F", "#00F5FF"],
  },
  {
    slug: "contractor-website",
    title: "Contractor Website",
    client: "General contractor",
    industry: "Contractors",
    year: "2024",
    categories: ["Web Design", "Lead Generation"],
    summary: "A portfolio-led contractor website with lead funnels by project type and call tracking.",
    challenge:
      "Referrals were drying up and the contractor had no way to show the quality of past work or track which marketing produced calls.",
    solution:
      "We built a portfolio-first website with filterable projects, project-type landing pages for kitchens, extensions and renovations, and dynamic call tracking connected to the CRM so every lead source is measured.",
    features: [
      { title: "Portfolio", desc: "Filterable project gallery with before/after sliders." },
      { title: "Lead Funnels", desc: "Dedicated funnels for each project type with budget qualification." },
      { title: "Call Tracking", desc: "Dynamic numbers by source with recordings and CRM attribution." },
    ],
    gallery: [
      { title: "Project gallery", caption: "Work that sells itself." },
      { title: "Renovation funnel", caption: "Budget and timeline captured before the call." },
      { title: "Lead source report", caption: "Know exactly which channel drives calls." },
    ],
    stack: ["Next.js", "Framer Motion", "Sanity", "CallRail", "HubSpot", "Google Ads"],
    results: [
      { label: "Lead sources", value: "Tracked" },
      { label: "Funnels", value: "3" },
      { label: "Mobile-first", value: "100%" },
    ],
    outcomes: ["Portfolio that builds trust before the first call", "Better-qualified enquiries", "Clear marketing attribution"],
    testimonial: { quote: "Clients now call already convinced. They've seen our projects and know our price range before we talk.", name: "James Walker", role: "Owner, Construction Company" },
    mockup: "web",
    colors: ["#00FF9D", "#7B61FF"],
  },
  {
    slug: "dental-clinic-website",
    title: "Dental Clinic Website",
    client: "Family & cosmetic dental clinic",
    industry: "Dental Clinics",
    year: "2025",
    categories: ["Web Design", "Branding", "Marketing"],
    summary: "A calm, premium dental website with online appointments, doctor profiles and treatment pages built for local SEO.",
    challenge:
      "The clinic's site looked dated, didn't explain treatments clearly and made booking difficult on mobile.",
    solution:
      "We refreshed the brand and built a mobile-first website with treatment guides, doctor profiles, transparent pricing ranges, patient reviews and an online booking flow connected to the clinic's calendar and AI receptionist.",
    features: [
      { title: "Appointments", desc: "Online booking in three taps, synced to the clinic calendar." },
      { title: "Doctor Profiles", desc: "Credentials, specialities and a personal introduction for each dentist." },
      { title: "SEO", desc: "Treatment and location pages with medical and local schema." },
    ],
    gallery: [
      { title: "Homepage", caption: "Warm, reassuring and premium." },
      { title: "Treatment pages", caption: "Clear explanations that answer patient questions." },
      { title: "Booking flow", caption: "Mobile booking in under a minute." },
    ],
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Calendly", "Google Business Profile", "Vapi"],
    results: [
      { label: "Booking", value: "3 taps" },
      { label: "Treatment pages", value: "14" },
      { label: "Accessibility", value: "WCAG AA" },
    ],
    outcomes: ["Easier online booking", "Clearer treatment information", "Stronger local search presence"],
    testimonial: { quote: "Patients tell us the website made them feel comfortable before they even walked in. Online bookings are now a big part of our week.", name: "Dr. Kavita Rao", role: "Clinical Director, Dental Clinic" },
    mockup: "web",
    colors: ["#00F5FF", "#00FF9D"],
  },
  {
    slug: "luxury-real-estate-website",
    title: "Luxury Real Estate Website",
    client: "Luxury property developer",
    industry: "Real Estate Agencies",
    year: "2024",
    categories: ["Web Design", "Branding", "Lead Generation"],
    summary: "An immersive luxury property website with listings, virtual tours and gated brochure lead capture.",
    challenge:
      "Premium projects were presented with generic listing pages that didn't reflect the quality of the homes or capture serious buyer details.",
    solution:
      "We created an editorial, cinematic website with smooth scroll storytelling, filterable listings, embedded 3D virtual tours, floor plans and a gated brochure flow that captures buyer intent and routes enquiries to sales.",
    features: [
      { title: "Listings", desc: "Filterable listings with rich galleries and floor plans." },
      { title: "Virtual Tours", desc: "Embedded 3D walkthroughs for remote and NRI buyers." },
      { title: "Lead Capture", desc: "Gated brochures and site-visit booking with CRM routing." },
    ],
    gallery: [
      { title: "Cinematic hero", caption: "Storytelling that sells the lifestyle." },
      { title: "Listing detail", caption: "Everything a buyer needs on one page." },
      { title: "Virtual tour", caption: "Walk through from anywhere in the world." },
    ],
    stack: ["Next.js", "GSAP", "Three.js", "Matterport", "Sanity", "HubSpot"],
    results: [
      { label: "Virtual tours", value: "Embedded" },
      { label: "Brochure leads", value: "To CRM" },
      { label: "Buyer reach", value: "Global" },
    ],
    outcomes: ["A brand experience that matches the property", "Qualified buyer enquiries", "Remote buyers can tour from anywhere"],
    testimonial: { quote: "Finally a website that feels as premium as our projects. Our sales team gets enquiries from buyers who already understand the offering.", name: "Aditya Bansal", role: "Marketing Head, Property Developer" },
    mockup: "web",
    colors: ["#FFC75F", "#7B61FF"],
  },
  {
    slug: "restaurant-website-ai-booking",
    title: "Restaurant Website + AI Booking Assistant",
    client: "Modern Indian restaurant",
    industry: "Restaurants",
    year: "2025",
    categories: ["Web Design", "AI Voice Agents", "AI Chatbots"],
    summary: "A mouth-watering restaurant website with online reservations, a digital menu and an AI assistant that takes bookings by phone and chat.",
    challenge:
      "During service, nobody could answer the phone, so reservation and party-booking calls were missed at the busiest times.",
    solution:
      "We built a fast website with the menu, events and online reservations, plus an AI booking assistant on phone and WhatsApp that takes table bookings, answers questions about the menu and dietary options, and captures private-dining enquiries for the manager.",
    features: [
      { title: "Reservations", desc: "Online and AI-assisted bookings with confirmations and reminders." },
      { title: "Menu", desc: "Beautiful, fast digital menu with dietary filters." },
      { title: "AI Support", desc: "Phone and WhatsApp assistant for bookings and questions during service." },
    ],
    gallery: [
      { title: "Homepage", caption: "Appetite appeal in the first scroll." },
      { title: "Reservation flow", caption: "Book a table in seconds." },
      { title: "AI booking call", caption: "Reservations taken during the dinner rush." },
    ],
    stack: ["Next.js", "Vapi", "WhatsApp Cloud API", "Google Calendar", "Sanity", "n8n"],
    results: [
      { label: "Booking channels", value: "Web, phone, WhatsApp" },
      { label: "Rush-hour calls", value: "Answered" },
      { label: "Confirmations", value: "Automatic" },
    ],
    outcomes: ["Reservations captured during peak service", "Staff focused on guests", "Private dining enquiries never missed"],
    testimonial: { quote: "Friday nights used to mean a ringing phone nobody could get to. Now bookings just appear in the system while we focus on our guests.", name: "Arjun Sethi", role: "Owner, Restaurant" },
    mockup: "voice",
    colors: ["#FF8A5C", "#7B61FF"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
