import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/components/Page";
import Hero from "@/components/blocks/Hero";
import Education from "@/components/blocks/Education";
import Services from "@/components/blocks/Services";
import RalstonSelect from "@/components/blocks/RalstonSelect";
import PodcastGrid from "@/components/blocks/PodcastGrid";
import PodcastCard from "@/components/blocks/PodcastCard";
import NewsletterForm from "@/components/blocks/NewsletterForm";

type HeroProps = {
  blok: any;
};

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: Hero,
    education: Education,
    services: Services,
    ralston_select: RalstonSelect,
    podcast_grid: PodcastGrid,
    podcast_card: PodcastCard,
    newsletter_form: NewsletterForm,
  },
  apiOptions: { region: "eu" },
});

export async function fetchStory(slug: string) {
  const api = getStoryblokApi();
  const { data } = await api.get(`cdn/stories/${slug}`, { version: "draft" });
  return data.story;
}

export async function fetchConfig() {
  return fetchStory("config");
}
