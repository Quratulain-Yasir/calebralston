import { storyblokEditable } from "@storyblok/react/rsc";

export default function PricingFeature({ blok }: { blok: any }) {
  return (
    <div
      {...storyblokEditable(blok)}
      className="rounded-xl border-l-3 text-white bg-ink-deep p-5 text-left sm:p-6"
    >
      {blok.title && (
        <h3 className="text-lg font-bold text-white sm:text-xl">
          {blok.title}
        </h3>
      )}
      {blok.description && (
        <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">
          {blok.description}
        </p>
      )}
    </div>
  );
}