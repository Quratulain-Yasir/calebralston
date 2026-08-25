import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import Button from "@/components/ui/Button";

export default function BrandCta({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-brick px-5 py-20 text-center text-white sm:px-8 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        {blok.logo?.filename && (
          <Image
            src={blok.logo.filename}
            alt={blok.logo.alt || ""}
            width={600}
            height={400}
            className="mx-auto mb-10 h-auto w-44 sm:w-56 md:mb-14 md:w-72"
          />
        )}

        {blok.description && (
          <p className="mx-auto max-w-3xl whitespace-pre-line text-base leading-relaxed sm:text-lg md:text-xl">
            {blok.description}
          </p>
        )}

        {blok.cta_label && (
          <div className="mt-10 md:mt-12">
            <Button label={blok.cta_label} link={blok.cta_link} variant="cream" />
          </div>
        )}
      </div>
    </section>
  );
}