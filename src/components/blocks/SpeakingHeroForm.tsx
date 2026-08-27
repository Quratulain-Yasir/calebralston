"use client";

import Image from "next/image";
import Link from "next/link";
import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";
import { useState } from "react";

function optimizedSrc(url: string) {
  return `${url}/m/1600x0`;
}

export default function SpeakingHeroForm({ blok }: { blok: any }) {
  const [pitching, setPitching] = useState("");
  const [audience, setAudience] = useState("");
  const [topic, setTopic] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const href = blok.cta_link?.url || blok.cta_link?.cached_url || "#";
  const html = blok.body?.content?.length ? renderRichText(blok.body) : "";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const newErrors: Record<string, boolean> = {};

    if (!form.fullName.value) newErrors.fullName = true;
    if (!form.email.value) newErrors.email = true;

    setErrors(newErrors);
  }

  return (
    <section
      {...storyblokEditable(blok)}
      className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 md:py-24"
    >
      {blok.background_image?.filename && (
        <Image
          src={optimizedSrc(blok.background_image.filename)}
          alt=""
          fill
          className="object-cover opacity-30"
        />
      )}

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:gap-14">
        {/* Text column */}
        <div className="md:w-2/5">
          {blok.headline && (
            <h1 className="whitespace-pre-line font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {blok.headline}
            </h1>
          )}
          {html && (
            <div
              className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-white/80 sm:text-lg"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>

        {/* Form column */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-sage-dark/40 p-6 backdrop-blur-sm sm:p-10 md:w-3/5"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Full Name *
              </label>
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">
                  Full Name is required
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Email *
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  Email is required
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Event Date *
              </label>
              <input
                type="date"
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Company/Organization *
              </label>
              <input
                type="text"
                placeholder="Organization"
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Location *
              </label>
              <input
                type="text"
                placeholder="Location"
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Are you pitching at this event *
              </label>
              <select
                value={pitching}
                onChange={(e) => setPitching(e.target.value)}
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sage"
              >
                <option value="" disabled>
                  Select one...
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                What&apos;s the Audience Size *
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sage"
              >
                <option value="" disabled>
                  Select one...
                </option>
                <option value="0-100">0 - 100</option>
                <option value="100-500">100 - 500</option>
                <option value="500-1000">500 - 1,000</option>
                <option value="1000+">1,000+</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Select a topic *
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sage"
              >
                <option value="" disabled>
                  Select one...
                </option>
                <option value="brand-positioning">Brand Positioning</option>
                <option value="content-strategy">Content Strategy</option>
                <option value="media-team">Media Team Architecture</option>
              </select>
            </div>
          </div>

          {blok.cta_label && (
            <div className="mt-8 flex justify-center sm:justify-start">
              <button
                type="submit"
                className="rounded-lg bg-white px-8 py-3 font-bold text-ink transition hover:opacity-90"
              >
                {blok.cta_label}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}