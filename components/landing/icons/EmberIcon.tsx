import { IconProps } from "@/types/type";
import React from "react";

const EmberIcon = ({ icon, position, color }: IconProps) => {
  return (
    <div
      className={`pointer-events-none absolute ${position} hidden rotate-[-8deg] lg:block`}
    >
      <span
        className={`inline-flex size-14 items-center justify-center rounded-[20px] border border-carbon bg-ember text-[22px] font-bold text-${color}`}
      >
        {icon}
      </span>
    </div>
  );
};

export default EmberIcon;
