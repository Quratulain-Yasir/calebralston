"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

function optimizedSrc(url: string) {
  return `${url}/m/1600x0`;
}

export default function MediaTeamHero({ blok }: { blok: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rawVideoField = blok?.video ?? "";
  const rawVideoUrl =
    typeof rawVideoField === "string"
      ? rawVideoField.trim()
      : (rawVideoField?.url ?? rawVideoField?.cached_url ?? "").trim();

  const youtubeEmbedUrl = useMemo(() => {
    if (!rawVideoUrl) return "";
    try {
      const url = new URL(rawVideoUrl);

      if (url.hostname.includes("youtube.com")) {
        const videoId = url.searchParams.get("v");
        if (videoId)
          return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        if (url.pathname.startsWith("/embed/")) {
          const sep = url.search ? "&" : "?";
          return `${rawVideoUrl}${sep}autoplay=1&rel=0`;
        }
      }

      if (url.hostname === "youtu.be") {
        const videoId = url.pathname.replace("/", "");
        if (videoId)
          return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
    } catch {
      return "";
    }
    return "";
  }, [rawVideoUrl]);

  function openModal() {
    if (!youtubeEmbedUrl) return;
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 md:py-24 h-screen"
      >
        {blok.background_image?.filename && (
          <Image
            src={optimizedSrc(blok.background_image.filename)}
            alt=""
            fill
            className="object-cover opacity-40"
          />
        )}

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 md:flex-row md:gap-14">
          {/* Text column */}
          <div className="w-full text-center md:w-2/5 md:text-left">
            {blok.headline && (
              <h1 className="whitespace-pre-line font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                {blok.headline}
              </h1>
            )}

            {blok.badge_text && (
              <span className="mt-8 inline-block rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white sm:text-base">
                {blok.badge_text}
              </span>
            )}
          </div>

          {/* Video column */}
          {blok.video_thumbnail?.filename && (
            <div className="w-full md:w-3/5">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                <Image
                  src={optimizedSrc(blok.video_thumbnail.filename)}
                  alt={blok.video_thumbnail.alt || "Video thumbnail"}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />

                {youtubeEmbedUrl && (
                  <button
                    type="button"
                    onClick={openModal}
                    aria-label="Play video"
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sage-dark shadow-lg transition hover:scale-105 sm:h-20 sm:w-20"
                  >
                    <Play
                      size={26}
                      strokeWidth={0}
                      fill="currentColor"
                      className="ml-1"
                    />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && youtubeEmbedUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[1000px] overflow-hidden rounded-xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <X size={20} strokeWidth={1.8} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={youtubeEmbedUrl}
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
