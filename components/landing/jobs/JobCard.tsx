import React from "react";

export type JobCardProps = {
  title: string;
  color: string;
  glyph: string;
  blurb: string;
  openings: string;
};

const JobCard = ({ title, color, glyph, blurb, openings }: JobCardProps) => {
  return (
    <article
      className="flex flex-col gap-4 rounded-cards border border-carbon bg-paper-white p-6"
    >
      <span
        className={`flex size-14 items-center justify-center rounded-[20px] border border-carbon font-lateral text-[18px] leading-none ${color}`}
      >
        {glyph}
      </span>
      <div>
        <h3 className="text-subheading font-bold leading-[1.2] tracking-[-0.01px]">
          {title}
        </h3>
        <p className="mt-2 text-[14px] font-medium leading-[1.39] tracking-[-0.01px]">
          {blurb}
        </p>
      </div>
      <span className="mt-auto inline-flex w-max items-center gap-1.5 rounded-pills border border-carbon bg-paper-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.032em]">
        {openings} OPENINGS
      </span>
    </article>
  );
};

export default JobCard;
