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

export type JobCardProps = {
  title: string;
  color: string;
  glyph: string;
  blurb: string;
  openings: string;
};

export type HIWCardProps = {
  numeral: string;
  title: string;
  body: string;
  color: string;
};

export type FAQCardProps = {
  question: string;
  index: number;
  answer: string;
};

export type SubmittedCardProps = {
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ContactFormProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export type FooterNavProps = {
  href: string;
  label: string;
};

export type JobLinkItemProps = {
  label: string;
  color: string;
  glyph: string;
};
