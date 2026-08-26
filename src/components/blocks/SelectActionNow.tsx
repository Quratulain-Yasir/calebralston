import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function SelectActionNow({ blok }: { blok: any }) {
  const href = blok.cta_link?.url || blok.cta_link?.cached_url || "#";

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-ink-deep px-5 py-16 text-center sm:px-8 md:py-24"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-2 border-white bg-primary p-6 sm:p-10 md:p-14">
        {blok.eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-cream sm:text-sm">
            {blok.eyebrow}
          </p>
        )}
        {blok.headline && (
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            {blok.headline}
          </h2>
        )}
        {blok.description && (
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            {blok.description}
          </p>
        )}
        {blok.cta_label && (
          <Link
            href={href}
            className="mt-8 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-lg bg-ink-deep border border-cream px-4 py-4 font-bold text-white transition hover:opacity-90 text-lg"
          >
            {blok.cta_label}           <svg
              width="9"
              height="11"
              viewBox="0 0 10 12"
              fill="currentColor"
              aria-hidden
            >
              <path d="M0 0l10 6-10 6z" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  );
}