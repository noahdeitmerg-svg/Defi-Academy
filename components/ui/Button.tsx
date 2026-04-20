import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ux-accent-gold text-ux-background hover:bg-ux-accent-gold-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ux-accent-gold",
  secondary:
    "border border-ux-border bg-ux-surface text-ux-text-primary hover:bg-ux-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ux-accent-gold",
  ghost:
    "text-ux-text-primary hover:bg-ux-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ux-accent-gold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-8 px-3 py-1.5 text-sm",
  md: "min-h-10 px-4 py-2 text-sm font-medium",
  lg: "min-h-12 px-6 py-3 text-base font-medium",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      disabled,
      ...rest
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...rest}
      />
    );
  }
);
