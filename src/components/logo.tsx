interface LogoProps {
  size?: "default" | "small";
}

export function Logo({ size = "default" }: LogoProps) {
  const iconSize = size === "small" ? 18 : 20;
  const textClass =
    size === "small"
      ? "font-display text-lg font-bold text-text-primary tracking-tight"
      : "font-display text-xl font-extrabold text-text-primary tracking-tight";

  return (
    <>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary/10">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="16" height="16" rx="3" stroke="#22C55E" strokeWidth="1.5" />
          <path d="M6 14V8" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 14V6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 14V10" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <span className={textClass}>
        Calc<span className="text-accent-primary">Engine</span>
      </span>
    </>
  );
}
