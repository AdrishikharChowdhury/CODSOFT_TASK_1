import { FAQ_ITEMS } from "@/constants";
import React from "react";
import FAQCard from "./FAQCard";

export default function FAQ() {
  return (
    <section id="faq" className="flex w-full items-center h-screen">
      <div className="mx-auto flex w-full max-w-9xl h-9/10 px-6 py-24 sm:px-10 flex-col items-center gap-12 justify-center bg-mint-pop rounded-4xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="rounded-pills border border-carbon bg-sky-wash px-24 py-2 text-md font-bold uppercase tracking-[0.032em]">
            Quick answers
          </p>
          <h2 className="font-lateral text-[clamp(40px,8vw,110px)] leading-[0.8] tracking-normal flex flex-col gap-6 mb-17">
            <span>ANY</span>
            <span>QUESTIONS?</span>
          </h2>
        </div>

        <div className="grid w-full gap-5 md:grid-cols-2">
          {FAQ_ITEMS.map(({ question, answer }, index) => (
            <FAQCard
              question={question}
              answer={answer}
              index={index}
              key={question}
            />
          ))}
        </div>

        <p className="text-[14px] font-medium leading-[1.39]">
          Still curious?{" "}
          <a href="#contact" className="font-bold underline underline-offset-4">
            Drop us a line →
          </a>
        </p>
      </div>
    </section>
  );
}
