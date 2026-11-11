"use client";
import { SubmittedCardProps } from "@/types/type";
import React from "react";

const SubmittedCard = ({ setSubmitted }: SubmittedCardProps) => {
  return (
    <article className="flex w-full flex-col items-center justify-center gap-5 rounded-cards-elevated border border-carbon bg-paper-white p-10 text-center">
      <span className="flex size-16 items-center justify-center rounded-cards border border-carbon bg-mint-pop font-lateral text-[28px] leading-none">
        ✓
      </span>
      <h3 className="text-subheading font-bold leading-[1.2] tracking-[-0.01px]">
        Message clipped!
      </h3>
      <p className="text-[15px] font-medium leading-[1.39] tracking-[-0.01px] text-carbon/70">
        Thanks for reaching out — we&apos;ll get back to you within one business
        day.
      </p>
      <button
        type="button"
        onClick={() => setSubmitted(false)}
        className="rounded-pills border border-carbon bg-paper-white px-24 py-3 text-[13px] font-bold tracking-[0.03em] transition-colors hover:bg-soft-mist"
      >
        SEND ANOTHER
      </button>
    </article>
  );
};

export default SubmittedCard;
