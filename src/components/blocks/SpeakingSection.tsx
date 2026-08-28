import Image from "next/image";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

function optimizedSrc(url: string) {
  return `${url}/m/1600x0`;
}

export default function SpeakingSection({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative overflow-hidden bg-ink-deep px-5 py-16 sm:px-8 md:py-24"
    >
      {blok.background_image?.filename && (
        <Image
          src={optimizedSrc(blok.background_image.filename)}
          alt=""
          fill
          className="object-cover opacity-30"
        />
      )}

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:gap-14">
        {blok.hero?.[0] && (
          <StoryblokServerComponent blok={blok.hero[0]} />
        )}
        {blok.form?.[0] && (
          <StoryblokServerComponent blok={blok.form[0]} />
        )}
      </div>
    </section>
  );
}
