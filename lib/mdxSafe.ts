/** MDX interpretiert `<0` als JSX-Start — für Preis-/Vergleichstexte als HTML-Entity. */
export function escapeMdxLessThanBeforeDigit(md: string): string {
  return md.replace(/<(?=\d)/g, "&lt;");
}
