import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function SelectCurriculum({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-ink-deep px-5 py-16 sm:px-8 md:py-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        {blok.eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-cream sm:text-sm">
            {blok.eyebrow}
          </p>
        )}
        {blok.headline && (
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            {blok.headline}
          </h2>
        )}
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-6 md:gap-8">
        {blok.features?.map((feature: any) => (
          <StoryblokServerComponent blok={feature} key={feature._uid} />
        ))}
      </div>
    </section>
  );
}