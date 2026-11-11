import { IconProps } from "@/types/type";
import React from "react";

const SunburstIcon = ({ icon, position, color }: IconProps) => {
  return (
    <div
      className={`pointer-events-none absolute ${position} hidden rotate-10 lg:block`}
    >
      <span
        className={`inline-flex size-40 items-center justify-center rounded-[20px] border border-carbon bg-sunburst text-[18px] font-bold text-${color}`}
      >
        {icon}
      </span>
    </div>
  );
};

export default SunburstIcon;
