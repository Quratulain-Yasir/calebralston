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
            <p className="text-sm font-medium text-white/80 sm:text-base">
              {blok.speaker_name}
            </p>
          )}
          {blok.title && (
            <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              {blok.title}
            </h3>
          )}
        </div>

        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-ink transition hover:opacity-90 sm:text-base"
        >
          Play ▶
        </Link>
      </div>
    </div>
  );
}