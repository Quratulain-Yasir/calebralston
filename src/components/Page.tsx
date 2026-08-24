import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function Page({ blok }: { blok: any }) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nested: any) => (
        <StoryblokServerComponent blok={nested} key={nested._uid} />
      ))}
    </main>
  );
}