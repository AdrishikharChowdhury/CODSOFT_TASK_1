import {
  JOB_TYPE_LINKS,
  MARQUEE_ITEMS,
  NAVIGATE_LINKS,
  COLUMN_TITLE_CLASS,
} from "@/constants";
import FooterNav from "./FooterNav";
import JobLinkItem from "./JobLinkItem";

export default function Footer() {
  return (
    <footer
      id="join"
      className="w-full overflow-hidden rounded-t-4xl bg-carbon"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-8 pb-12 pt-14 sm:px-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full border border-carbon bg-paper-white font-lateral text-xl leading-none text-carbon">
              G
            </span>
            <span className="font-lateral text-2xl leading-none tracking-normal text-paper-white">
              GigClip
            </span>
          </div>
          <p className="max-w-xs text-left text-[14px] font-medium leading-[1.39] tracking-[-0.01px] text-paper-white/70">
            The pastel board where candidates clip on a resume and apply in
            under a minute — and employers reply fast.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className={COLUMN_TITLE_CLASS}>Navigate</h3>
          <ul className="flex flex-col items-start gap-3">
            {NAVIGATE_LINKS.map(({ href, label }) => (
              <FooterNav key={href} href={href} label={label} />
            ))}
          </ul>
        </nav>

        <nav aria-label="Job types">
          <h3 className={COLUMN_TITLE_CLASS}>Find Work</h3>
          <div className="flex flex-wrap gap-2">
            {JOB_TYPE_LINKS.map(({ label, color, glyph }) => (
              <JobLinkItem
                key={label}
                label={label}
                color={color}
                glyph={glyph}
              />
            ))}
            <a
              href="#contact"
              className="inline-flex items-center rounded-pills border border-paper-white/40 bg-transparent px-6 py-1.5 text-caption font-bold tracking-[0.03em] text-paper-white transition-colors hover:bg-paper-white hover:text-carbon"
            >
              Post a Job →
            </a>
          </div>
        </nav>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 border-t border-paper-white/20 px-8 py-5 sm:flex-row sm:px-12">
        <p className="text-[12px] font-medium tracking-[-0.01px] text-paper-white/60">
          © 2026 GigClip. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#home"
            className="text-[12px] font-medium tracking-[-0.01px] text-paper-white/70 transition-colors hover:text-paper-white"
          >
            Privacy
          </a>
          <a
            href="#home"
            className="text-[12px] font-medium tracking-[-0.01px] text-paper-white/70 transition-colors hover:text-paper-white"
          >
            Terms
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="flex size-9 items-center justify-center rounded-pills border border-paper-white/40 bg-transparent text-sm font-bold text-paper-white transition-colors hover:bg-paper-white hover:text-carbon"
          >
            ↑
          </a>
        </div>
      </div>

      <div
        className="animate-marquee-x flex w-max bg-sunburst py-3 w-full"
        aria-hidden="true"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center gap-6 whitespace-nowrap px-6 text-[13px] font-bold uppercase tracking-[0.032em] text-carbon"
              >
                {item}
                <span>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
