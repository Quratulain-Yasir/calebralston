"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Play } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

function optimizedSrc(url: string) {
  return `${url}/m/1200x0`;
}

export default function CourseHero({ blok }: { blok: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const href = blok.cta_link?.url || blok.cta_link?.cached_url || "#";

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
        className="bg-ink-deep px-5 py-16 text-center sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-xl">
          {/* Video thumbnail */}
          {blok.video_thumbnail?.filename && (
            <div className="relative aspect-video w-full overflow-hidden bg-black/40">
              <Image
                src={optimizedSrc(blok.video_thumbnail.filename)}
                alt={blok.video_thumbnail.alt || "Video thumbnail"}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />

              {youtubeEmbedUrl && (
                <button
                  type="button"
                  onClick={openModal}
                  aria-label="Play video"
                  className="absolute left-1/2 top-1/2 flex h-16 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition hover:scale-105 sm:h-20 sm:w-20"
                >
                  <Play
                    size={24}
                    strokeWidth={0}
                    fill="currentColor"
                    className="ml-1"
                  />
                </button>
              )}
            </div>
          )}

          {blok.video_title && (
            <p className="mt-6 text-lg font-bold text-white sm:text-xl">
              {blok.video_title}
            </p>
          )}

          {blok.headline && (
            <h1 className="mt-4 whitespace-pre-line font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {blok.headline}
            </h1>
          )}

          {blok.workbook_image?.filename && (
            <div className="relative mx-auto mt-10 h-64 w-64 sm:h-80 sm:w-80">
              <Image
                src={optimizedSrc(blok.workbook_image.filename)}
                alt={blok.workbook_image.alt || "Workbook"}
                fill
                sizes="320px"
                className="object-contain"
              />
            </div>
          )}

          {blok.body && (
            <p className="mx-auto mt-10 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-white/90 sm:text-xl">
              {blok.body}
            </p>
          )}

          {blok.cta_label && (
            <Link
              href={href}
              className="mx-auto mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-10 py-4 text-xl font-bold text-white transition hover:opacity-90"
            >
              {blok.cta_label}
            </Link>
          )}

          {blok.join_note && (
            <p className="mt-6 text-base italic text-white/80 sm:text-lg">
              {blok.join_note}
            </p>
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