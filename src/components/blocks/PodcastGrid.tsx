import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function PodcastGrid({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="bg-ink">
      {blok.heading && (
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:px-10 md:pt-24">
          <h2 className="text-center font-display text-4xl text-cream md:text-5xl">
            {blok.heading}
          </h2>
        </div>
      )}

      {/* gap-0: cards ek doosre se chipke hue */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {blok.items?.map((item: any) => (
          <StoryblokServerComponent blok={item} key={item._uid} />
        ))}
      </div>
    </section>
  );
}