/**
 * MDX-Sicherheits-Helpers.
 *
 * MDX behandelt `<...>` aggressiv als JSX/HTML. Prosa-Vergleiche wie
 * `<0`, `<$10k`, `<1 Jahr` oder `<=10` stolpern dann beim Parse.
 *
 * Strategie: Alle `<` entschaerfen, die nicht eindeutig Beginn eines
 * legitimen HTML/JSX-Tags sind (also nicht vor einem Buchstaben,
 * `/`, `!` oder `?`). Das ist bewusst konservativ und laesst
 * `<kbd>…</kbd>`, `<br/>`, `<details>` etc. unangetastet.
 */
export function escapeUnsafeMdxLessThan(md: string): string {
  return md.replace(/<(?![a-zA-Z/!?])/g, "&lt;");
}

/**
 * Rueckwaertskompatibles Alias.
 *
 * Frueher nur fuer Ziffern nach `<` (Preisvergleiche) gedacht.
 * Heute deckt die breitere Regel alle bekannten Problemfaelle ab.
 */
export const escapeMdxLessThanBeforeDigit = escapeUnsafeMdxLessThan;
