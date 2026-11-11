"use client";

import React, { useState } from "react";
import { FeedbackSlider } from "./FeedbackSlider";
import EmberIcon from "../icons/EmberIcon";
import SunburstIcon from "../icons/SunburstIcon";
import MintIcon from "../icons/MintIcon";
import SubmittedCard from "./SubmittedCard";
import ContactForm from "./ContactForm";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="flex h-screen w-full items-center justify-center"
    >
      <div className="relative mx-auto flex min-h-9/10 w-full flex-col items-center justify-center gap-12 overflow-hidden rounded-4xl px-6 py-16 sm:px-10">
        <EmberIcon color="white" position="left-10 top-14" icon="✉" />
        <SunburstIcon color="black" position="right-12 top-24" icon="✦" />
        <MintIcon color="black" position="bottom-16 left-1/4" icon="✓" />

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
            <SubmittedCard setSubmitted={setSubmitted} />
          ) : (
            <ContactForm handleSubmit={handleSubmit}/>
          )}

          <FeedbackSlider />
        </div>
      </div>
    </section>
  );
}
