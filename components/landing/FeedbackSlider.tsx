import React from "react";

type FeedbackCard = {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
};

const TESTIMONIALS: FeedbackCard[] = [
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

const AVATAR_COLORS = [
  "bg-sunburst",
  "bg-mint-pop",
  "bg-lavender",
  "bg-electric-blue",
  "bg-ember",
];

function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-[15px] leading-none tracking-[0.2em]" aria-label={`${rating} out of 5 stars`}>
      <span className="text-ember">{"★".repeat(rating)}</span>
      <span className="text-carbon/25">{"★".repeat(5 - rating)}</span>
    </p>
  );
}

function FeedbackCardItem({ card, index }: { card: FeedbackCard; index: number }) {
  return (
    <article className="mb-5 flex flex-col gap-3 rounded-cards border border-carbon bg-paper-white p-6">
      <Stars rating={card.rating} />
      <p className="text-[14px] font-medium leading-[1.39] tracking-[-0.01px]">
        &ldquo;{card.text}&rdquo;
      </p>
      <footer className="mt-auto flex items-center gap-3 pt-1">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-cards border border-carbon font-lateral text-md leading-none ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
        >
          {card.name.charAt(0)}
        </span>
        <div>
          <h4 className="text-[14px] font-bold leading-[1.2] tracking-[-0.01px]">
            {card.name}
          </h4>
          <p className="text-[12px] font-medium leading-[1.56] tracking-[-0.01px] text-carbon/60">
            {card.role} at {card.company}
          </p>
        </div>
      </footer>
    </article>
  );
}

export function FeedbackSlider() {
  return (
    <div className="flex flex-col gap-4">

      <div className="group h-[400px] overflow-hidden" aria-roledescription="carousel">
        <div className="animate-marquee-y group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1 || undefined}>
              {TESTIMONIALS.map((card, index) => (
                <FeedbackCardItem key={card.id} card={card} index={index} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
