"use client";

import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";

export default function PodcastBookingForm({ blok }: { blok: any }) {
  const [format, setFormat] = useState("");
  const [audience, setAudience] = useState("");

  return (
    <section
      {...storyblokEditable(blok)}
      className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 md:py-24"
    >
      {blok.background_image?.filename && (
        <Image
          src={blok.background_image.filename}
          alt=""
          fill
          className="object-cover opacity-30"
        />
      )}

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-center md:gap-14">
        {/* Headline */}
        <div className="md:w-2/5">
          {blok.headline && (
            <h2 className="whitespace-pre-line font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {blok.headline}
            </h2>
          )}
        </div>

        {/* Form */}
        <form className="rounded-2xl bg-sage-dark/40 p-6 backdrop-blur-sm sm:p-10 md:w-3/5">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Email *
              </label>
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Link to Podcast *
              </label>
              <input
                type="url"
                placeholder="Link to Podcast"
                required
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                In-person or Virtual? *
              </label>
              <select
                required
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sage"
              >
                <option value="" disabled>
                  Select one...
                </option>
                <option value="in-person">In-person</option>
                <option value="virtual">Virtual</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                What offer do you promote? *
              </label>
              <input
                type="text"
                placeholder="What offer do you promote?"
                required
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Audience Size (we don&apos;t pick off size, it&apos;s just
                useful data for us) *
              </label>
              <select
                required
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sage"
              >
                <option value="" disabled>
                  Select one...
                </option>
                <option value="0-1k">0 - 1,000</option>
                <option value="1k-10k">1,000 - 10,000</option>
                <option value="10k-100k">10,000 - 100,000</option>
                <option value="100k+">100,000+</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-center sm:justify-start">
            <button
              type="submit"
              className="rounded-lg bg-white px-8 py-3 font-bold text-ink transition hover:opacity-90"
            >
              {blok.cta_label || "Request an Interview"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}