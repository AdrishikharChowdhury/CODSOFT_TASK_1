import { FeedbackCard } from '@/types/type';
import { AVATAR_COLORS } from '@/constants';

const FeedbackCardItem = ({ card, index }: { card: FeedbackCard; index: number }) => {
  return (
    <article className="mb-5 flex flex-col gap-3 rounded-cards border border-carbon bg-paper-white p-6">
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

export default FeedbackCardItem