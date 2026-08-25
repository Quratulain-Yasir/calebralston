import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import Button from "@/components/ui/Button";

export default function TeamMember({ blok }: { blok: any }) {
  return (
    <article
      {...storyblokEditable(blok)}
      className="grid w-full grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2 [&:nth-child(even)>div:first-child]:md:order-2 [&:nth-child(even)>div:last-child]:md:order-1"
    >
      <div className="relative aspect-[4/3] w-full md:aspect-auto md:min-h-[600px]">
        {blok.photo?.filename && (
          <Image
            src={blok.photo.filename}
            alt={blok.photo.alt || blok.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale"
          />
        )}
      </div>

      <div className="flex flex-col justify-center bg-sage px-6 py-12 sm:px-10 md:px-14 md:py-16">
        {blok.role && (
          <p className="text-base font-semibold text-ink/70 md:text-lg">
            {blok.role}
          </p>
        )}
        <h2 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">
          {blok.name}
        </h2>
        {blok.bio && (
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink md:text-lg">
            {blok.bio}
          </p>
        )}
        {blok.cta_label && (
          <div className="mt-7">
            <Button
              label={blok.cta_label}
              link={blok.cta_link}
              variant="primary"
            />
          </div>
        )}
      </div>
    </article>
  );
}
