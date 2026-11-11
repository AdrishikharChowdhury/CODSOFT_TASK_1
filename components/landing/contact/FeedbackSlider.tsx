import { TESTIMONIALS } from "@/constants";
import FeedbackCardItem from "./FeedbackCardItem";

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
