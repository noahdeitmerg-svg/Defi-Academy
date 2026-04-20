import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type BadgeTier = "free" | "pro";
export type BadgeStatus = "abgeschlossen" | "in-bearbeitung" | "gesperrt";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant: "tier" | "status";
  value: BadgeTier | BadgeStatus;
};

const tierLabel: Record<BadgeTier, string> = {
  free: "Free",
  pro: "Pro",
};

const statusLabel: Record<BadgeStatus, string> = {
  abgeschlossen: "Abgeschlossen",
  "in-bearbeitung": "In Bearbeitung",
  gesperrt: "Gesperrt",
};

const tierClasses: Record<BadgeTier, string> = {
  free: "border-ux-border bg-ux-surface-elevated text-ux-text-secondary",
  pro: "border-ux-accent-gold/40 bg-ux-accent-gold/15 text-ux-accent-gold",
};

const statusClasses: Record<BadgeStatus, string> = {
  abgeschlossen: "border-ux-success/40 bg-ux-success/15 text-ux-success",
  "in-bearbeitung": "border-ux-warning/40 bg-ux-warning/15 text-ux-warning",
  gesperrt: "border-ux-border bg-ux-locked/30 text-ux-text-muted",
};

export function Badge({ variant, value, className, ...rest }: BadgeProps) {
  const label =
    variant === "tier"
      ? tierLabel[value as BadgeTier]
      : statusLabel[value as BadgeStatus];
  const colors =
    variant === "tier"
      ? tierClasses[value as BadgeTier]
      : statusClasses[value as BadgeStatus];

  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        colors,
        className
      )}
      {...rest}
    >
      {label}
    </span>
  );
}
