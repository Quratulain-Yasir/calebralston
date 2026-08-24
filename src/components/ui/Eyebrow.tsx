export default function Eyebrow({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
      {children}
    </p>
  );
}