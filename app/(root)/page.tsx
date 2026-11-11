import Banner from "@/components/landing/Banner";
import Contact from "@/components/landing/contact/Contact";
import FAQ from "@/components/landing/faq/FAQ";
import HIW from "@/components/landing/hiw/HIW";
import Jobs from "@/components/landing/jobs/Jobs";
import React from "react";


export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Banner />
      <Jobs />
      <HIW />
      <FAQ />
      <Contact/>
    </div>
  );
}