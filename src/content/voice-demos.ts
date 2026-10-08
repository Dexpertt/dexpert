/**
 * Scripted AI voice agent demos.
 *
 * Each demo is a small conversation graph. The agent line of every node can be played from a
 * real recording: put MP3 files at /public/audio/demos/<demo id>/<node id>.mp3 and set
 * `hasRecordings: true`. Until then the browser's built-in speech voice reads the lines.
 */
export type DemoReply = { label: string; next: string; keywords: string[] };
export type DemoNode = { agent: string; replies?: DemoReply[] };
export type VoiceDemo = {
  id: string;
  title: string;
  business: string;
  agentName: string;
  icon: string;
  colors: [string, string];
  summary: string;
  hasRecordings: boolean;
  start: string;
  nodes: Record<string, DemoNode>;
  outcomes: string[];
  helpsTeam: string;
};

export const voiceDemos: VoiceDemo[] = [
  {
    id: "dental",
    title: "Dental Clinic Receptionist",
    business: "BrightSmile Dental Clinic",
    agentName: "Aria",
    icon: "Smile",
    colors: ["#00F5FF", "#7B61FF"],
    summary: "Books check-ups, answers timing questions and flags urgent pain calls to the team while they're chairside.",
    hasRecordings: false,
    start: "greet",
    helpsTeam: "Your front desk stays focused on patients in the clinic. Aria picks up overflow and after-hours calls, and anything urgent goes straight to a staff member.",
    outcomes: ["Appointment added to the clinic calendar", "WhatsApp confirmation and day-before reminder sent", "Urgent cases flagged to staff for a call-back", "Call summary saved to the patient record"],
    nodes: {
      greet: {
        agent: "Thank you for calling BrightSmile Dental, this is Aria, the clinic's virtual assistant. The team is with patients right now, so I can help you book, reschedule or answer questions. How can I help?",
        replies: [
          { label: "I'd like to book a check-up", next: "book", keywords: ["book", "appointment", "check", "cleaning", "checkup", "visit"] },
          { label: "I have bad tooth pain", next: "emergency", keywords: ["pain", "hurt", "emergency", "ache", "swelling", "urgent"] },
          { label: "What are your timings?", next: "hours", keywords: ["time", "timing", "open", "hours", "close", "when"] },
        ],
      },
      book: {
        agent: "Happy to help. I have Thursday at 11 AM or Friday at 5:30 PM with Dr. Mehta. Which suits you better?",
        replies: [
          { label: "Thursday at 11 works", next: "confirmThu", keywords: ["thursday", "11", "eleven", "morning", "first"] },
          { label: "Friday evening, please", next: "confirmFri", keywords: ["friday", "5", "five", "evening", "second"] },
        ],
      },
      confirmThu: {
        agent: "Lovely, you're booked for Thursday at 11 AM. I'll send a WhatsApp confirmation and a reminder the day before. May I have your name?",
        replies: [{ label: "It's Rohan Sharma", next: "done", keywords: ["name", "it's", "i am", "rohan", "this is"] }],
      },
      confirmFri: {
        agent: "Lovely, you're booked for Friday at 5:30 PM. I'll send a WhatsApp confirmation and a reminder the day before. May I have your name?",
        replies: [{ label: "It's Rohan Sharma", next: "done", keywords: ["name", "it's", "i am", "rohan", "this is"] }],
      },
      emergency: {
        agent: "I'm sorry you're in pain. I'm marking this as urgent and alerting the clinic team right now, so a staff member will call you back within 15 minutes. Is this the best number to reach you?",
        replies: [{ label: "Yes, this number is fine", next: "urgentDone", keywords: ["yes", "yeah", "this number", "fine", "okay", "ok"] }],
      },
      urgentDone: { agent: "Thank you. Dr. Mehta's team has your details and will call you shortly. If the swelling gets worse, please visit the nearest emergency room. Take care." },
      hours: {
        agent: "We're open Monday to Saturday, from 10 AM to 8 PM. Would you like me to book a visit for you?",
        replies: [
          { label: "Yes, book me in", next: "book", keywords: ["yes", "book", "sure", "please", "okay"] },
          { label: "No, that's all, thanks", next: "bye", keywords: ["no", "that's all", "thanks", "thank you", "nothing"] },
        ],
      },
      done: { agent: "Thanks Rohan, you're all set. The team looks forward to seeing you. Have a great day!" },
      bye: { agent: "No problem at all. Thanks for calling BrightSmile Dental. Have a great day!" },
    },
  },
  {
    id: "restaurant",
    title: "Restaurant Booking Assistant",
    business: "Spice Route Bistro",
    agentName: "Maya",
    icon: "UtensilsCrossed",
    colors: ["#00FF9D", "#00F5FF"],
    summary: "Takes reservations during the dinner rush, answers menu questions and routes event enquiries to the manager.",
    hasRecordings: false,
    start: "greet",
    helpsTeam: "Your staff keep serving guests instead of running to the phone. Maya handles routine bookings, and large parties go to your events manager.",
    outcomes: ["Table added to your reservation system", "WhatsApp confirmation sent to the guest", "Special occasions noted for the team", "Event enquiries passed to the manager"],
    nodes: {
      greet: {
        agent: "Good evening, Spice Route Bistro. I'm Maya, the restaurant's booking assistant, helping out while the team is busy with service. Would you like to reserve a table?",
        replies: [
          { label: "A table for four tonight", next: "time", keywords: ["table", "book", "reserve", "tonight", "four", "reservation"] },
          { label: "Do you have vegan options?", next: "menu", keywords: ["vegan", "veg", "menu", "gluten", "jain", "food"] },
          { label: "I'm planning a private party", next: "event", keywords: ["party", "birthday", "event", "private", "group", "celebration"] },
        ],
      },
      time: {
        agent: "Lovely. For four guests tonight, I can offer 7:30 PM or 9 PM. Which would you prefer?",
        replies: [
          { label: "7:30 is perfect", next: "confirm730", keywords: ["7", "seven", "7:30", "first", "earlier"] },
          { label: "9 PM, please", next: "confirm9", keywords: ["9", "nine", "later", "second"] },
        ],
      },
      confirm730: {
        agent: "Perfect, a table for four at 7:30 PM tonight. I'll send the confirmation to your WhatsApp. Is it a special occasion?",
        replies: [
          { label: "Yes, it's a birthday", next: "bday", keywords: ["birthday", "yes", "anniversary", "celebrat"] },
          { label: "No, that's all", next: "done", keywords: ["no", "that's all", "nothing", "thanks"] },
        ],
      },
      confirm9: {
        agent: "Perfect, a table for four at 9 PM tonight. I'll send the confirmation to your WhatsApp. Is it a special occasion?",
        replies: [
          { label: "Yes, it's a birthday", next: "bday", keywords: ["birthday", "yes", "anniversary", "celebrat"] },
          { label: "No, that's all", next: "done", keywords: ["no", "that's all", "nothing", "thanks"] },
        ],
      },
      bday: { agent: "How lovely! I've added a birthday note so the team can prepare a little surprise dessert. See you tonight!" },
      menu: {
        agent: "Yes, we have a dedicated vegan and Jain menu, and the chef can adapt most dishes. Shall I book a table for you?",
        replies: [
          { label: "Yes, for four tonight", next: "time", keywords: ["yes", "book", "four", "tonight", "sure"] },
          { label: "Not right now", next: "bye", keywords: ["no", "not", "later", "thanks"] },
        ],
      },
      event: {
        agent: "We'd love to host you. Our private dining room seats up to 30 guests. I'll pass your request to our events manager, Kabir, who'll call you back today with menus and pricing. What date are you considering?",
        replies: [{ label: "Next Saturday", next: "eventDone", keywords: ["saturday", "sunday", "next", "date", "week"] }],
      },
      eventDone: { agent: "Noted for next Saturday. Kabir will call you back today. Thank you for choosing Spice Route Bistro!" },
      done: { agent: "Wonderful. We look forward to seeing you tonight at Spice Route Bistro!" },
      bye: { agent: "No problem. Thanks for calling Spice Route Bistro, and have a lovely evening!" },
    },
  },
  {
    id: "real-estate",
    title: "Real Estate Inquiry Assistant",
    business: "Skyline Realty",
    agentName: "Leo",
    icon: "Building2",
    colors: ["#7B61FF", "#00FF9D"],
    summary: "Qualifies buyers, renters and sellers by area and budget, books site visits and hands warm leads to the right agent.",
    hasRecordings: false,
    start: "greet",
    helpsTeam: "Your agents spend their time on site visits and closings. Leo answers every enquiry instantly, qualifies it and hands the agent a ready-to-call lead.",
    outcomes: ["Lead qualified by budget, area and timeline", "Site visit booked in the agent's calendar", "Brochures and location sent on WhatsApp", "Hot lead assigned to an agent in the CRM"],
    nodes: {
      greet: {
        agent: "Hi, thanks for calling Skyline Realty. I'm Leo, the agency's virtual assistant. Our agents are out on site visits, so I'll take a few details and connect you with the right person. Are you looking to buy, rent or sell?",
        replies: [
          { label: "I want to buy a flat", next: "buy", keywords: ["buy", "purchase", "flat", "apartment", "house", "home"] },
          { label: "Looking to rent", next: "rent", keywords: ["rent", "lease", "rental"] },
          { label: "I want to sell my property", next: "sell", keywords: ["sell", "list", "valuation", "selling"] },
        ],
      },
      buy: {
        agent: "Great. Which area are you interested in, and what's your approximate budget?",
        replies: [
          { label: "Dwarka, around 1.2 crore", next: "match", keywords: ["dwarka", "crore", "budget", "1.2"] },
          { label: "South Delhi, 2 to 3 crore", next: "match", keywords: ["south", "saket", "greater kailash", "2", "3"] },
        ],
      },
      match: {
        agent: "Thanks. We have three 3BHK options that match, including a new listing with a park view. Would you like to schedule a site visit this weekend?",
        replies: [
          { label: "Yes, Saturday morning", next: "visit", keywords: ["yes", "saturday", "morning", "weekend", "sure"] },
          { label: "Send me details first", next: "details", keywords: ["details", "send", "brochure", "first", "whatsapp"] },
        ],
      },
      visit: {
        agent: "Done. I've booked a site visit for Saturday at 11 AM with our agent, Neha, and sent the location on WhatsApp. She'll call you tomorrow to confirm. Anything else?",
        replies: [{ label: "No, that's all. Thanks!", next: "done", keywords: ["no", "that's all", "thanks", "thank you", "nothing"] }],
      },
      details: { agent: "Sure. I'm sending brochures, floor plans and prices to your WhatsApp now, and Neha will follow up tomorrow to answer any questions." },
      rent: {
        agent: "Got it. Which area are you looking at, and what's your monthly budget?",
        replies: [{ label: "Gurgaon, about 50,000", next: "rentMatch", keywords: ["gurgaon", "gurugram", "noida", "thousand", "budget", "50"] }],
      },
      rentMatch: { agent: "We have a few 2BHK and 3BHK rentals in that range. I'll send the shortlist to your WhatsApp, and our rentals agent will call you within the hour." },
      sell: {
        agent: "We'd be happy to help. I'll arrange a free valuation. Where is the property, and what size is it?",
        replies: [{ label: "A 3BHK in Vasant Kunj", next: "sellDone", keywords: ["bhk", "vasant", "kunj", "sector", "flat", "house"] }],
      },
      sellDone: { agent: "Thank you. Our senior agent, Arjun, will call you today to schedule a free valuation visit." },
      done: { agent: "My pleasure. Thanks for calling Skyline Realty, and Neha will see you on Saturday!" },
    },
  },
];

export function matchReply(text: string, replies: DemoReply[]): DemoReply {
  const t = text.toLowerCase();
  let best = replies[0];
  let bestScore = 0;
  for (const r of replies) {
    const score = r.keywords.reduce((s, k) => s + (t.includes(k) ? 1 : 0), 0);
    if (score > bestScore) {
      best = r;
      bestScore = score;
    }
  }
  return best;
}
