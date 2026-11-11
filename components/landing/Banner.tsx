import React from "react";
import EmberIcon from "./icons/EmberIcon";
import SunburstIcon from "./icons/SunburstIcon";
import MintIcon from "./icons/MintIcon";

export default function Banner() {
  return (
    <section className="relative z-10 flex h-screen w-full flex-col items-center justify-center gap-10 px-6 py-28 text-center sm:px-10" id="home">
      
      <EmberIcon position="left-8 top-1/4" icon="✦" color="black" />
      <SunburstIcon position="right-10 top-1/3" icon="★" color="black" />
      <MintIcon position="bottom-24 right-1/4" icon="✓" color="black" />
      
      <p className="rounded-pills border border-carbon bg-paper-white/90 px-24 py-2 text-md font-extrabold uppercase tracking-[0.032em]">
        GigClip · New roles added daily
      </p>

      <h1 className="max-w-[10ch] font-lateral text-[clamp(52px,11vw,170px)] leading-display tracking-normal">
        FIND THE
        <br />
        PERFECT JOB
        <br />
        FOR YOU
      </h1>

      <p className="max-w-xl text-subheading font-medium leading-[1.2] tracking-[-0.01px]">
        Search the pastel board, clip on your resume and apply in under a
        minute — employers reply with lightning speed.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="#jobs"
          className="rounded-pills bg-carbon px-24 py-3 text-[13px] font-bold tracking-[0.03em] text-paper-white transition-opacity hover:opacity-80"
        >
          BROWSE JOBS
        </a>
        <a
          href="#join"
          className="rounded-pills border border-carbon bg-paper-white px-24 py-3 text-[13px] font-bold tracking-[0.03em] transition-colors hover:bg-soft-mist"
        >
          POST A JOB
        </a>
      </div>
    </section>
  );
}