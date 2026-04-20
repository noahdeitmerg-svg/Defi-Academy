import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type IconProps = {
  icon: LucideIcon;
  size?: number;
  className?: string;
  "aria-label"?: string;
};

/**
 * Dünner Wrapper um lucide-react (einheitliche Größe/Klassen).
 */
export function Icon({
  icon: LucideComponent,
  size = 20,
  className,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <LucideComponent
      size={size}
      className={cn("shrink-0", className)}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
    />
  );
}
