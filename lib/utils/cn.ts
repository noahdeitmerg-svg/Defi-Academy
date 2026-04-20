/**
 * Vereinigt Klassennamen (ohne tailwind-merge: bewusst minimal für Phase-1-UI).
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
