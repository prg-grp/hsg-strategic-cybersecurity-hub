// ============================================================
//  Site content. Edit this file to update the website.
//  No other file needs to change. Keep valid JavaScript syntax
//  (commas between entries, quotes around text).
// ============================================================
window.SITE_DATA = {
  // Section switches: set to true to show a section again.
  show: {
    event: false,          // flagship event card, event section, programme and registration banner
    eventsTracker: false,  // upcoming/past events calendar
    participate: false,    // "Participate in Hub activities" section
    partners: false        // "Partners and supporters" logo strip in the team section
  },

  hub: {
    eyebrow: "The Hub Initiative",
    name: "HSG Strategic Cybersecurity Hub",
    shortName: "Strategic Cybersecurity Hub",
    abbreviation: "SCH",
    tagline: "Connecting Cybersecurity Research, Leadership, and Practice",
    verbs: ["Research", "Education", "Practice", "Network"],
    intro: "Effective cybersecurity requires the combination of technical expertise with leadership, governance, communication, decision-making, and crisis management.",
    about: [
      "The HSG Strategic Cybersecurity Hub at the University of St.Gallen connects cybersecurity research, education, and practice across Switzerland. We believe that effective cybersecurity requires the combination of technical expertise with leadership, governance, communication, decision-making, and crisis management.",
      "The Hub fosters a network across the Swiss cybersecurity community, bringing together practitioners and researchers to address the pressing challenges of cybersecurity practice, and create opportunities for joint projects and collaborations.",
      "Our focus areas range from cybersecurity strategy, governance, crisis management, security awareness, human factors, privacy and trust, AI security, and post-quantum security."
    ],
    // Horizontal process flow (left to right)
    flow: ["Technical expertise", "Leadership and governance", "Communication", "Decision-making", "Crisis management"]
  },

  event: {
    label: "Flagship event",
    title: "First St.Gallen Strategic Cybersecurity Day",
    subtitle: "Cybersecurity as a strategic priority for leaders, practitioners and the public sector.",
    // ISO date-times with time zone; used for the countdown and the calendar file.
    start: "2027-03-05T08:30:00+01:00",
    end: "2027-03-05T17:30:00+01:00",
    dateLabel: "Friday, 5 March 2027",
    timeLabel: "08:30 – 17:30",
    location: "University of St.Gallen, Dufourstrasse 50, 9000 St.Gallen",
    audience: [
      "Cybersecurity leaders and practitioners",
      "Decision makers and executives",
      "CISOs and security architects",
      "Researchers",
      "Public sector and administration"
    ],
    registration: {
      open: true,
      url: "#",                 // registration link (HSG event tool, Eventbrite, ...)
      label: "Register",
      note: "Participation is free of charge. Seats are limited.",
      deadline: "Registration closes on 26 February 2027."
    },
    keyFacts: [
      { label: "Date", value: "5 March 2027" },
      { label: "Location", value: "University of St.Gallen" },
      { label: "Language", value: "English" },
      { label: "Participation", value: "Free, registration required" }
    ]
  },

  // Programme: time, title, type (keynote | talk | panel | break | workshop), speakers, abstract.
  programme: [
    { time: "08:30", title: "Registration and coffee", type: "break" },
    { time: "09:00", title: "Welcome and opening", type: "talk", speakers: ["Guido Salvaneschi"],
      abstract: "Why cybersecurity must be addressed at a strategic level, and what the Hub wants to achieve." },
    { time: "09:20", title: "Opening keynote: Cyber resilience as a board-level responsibility", type: "keynote",
      speakers: ["Keynote speaker (TBA)"],
      abstract: "Placeholder abstract. Replace with the final text once the speaker is confirmed." },
    { time: "10:10", title: "Coffee break", type: "break" },
    { time: "10:40", title: "Panel: Securing critical infrastructure in Switzerland", type: "panel",
      speakers: ["Panelist (TBA)", "Panelist (TBA)", "Panelist (TBA)"],
      abstract: "Perspectives from operators, regulators and researchers." },
    { time: "11:40", title: "AI and cybersecurity: threats, defences and governance", type: "talk",
      speakers: ["Speaker (TBA)"],
      abstract: "How AI changes both the attack and the defence side, and what leaders need to decide now." },
    { time: "12:20", title: "Lunch", type: "break" },
    { time: "13:30", title: "Workshop A: Threat modelling for executives", type: "workshop", speakers: ["Facilitator (TBA)"] },
    { time: "13:30", title: "Workshop B: Secure software supply chains", type: "workshop", speakers: ["Facilitator (TBA)"] },
    { time: "15:00", title: "Coffee break", type: "break" },
    { time: "15:30", title: "Closing keynote: The next five years of cyber risk", type: "keynote", speakers: ["Keynote speaker (TBA)"] },
    { time: "16:20", title: "Closing remarks", type: "talk", speakers: ["Guido Salvaneschi"] },
    { time: "16:30", title: "Networking apéro", type: "break" }
  ],

  // Numbered focus areas with an expandable "More" text and optional links.
  focusAreas: [
    { title: "Cybersecurity strategy and governance", summary: "Aligning security with business and public-sector strategy.",
      more: "How organisations set priorities, govern cyber risk and connect security investments to their strategic goals.", links: [] },
    { title: "Crisis management", summary: "Leading through cyber incidents.",
      more: "Preparation, decision-making and communication before, during and after security incidents.", links: [] },
    { title: "Security awareness and human factors", summary: "People as a central part of security.",
      more: "Understanding how people perceive and act on security, and designing awareness and processes that work in practice.", links: [] },
    { title: "Privacy and trust", summary: "Protecting data and earning trust.",
      more: "Privacy-preserving systems, data governance and the trust relationships between organisations, users and the state.", links: [] },
    { title: "AI security", summary: "Securing AI systems and using AI for defence.",
      more: "Adversarial attacks and defences, LLM and AI agent security, and the governance of AI in critical settings.", links: [] },
    { title: "Post-quantum security", summary: "Preparing for the quantum era.",
      more: "Migration to post-quantum cryptography and its organisational and strategic implications.", links: [] }
  ],

  // Events tracker: entries are sorted automatically into upcoming and past by date.
  events: [
    { date: "2027-03-05", time: "08:30 – 17:30", title: "First St.Gallen Strategic Cybersecurity Day",
      location: "University of St.Gallen", url: "#event", type: "Conference" },
    { date: "2026-11-04", time: "", title: "Launch of the Strategic Cybersecurity Hub St.Gallen",
      location: "St.Gallen", url: "", type: "Announcement" }
  ],

  participate: [
    { audience: "Executives and CISOs", text: "Take part in roundtables and events, and help shape the Hub's agenda.", cta: "Get in touch", url: "#contact" },
    { audience: "Public sector", text: "Partner with us on resilience assessments, policy-oriented research and training for public administration.", cta: "Get in touch", url: "#contact" },
    { audience: "Researchers", text: "Collaborate on projects at the intersection of security, software and strategy, or present your work at our events.", cta: "Get in touch", url: "#contact" },
    { audience: "Students", text: "Take our courses on AI security and secure software, or write your thesis with the Hub.", cta: "Explore courses", url: "https://ics.unisg.ch" }
  ],

  // Team: name, role, affiliation, optional photo (path relative to index.html).
  // Team: put the photos in an img/ folder next to index.html with these file names.
  team: [
    { title: "Prof. Dr.", name: "Anna-Lena Horlemann", role: "Full Professor of Quantum Computing and Information Theory; Director, Institute of Computer Science",
      affiliation: "University of St.Gallen", photo: "img/anna-lena-horlemann.jpg", url: "https://www.unisg.ch/en/university/about-us/organisation/detail/person-id/7b90e8d6-6df7-4032-821b-15cb2eff320a/"},
    { title: "Prof. Dr.", name: "Katerina Mitrokotsa", role: "Full Professor in Cyber Security; Director, Institute of Computer Science",
      affiliation: "University of St.Gallen", photo: "img/katerina-mitrokotsa.jpg", url: "https://www.unisg.ch/en/university/about-us/organisation/detail/person-id/dcd1ccda-0c2f-453d-b990-514e04a7aa6a/" },
    { title: "Prof. Dr.", name: "Guido Salvaneschi", role: "Full Professor of Software and Systems Security; Director, Institute of Computer Science",
      affiliation: "University of St.Gallen", photo: "img/guido-salvaneschi.jpg", url: "https://www.unisg.ch/en/university/about-us/organisation/detail/person-id/98878da9-6fff-4cad-bf4c-7d66669ebc4f/"}
  ],

  partners: [
    { name: "Institute of Computer Science, University of St.Gallen", url: "https://ics.unisg.ch", logo: "" }
    // Add partners/sponsors here: { name: "...", url: "...", logo: "img/partner.png" }
  ],

  contact: {
    organiser: "Institute of Computer Science (ICS-HSG), University of St.Gallen",
    address: "Rosenbergstrasse 30, 9000 St.Gallen, Switzerland",
    email: "",   // leave empty to hide; e.g. "cybersecurity-hub@unisg.ch"
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/company/116053363/" },
      { label: "University of St.Gallen", url: "https://www.unisg.ch" },
      { label: "Institute of Computer Science", url: "https://ics.unisg.ch" }
    ]
  },

  footer: {
    legal: "© University of St.Gallen (HSG). All rights reserved.",
    links: [
      { label: "Imprint", url: "https://www.unisg.ch/en/imprint/" },
      { label: "Privacy", url: "https://www.unisg.ch/en/privacy-policy/" }
    ]
  }
};
