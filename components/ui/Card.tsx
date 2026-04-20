import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-ux-border bg-ux-surface p-4 text-ux-text-primary md:p-6",
        className
      )}
      {...rest}
    />
  );
}
