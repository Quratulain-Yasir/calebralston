import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";

export default function SpeakingHero({ blok }: { blok: any }) {
  const html = blok.body?.content?.length ? renderRichText(blok.body) : "";

  return (
    <div {...storyblokEditable(blok)} className="md:w-2/5">
      {blok.headline && (
        <h1 className="whitespace-pre-line font-body text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
          {blok.headline}
        </h1>
      )}
      {html && (
        <div
          className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-white/80 lg:text-lg font-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}