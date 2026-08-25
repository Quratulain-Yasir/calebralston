import { storyblokEditable } from "@storyblok/react/rsc";

export default function TeamHero({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-white px-5 py-16 text-center sm:px-8 sm:py-24 md:py-28"
    >
      <h1 className="font-display text-5xl font-bold text-ink sm:text-6xl md:text-7xl">
        {blok.headline}
      </h1>
    </section>
  );
}