"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { landingLinks } from "@/constants";

export default function Navbar() {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const ids = landingLinks.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
    setActiveHref(href);
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 bg-transparent px-6 py-4 sm:px-10">
      <Image src="/logo.svg" alt="GigClip logo" width={120} height={60} priority />

      <div className="flex items-center gap-2">
        {landingLinks.map((link) => {
          const active = activeHref === link.href;
          const base =
            "w-max whitespace-nowrap rounded-pills border border-carbon px-6 py-2.5 text-center text-md font-bold tracking-[0.03em] transition-colors sm:px-24";
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={
                link.cta
                  ? `${base} ${
                      active
                        ? "bg-sunburst text-carbon"
                        : "bg-carbon text-paper-white hover:opacity-80"
                    }`
                  : `${base} ${
                      active
                        ? "bg-sunburst text-carbon"
                        : "bg-paper-white text-carbon hover:bg-soft-mist"
                    }`
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}