# Cursor-Update — Brand 2.0 Erweiterung auf Module 14–17

**Zweck:** Brand 2.0 deckt bisher nur Module 1–13 ab. Für die anstehende Batch-Produktion von Modul 4–17 werden vier neue Hero-Motive plus eine neue Kategorie-Pill benötigt. Dieses Paket enthält die fertigen Änderungen.

**Was sich ändert:** Vier neue Motive (14–17) und die Kategorie-Zuordnung wird an die offizielle Gruppierung aus `AGENTEN-HANDBUCH.md §2` ausgerichtet.

**Was nicht angefasst wird:** Content-Markdown der Module, keine Änderung der Farben/Typografie/Logo. Reine Erweiterung des bestehenden Brand 2.0 Systems.

---

## Reihenfolge

1. Diese Änderungen einspielen
2. Verifikation (siehe unten) durchlaufen
3. Pilot: Modul 3 (Kategorie-Fix-Test) + Modul 14 (neues Motiv-Test)
4. Bei grünem Pilot: Batch-Render Modul 3 + Modul 4–17 gemäß `docs/VIDEO_BATCH_ROADMAP.md`
5. Changelog-Eintrag in `docs/SYSTEMKONTEXT.md §9`

---

## Dateien im Paket

| Datei | Zielort im Repo | Art der Änderung |
|---|---|---|
| `brand/hero-motifs.js` | `brand/hero-motifs.js` | 4 neue Motiv-Funktionen + Registry-Erweiterung |
| `brand/brand-2.0-components.js` | `brand/brand-2.0-components.js` | Kategorie-Labels angepasst |
| `brand/render-slide-v2.js` | `brand/render-slide-v2.js` | Kategorie-Labels angepasst |
| `pipeline-test/render-slides-to-svg-v2.js` | `pipeline-test/src/render-slides-to-svg-v2.js` | `categoryForModule()` an offizielle Gruppierung angepasst |

## Preview-Ordner (nicht ins Repo, nur zur visuellen Verifikation)

- `previews/all-17-motifs-grid.jpg` — alle 17 Motive im Grid
- `previews/new-motifs-grid.jpg` — nur die vier neuen (14–17)
- `previews/module-14.svg/png` … `module-17.svg/png` — Einzel-Motive
- `previews/modul14-test-slide.png` — Beispiel-Slide mit neuem `INFRASTRUKTUR`-Pill

---

## Änderungen im Detail

### 1. Vier neue Hero-Motive (`brand/hero-motifs.js`)

- **`motifModule14`** — Cross-Chain: zwei Knoten-Cluster links/rechts, verbunden durch **gepunktete Bridge** mit Diamant (Trust-Annahme visualisiert)
- **`motifModule15`** — On-Chain Analytics: Dashboard-Rahmen mit Datenpunkten auf Trendlinie + Lupe
- **`motifModule16`** — Composability Risk: vier gestapelte Protokoll-Layer mit Dependency-Pfeilen rechts und ×-Multiplikatoren links (multiplikatives Risiko)
- **`motifModule17`** — Portfolio Construction: Vier-Segment-Ring (4-Bucket-Framework) mit innerem Rebalancing-Ring

Registry am Ende der Datei wurde erweitert:

```javascript
const MOTIFS = {
  1: motifModule1, 2: motifModule2, ..., 13: motifModule13,
  14: motifModule14,  // ← neu
  15: motifModule15,  // ← neu
  16: motifModule16,  // ← neu
  17: motifModule17,  // ← neu
};
```

### 2. Kategorie-Pill-Labels angeglichen (`brand/brand-2.0-components.js` + `brand/render-slide-v2.js`)

Die bisherigen Kategorien (`foundation`/`practice`/`strategy`/`risk`/`advanced`) wurden an die offizielle Gruppierung aus `AGENTEN-HANDBUCH §2` ausgerichtet:

| Keys | Label (alt) | Label (neu) | Module |
|---|---|---|---|
| `foundation` | GRUNDLAGEN | **GRUNDLAGEN** | 1–3 |
| `practice` | PRAXIS | **PROTOKOLLMECHANIK** | 4–8 |
| `strategy` | STRATEGIE | **STRATEGIE** | 9–13 |
| `infrastructure` | — (neu) | **INFRASTRUKTUR** | 14–17 |
| `risk` | RISIKO & AUDIT | entfernt | (vorher 7, 11) |
| `advanced` | FORTGESCHRITTEN | entfernt | (vorher >10) |

### 3. `categoryForModule(n)` aktualisiert (`pipeline-test/src/render-slides-to-svg-v2.js`)

```javascript
function categoryForModule(n) {
  if (n <= 3) return 'foundation';      // GRUNDLAGEN — Module 1–3
  if (n <= 8) return 'practice';         // PROTOKOLLMECHANIK — Module 4–8
  if (n <= 13) return 'strategy';        // STRATEGIE — Module 9–13
  return 'infrastructure';               // INFRASTRUKTUR — Module 14–17
}
```

---

## Batch-Reihenfolge (Entscheidung: Option A)

Noah hat entschieden: **Modul 3 wird im Batch-Lauf mit-neugerendert**, damit die Kategorie-Pills konsistent zur offiziellen Gruppierung aus dem `AGENTEN-HANDBUCH` sind.

Hintergrund: Durch die Umstellung heißt die Kategorie für Modul 3 jetzt korrekt `GRUNDLAGEN` (vorher fälschlich `PRAXIS`). Da die 6 Lektionen von Modul 3 bereits live sind, müssen sie neu gerendert werden.

**Batch-Reihenfolge:**

```bash
# Zuerst Modul 3 neu rendern (Kategorie-Fix)
npm run videos:module -- --module 3 --live

# Dann Module 4–17 in aufsteigender Reihenfolge
for m in 4 5 6 7 8 9 10 11 12 13 14 15 16 17; do
  npm run videos:module -- --module $m --live
done
```

**Nicht neu gerendert werden müssen:**
- Modul 1 (Kategorie bleibt `GRUNDLAGEN`)
- Modul 2 (Kategorie bleibt `GRUNDLAGEN`)

**Pilot-Verifikation vor Batch:** Bevor alle 15 Module automatisch durchlaufen, bitte einen Pilot mit **zwei Modulen** machen — Modul 3 (Kategorie-Fix-Test) und Modul 14 (neue Kategorie + neues Motiv). Wenn diese beiden sauber durchlaufen und die Frame-Prüfung grün ist, kann die Schleife über 4–17 starten.


---

## Verifikation nach dem Einspielen

**Unit-Test der Motiv-Registry:**

```bash
cd pipeline-test
node -e "
const { getMotif } = require('../brand/hero-motifs');
for (let m = 1; m <= 17; m++) {
  const svg = getMotif(m, 400);
  if (!svg.includes('<svg')) throw new Error('Modul ' + m + ' kein gültiges SVG');
  console.log('✔ Modul ' + m + ' OK');
}
console.log('Alle 17 Motive verfügbar.');
"
```

**Unit-Test der Kategorie-Zuordnung:**

```bash
node -e "
const { categoryForModule } = require('./src/render-slides-to-svg-v2');
const tests = [
  [1, 'foundation'], [3, 'foundation'],
  [4, 'practice'], [8, 'practice'],
  [9, 'strategy'], [13, 'strategy'],
  [14, 'infrastructure'], [17, 'infrastructure'],
];
for (const [m, expected] of tests) {
  const actual = categoryForModule(m);
  if (actual !== expected) throw new Error('Modul ' + m + ': ' + actual + ' ≠ ' + expected);
}
console.log('categoryForModule OK für alle 17 Module.');
"
```

**Render-Smoke-Test:** Eine Lektion aus Modul 14 rendern und den ersten Frame prüfen:

```bash
# Erst prüfen, welche Lektion existiert
ls Module/modul-14-*.md
# Dann pipeline-test einzeln laufen lassen
cd pipeline-test
node src/run-full-pipeline.js \
  --input ../Module/modul-14-cross-chain-infrastructure-FINAL.md \
  --lesson module14-lesson01 \
  --output ./test-output-m14
# Frame extrahieren
ffmpeg -ss 2 -i test-output-m14/module14-lesson01/final_test_video.mp4 \
  -vframes 1 /tmp/modul14-smoke.jpg
```

Im Frame muss erscheinen:
- Oben links `INFRASTRUKTUR` als Pill (gold-umrandet, wie die anderen Kategorie-Pills)
- Rechts das neue Motiv: zwei Chain-Cluster mit Bridge dazwischen
- Alles andere wie gewohnt: Navy-Background, Gold-Akzente, Wordmark-Footer

---

## Changelog-Eintrag

Nach erfolgreichem Einspielen plus Batch-Lauf bitte zwei Zeilen in `docs/SYSTEMKONTEXT.md §9 Changelog`:

```markdown
| 2026-04-20 | Brand 2.0 auf **17 Module** erweitert: vier neue Hero-Motive (Cross-Chain, On-Chain Analytics, Composability Risk, Portfolio Construction) + Kategorie-Gruppierung (`GRUNDLAGEN`/`PROTOKOLLMECHANIK`/`STRATEGIE`/`INFRASTRUKTUR`) an `AGENTEN-HANDBUCH §2` ausgerichtet. |
| 2026-04-20 | Modul 3 mit korrigierter `GRUNDLAGEN`-Pill neu gerendert; Module 4–17 erstmals per Batch produziert. `public/videos/module3-3-1..6` und `module4-4-1..N` … `module17-17-1..N`. |
```

Gleichzeitig `§5 Videos — Stand Produktion` aktualisieren: aus „Modul 4–17 noch nicht per Batch gerendert" wird „Modul 1–17 komplett live".

