import fs from "node:fs/promises";
import path from "node:path";
import type { Module } from "@/data/types";
import { ALL_MODULES } from "@/data/courseStructure";

const MODULES_ROOT = path.join(process.cwd(), "content", "modules");

/**
 * Lädt `module.json` aus UX-Unterordnern und legt sie auf die statische
 * Struktur (`ALL_MODULES`) — Legacy-Ordner `moduleN` ohne `module.json`
 * werden ignoriert.
 */
export async function loadModules(): Promise<Module[]> {
  const merged = ALL_MODULES.map((m) => ({ ...m }));
  const indexById = new Map(merged.map((m, i) => [m.id, i] as const));

  try {
    const entries = await fs.readdir(MODULES_ROOT, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const metaPath = path.join(MODULES_ROOT, e.name, "module.json");
      try {
        const raw = await fs.readFile(metaPath, "utf8");
        const m = JSON.parse(raw) as Module;
        if (!m?.id || typeof m.number !== "number") continue;
        const idx = indexById.get(m.id);
        if (idx !== undefined) merged[idx] = m;
      } catch {
        /* kein module.json */
      }
    }
  } catch {
    /* content/modules fehlt */
  }

  return merged.sort((a, b) => a.number - b.number);
}
