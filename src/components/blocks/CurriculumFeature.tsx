import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function CurriculumFeature({ blok }: { blok: any }) {
  const href = blok.cta_link?.url || blok.cta_link?.cached_url || "#";
  const bullets = blok.bullets
    ? blok.bullets.split("\n").filter(Boolean)
    : [];

    function optimizedSrc(url: string) {
  return `${url}/m/1200x0`;
}

  return (
    <div
      {...storyblokEditable(blok)}
      className="grid w-full grid-cols-1 items-center gap-8 rounded-2xl border border-1 border-cream bg-primary p-6 sm:p-8 md:grid-cols-2 md:gap-14 md:p-10"
    >
      <div>
        {blok.title && (
          <h3 className="whitespace-pre-line font-display text-3xl font-bold text-white sm:text-4xl">
            {blok.title}
          </h3>
        )}
        {blok.subtitle && (
          <p className="mt-4 text-base italic text-white/70 sm:text-lg">
            {blok.subtitle}
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
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sage-dark px-6 py-3 font-bold text-white transition hover:opacity-90"
          >
            {blok.cta_label} ▶
          </Link>
        )}
      </div>

      {blok.image?.filename && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={optimizedSrc(blok.image.filename)}
            alt={blok.image.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}