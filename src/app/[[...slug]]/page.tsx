import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/lib/storyblok";

type Props = { params: Promise<{ slug?: string[] }> };

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = slug?.join("/") || "home";

  let story;
  try {
    story = await fetchStory(path);
  } catch {
    notFound();
  }

  return <StoryblokStory story={story} />;
}