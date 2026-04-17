/**
 * Haengt den basePath (z. B. `/Defi-Academy` unter GitHub Pages) an
 * absolute Asset-URLs wie `/videos/foo.mp4` an.
 *
 * `<Link>`, `<Image>` und der Next-Router machen das automatisch; rohe
 * HTML-Elemente wie `<video src>` oder `<source src>` tun das nicht.
 */
export function withBasePath(absolutePath: string): string {
  if (!absolutePath.startsWith("/")) return absolutePath;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base) return absolutePath;
  if (absolutePath.startsWith(base + "/") || absolutePath === base) {
    return absolutePath;
  }
  return `${base}${absolutePath}`;
}
