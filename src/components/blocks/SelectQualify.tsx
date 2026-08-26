import Link from "next/link";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function SelectQualify({ blok }: { blok: any }) {
  const href = blok.top_cta_link?.url || blok.top_cta_link?.cached_url || "#";

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-ink-deep px-5 py-16 text-center sm:px-8 sm:py-20 md:py-24"
    >
      {blok.top_cta_label && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-sage-dark px-6 py-3 font-light text-cream transition hover:opacity-90 uppercase"
        >
          {blok.top_cta_label}
        </Link>
      )}

      {blok.eyebrow && (
        <p className="mt-14 text-xs font-bold uppercase tracking-widest text-cream sm:text-sm">
          {blok.eyebrow}
        </p>
      )}

      {blok.headline && (
        <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
          {blok.headline}
        </h2>
      )}

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-5">
        {blok.cards?.map((card: any) => (
          <StoryblokServerComponent blok={card} key={card._uid} />
        ))}
      </div>

      {blok.footer_note && (
        <p className="mx-auto mt-10 max-w-2xl whitespace-pre-line text-base font-semibold italic text-cream sm:text-lg">
          {blok.footer_note}
        </p>
      )}
    </section>
  );
}