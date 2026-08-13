import React from "react";

const FAQ_ITEMS = [
  {
    question: "Is GigClip free to use?",
    answer:
      "Yes. Candidates pay nothing, ever. Posting a job is also free during the demo — the whole board runs on stickers and good intentions.",
  },
  {
    question: "What do I need to apply for a job?",
    answer:
      "Just one resume (PDF, DOC/DOCX, TXT or ODT, under 5 MB) and an optional cover note. The whole application takes under a minute.",
  },
  {
    question: "How do employers review applications?",
    answer:
      "Every application lands on the employer's desk with the resume attached. They move it through statuses — submitted, reviewing, interview, offered — and you get an email + in-app alert on every change.",
  },
  {
    question: "Can I use GigClip on my phone?",
    answer:
      "Absolutely. The entire site is mobile-first — search, apply, post and review from any screen size, pill buttons included.",
  },
  {
    question: "Is my resume safe?",
    answer:
      "Your resume lives only on your profile and is visible to the employer of the job you applied to. Nothing is shared publicly, ever.",
  },
  {
    question: "How do I try the demo?",
    answer:
      "Use employer@demo.com or candidate@demo.com with password demo1234 — both roles are pre-loaded with sample data so you can click around instantly.",
  },
];

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
          {FAQ_ITEMS.map((item, index) => (
            <article
              key={item.question}
              className="flex items-start gap-4 rounded-cards border border-carbon bg-paper-white p-6"
            >
              
              <div>
                <h3 className="text-subheading font-bold leading-[1.2] tracking-[-0.01px] flex gap-5 items-center">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-[20px] border border-carbon font-lateral text-md leading-none ${
                      ["bg-sunburst", "bg-mint-pop", "bg-lavender", "bg-electric-blue", "bg-ember", "bg-voltage-violet"][index % 6]
                    }`}
                  >
                    ?
                  </span>
                  <span>{item.question}</span>
                </h3>
                <p className="mt-2 text-[14px] font-medium leading-[1.39] tracking-[-0.01px]">
                  {item.answer}
                </p>
              </div>
            </article>
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