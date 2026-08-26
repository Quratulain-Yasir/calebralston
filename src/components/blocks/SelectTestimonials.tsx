import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function SelectTestimonials({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-ink-deep px-5 py-16 text-center sm:px-8 md:py-24"
    >
      {blok.eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-cream sm:text-sm">
          {blok.eyebrow}
        </p>
      )}
      {blok.headline && (
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
          {blok.headline}
        </h2>
      )}

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {blok.screenshots?.map((item: any) => (
          <StoryblokServerComponent blok={item} key={item._uid} />
        ))}
      </div>
    </section>
  );
}