"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";
import { renderRichText } from "@storyblok/react";

type HeroProps = {
  blok: any;
};

export default function Hero({ blok }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ===== DATA ===== */
  const heading = blok?.heading ?? null;
  const highlightedText = (blok?.highlighted_text ?? "").trim();
  const ctaLabel = (blok?.cta_label ?? "").trim();

  const media = blok?.media;
  const mediaUrl = media?.filename ?? null;
  const mediaAlt = media?.alt || "Ralston";

  const mediaType = (blok?.media_type ?? blok?.mediaType ?? "image")
    .toString()
    .toLowerCase();
console.log("MEDIA TYPE:", mediaType);
  // video_url ya to plain string hoga ya Storyblok Link object { url: "..." }
  const rawVideoField =
    blok?.video_url ?? blok?.videoUrl ?? blok?.youtube_url ?? blok?.youtube ?? "";

  const rawVideoUrl =
    typeof rawVideoField === "string"
      ? rawVideoField.trim()
      : (rawVideoField?.url ?? rawVideoField?.cached_url ?? "").trim();

  /* ===== YOUTUBE EMBED URL ===== */
const youtubeEmbedUrl = useMemo(() => {
    if (!rawVideoUrl) return "";
    try {
      const url = new URL(rawVideoUrl);

      if (url.hostname.includes("youtube.com")) {
        const videoId = url.searchParams.get("v");
        if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        if (url.pathname.startsWith("/embed/")) {
          const sep = url.search ? "&" : "?";
          return `${rawVideoUrl}${sep}autoplay=1&rel=0`;
        }
      }

      if (url.hostname === "youtu.be") {
        const videoId = url.pathname.replace("/", "");
        if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
    } catch (err) {
      console.warn("Invalid video URL:", rawVideoUrl, err);
      return "";
    }
    return "";
  }, [rawVideoUrl]);

  console.log("RAW VIDEO FIELD:", rawVideoField);
  console.log("RAW VIDEO URL:", rawVideoUrl);
  console.log("EMBED URL:", youtubeEmbedUrl);
  /* ===== HEADING WITH HIGHLIGHT ===== */
  const headingHtml = useMemo(() => {
    if (!heading) return "";
    let html = "";
    try {
      if (typeof heading === "object" && heading !== null) {
        html = renderRichText(heading) || "";
      }
    } catch (e) {
      console.warn("renderRichText failed:", e);
    }
    if (!html && typeof heading === "string") {
      html = `<p>${heading}</p>`;
    }
    if (html && highlightedText) {
      const escapedText = highlightedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      html = html.replace(
        new RegExp(escapedText, "gi"),
        (match) => `<span class="text-primary">${match}</span>`
      );
    }
    return html;
  }, [heading, highlightedText]);

  const openModal = () => {
    if (!youtubeEmbedUrl) return;
    setIsModalOpen(true);
  };
console.log("MEDIA TYPE:", mediaType);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center lg:flex-row">
          {/* LEFT — Text */}
          <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-8 sm:py-16 lg:w-[42%] lg:px-10 lg:py-20">
            {headingHtml ? (
              <h1
                className="font-display text-black text-[36px] leading-[1.3] tracking-[-0.02em] sm:text-[44px] sm:leading-[1.28] lg:text-[52px] lg:leading-[1.25] xl:text-[60px] xl:leading-[1.22]"
                dangerouslySetInnerHTML={{ __html: headingHtml }}
              />
            ) : (
              <h1 className="font-display text-black/30 text-[36px] leading-[1.3] tracking-[-0.02em] sm:text-[44px] lg:text-[52px] xl:text-[60px]">
                Add heading in Storyblok
              </h1>
            )}

            {ctaLabel && (
              <button
                type="button"
                onClick={openModal}
                disabled={!youtubeEmbedUrl}
                className="mt-7 inline-flex h-[52px] w-fit items-center gap-3 rounded-md bg-primary px-7 text-[15px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-8"
              >
                <span>{ctaLabel}</span>
                <span className="text-sm">▸</span>
              </button>
            )}
          </div>

          {/* RIGHT — Image/Video */}
          <div className="w-full px-6 pb-12 sm:px-8 sm:pb-16 lg:flex-1 lg:px-0 lg:py-10 lg:pr-10">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink-deep sm:aspect-[16/9]">
              {mediaUrl ? (
                <Image
                  src={mediaUrl}
                  alt={mediaAlt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sage/40 text-sm">
                  Add media in Storyblok
                </div>
              )}

              {mediaType === "video" && youtubeEmbedUrl && (
                <button
                  type="button"
                  onClick={openModal}
                  aria-label="Play video"
                  className="absolute left-1/2 top-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-primary shadow-lg transition hover:scale-105 sm:h-[80px] sm:w-[80px]"
                >
                  <Play size={26} strokeWidth={0} fill="currentColor" className="ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO MODAL ===== */}
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