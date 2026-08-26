import Link from "next/link";
import {
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";

export default function SelectFaq({ blok }: { blok: any }) {
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

      <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4">
        {blok.items?.map((item: any) => (
          <StoryblokServerComponent blok={item} key={item._uid} />
        ))}
      </div>

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

      {blok.disclaimer && (
        <p className="mx-auto mt-10 max-w-3xl whitespace-pre-line text-xs leading-relaxed text-white/50 sm:text-sm">
          {blok.disclaimer}
        </p>
      )}
    </section>
  );
}
