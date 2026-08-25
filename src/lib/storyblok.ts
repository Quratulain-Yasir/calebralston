import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/components/Page";
import Hero from "@/components/blocks/Hero";
import Education from "@/components/blocks/Education";
import Services from "@/components/blocks/Services";
import RalstonSelect from "@/components/blocks/RalstonSelect";
import PodcastGrid from "@/components/blocks/PodcastGrid";
import PodcastCard from "@/components/blocks/PodcastCard";
import NewsletterForm from "@/components/blocks/NewsletterForm";
import ServiceHero from "@/components/blocks/ServiceHero";
import ServiceList from "@/components/blocks/ServiceList";
import ServiceCard from "@/components/blocks/ServiceCard";
import ListGroup from "@/components/blocks/ListGroup";
import BrandCta from "@/components/blocks/BrandCta";
import TeamHero from "@/components/blocks/TeamHero";
import TeamList from "@/components/blocks/TeamList";
import TeamMember from "@/components/blocks/TeamMember";

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
    service_hero: ServiceHero,
    service_list: ServiceList,
    services_card: ServiceCard,
    list_group: ListGroup,
    brand_cta: BrandCta,
    team_hero: TeamHero,
    team_list: TeamList,
    team_member: TeamMember,
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
