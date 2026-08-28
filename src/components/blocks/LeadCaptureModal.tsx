"use client";

import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";

export default function LeadCaptureModal({
  blok,
  onClose,
}: {
  blok: any;
  onClose: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const privacyHref =
    blok.privacy_link?.url || blok.privacy_link?.cached_url || "#";
  const termsHref =
    blok.terms_link?.url || blok.terms_link?.cached_url || "#";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const newErrors: Record<string, boolean> = {};
    if (!form.fullName.value) newErrors.fullName = true;
    if (!form.email.value) newErrors.email = true;
    setErrors(newErrors);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        {...storyblokEditable(blok)}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 lg:p-13"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-2xl text-ink"
        >
          ×
        </button>

        {blok.headline && (
          <h2 className="text-center font-display text-3xl font-bold text-primary lg:text-4xl">
            {blok.headline}
          </h2>
        )}

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <input
              name="fullName"
              type="text"
              placeholder="Enter your full name*"
              className="w-full rounded-lg border border-ink/20 px-4 py-3 text-ink placeholder:text-ink/50"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                Full Name is required
              </p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="your@email.com*"
              className="w-full rounded-lg border border-ink/20 px-4 py-3 text-ink placeholder:text-ink/50"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">Email is required</p>
            )}
          </div>

          <input
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000*"
            className="w-full rounded-lg border border-ink/20 px-4 py-3 text-ink placeholder:text-ink/50"
          />

          <select
            name="businessStage"
            defaultValue=""
            className="w-full rounded-lg border border-ink/20 px-4 py-3 text-ink/70"
          >
            <option value="" disabled>
              What stage is your business at?*
            </option>
            <option value="idea">Idea stage</option>
            <option value="early">Early stage</option>
            <option value="growing">Growing</option>
            <option value="established">Established</option>
          </select>

          {blok.radio_question && (
            <div>
              <p className="text-base text-ink">{blok.radio_question}</p>
              <div className="mt-3 flex flex-col gap-2">
                <label className="flex items-center gap-2 text-ink">
                  <input type="radio" name="interest" value="yes" />
                  {blok.radio_option_yes}
                </label>
                <label className="flex items-center gap-2 text-ink">
                  <input type="radio" name="interest" value="no" />
                  {blok.radio_option_no}
                </label>
              </div>
            </div>
          )}

          {blok.consent_text && (
            <label className="flex items-start gap-3 text-sm text-ink/80">
              <input type="checkbox" name="consent" className="mt-1" />
              {blok.consent_text}
            </label>
          )}

          {blok.submit_label && (
            <button
              type="submit"
              className="mt-2 bg-primary px-8 py-4 font-bold text-white transition hover:opacity-90"
            >
              {blok.submit_label}
            </button>
          )}

          <p className="text-center text-xs text-ink/50">
            <Link href={privacyHref} className="underline">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href={termsHref} className="underline">
              Terms of Use
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}