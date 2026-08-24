import Image from "next/image";
import Link from "next/link";
import { sbUrl } from "@/components/ui/Button";

type ServicesProps = {
  blok: any;
};

export default function Services({ blok }: ServicesProps) {
  const heading = blok?.heading ?? "";
  const cards = blok?.cards ?? [];
  const ctaLabel = blok?.cta_label ?? "";
  const ctaLink = blok?.cta_link;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        {heading && (
          <h2 className="text-center text-[40px] text-black sm:text-[52px] lg:text-[60px]">
            {heading}
          </h2>
        )}

        <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:gap-7">
          {cards.map((card: any) => {
            const iconUrl = card.icon?.filename;
            const iconAlt = card.icon?.alt || card.title || "";

            return (
              <div
                key={card._uid}
                className="group rounded-2xl bg-ink-soft px-7 py-10 sm:px-10 sm:py-12"
              >
                {iconUrl && (
                  <div className="mb-6 flex h-11 w-11 items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-110">
                    <Image
                      src={iconUrl}
                      alt={iconAlt}
                      width={44}
                      height={44}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                {card.title && (
                  <h3 className="font-display text-[28px] text-white sm:text-[34px] lg:text-[38px]">
                    {card.title}
                  </h3>
                )}

                {card.description && (
                  <p className="mt-4 max-w-[620px] text-[16px] leading-relaxed text-white/85 sm:text-[18px]">
                    {card.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {ctaLabel && (
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href={sbUrl(ctaLink)}
              className="inline-flex items-center gap-3 rounded-md bg-ink-soft px-8 py-4 text-base font-semibold text-white transition hover:opacity-90"
            >
              <span>{ctaLabel}</span>
              <span aria-hidden="true">▸</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}