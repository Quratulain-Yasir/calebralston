import Image from "next/image";
import Link from "next/link";
import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";

function optimizedSrc(url: string) {
  return `${url}/m/1200x0`;
}

export default function AboutHero({ blok }: { blok: any }) {
  const href =
    blok.linkedin_link?.url || blok.linkedin_link?.cached_url || "#";
  const html = blok.body?.content?.length ? renderRichText(blok.body) : "";

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-white px-5 py-12 sm:px-8 md:py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
        {/* Text column */}
        <div>
          {blok.headline && (
            <h1 className="font-display text-5xl font-bold text-ink sm:text-6xl md:text-7xl">
              {blok.headline}
            </h1>
          )}

          {blok.intro_note && (
            <p className="mt-8 text-lg font-bold leading-relaxed text-ink sm:text-xl">
              {blok.intro_note}
            </p>
          )}

          {html && (
            <div
              className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-ink sm:text-lg [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}

          {blok.linkedin_label && (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex items-center gap-4 rounded-xl bg-sage-dark px-6 py-5 font-bold text-white transition hover:opacity-90 sm:px-8 sm:py-6"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white/20 text-sm">
                in
              </span>
              <span className="text-base sm:text-lg">
                {blok.linkedin_label}
              </span>
            </Link>
          )}
        </div>

        {/* Image column */}
        <div className="md:sticky md:top-8 md:h-[calc(100vh-4rem)]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:h-full md:aspect-auto">
            {blok.photo?.filename && (
              <Image
                src={optimizedSrc(blok.photo.filename)}
                alt={blok.photo.alt || blok.headline}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}