import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";

function optimizedSrc(url: string) {
  return `${url}/m/800x0`;
}

export default function TestimonialScreenshot({ blok }: { blok: any }) {
  if (!blok.image?.filename) return null;

  return (
    <div {...storyblokEditable(blok)} className="overflow-hidden rounded-xl">
      <Image
        src={optimizedSrc(blok.image.filename)}
        alt={blok.image.alt || ""}
        width={800}
        height={600}
        className="h-auto w-full object-cover"
      />
      console.log("blok.image.filename", blok.image.filename)
    </div>
  );
}