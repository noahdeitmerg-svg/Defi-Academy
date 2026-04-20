import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function UxLogo({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 text-ux-text-primary", className)}
    >
      <span
        className="h-5 w-1 shrink-0 rounded-sm bg-ux-accent-gold"
        aria-hidden
      />
      <span className="text-sm font-semibold tracking-tight">
        <span className="text-ux-text-primary">DeFi</span>{" "}
        <span className="font-normal text-ux-text-secondary">Akademie</span>
      </span>
    </Link>
  );
}

/** Zwei horizontale Goldbalken unter Überschriften (Referenz-SVG). */
export function UxTitleGoldBars({ className }: { className?: string }) {
  return (
    <span className={cn("mt-3 inline-flex gap-1", className)} aria-hidden>
      <span className="h-0.5 w-12 rounded-full bg-ux-accent-gold" />
      <span className="h-0.5 w-12 rounded-full bg-ux-accent-gold" />
    </span>
  );
}
