/**
 * VaultOfCourse Support Assistant — knowledge base, routing config and
 * intent classification layer. The assistant may ONLY answer from this data.
 */

export const SITE_ROUTES = {
  courses: "/courses",
  internships: "/internships",
  certificates: "/certificates",
  verification: "/verify-certificate",
  offerLetters: "/offer-letter",
  training: "/training-programs",
  workshops: "/workshops",
  support: "/contact-support",
  whatsapp: "https://wa.me/YOUR_NUMBER",
} as const;

export const WHATSAPP_URL = SITE_ROUTES.whatsapp;

export const ESCALATION_MESSAGE =
  "This issue requires our support team to review your details. Please contact us on WhatsApp and our team will assist you.";

export const UNKNOWN_MESSAGE =
  "I'm not able to find reliable information about that. Please contact our support team on WhatsApp for assistance.";

export type Intent =
  | "course_inquiry"
  | "training_inquiry"
  | "internship_inquiry"
  | "workshop_inquiry"
  | "certificate_query"
  | "certificate_verification"
  | "offer_letter_query"
  | "enrollment_query"
  | "payment_query"
  | "website_navigation"
  | "technical_support"
  | "human_support"
  | "general_query"
  | "unknown";

/** Intents that always require a human on WhatsApp. */
export const ESCALATION_INTENTS: Intent[] = [
  "payment_query",
  "technical_support",
  "human_support",
];

/** Phrases that force escalation regardless of the classified intent. */
const ESCALATION_PHRASES = [
  "refund",
  "money back",
  "paid but",
  "payment failed",
  "not received",
  "didn't receive",
  "didnt receive",
  "did not receive",
  "wrong name",
  "wrong spelling",
  "correct my",
  "correction",
  "missing certificate",
  "missing offer letter",
  "no access",
  "can't access",
  "cant access",
  "cannot access",
  "not able to login",
  "cannot login",
  "can't login",
  "account issue",
  "dispute",
  "complaint",
  "talk to human",
  "talk to a human",
  "real person",
  "speak to someone",
  "agent",
];

const INTENT_KEYWORDS: Array<{ intent: Intent; words: string[] }> = [
  { intent: "human_support", words: ["human", "agent", "support team", "whatsapp", "call me", "contact support"] },
  { intent: "certificate_verification", words: ["verify", "verification", "authenticate", "check certificate", "certificate id"] },
  { intent: "offer_letter_query", words: ["offer letter", "offerletter", "joining letter"] },
  { intent: "certificate_query", words: ["certificate", "completion letter", "lor", "recommendation"] },
  { intent: "internship_inquiry", words: ["internship", "intern", "stipend"] },
  { intent: "workshop_inquiry", words: ["workshop", "webinar", "bootcamp session"] },
  { intent: "training_inquiry", words: ["training", "training program", "mentor", "live class"] },
  { intent: "payment_query", words: ["payment", "paid", "fee", "fees", "price", "refund", "invoice", "transaction"] },
  { intent: "enrollment_query", words: ["enroll", "enrol", "register", "apply", "admission", "join"] },
  { intent: "technical_support", words: ["error", "not working", "bug", "loading", "login", "password", "access"] },
  { intent: "website_navigation", words: ["where", "page", "find", "navigate", "link", "dashboard"] },
  { intent: "course_inquiry", words: ["course", "courses", "syllabus", "curriculum", "duration", "python", "java", "learn"] },
  { intent: "general_query", words: ["what is", "about", "vaultofcourse", "who are you", "hello", "hi", "help"] },
];

export function classifyIntent(message: string): Intent {
  const text = message.toLowerCase();
  for (const { intent, words } of INTENT_KEYWORDS) {
    if (words.some((w) => text.includes(w))) return intent;
  }
  return "unknown";
}

export function needsEscalation(message: string, intent: Intent): boolean {
  const text = message.toLowerCase();
  if (ESCALATION_PHRASES.some((p) => text.includes(p))) return true;
  return ESCALATION_INTENTS.includes(intent);
}

/** Smart routing: intent -> suggested website page. */
export const INTENT_ROUTES: Partial<Record<Intent, { label: string; path: string }>> = {
  course_inquiry: { label: "Browse Courses", path: SITE_ROUTES.courses },
  training_inquiry: { label: "Training Programs", path: SITE_ROUTES.training },
  internship_inquiry: { label: "Internship Program", path: SITE_ROUTES.internships },
  workshop_inquiry: { label: "Workshops", path: SITE_ROUTES.workshops },
  certificate_query: { label: "Certificates", path: SITE_ROUTES.certificates },
  certificate_verification: { label: "Verify Certificate", path: SITE_ROUTES.verification },
  offer_letter_query: { label: "Offer Letters", path: SITE_ROUTES.offerLetters },
  enrollment_query: { label: "Browse Courses", path: SITE_ROUTES.courses },
  website_navigation: { label: "Contact & Help", path: SITE_ROUTES.support },
  general_query: { label: "Contact & Help", path: SITE_ROUTES.support },
};

export const QUICK_ACTIONS = [
  { emoji: "🎓", label: "Explore Courses", message: "What courses are available?" },
  { emoji: "💼", label: "Internship Information", message: "How do I apply for an internship?" },
  { emoji: "📜", label: "Certificate Verification", message: "Where can I verify my certificate?" },
  { emoji: "📄", label: "Offer Letter", message: "How do I get my offer letter?" },
  { emoji: "🏆", label: "Training Programs", message: "Tell me about the training programs." },
  { emoji: "❓", label: "General Help", message: "What is VaultOfCourse?" },
  { emoji: "💬", label: "Contact Support", message: "I want to talk to a human." },
] as const;

/** ------------------------------------------------------------------
 * Knowledge base — the ONLY source of truth for answers.
 * ------------------------------------------------------------------ */
export const KNOWLEDGE_BASE = {
  about:
    "VaultOfCourse is an online learning platform offering self-paced courses, mentor-led training programs, internship programs and live workshops for students and early-career professionals. Completion documents (certificates, offer letters) are issued from the student dashboard.",
  courses: [
    "Courses are self-paced with recorded lessons, downloadable resources and a final project.",
    "Course domains listed on the website: Web Development, Python Programming, Data Science, Java Programming, Artificial Intelligence & Machine Learning, Cyber Security, Cloud Computing, UI/UX Design.",
    "Every course page shows its own syllabus, duration and current fee. The assistant must always send users to the course page instead of quoting numbers.",
    "Course access is granted in the student dashboard immediately after successful enrollment confirmation.",
    "A completion certificate is issued after the final project is submitted and approved.",
  ],
  trainingPrograms: [
    "Training programs are mentor-led, cohort based and include live sessions, assignments and doubt-clearing.",
    "They are longer and more structured than self-paced courses and include a capstone project review.",
    "Batch dates, seat availability and fees are published on the Training Programs page.",
    "Participants receive a training completion certificate after the mentor approves the capstone project.",
  ],
  internships: [
    "Internships are project-based and remote-friendly, with tasks assigned in phases.",
    "Application flow: open the Internships page, choose a domain, submit the application form, then receive an offer letter after selection.",
    "After selection students receive an offer letter, task list, mentor support and an internship completion certificate on successful submission.",
    "Eligibility, duration and any applicable fee or stipend details are stated on the Internships page for each domain.",
  ],
  workshops: [
    "Workshops are short live sessions (usually 1-3 days) on focused topics.",
    "Registration is done from the Workshops page; the joining link is emailed before the session.",
    "Participation certificates are issued after attendance is confirmed.",
  ],
  certificates: [
    "Certificates available: course completion, training completion, internship completion and workshop participation.",
    "Certificates are downloadable as PDF from the student dashboard once eligibility criteria are met.",
    "Each certificate carries a unique certificate ID used for verification.",
    "Name corrections, missing certificates or reissue requests are handled only by the support team on WhatsApp.",
  ],
  offerLetters: [
    "Offer letters are issued for internship programs after an application is selected.",
    "The offer letter is available in the student dashboard and is also emailed to the registered email address.",
    "If an offer letter is missing or has incorrect details, the support team must review the case on WhatsApp.",
  ],
  verification: [
    "Anyone (including recruiters) can verify a VaultOfCourse document on the Verify Certificate page.",
    "Enter the certificate ID printed on the document to see the holder name, program and issue date.",
    "If verification shows no result, the support team should be contacted with the certificate ID on WhatsApp.",
  ],
  websitePages: [
    `Courses: ${SITE_ROUTES.courses}`,
    `Training Programs: ${SITE_ROUTES.training}`,
    `Internships: ${SITE_ROUTES.internships}`,
    `Workshops: ${SITE_ROUTES.workshops}`,
    `Certificates: ${SITE_ROUTES.certificates}`,
    `Verify Certificate: ${SITE_ROUTES.verification}`,
    `Offer Letter: ${SITE_ROUTES.offerLetters}`,
    `Contact & Support: ${SITE_ROUTES.support}`,
  ],
  supportProcess: [
    "First level support is this assistant, answering from the published knowledge base.",
    "Account-specific issues (payments, refunds, access, document corrections, disputes) are escalated to the human support team on WhatsApp.",
    "The assistant never confirms that an issue has been resolved and never accesses student accounts.",
  ],
} as const;

export const FAQ_DATASET: Array<{ q: string; a: string; intent: Intent }> = [
  {
    q: "What is VaultOfCourse?",
    a: "VaultOfCourse is an online learning platform offering self-paced courses, mentor-led training programs, internships and live workshops, with verifiable completion certificates.",
    intent: "general_query",
  },
  {
    q: "What courses are available?",
    a: "Course domains include Web Development, Python, Data Science, Java, AI & Machine Learning, Cyber Security, Cloud Computing and UI/UX Design. The Courses page lists each syllabus, duration and current fee.",
    intent: "course_inquiry",
  },
  {
    q: "How long is a course?",
    a: "Duration differs per course and is shown on that course's page, since all courses are self-paced.",
    intent: "course_inquiry",
  },
  {
    q: "What is the difference between a course and a training program?",
    a: "Courses are self-paced and recorded. Training programs are mentor-led cohorts with live sessions, assignments and a reviewed capstone project.",
    intent: "training_inquiry",
  },
  {
    q: "How do I apply for an internship?",
    a: "Open the Internships page, pick a domain and submit the application form. Selected applicants receive an offer letter with their task list.",
    intent: "internship_inquiry",
  },
  {
    q: "Do internships include a certificate?",
    a: "Yes, an internship completion certificate is issued after your assigned tasks are submitted and approved.",
    intent: "internship_inquiry",
  },
  {
    q: "How do I register for a workshop?",
    a: "Register on the Workshops page; the joining link is emailed to you before the session starts.",
    intent: "workshop_inquiry",
  },
  {
    q: "When do I get my certificate?",
    a: "After you meet the completion criteria for your program, the certificate becomes downloadable as a PDF from your student dashboard.",
    intent: "certificate_query",
  },
  {
    q: "Where can I verify my certificate?",
    a: "Use the Verify Certificate page and enter the certificate ID printed on your document.",
    intent: "certificate_verification",
  },
  {
    q: "How do I get my offer letter?",
    a: "Internship offer letters are issued after selection and are available in your dashboard as well as emailed to your registered address.",
    intent: "offer_letter_query",
  },
  {
    q: "How do I enroll in a course?",
    a: "Open the course page from the Courses list and complete the enrollment steps; access appears in your dashboard once enrollment is confirmed.",
    intent: "enrollment_query",
  },
  {
    q: "What are the course fees?",
    a: "Fees are published on each course, training and internship page, so please check the page for your program for the current amount.",
    intent: "payment_query",
  },
  {
    q: "I paid but didn't get access.",
    a: ESCALATION_MESSAGE,
    intent: "payment_query",
  },
  {
    q: "My certificate has the wrong name.",
    a: ESCALATION_MESSAGE,
    intent: "certificate_query",
  },
  {
    q: "I want to talk to a human.",
    a: "Sure — our support team can help you directly on WhatsApp.",
    intent: "human_support",
  },
];

/** Sample test queries used for manual QA of the assistant. */
export const TEST_QUERIES = [
  { query: "What courses are available?", expect: "course_inquiry → link to /courses" },
  { query: "How do I apply for an internship?", expect: "internship_inquiry → link to /internships" },
  { query: "Where can I verify my certificate?", expect: "certificate_verification → link to /verify-certificate" },
  { query: "My certificate has the wrong name.", expect: "escalate → WhatsApp" },
  { query: "I paid but didn't get access.", expect: "escalate → WhatsApp" },
  { query: "I want to talk to a human.", expect: "human_support → WhatsApp immediately" },
  { query: "Tell me about the Python course. What's its duration?", expect: "context memory → duration answer for Python" },
  { query: "Do you sell laptops?", expect: "unknown → escalation-style fallback" },
] as const;

export function buildKnowledgeContext(): string {
  const kb = KNOWLEDGE_BASE;
  const section = (title: string, lines: readonly string[]) =>
    `## ${title}\n${lines.map((l) => `- ${l}`).join("\n")}`;

  return [
    `## About VaultOfCourse\n- ${kb.about}`,
    section("Courses", kb.courses),
    section("Training Programs", kb.trainingPrograms),
    section("Internships", kb.internships),
    section("Workshops", kb.workshops),
    section("Certificates", kb.certificates),
    section("Offer Letters", kb.offerLetters),
    section("Certificate Verification", kb.verification),
    section("Website Pages", kb.websitePages),
    section("Support Process", kb.supportProcess),
    section(
      "FAQs",
      FAQ_DATASET.map((f) => `Q: ${f.q} A: ${f.a}`),
    ),
  ].join("\n\n");
}
