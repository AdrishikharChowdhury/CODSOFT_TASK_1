import { STEPS } from "@/constants";
import React from "react";
import HIWCard from "./HIWCard";

export default function HIW() {
  return (
    <section
      id="how-it-works"
      className="flex w-full h-screen items-center  px-6 py-24 sm:px-10 justify-center"
    >
      <div className="mx-auto flex w-full px-6 rounded-4xl h-9/10 flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="rounded-pills border border-carbon bg-ember px-24 py-2 text-md text-white font-bold uppercase tracking-[0.032em] mb-6">
            Three steps, zero noise
          </p>
          <h2 className="font-lateral text-[clamp(40px,8vw,110px)] leading-[0.8] tracking-normal mb-4 flex flex-col justify-center items-center gap-6">
            <span>HOW IT</span>
            <span>WORKS</span>
          </h2>
          <p className="max-w-xl text-md font-medium leading-[1.39] tracking-[-0.01px] mb-6">
            From first search to first offer — the whole ride takes less time
            than a coffee.
          </p>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-3 h-1/3 mb-6">
          {STEPS.map(({ numeral, color, title, body }) => (
            <HIWCard
              key={numeral}
              color={color}
              numeral={numeral}
              title={title}
              body={body}
            />
          ))}
        </div>

        <a
          href="#join"
          className="rounded-pills bg-carbon px-24 py-3 text-md font-extrabold tracking-[0.03em] text-paper-white transition-opacity hover:opacity-80"
        >
          READY TO CLIP?
        </a>
      </div>
    </section>
  );
}
