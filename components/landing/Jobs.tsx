import React from "react";

const JOB_VARIETIES = [
  {
    glyph: "FT",
    title: "Full-Time",
    color: "bg-sunburst",
    blurb: "The intentional nine-to-five: real benefits, a real team, and a corner of the sticker universe to call home.",
    openings: "40+",
  },
  {
    glyph: "PT",
    title: "Part-Time",
    color: "bg-mint-pop",
    blurb: "Balanced by design — school, family or a side hustle gets equal billing with the work.",
    openings: "15+",
  },
  {
    glyph: "CT",
    title: "Contract",
    color: "bg-lavender",
    blurb: "Fixed-scope missions for craftspeople who ship hard and bounce clean.",
    openings: "12+",
  },
  {
    glyph: "IN",
    title: "Internship",
    color: "bg-electric-blue",
    blurb: "Green horns welcome. Mentorship-heavy roles to cut your teeth on.",
    openings: "8+",
  },
  {
    glyph: "RE",
    title: "Remote",
    color: "bg-voltage-violet",
    blurb: "Anywhere with Wi-Fi and a good chair. No commute, no compromise.",
    openings: "20+",
  },
];

export default function Jobs() {
  return (
    <section id="jobs" className="w-full h-screen rounded-2xl flex justify-center items-center">
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
            Five varieties, one board. Whether you want a career anchor, a
            side mission or a fully remote life — there&apos;s an opening for it.
          </p>
        </div>

        <div className="grid w-full max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {JOB_VARIETIES.map((variety) => (
            <article key={variety.title} className="flex flex-col gap-4 rounded-cards border border-carbon bg-paper-white p-6">
              <span
                className={`flex size-14 items-center justify-center rounded-[20px] border border-carbon font-lateral text-[18px] leading-none ${variety.color}`}
              >
                {variety.glyph}
              </span>
              <div>
                <h3 className="text-subheading font-bold leading-[1.2] tracking-[-0.01px]">
                  {variety.title}
                </h3>
                <p className="mt-2 text-[14px] font-medium leading-[1.39] tracking-[-0.01px]">
                  {variety.blurb}
                </p>
              </div>
              <span className="mt-auto inline-flex w-max items-center gap-1.5 rounded-pills border border-carbon bg-paper-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.032em]">
                {variety.openings} OPENINGS
              </span>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}