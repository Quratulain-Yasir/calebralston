import Link from "next/link";
import Image from "next/image";
import { sbUrl } from "@/components/ui/Button";

// Social icons
const YoutubeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81zM9.55 15.5V8.5l6.27 3.5-6.27 3.5z" />
  </svg>
);

const InstagramIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedInIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const icons: Record<string, React.FC<{ size?: number }>> = {
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
};

export default function Footer({ config }: { config: any }) {
  const lightLogo = config.logo_on_light?.filename;

  return (
    <footer className="bg-ink-deep text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-20">

        {/* =========================
            TOP FOOTER ROW
            ========================= */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            {lightLogo && (
              <Image
                src={lightLogo}
                alt={config.logo?.alt || "Ralston"}
                width={320}
                height={80}
                className="h-12 w-auto md:h-16"
              />
            )}
          </Link>

          {/* Footer links */}
          <nav className="flex flex-wrap items-center justify-center gap-7 md:gap-9">
            {config.footer_links?.map((item: any) => (
              <Link
                key={item._uid}
                href={sbUrl(item.link)}
                className="font-display text-base font-small text-white transition-opacity hover:opacity-70 md:text-[15px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-5 text-white">
            {config.social_links?.map((s: any) => {
              const Icon = icons[s.platform];

              return (
                <a
                  key={s._uid}
                  href={sbUrl(s.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="text-white transition-opacity hover:opacity-70"
                >
                  {Icon ? <Icon size={20} /> : s.platform}
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-12 border-white/15" />

        {/* Copyright */}
        <p className="mx-auto max-w-[1500px] text-center text-sm leading-relaxed text-white">
          {config.copyright_text}
        </p>

        {/* =========================
            LEGAL LINKS
            ========================= */}
        <div className="mt-10 mx-auto max-w-3xl flex flex-col items-center justify-center sm:flex-row sm:justify-between">
          <Link
            href={sbUrl(config.privacy_link)}
            className="text-sm text-white underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Privacy Policy
          </Link>

          <Link
            href={sbUrl(config.terms_link)}
            className="text-sm text-white underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}