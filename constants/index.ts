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
  { href: "#join", label: "Get Started", cta: true },
];