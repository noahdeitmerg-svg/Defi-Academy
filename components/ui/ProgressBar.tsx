import { cn } from "@/lib/utils/cn";

export type ProgressBarProps = {
  /** Fortschritt 0–100 */
  value: number;
  /** Optionale Zeile darüber (z. B. „Modul 1“) */
  label?: string;
  className?: string;
};

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const rounded = Math.round(clamped);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-baseline justify-between gap-2 text-sm text-ux-text-secondary">
        {label ? <span>{label}</span> : <span className="sr-only">Fortschritt</span>}
        <span className="font-ux-mono shrink-0 tabular-nums text-ux-text-primary">
          {rounded}%
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-ux-surface-elevated"
        role="progressbar"
        aria-valuenow={rounded}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${rounded} Prozent`}
      >
        <div
          className="h-full rounded-full bg-ux-accent-gold transition-[width] duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
