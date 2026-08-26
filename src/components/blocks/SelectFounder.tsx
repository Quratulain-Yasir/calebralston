import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function SelectFounder({ blok }: { blok: any }) {
  const href = blok.cta_link?.url || blok.cta_link?.cached_url || "#";
  const bullets = blok.bullets ? blok.bullets.split("\n").filter(Boolean) : [];

  function optimizedSrc(url: string) {
    return `${url}/m/1200x0`;
  }

  return (
    <article
      {...storyblokEditable(blok)}
      className="grid w-full grid-cols-1 gap-8 rounded-2xl bg-ink-deep px-5 py-10 sm:px-8 md:grid-cols-2 md:items-center md:gap-14 md:px-10 md:py-14 [&:nth-child(even)>div:first-child]:md:order-2 [&:nth-child(even)>div:last-child]:md:order-1"
    >
      <div>
        {blok.eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-cream sm:text-sm">
            {blok.eyebrow}
          </p>
        )}
        {blok.name && (
          <h2 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            {blok.name}
          </h2>
        )}
        {blok.bio && (
          <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
            {blok.bio}
          </p>
        )}

        {bullets.length > 0 && (
          <ul className="mt-6 flex flex-col gap-3">
            {bullets.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs text-ink">
                  ✓
                </span>
                <span className="text-base sm:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {blok.cta_label && (
          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-bold text-cream border borde-1 border-cream transition hover:opacity-90"
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

      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-cream">
        {blok.photo?.filename && (
          <Image
            src={optimizedSrc(blok.photo.filename)}
            alt={blok.photo.alt || blok.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
    </article>
  );
}
