import { JobLinkItemProps } from "@/types/type";
import React from "react";

const JobLinkItem = ({ label, color, glyph }: JobLinkItemProps) => {
  return (
    <a
      href="#jobs"
      className={`inline-flex items-center gap-2 rounded-pills border border-carbon px-6 py-1.5 text-[12px] font-bold tracking-[0.03em] text-carbon transition-transform hover:-rotate-3 hover:scale-105 ${color}`}
    >
      <span className="font-lateral text-[10px] leading-none opacity-70">
        {glyph}
      </span>
      {label}
    </a>
  );
};

export default JobLinkItem;
