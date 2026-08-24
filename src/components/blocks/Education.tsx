"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";

type EducationProps = {
  blok: any;
};

function getYoutubeEmbedUrl(rawUrl: string) {
  if (!rawUrl) return "";
  try {
    const url = new URL(rawUrl);
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
  } catch {
    return "";
  }
  return "";
}

export default function Education({ blok }: EducationProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const heading = blok?.heading ?? "";
  const cards = blok?.cards ?? [];

  const handlePlayClick = (rawUrl: string) => {
    const embedUrl = getYoutubeEmbedUrl(rawUrl);
    if (embedUrl) {
      setActiveVideo(embedUrl);
    } else if (rawUrl) {
      // YouTube nahi hai — normal link naye tab mein khol do
      window.open(rawUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <section className="bg-primary py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-36">
          {heading && (
            <h2 className="text-center text-[36px] text-white sm:text-[48px] lg:text-[56px]">
              {heading}
            </h2>
          )}

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {cards.map((card: any) => {
              const imageUrl = card.image?.filename;
              const imageAlt = card.image?.alt || card.title || "";
              const rawUrl = card.video_url ?? "";

              return (
                <div
                  key={card._uid}
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-ink-deep sm:aspect-[3/4]"
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 flex-col items-center px-6 text-center">
                    {card.label && (
                      <span className="font-display text-xl text-white sm:text-2xl">
                        {card.label}
                      </span>
                    )}
                    {card.title && (
                      <span className="font-display mt-1 text-3xl font-bold leading-[1.05] text-white sm:text-4xl">
                        {card.title}
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 sm:p-6">
                    {card.duration && (
                      <span className="text-sm font-medium text-white sm:text-base">
                        {card.duration}
                      </span>
                    )}

                    {rawUrl && (
                      <button
                        type="button"
                        onClick={() => handlePlayClick(rawUrl)}
                        className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-transparent px-3 py-1 text-sm font-semibold text-white transition hover:bg-white hover:text-primary sm:text-base"
                      >
                        <span>Play</span>
                        <Play size={14} strokeWidth={0} fill="currentColor" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-[1000px] overflow-hidden rounded-xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <X size={20} strokeWidth={1.8} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={activeVideo}
                title="Video"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}