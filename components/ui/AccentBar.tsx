import { cn } from "@/lib/utils/cn";

export type AccentBarProps = {
  /** Breite der Linie (Tailwind-Klasse, z. B. `w-16`, `w-full`). */
  widthClassName?: string;
  className?: string;
};

/**
 * Gold-Akzent-Leiste (2 px) unter Überschriften — Build-Dokument.
 */
export function AccentBar({
  widthClassName = "w-full",
  className,
}: AccentBarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-2 block h-0.5 max-w-full rounded-full bg-ux-accent-gold",
        widthClassName,
        className
      )}
    />
  );
}
