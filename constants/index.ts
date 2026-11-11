import { FeedbackCard, LandingLink } from "@/types/type";

export const landingLinks: LandingLink[] = [
  { href: "#home", label: "Home" },
  { href: "#jobs", label: "Jobs" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
  { href: "/sign-up", label: "Get Started", cta: true },
];

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "textarea";
  placeholder: string;
  hint?: string;
};

export const EMPLOYEE_FORM_FIELDS: FormField[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Jane Applicant" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "jane@example.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "At least 8 characters",
  },
  {
    name: "jobTitle",
    label: "Job Title",
    type: "text",
    placeholder: "Product Designer",
  },
  {
    name: "skills",
    label: "Skills",
    type: "text",
    placeholder: "Figma, Prototyping, Research",
    hint: "Separate skills with commas",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell employers what you ship...",
  },
];

export const EMPLOYER_FORM_FIELDS: FormField[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Alex Recruiter" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "alex@company.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "At least 8 characters",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Nova Studio",
  },
  {
    name: "bio",
    label: "About the Company",
    type: "textarea",
    placeholder: "What does your team build?",
  },
];

export const TESTIMONIALS: FeedbackCard[] = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Designer",
    company: "Nova Studio",
    text: "The pastel aesthetic and inflated type made me feel immediately creative. Best job board I've used this year.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mike R.",
    role: "Developer",
    company: "Sticker Labs",
    text: "Great platform for finding design-focused roles. The card-based interface is intuitive and applying takes under a minute.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emma K.",
    role: "Product Manager",
    company: "Pastel Pay",
    text: "I love how the sticker theme isn't gimmicky — it's functional, clean, and the card layouts are well-structured.",
    rating: 5,
  },
  {
    id: 4,
    name: "David L.",
    role: "Writer",
    company: "Confetti Co",
    text: "Finally a job board that feels like art, not a spreadsheet. Tracking my application status is genuinely delightful.",
    rating: 4,
  },
  {
    id: 5,
    name: "Lisa T.",
    role: "Marketing",
    company: "Ribbon Cloud",
    text: "As a designer, the whole vibe resonates with me. Would love to see more roles added regularly.",
    rating: 5,
  },
];

export const AVATAR_COLORS = [
  "bg-sunburst",
  "bg-mint-pop",
  "bg-lavender",
  "bg-electric-blue",
  "bg-ember",
];

export const MARQUEE_ITEMS = [
  "Find the perfect job for you",
  "New roles added daily",
  "Apply in under a minute",
  "Track every application",
];

export const NAVIGATE_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#jobs", label: "Jobs" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const JOB_TYPE_LINKS = [
  { label: "Full-Time", glyph: "FT", color: "bg-sunburst" },
  { label: "Part-Time", glyph: "PT", color: "bg-mint-pop" },
  { label: "Contract", glyph: "CT", color: "bg-lavender" },
  { label: "Internship", glyph: "IN", color: "bg-electric-blue" },
  { label: "Remote", glyph: "RE", color: "bg-voltage-violet" },
];

export const COLUMN_TITLE_CLASS =
  "mb-4 text-[12px] font-bold uppercase tracking-[0.032em] text-paper-white/50";

export const LINK_CLASS =
  "text-[14px] font-medium tracking-[-0.01px] text-paper-white/70 transition-colors hover:text-paper-white";

export const FAQ_ITEMS = [
  {
    question: "Is GigClip free to use?",
    answer:
      "Yes. Candidates pay nothing, ever. Posting a job is also free during the demo — the whole board runs on stickers and good intentions.",
  },
  {
    question: "What do I need to apply for a job?",
    answer:
      "Just one resume (PDF, DOC/DOCX, TXT or ODT, under 5 MB) and an optional cover note. The whole application takes under a minute.",
  },
  {
    question: "How do employers review applications?",
    answer:
      "Every application lands on the employer's desk with the resume attached. They move it through statuses — submitted, reviewing, interview, offered — and you get an email + in-app alert on every change.",
  },
  {
    question: "Can I use GigClip on my phone?",
    answer:
      "Absolutely. The entire site is mobile-first — search, apply, post and review from any screen size, pill buttons included.",
  },
  {
    question: "Is my resume safe?",
    answer:
      "Your resume lives only on your profile and is visible to the employer of the job you applied to. Nothing is shared publicly, ever.",
  },
  {
    question: "How do I try the demo?",
    answer:
      "Use employer@demo.com or candidate@demo.com with password demo1234 — both roles are pre-loaded with sample data so you can click around instantly.",
  },
];

export const STEPS = [
  {
    numeral: "01",
    title: "SEARCH",
    color: "bg-sunburst",
    body: "Type a keyword, pick a location and filter by full-time, remote or contract — the board narrows down to your match.",
  },
  {
    numeral: "02",
    title: "CLIP & APPLY",
    color: "bg-mint-pop",
    body: "Attach one resume and a short note. Your application clips straight onto the employer's board in under a minute.",
  },
  {
    numeral: "03",
    title: "GET UPDATES",
    color: "bg-lavender",
    body: "Track submitted → reviewing → interview → offered. Email and in-app alerts land the moment the status changes.",
  },
];

export const JOB_VARIETIES = [
  {
    glyph: "FT",
    title: "Full-Time",
    color: "bg-sunburst",
    blurb: "The intentional nine-to-five: real benefits, a real team, and a corner of the sticker universe to call home.",
    openings: "40+",
  },
  {
    glyph: "PT",
    title: "Part-Time",
    color: "bg-mint-pop",
    blurb: "Balanced by design — school, family or a side hustle gets equal billing with the work.",
    openings: "15+",
  },
  {
    glyph: "CT",
    title: "Contract",
    color: "bg-lavender",
    blurb: "Fixed-scope missions for craftspeople who ship hard and bounce clean.",
    openings: "12+",
  },
  {
    glyph: "IN",
    title: "Internship",
    color: "bg-electric-blue",
    blurb: "Green horns welcome. Mentorship-heavy roles to cut your teeth on.",
    openings: "8+",
  },
  {
    glyph: "RE",
    title: "Remote",
    color: "bg-voltage-violet",
    blurb: "Anywhere with Wi-Fi and a good chair. No commute, no compromise.",
    openings: "20+",
  },
];


export const LABEL_CLASS = "mb-2 block text-[12px] font-bold uppercase tracking-[0.032em]";

export const FIELD_CLASS =
  "w-full rounded-cards border border-carbon bg-paper-white px-5 py-3 text-[15px] font-medium tracking-[-0.01px] placeholder:text-carbon/40 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";