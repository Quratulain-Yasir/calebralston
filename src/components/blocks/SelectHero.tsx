"use client";

import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";

export default function SelectHero({ blok }: { blok: any }) {
  const [muted, setMuted] = useState(true);

  const headline = blok.headline || "";
  const highlight = blok.headline_highlight || "";
  const parts = highlight ? headline.split(highlight) : [headline];

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-ink-deep px-5 py-16 text-center sm:px-8 sm:py-20 md:py-28"
    >
      {blok.badge_text && (
        <span className="inline-flex items-center gap-2 rounded-full border border-1 border-cream bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-cream sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-cream" />
          {blok.badge_text}
        </span>
      )}

      <h1 className="mx-auto mt-8 max-w-4xl whitespace-pre-line font-display text-4xl font-bold leading-tight text-white  md:text-6xl">
        {parts[0]}
        {highlight && <span className="text-cream">{highlight}</span>}
        {parts[1]}
      </h1>

      {blok.subheadline && (
        <p className="mx-auto mt-6 max-w-3xl text-base font-semibold text-white/70 sm:text-lg md:text-xl">
          {blok.subheadline}
        </p>
      )}

      {blok.video?.filename && (
        <div className="relative mx-auto mt-10 aspect-video w-full max-w-3xl overflow-hidden bg-black/40">
          <video
            className="h-full w-full object-cover"
            src={blok.video.filename}
            autoPlay
            muted={muted}
            loop
            playsInline
          />

          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white"
          >
            <svg width="10" height="11" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
  <path d="M1 4v4h2l3.5 3.5v-11L3 4H1zm7.5 2c0-1.35-.78-2.52-1.92-3.07v6.15c1.14-.56 1.92-1.73 1.92-3.08z"/>
</svg>{" "}
            {muted ? "Enable sound" : "Mute"}
          </button>

          {blok.video_caption && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-4xl font-bold text-rose-300 sm:text-5xl">
              {blok.video_caption}
            </span>
          )}
        </div>
      )}
    </section>
  );
}
