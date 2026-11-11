export type FeedbackCard = {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
};

export type LandingLink = {
  href: string;
  label: string;
  cta?: boolean;
};

export type IconProps = {
  icon: string;
  position: string;
  color: string;
};