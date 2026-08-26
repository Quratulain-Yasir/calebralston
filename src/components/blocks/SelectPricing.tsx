import Link from "next/link";
import {
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";

export default function SelectPricing({ blok }: { blok: any }) {
  const href = blok.cta_link?.url || blok.cta_link?.cached_url || "#";

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-ink-deep px-5 py-16 text-center sm:px-8 md:py-24"
    >
      {blok.eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-cream sm:text-sm">
          {blok.eyebrow}
        </p>
      )}
      {blok.headline && (
        <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
          {blok.headline}
        </h2>
      )}

      <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-3 border-white bg-ink-deep-soft p-6 sm:p-10 md:p-14">
        {blok.enrollment_note && (
          <p className="text-sm font-semibold text-cream sm:text-base">
            {blok.enrollment_note}
          </p>
        )}

        {blok.price && (
          <p className="mt-4 font-display text-5xl font-bold text-white sm:text-6xl">
            {blok.price}
          </p>
        )}
        {blok.price_note && (
          <p className="mt-1 text-base text-white/60 sm:text-lg">
            {blok.price_note}
          </p>
        )}

        {blok.description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
            {blok.description}
          </p>
        )}

        {blok.features?.length > 0 && (
          <div className="mt-8 flex flex-col gap-4">
            {blok.features.map((feature: any) => (
              <StoryblokServerComponent blok={feature} key={feature._uid} />
            ))}
          </div>
        )}

        {blok.cta_label && (
          <Link
            href={href}
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-lg font-bold text-cream border border-1 border-cream transition hover:opacity-90"
          >
            {blok.cta_label}{" "}
            <svg
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
