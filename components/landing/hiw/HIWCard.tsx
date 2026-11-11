import { HIWCardProps } from "@/types/type";

const HIWCard = ({ numeral, color, title, body }: HIWCardProps) => {
  return (
    <article
      key={numeral}
      className="flex flex-col items-start gap-5 rounded-cards border border-carbon bg-paper-white p-16 h-full"
    >
      <span
        className={`flex size-25 items-center justify-center rounded-cards border border-carbon font-lateral text-[clamp(28px,4vw,44px)] leading-[0.8] ${color}`}
      >
        {numeral}
      </span>
      <h3 className="text-heading-sm font-bold leading-[1.1] tracking-[-0.01px]">
        {title}
      </h3>
      <p className="text-md font-medium leading-[1.39] tracking-[-0.01px]">
        {body}
      </p>
    </article>
  );
};

export default HIWCard;
