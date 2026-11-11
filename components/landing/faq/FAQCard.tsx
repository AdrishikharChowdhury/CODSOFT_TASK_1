import { FAQCardProps } from "@/types/type";
import React from "react";

const FAQCard = ({ question, index, answer }: FAQCardProps) => {
  return (
    <article
      
      className="flex items-start gap-4 rounded-cards border border-carbon bg-paper-white p-6"
    >
      <div>
        <h3 className="text-subheading font-bold leading-[1.2] tracking-[-0.01px] flex gap-5 items-center">
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-[20px] border border-carbon font-lateral text-md leading-none ${
              [
                "bg-sunburst",
                "bg-mint-pop",
                "bg-lavender",
                "bg-electric-blue",
                "bg-ember",
                "bg-voltage-violet",
              ][index % 6]
            }`}
          >
            ?
          </span>
          <span>{question}</span>
        </h3>
        <p className="mt-2 text-[14px] font-medium leading-[1.39] tracking-[-0.01px]">
          {answer}
        </p>
      </div>
    </article>
  );
};

export default FAQCard;
