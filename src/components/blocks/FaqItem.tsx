"use client";

import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";

export default function FaqItem({ blok }: { blok: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      {...storyblokEditable(blok)}
      className="rounded-xl border border-white/10 bg-white text-left"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-bold text-ink sm:text-lg">
          {blok.question}
        </span>
        <span
          className={`shrink-0 text-ink transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-chevron-down-icon lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && blok.answer && (
        <div className="whitespace-pre-line px-6 pb-6 text-sm leading-relaxed text-ink/80 sm:text-base">
          {blok.answer}
        </div>
      )}
    </div>
  );
}
