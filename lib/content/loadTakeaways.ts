import fs from "node:fs";
import path from "node:path";

type TakeawaysFile = {
  takeaways?: Record<string, unknown>;
};

let cached: TakeawaysFile | null = null;

function readTakeawaysFile(): TakeawaysFile {
  if (cached !== null) return cached;
  const filePath = path.join(process.cwd(), "content", "takeaways.json");
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    cached = JSON.parse(raw) as TakeawaysFile;
    return cached;
  } catch {
    cached = {};
    return cached;
  }
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((x): x is string => typeof x === "string")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Zentrale Key-Takeaways für eine UX-Lektion (`content/takeaways.json`).
 * Einmal pro Prozess einlesen und gecacht (Build-Zeit / SSR).
 */
export function loadTakeaways(modulId: string, lektionId: string): string[] {
  const key = `${modulId}/${lektionId}`;
  const data = readTakeawaysFile();
  return asStringArray(data.takeaways?.[key]);
}
