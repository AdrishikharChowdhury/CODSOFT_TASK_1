import { FeedbackCard } from "@/types/type";

export type LandingLink = {
  href: string;
  label: string;
  cta?: boolean;
};

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
