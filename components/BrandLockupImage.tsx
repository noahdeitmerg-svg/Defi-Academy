import { withBasePath } from "@/lib/assetPath";

type Props = {
  width?: number;
  className?: string;
};

/** `public/logo-lockup.svg` — Shield + Wordmark (Brand), basePath-sicher. SVG per `<img>` (basePath, kein next/image). */
export function BrandLockupImage({ width = 200, className }: Props) {
  const h = Math.round(width * 0.22);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath("/logo-lockup.svg")}
      alt="DeFi Akademie"
      width={width}
      height={h}
      className={className ?? "h-auto max-w-full"}
    />
  );
}
