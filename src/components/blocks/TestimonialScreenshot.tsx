import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";

function optimizedSrc(url: string) {
  return `${url}/m/800x0`;
}

export default function TestimonialScreenshot({ blok }: { blok: any }) {
  if (!blok.images?.filename) return null;

  return (
    <div {...storyblokEditable(blok)} className="overflow-hidden rounded-xl">
      <Image
        src={optimizedSrc(blok.images.filename)}
        alt={blok.images.alt || ""}
        width={800}
        height={600}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}