import {
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";

export default function SpeakingVideoGrid({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="w-full bg-ink">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {blok.cards?.map((card: any) => (
          <StoryblokServerComponent blok={card} key={card._uid} />
        ))}
      </div>
    </section>
  );
}
