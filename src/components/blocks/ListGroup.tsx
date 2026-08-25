import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";

export default function ListGroup({ blok }: { blok: any }) {
  const html = blok.content ? renderRichText(blok.content) : "";

  return (
    <div {...storyblokEditable(blok)} className="mb-9 last:mb-0">
      {blok.heading && (
        <h3 className="mb-4 text-lg font-bold md:text-xl">{blok.heading}</h3>
      )}
      {html && (
        <div
          className="sb-list text-[15px] leading-relaxed md:text-lg"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}