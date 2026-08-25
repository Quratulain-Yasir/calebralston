import Image from "next/image";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import Button from "@/components/ui/Button";

const themes: Record<string, string> = {
  red: "bg-brick text-white",
  green: "bg-primary text-white",
};

export default function ServiceCard({ blok }: { blok: any }) {
  const theme = blok.theme === "red" ? "red" : "green";

  return (
    <article
      {...storyblokEditable(blok)}
      className={`rounded-2xl px-6 py-10 sm:px-10 sm:py-14 md:rounded-3xl md:px-14 md:py-16 lg:px-16 ${themes[theme]}`}
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">

        {/* ── Left column ── */}
        <div>
          {blok.icon?.filename && (
            <div className="mb-6 inline-flex rounded-xl bg-white/10 p-3.5">
              <Image
                src={blok.icon.filename}
                alt={blok.icon.alt || ""}
                width={40}
                height={40}
                className="h-8 w-8 md:h-9 md:w-9"
              />
            </div>
          )}

          <h2 className="font-display text-3xl leading-[1.1] sm:text-4xl md:text-5xl ">
            {blok.title}
          </h2>

          {blok.description && (
            <p className="mt-5 max-w-md text-base leading-relaxed md:text-lg">
              {blok.description}
            </p>
          )}

          {blok.timing_label && (
            <p className="mt-7">
              <span className="inline-block rounded-lg bg-sage px-5 py-2 text-sm font-bold text-primary transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                {blok.timing_label}
              </span>
            </p>
          )}

          {blok.cta_label && (
            <div className="mt-7">
              <Button
                label={blok.cta_label}
                link={blok.cta_link}
                variant="white"
              />
            </div>
          )}
        </div>

        {/* ── Right column ── */}
        <div>
          {blok.list_groups?.map((group: any) => (
            <StoryblokServerComponent blok={group} key={group._uid} />
          ))}
        </div>
      </div>
    </article>
  );
}