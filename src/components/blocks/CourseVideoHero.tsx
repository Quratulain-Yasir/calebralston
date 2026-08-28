"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";
import LeadCaptureModal from "./LeadCaptureModal";

function optimizedSrc(url: string) {
  return `${url}/m/1600x0`;
}

export default function CourseVideoHero({ blok }: { blok: any }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const modalBlok = blok.modal?.[0];

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 md:py-24"
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
          <div className="w-full text-center md:w-2/5 md:text-left">
            {blok.headline && (
              <h1 className="whitespace-pre-line font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                {blok.headline}
              </h1>
            )}

            {blok.cta_label && (
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sage-dark px-6 py-3 font-bold text-white transition hover:opacity-90"
              >
                {blok.cta_label} ▶
              </button>
            )}
          </div>

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

                {blok.video_caption && (
                  <span className="absolute bottom-4 left-4 rounded bg-black/70 px-3 py-2 text-sm font-medium text-white sm:text-base">
                    {blok.video_caption}
                  </span>
                )}

                {youtubeEmbedUrl && (
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
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

      {isVideoOpen && youtubeEmbedUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-[1000px] overflow-hidden rounded-xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
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

      {isFormOpen && modalBlok && (
        <LeadCaptureModal
          blok={modalBlok}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </>
  );
}
