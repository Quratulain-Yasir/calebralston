import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function ServiceList({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-white px-4 pb-14 sm:px-6 md:px-8 md:pb-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8">
        {blok.items?.map((item: any) => (
          <StoryblokServerComponent blok={item} key={item._uid} />
        ))}
      </div>
    </section>
  );
}