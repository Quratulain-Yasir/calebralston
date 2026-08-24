"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

type Status = "idle" | "loading" | "success" | "error";

const inputBase =
  "w-full rounded-xl bg-ink/45 px-5 py-4 text-cream placeholder:text-cream/50 " +
  "outline-none ring-1 ring-inset ring-cream/10 transition " +
  "focus:ring-2 focus:ring-cream/60 disabled:opacity-60";

export default function NewsletterForm({ blok }: { blok: any }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: String(fd.get("firstName") || ""),
      lastName: String(fd.get("lastName") || ""),
      email: String(fd.get("email") || ""),
      website: String(fd.get("website") || ""),
    };

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();

      setStatus("success");
      setMessage(blok.success_message || "Thanks for subscribing!");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage(blok.error_message || "Something went wrong. Please try again.");
    }
  }

  const busy = status === "loading";

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-ink-mid px-6 py-20 text-white md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">

        {/* Left: copy */}
        <div>
          <h2 className="whitespace-pre-line font-display text-4xl leading-[1.1] md:text-6xl">
            {blok.heading}
          </h2>
          {blok.description && (
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
              {blok.description}
            </p>
          )}
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} noValidate className="w-full">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="sr-only">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                disabled={busy}
                autoComplete="given-name"
                placeholder={blok.first_name_placeholder || "First Name"}
                className={inputBase}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                disabled={busy}
                autoComplete="family-name"
                placeholder={blok.last_name_placeholder || "Last Name"}
                className={inputBase}
              />
            </div>
          </div>

          <div className="relative mt-4">
            <label htmlFor="email" className="sr-only">Email</label>
            <Mail
              size={18}
              aria-hidden
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-cream/60"
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={busy}
              autoComplete="email"
              placeholder={blok.email_placeholder || "Email"}
              className={`${inputBase} pl-12`}
            />
          </div>

          {/* Honeypot — sirf bots ke liye */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute h-0 w-0 opacity-0"
          />

          <button
            type="submit"
            disabled={busy}
            className="mt-5 rounded-md bg-white px-10 py-3 text-black transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Sending…" : blok.submit_label || "Submit"}
          </button>

          <p
            role="status"
            aria-live="polite"
            className={`mt-4 min-h-6 text-sm ${
              status === "error" ? "text-red-300" : "text-cream/90"
            }`}
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}