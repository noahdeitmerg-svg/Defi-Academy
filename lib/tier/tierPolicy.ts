import type { Tier } from "@/data/types";

/** Reine Policy: UX-Lektion sichtbar, wenn Modul free oder Nutzer Pro hat. */
export function isUxModuleAccessible(
  moduleTier: Tier,
  progressTier: Tier,
): boolean {
  return moduleTier === "free" || progressTier === "pro";
}
