# F7 — Phase 2: Frontmatter für UX-`lesson.md`

**Master:** [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md) · **Mapping:** [`docs/F7-MAPPING.md`](./F7-MAPPING.md) (Phase 1) · **Roadmap:** [`docs/ROADMAP.md`](./ROADMAP.md) F7

**Zweck:** Ein **festes YAML-Schema** am Kopf jeder UX-Lektion (`content/modules/<modulSlug>/<lektionId>/lesson.md`), damit Phase 3 (mechanisches Kopieren/Umbenennen aus Legacy) ohne Raten durchläuft. **Keine** echte Content-Migration in dieser Phase — nur Spezifikation.

---

## 1. Referenz (Ist)

Vorbild sind die Free-Module unter `content/modules/01-defi-grundlagen/…` / `02-…` / `03-…`, z. B. [`content/modules/01-defi-grundlagen/01-was-ist-defi/lesson.md`](../content/modules/01-defi-grundlagen/01-was-ist-defi/lesson.md).

---

## 2. Pflicht-Frontmatter (YAML zwischen `---`)

Alle Schlüssel **snake_case** in der Datei, Werte deutsch wo inhaltlich, IDs exakt wie in `data/courseStructure.ts`.

| Feld | Typ | Regel |
|------|-----|--------|
| `id` | string | **=** `lektionId` aus `lessonsForModule(n)` (z. B. `01-was-ist-defi`, `02-lektion`, …). Muss mit Ordnernamen übereinstimmen. |
| `number` | integer | 1-basierte Lektionsnummer **innerhalb des Moduls** (1…6). |
| `moduleId` | string | **=** `modulId` aus `ALL_MODULES[].id` (z. B. `04-dex-mechanik`). Muss mit übergeordnetem Modul-Ordner und `module.json` übereinstimmen. |
| `title` | string | Kurzer deutscher Lektionstitel (Navigation + SEO). |
| `estimatedMinutes` | integer | Richtwert ≥ 5; aus Legacy optional übernommen oder geschätzt. |
| `learningObjectives` | string[] | 3–8 Stichpunkte (aus Legacy „Lernziele“ / Bullet-Liste). |
| `keyConcepts` | string[] | 3–10 Begriffe (Kurzlabels, oft Englisch ok). |

**Verboten in Phase 3:** Zusätzliche freie Keys ohne Abstimmung — sonst bricht `gray-matter` / Loader-Parser später. Erweiterungen nur mit Issue + Anpassung `lib/content/loadLesson.ts`.

---

## 3. Optional (Phase 3b oder später)

| Feld | Typ | Hinweis |
|------|-----|--------|
| `legacyLessonSlug` | string | Nur während Migration: z. B. `4-2` für Redirect-Debugging. |
| `sourcePath` | string | Relativer Repo-Pfad der Legacy-Datei (`content/modules/module4/4-2.md`). Nach Stabilisierung wieder entfernen. |

---

## 4. Mapping Legacy → UX (inhaltlich)

Entspricht Spalten in **F7-MAPPING §1.4 Tabelle A**:

1. Legacy-Datei `content/modules/module{N}/{N}-{M}.md` mit `N` = Modulnummer, `M` = Lektion.
2. Ziel-`moduleId` und Ziel-`id` (Lektion) stehen in der Mapping-Tabelle (Spalten „Neue UX-ID (Modul|Lektion)“).
3. **Frontmatter nach Ziel:**
   - `moduleId` ← Spalte Modul-Slug  
   - `id` ← Spalte Lektions-Slug  
   - `number` ← Position der Ziel-Lektion in `courseStructure.lessons` (1…6), konsistent mit `M` nur wenn bewusst 1:1 gemappt (Lücken-Module 13–16: `M` kann **nicht** gleich Slot-Index sein — dann `number` = Slot-Index laut `courseStructure`, nicht `M`).

**Modul 17 (eine FINAL-Datei):** Abschnitte `## Lektion 17.1` … `## Lektion 17.6` → sechs Zielpfade laut Tabelle B (`17-portfolio-future` / `01-lektion` … `06-lektion`). Frontmatter `number` = 1…6.

**Sonderfälle (Tabelle C):** Kein automatisches Überschreiben von `01-defi-grundlagen` … ohne Owner-Entscheid — siehe [`docs/F7-MAPPING.md`](./F7-MAPPING.md) §C.

---

## 5. Beispiel Vorher / Nachher

### Vorher (Legacy, Auszug `content/modules/module4/4-2.md`)

```markdown
# Die Constant-Product-Formel: Uniswap V2

## Lernziele
- Die Formel x·y=k erklären …

## Erklärung
Uniswap V2 …
```

*(Kein YAML; Überschriften deutsch; Slugs kommen aus dem Dateinamen `4-2`.)*

### Nachher (UX-Ziel `content/modules/04-dex-mechanik/02-lektion/lesson.md`)

```markdown
---
id: 02-lektion
number: 2
moduleId: 04-dex-mechanik
title: Die Constant-Product-Formel (Uniswap V2)
estimatedMinutes: 45
learningObjectives:
  - Die Formel x·y=k erklären und Swap-Preise ableiten
  - Preis-Impact und Gebührenlogik von Uniswap V2 einordnen
  - Arbitrage als Preismechanismus beschreiben
keyConcepts:
  - Constant Product AMM
  - Uniswap V2
  - Impermanent Loss
  - Spot-Preis
---

## Einführung

… *Markdown-Body: aus Legacy-Abschnitten übernommen, Überschriften optional an UX-Linter angeglichen* …
```

**Hinweis:** Der **Body** unterhalb `---` folgt der bestehenden UX-Konvention (z. B. `## Einführung`, `## Kernmerkmale`, …) wie in Modul 1–3; exakte Überschriften-Hierarchie kann Phase 3 mit einem kurzen Style-Guide fixieren — nicht Teil dieses Frontmatter-Locks.

---

## 6. `module.json` (Modul-Ebene)

Unverändert zur bestehenden Struktur: `id`, `number`, `title`, `description`, `tier`, `estimatedMinutes` — muss zu `data/courseStructure.ts` passen. Phase 3 legt fehlende Ordner `content/modules/<moduleId>/module.json` an, bevor Lektionen kopiert werden.

---

## 7. OK für Phase 3

Wenn dieses Schema + Mapping-Regeln **freigegeben** sind, ist Phase 3 **mechanisch**: Skript liest jede Legacy-Zeile aus F7-MAPPING Tabelle A/B, erzeugt Zielordner, schreibt `lesson.md` = Frontmatter + transformierter Body, aktualisiert optional `legacyLessonSlug` / `sourcePath` für die Übergangsphase.

**Nicht** starten ohne Freigabe zu **F7-MAPPING §C** (Sonderfälle A/B/C und ggf. Überschreiben M1–M3).
