import Link from "next/link";
import {
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";

export default function SelectCurriculumPreview({ blok }: { blok: any }) {
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
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
          {blok.headline}
        </h2>
      )}

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
        {blok.cards?.map((card: any) => (
          <StoryblokServerComponent blok={card} key={card._uid} />
        ))}
      </div>

      {blok.cta_label && (
        <Link
          href={href}
          className="mt-12 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-cream  border borde-1 border-cream  transition hover:scale-x-110 "
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
    </section>
  );
}
