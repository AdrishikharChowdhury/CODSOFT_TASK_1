import Banner from "@/components/landing/Banner";
import FAQ from "@/components/landing/FAQ";
import HIW from "@/components/landing/HIW";
import Jobs from "@/components/landing/Jobs";
import React from "react";


export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Banner />
      <Jobs />
      <HIW />
      <FAQ />
    </div>
  );
}