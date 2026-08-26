import { storyblokEditable } from "@storyblok/react/rsc";

export default function QualifyCard({ blok }: { blok: any }) {
  return (
    <div
      {...storyblokEditable(blok)}
      className="rounded-2xl border border-1 border-cream bg-primary px-5 py-3 lg:px-6 lg:py-4"
    >
      <p className="text-base leading-relaxed text-white lg:text-lg">
        {blok.lead_text && (
          <span className="font-bold text-cream">{blok.lead_text} </span>
        )}
        {blok.description}
      </p>
    </div>
  );
}
