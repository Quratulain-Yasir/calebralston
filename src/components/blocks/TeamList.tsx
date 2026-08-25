import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function TeamList({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="flex w-full flex-col gap-6 bg-white px-5 py-6 sm:px-8 md:gap-8 md:px-10 md:py-8"
    >
      {blok.members?.map((member: any) => (
        <StoryblokServerComponent blok={member} key={member._uid} />
      ))}
    </section>
  );
}