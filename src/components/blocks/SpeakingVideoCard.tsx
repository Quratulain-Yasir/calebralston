import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

function optimizedSrc(url: string) {
  return `${url}/m/1200x0`;
}

export default function SpeakingVideoCard({ blok }: { blok: any }) {
  const href = blok.video_link?.url || blok.video_link?.cached_url || "#";

  return (
    <div
      {...storyblokEditable(blok)}
      className="group relative aspect-video w-full overflow-hidden"
    >
      {blok.thumbnail?.filename && (
        <Image
          src={optimizedSrc(blok.thumbnail.filename)}
          alt={blok.thumbnail.alt || blok.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-8">
        <div>
          {blok.speaker_name && (
            <p className="text-sm font-medium font-body text-white/80 sm:text-base">
              {blok.speaker_name}
            </p>
          )}
          {blok.title && (
            <h3 className="mt-1 text-lg font-semibold font-body text-white lg:text-xl">
              {blok.title}
            </h3>
          )}
        </div>

        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-transparent px-3 py-1 text-sm font-semibold text-white transition hover:bg-white hover:text-primary sm:text-base"
        >
          Play{" "}
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
      </div>
    </div>
  );
}
