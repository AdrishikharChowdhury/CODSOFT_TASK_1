import React from "react";

export default function Banner() {
  return (
    <section className="relative z-10 flex h-screen w-full flex-col items-center justify-center gap-10 px-6 py-28 text-center sm:px-10" id="home">
      <div className="pointer-events-none absolute left-8 top-1/4 hidden rotate-[-8deg] lg:block">
        <span className="inline-flex size-14 items-center justify-center rounded-[20px] border border-carbon bg-ember text-[22px] font-bold">
          ✦
        </span>
      </div>
      <div className="pointer-events-none absolute right-10 top-1/3 hidden rotate-10 lg:block">
        <span className="inline-flex size-40 items-center justify-center rounded-[20px] border border-carbon bg-sunburst text-[18px] font-bold">
          ★
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-24 right-1/4 hidden -rotate-6 lg:block">
        <span className="inline-flex size-40 items-center justify-center rounded-[20px] border border-carbon bg-mint-pop text-[18px] font-bold">
          ✓
        </span>
      </div>

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