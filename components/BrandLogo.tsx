/**
 * BrandLogo — Inline-SVG-Version des DeFi-Akademie-Markenzeichens.
 *
 * Single Source of Truth ist `brand/logo.svg` (+ das Sync-Mirror in
 * `video-style-engine/brand/`). Diese Komponente spiegelt die Inline-SVG-
 * Komposition aus dem Video-Style-Engine (`BrandShield` in
 * `intro-scene.jsx` / `outro-scene.jsx`), damit Plattform und Videos exakt
 * dasselbe Logo zeigen — ohne dass die Next.js-App zur Laufzeit SVG-Dateien
 * aus `brand/` laden muss (funktioniert so auch im statischen Export).
 *
 * Änderungen am Logo passieren in `brand/logo.svg`. Dann hier die Pfade
 * entsprechend angleichen und `npm run sync:brand` laufen lassen.
 */

type BrandLogoProps = {
  size?: number;
  className?: string;
  ariaLabel?: string;
  withWordmark?: boolean;
};

export function BrandLogo({
  size = 40,
  className,
  ariaLabel = "DeFi Akademie",
  withWordmark = false,
}: BrandLogoProps) {
  if (withWordmark) {
    return (
      <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        <BrandShield size={size} ariaLabel={ariaLabel} />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: Math.round(size * 0.5),
            letterSpacing: "-0.015em",
            color: "var(--color-text)",
            lineHeight: 1,
          }}
        >
          DeFi<span style={{ color: "var(--color-accent)" }}> </span>Akademie
        </span>
      </span>
    );
  }
  return <BrandShield size={size} ariaLabel={ariaLabel} className={className} />;
}

function BrandShield({
  size = 40,
  ariaLabel = "DeFi Akademie",
  className,
}: {
  size?: number;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <title>{ariaLabel}</title>
      <path
        d="M32 4 L54 12 L54 32 C54 44.5 44.5 55 32 60 C19.5 55 10 44.5 10 32 L10 12 Z"
        stroke="#F5B841"
        strokeWidth={2}
        strokeLinejoin="round"
        fill="none"
      />
      <g stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round">
        <line x1={32} y1={32} x2={24} y2={22} />
        <line x1={32} y1={32} x2={40} y2={22} />
        <line x1={32} y1={32} x2={32} y2={44} />
      </g>
      <g fill="#FFFFFF" stroke="#0B1F3B" strokeWidth={0.5}>
        <circle cx={24} cy={22} r={3.2} />
        <circle cx={40} cy={22} r={3.2} />
        <circle cx={32} cy={44} r={3.2} />
      </g>
      <circle cx={32} cy={32} r={4.2} fill="#F5B841" />
      <circle cx={32} cy={32} r={4.2} fill="none" stroke="#F5B841" strokeWidth={0.8} strokeOpacity={0.4} />
    </svg>
  );
}

export default BrandLogo;
