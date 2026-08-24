import Image from "next/image";
import Link from "next/link";
import { sbUrl } from "@/components/ui/Button";

type RalstonSelectProps = {
  blok: any;
};

export default function RalstonSelect({ blok }: RalstonSelectProps) {
  const logoUrl = blok?.logo?.filename;
  const logoAlt = blok?.logo?.alt || "Ralston Select";
  const description = blok?.description ?? "";
  const ctaLabel = blok?.cta_label ?? "";
  const ctaLink = blok?.cta_link;

  return (
    <section className="bg-brick py-16 sm:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[900px] flex-col items-center px-5 text-center sm:px-8">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={320}
            height={220}
            className="h-auto w-[220px] sm:w-[260px] lg:w-[300px]"
          />
        )}

        {description && (
          <p className="mt-8 max-w-[720px] text-[16px] leading-relaxed text-white sm:text-[18px] sm:leading-relaxed">
            {description}
          </p>
        )}

        {ctaLabel && (
          <Link
            href={sbUrl(ctaLink)}
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-white px-8 py-4 text-base font-semibold text-ink transition hover:opacity-90 sm:mt-10"
          >
            <span>{ctaLabel}</span>
            <span aria-hidden="true" className="text-sage">▸</span>
          </Link>
        )}
      </div>
    </section>
  );
}