import { storyblokEditable } from "@storyblok/react/rsc";
import Button from "@/components/ui/Button";

export default function ServiceHero({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-white px-5 py-16 text-center text-ink sm:px-8 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <h1 className="whitespace-pre-line font-display font-bold !leading[2] text-4xl md:text-6xl">
          {blok.headline}
        </h1>

        {blok.subheadline && (
          <p className="mt-5 text-lg font-medium text-sage-dark sm:text-xl md:mt-6 md:text-2xl">
            {blok.subheadline}
          </p>
        )}

        {blok.cta_label && (
          <div className="mt-7 md:mt-8">
            <Button
              label={blok.cta_label}
              link={blok.cta_link}
              variant="primary"
            />
          </div>
        )}
      </div>
    </section>
  );
}