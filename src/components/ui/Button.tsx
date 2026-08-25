import Link from "next/link";

export function sbUrl(link: any) {
  if (!link) return "#";
  if (link.linktype === "story") return `/${link.cached_url}`.replace(/\/+$/, "") || "/";
  return link.url || link.cached_url || "#";
}

const variants: Record<string, string> = {
  primary: "bg-ink text-white hover:opacity-90",
  cream:   "bg-white text-ink hover:opacity-90",
  outline: "border-2 border-current bg-transparent",
};

export default function Button({
  label,
  link,
  variant = "primary",
}: {
  label: string;
  link: any;
  variant?: string;
}) {
  if (!label) return null;
  return (
    <Link
      href={sbUrl(link)}
      className={`inline-flex items-center gap-2 rounded-md px-9 py-3.5 text-lg font-semibold transition ${variants[variant] ?? variants.primary}`}
    >
      {label} <span aria-hidden>›</span>
    </Link>
  );
}