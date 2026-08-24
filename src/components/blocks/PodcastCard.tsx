import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { sbUrl } from "@/components/ui/Button";

export default function PodcastCard({ blok }: { blok: any }) {
  return (
    <a
      {...storyblokEditable(blok)}
      href={sbUrl(blok.video_url)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[16/11] overflow-hidden bg-ink md:aspect-[16/10]"
    >
      {blok.thumbnail?.filename && (
        <Image
          src={blok.thumbnail.filename}
          alt={blok.thumbnail.alt || blok.title || ""}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8">
        <div className="min-w-0">
          {blok.show_name && (
            <p className="mb-1.5 text-sm text-white/75 md:text-base">
              {blok.show_name}
            </p>
          )}
          <h3 className="text-base font-bold leading-snug text-white md:text-2xl">
            {blok.title}
          </h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-transparent px-3 py-1 text-sm font-semibold text-white transition hover:bg-white hover:text-primary sm:text-base">
          Play
          <svg width="9" height="11" viewBox="0 0 10 12" fill="currentColor" aria-hidden>
            <path d="M0 0l10 6-10 6z" />
          </svg>
        </span>
      </div>
    </a>
  );
}