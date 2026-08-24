type Theme = "dark" | "light" | "sage" | "brick";

const themes: Record<Theme, string> = {
  dark: "bg-ink text-cream",
  light: "bg-white text-ink",
  sage: "bg-sage text-ink",
  brick: "bg-brick text-white",
};

export default function Section({
  theme = "dark",
  className = "",
  children,
  ...rest
}: {
  theme?: Theme;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <section
      className={`${themes[theme]} py-16 md:py-24 ${className}`}
      {...rest}
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}
