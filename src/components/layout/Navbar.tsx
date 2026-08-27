"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { sbUrl } from "@/components/ui/Button";

export default function Navbar({ config }: { config: any }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  const lightLogo = config.logo_on_light?.filename;
  const darkLogo = config.logo_on_dark?.filename;

  function getNavItem(item: any) {
    const href = sbUrl(item.link);
    if (isAboutPage && href === "/ralston-select") {
      return { label: "Speaking", href: "/speaking" };
    }
    return { label: item.label, href };
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* =========================
          DESKTOP NAVBAR — sirf md aur upar dikhega
          ========================= */}
      <header className="hidden bg-white md:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-6 lg:px-10">
          <Link href="/" className="shrink-0">
            {darkLogo && (
              <Image
                src={darkLogo}
                alt={config.logo_on_dark?.alt || "Ralston"}
                width={180}
                height={48}
                priority
                className="h-auto w-[150px] lg:w-[170px]"
              />
            )}
          </Link>

          <nav className="flex items-center gap-8">
            {config.nav_links?.map((item: any) => {
              const navItem = getNavItem(item);
              return (
                <Link
                  key={item._uid}
                  href={navItem.href}
                  className="text-[15px] font-medium text-black transition-colors hover:text-primary"
                >
                  {navItem.label}
                </Link>
              );
            })}

            {config.header_cta_label && (
              <Link
                href={sbUrl(config.header_cta_link)}
                className="rounded-sm border-2 border-primary bg-primary px-9 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
              >
                {config.header_cta_label}
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* =========================
          MOBILE NAVBAR — sirf md se neeche dikhega
          ========================= */}
      <header className="sticky top-0 z-50 bg-white px-3 pt-3 md:hidden">
        <div className="flex h-[90px] items-center justify-between rounded-md bg-primary px-5 sm:px-7">
          <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
            {lightLogo && (
              <Image
                src={lightLogo}
                alt={config.logo_on_light?.alt || "Ralston"}
                width={180}
                height={48}
                priority
                className="h-auto w-[145px] sm:w-[160px]"
              />
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-12 w-12 items-center justify-center text-white"
          >
            <Menu size={36} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* =========================
          MOBILE SIDE MENU
          ========================= */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 transition-opacity duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-[425px] flex-col bg-primary text-white transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-end px-6 py-6 sm:px-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-12 w-12 items-center justify-center text-white transition-opacity hover:opacity-70"
          >
            <X size={30} strokeWidth={1.8} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-8 pt-8 sm:px-10">
          {config.nav_links?.map((item: any) => {
            const navItem = getNavItem(item);
            return (
              <Link
                key={item._uid}
                href={navItem.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-7 text-[28px] font-semibold leading-none text-white transition-opacity hover:opacity-70"
              >
                {navItem.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
