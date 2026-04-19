import fs from "node:fs";
import path from "node:path";

/**
 * Liest aus `Module/modul-NN-*-FINAL.md` den Abschnitt ## Modul-Überblick
 * (erster Absatz, max. zwei Sätze) — ersetzt Platzhalter „Importiert aus …“.
 */
export function readModuleOverviewFromFinalMd(moduleNumber: number): string | null {
  const modDir = path.join(process.cwd(), "Module");
  if (!fs.existsSync(modDir)) return null;
  const files = fs.readdirSync(modDir).filter((f) => /^modul-\d+/i.test(f) && /\.md$/i.test(f));
  const hit = files.find((f) => {
    const m = /^modul-0*(\d+)/i.exec(f);
    return m && Number(m[1]) === moduleNumber;
  });
  if (!hit) return null;
  const full = fs.readFileSync(path.join(modDir, hit), "utf8");
  const block = full.match(/##\s+Modul-Überblick\s*\n+([\s\S]*?)(?=\n##\s|\n\*\*Lektionen:|\n##\s+Lektion)/i);
  if (!block?.[1]) return null;
  const para = block[1]
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .find((p) => p.length > 20 && !p.startsWith("**"));
  if (!para) return null;
  const sentences = para.match(/[^.!?]+[.!?]+/g) || [para];
  const two = sentences.slice(0, 2).join(" ").trim();
  return two.slice(0, 420) || para.slice(0, 420);
}
