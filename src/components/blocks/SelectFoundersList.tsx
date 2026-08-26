import {
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";

export default function SelectFoundersList({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="flex w-full flex-col gap-6 bg-ink-deep px-5 py-10 sm:px-8 md:gap-8 md:px-10 md:py-14"
    >
      {blok.founders?.map((founder: any) => (
        <StoryblokServerComponent blok={founder} key={founder._uid} />
      ))}
    </section>
  );
}
