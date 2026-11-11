import { JOB_VARIETIES } from "@/constants";
import React from "react";
import JobCard from "./JobCard";

export default function Jobs() {
  return (
    <section
      id="jobs"
      className="w-full h-screen rounded-2xl flex justify-center items-center"
    >
      <article className="bg-carbon h-92/100 w-full rounded-4xl flex flex-col items-center justify-center gap-10 px-6 py-14 sm:px-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="rounded-pills border border-paper-white/40 px-24 bg-lavender py-2 text-md uppercase tracking-[0.032em] text-black font-extrabold mb-4">
            Every flavor of work
          </p>
          <h2 className="font-lateral text-[clamp(40px,8vw,110px)] leading-[0.8] tracking-normal text-paper-white flex flex-col gap-6">
            <span>A GIG FOR</span>
            <span>EVERY STYLE</span>
          </h2>
          <p className="max-w-xl text-md font-medium leading-[1.39] tracking-[-0.01px] text-paper-white/80">
            Five varieties, one board. Whether you want a career anchor, a side
            mission or a fully remote life — there&apos;s an opening for it.
          </p>
        </div>

        <div className="grid w-full max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {JOB_VARIETIES.map(({ title, color, glyph, blurb, openings }) => (
            <JobCard
              key={title}
              title={title}
              color={color}
              glyph={glyph}
              blurb={blurb}
              openings={openings}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
