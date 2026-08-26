import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function CurriculumPreviewCard({ blok }: { blok: any }) {
  function optimizedSrc(url: string) {
  return `${url}/m/1200x0`;
}
  return (
    <div
      {...storyblokEditable(blok)}
      className="rounded-2xl border border-1 border-cream p-6 sm:p-8 bg-primary"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        {blok.thumbnail?.filename && (
          <Image
            src={optimizedSrc(blok.thumbnail.filename)}
            alt={blok.thumbnail.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
        {blok.number && (
          <span className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 text-xs font-bold text-white">
            {blok.number}
          </span>
        )}
      </div>

      {blok.description && (
        <p className="mt-6 text-center text-base leading-relaxed text-white/80 sm:text-lg">
          {blok.description}
        </p>
      )}
    </div>
  );
}