"use client";

import React, { useState } from "react";
import { FeedbackSlider } from "./FeedbackSlider";

const LABEL_CLASS = "mb-2 block text-[12px] font-bold uppercase tracking-[0.032em]";

const FIELD_CLASS =
  "w-full rounded-cards border border-carbon bg-paper-white px-5 py-3 text-[15px] font-medium tracking-[-0.01px] placeholder:text-carbon/40 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="flex h-screen w-full items-center justify-center">
      <div className="relative mx-auto flex min-h-9/10 w-full flex-col items-center justify-center gap-12 overflow-hidden rounded-4xl bg-lavender px-6 py-16 sm:px-10">
        <div className="pointer-events-none absolute left-10 top-14 hidden rotate-[-8deg] lg:block">
          <span className="inline-flex size-14 items-center justify-center rounded-[20px] border border-carbon bg-ember text-[22px] font-bold text-paper-white">
            ✉
          </span>
        </div>
        <div className="pointer-events-none absolute right-12 top-24 hidden rotate-10 lg:block">
          <span className="inline-flex size-16 items-center justify-center rounded-[20px] border border-carbon bg-sunburst text-[22px] font-bold">
            ✦
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-16 left-1/4 hidden rotate-6 lg:block">
          <span className="inline-flex size-12 items-center justify-center rounded-[20px] border border-carbon bg-mint-pop text-[18px] font-bold">
            ✓
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <p className="rounded-pills border border-carbon bg-paper-white px-24 py-2 text-[13px] font-bold uppercase tracking-[0.032em]">
            We reply within a day
          </p>
          <h2 className="font-lateral flex flex-col gap-6 text-[clamp(40px,8vw,110px)] leading-[0.8] tracking-normal">
            <span>GET IN</span>
            <span>TOUCH</span>
          </h2>
          <p className="max-w-xl text-[15px] font-medium leading-[1.39] tracking-[-0.01px]">
            Questions about a posting or your application? Drop a note — a real
            human from the board reads every message.
          </p>
        </div>

        <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2 lg:items-stretch">
          {submitted ? (
            <article className="flex w-full flex-col items-center justify-center gap-5 rounded-cards-elevated border border-carbon bg-paper-white p-10 text-center">
              <span className="flex size-16 items-center justify-center rounded-cards border border-carbon bg-mint-pop font-lateral text-[28px] leading-none">
                ✓
              </span>
              <h3 className="text-subheading font-bold leading-[1.2] tracking-[-0.01px]">
                Message clipped!
              </h3>
              <p className="text-[15px] font-medium leading-[1.39] tracking-[-0.01px] text-carbon/70">
                Thanks for reaching out — we&apos;ll get back to you within one
                business day.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="rounded-pills border border-carbon bg-paper-white px-24 py-3 text-[13px] font-bold tracking-[0.03em] transition-colors hover:bg-soft-mist"
              >
                SEND ANOTHER
              </button>
            </article>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-cards-elevated border border-carbon bg-paper-white p-8 sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={LABEL_CLASS}>Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Applicant"
                    className={FIELD_CLASS}
                  />
                </label>
                <label className="block">
                  <span className={LABEL_CLASS}>Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@example.com"
                    className={FIELD_CLASS}
                  />
                </label>
              </div>
              <label className="mt-5 block">
                <span className={LABEL_CLASS}>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us what you need help with..."
                  className={`${FIELD_CLASS} resize-none`}
                />
              </label>
              <button
                type="submit"
                className="mt-8 w-full rounded-pills bg-carbon px-24 py-3 text-[15px] font-extrabold tracking-[0.03em] text-paper-white transition-opacity hover:opacity-80 sm:w-max"
              >
                SEND MESSAGE
              </button>
            </form>
          )}

          <FeedbackSlider />
        </div>
      </div>
    </section>
  );
}
