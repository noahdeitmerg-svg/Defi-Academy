# F7 — Audit & Mapping (Phase 1)

**Quelle der Modul-IDs:** `data/courseStructure.ts` (`ALL_MODULES[].id`) — nicht ändern.

**UX-Lektions-IDs:** Wie in `lessonsForModule(n)` definiert: Modul 1 beginnt mit `01-was-ist-defi`, danach `02-lektion`–`06-lektion`; Module 2–17: `01-lektion`–`06-lektion`.

**Legacy-Routen (heute):** `/module/[moduleSlug]/lesson/[lessonSlug]` mit `moduleSlug = moduleN`, `lessonSlug = Dateiname ohne .md` (z. B. `4-1`). Siehe `lib/content.ts` (`getModule` listet nur `^\d+-\d+\.md$`).

**Neue Kurs-URLs:** `/kurs/[modulId]/[lektionId]` (App Router unter `app/(app)/kurs/...`).

---

## 1.1 Legacy-Module `content/modules/module1` … `module16`

| Legacy-Ordner | Anzahl Lektions-MDs (`N-M.md`) | Dateien | `meta.json` | `open-quiz.md` | Auffälligkeiten |
|---------------|----------------------------------|---------|-------------|----------------|-----------------|
| `module1` | 6 | `1-1.md` … `1-6.md` | ja | ja | Zusätzlich **`lesson1.md`**, **`lesson2.md`** (werden von `getModule()` **nicht** gelistet — keine Legacy-Route). Vermutlich ältere/kürzere Varianten zu Lektion 1–2; inhaltlich mit `1-1`/`1-2` nicht identisch. |
| `module2` | 6 | `2-1.md` … `2-6.md` | ja | ja | — |
| `module3` | 6 | `3-1.md` … `3-6.md` | ja | ja | — |
| `module4` | 6 | `4-1.md` … `4-6.md` | ja | ja | — |
| `module5` | 6 | `5-1.md` … `5-6.md` | ja | ja | — |
| `module6` | 6 | `6-1.md` … `6-6.md` | ja | ja | — |
| `module7` | 6 | `7-1.md` … `7-6.md` | ja | ja | — |
| `module8` | 6 | `8-1.md` … `8-6.md` | ja | ja | — |
| `module9` | 6 | `9-1.md` … `9-6.md` | ja | ja | — |
| `module10` | 6 | `10-1.md` … `10-6.md` | ja | ja | — |
| `module11` | 6 | `11-1.md` … `11-6.md` | ja | ja | — |
| `module12` | 6 | `12-1.md` … `12-6.md` | ja | ja | — |
| `module13` | 3 | **`13-4.md`**, **`13-5.md`**, **`13-6.md` only** | ja | ja | **`13-1`–`13-3` fehlen** — Kursstruktur erwartet trotzdem 6 Lektionen. |
| `module14` | 3 | **`14-4.md`**, **`14-5.md`**, **`14-6.md` only** | ja | ja | **`14-1`–`14-3` fehlen**. |
| `module15` | 2 | **`15-4.md`**, **`15-5.md` only** | ja | ja | **`15-1`–`15-3` und `15-6` fehlen**. |
| `module16` | 3 | `16-1.md` … `16-3.md` | ja | ja | **`16-4`–`16-6` fehlen**. |

**Hinweis UX-Pfade Modul 1–3:** Unter `content/modules/` existieren bereits die Ordner `01-defi-grundlagen/`, `02-wallets-sicherheit/`, `03-blockchain-mechanik/` mit `lesson.md` je Lektion. F7-Migration muss entscheiden: **überschreiben** vs. **diff/merge** — ohne deine Vorgabe nur dokumentieren, kein automatisches Überschreiben.

---

## 1.2 Modul 17 — aktueller Stand

- Es gibt **keinen** Ordner `content/modules/module17/`.
- Die Quelle liegt als **eine** Markdown-Datei mit klar getrennten Abschnitten **Lektion 17.1** … **Lektion 17.6**:

**Pfad:** `Module/modul-17-portfolio-construction-rwa-FINAL.md`

Inhaltlich: Modul-Überblick + sechs Lektionen (Überschriften `## Lektion 17.N — …`). Import in Phase 3 per **Aufteilen** dieser Abschnitte in `content/modules/17-portfolio-future/01-lektion` … `06-lektion` (IDs laut `courseStructure.ts`).

---

## 1.3 Mapping-Regeln (vor Migration verbindlich)

1. **Dateiname `N-M.md`:** `M` ist die Lektionsnummer innerhalb des Moduls. Mapping auf die **M-te** UX-Lektion der `courseStructure`-Reihe (Modul 1: Position 1 = `01-was-ist-defi`, Position 2 = `02-lektion`, …).
2. **Lücken (13–16):** Nur vorhandene Dateien mappen; **fehlende** UX-Slots (`01-lektion` …) bleiben ohne Legacy-Inhalt bis Klärung (Platzhalter, Duplikat aus anderem FINAL, oder absichtlich leer).
3. **`lesson1.md` / `lesson2.md` (nur module1):** **Kein Mapping** in der Haupttabelle bis **explizite Entscheidung** (siehe unten „Sonderfälle“).

---

## 1.4 Mapping-Tabelle

### A) `N-M.md` → UX (`lesson.md`-Zielpfad)

| Legacy-Pfad | Neue UX-ID (Modul) | Neue UX-ID (Lektion) | Neuer Pfad |
|-------------|--------------------|----------------------|------------|
| `content/modules/module1/1-1.md` | `01-defi-grundlagen` | `01-was-ist-defi` | `content/modules/01-defi-grundlagen/01-was-ist-defi/lesson.md` |
| `content/modules/module1/1-2.md` | `01-defi-grundlagen` | `02-lektion` | `content/modules/01-defi-grundlagen/02-lektion/lesson.md` |
| `content/modules/module1/1-3.md` | `01-defi-grundlagen` | `03-lektion` | `content/modules/01-defi-grundlagen/03-lektion/lesson.md` |
| `content/modules/module1/1-4.md` | `01-defi-grundlagen` | `04-lektion` | `content/modules/01-defi-grundlagen/04-lektion/lesson.md` |
| `content/modules/module1/1-5.md` | `01-defi-grundlagen` | `05-lektion` | `content/modules/01-defi-grundlagen/05-lektion/lesson.md` |
| `content/modules/module1/1-6.md` | `01-defi-grundlagen` | `06-lektion` | `content/modules/01-defi-grundlagen/06-lektion/lesson.md` |
| `content/modules/module2/2-1.md` | `02-wallets-sicherheit` | `01-lektion` | `content/modules/02-wallets-sicherheit/01-lektion/lesson.md` |
| `content/modules/module2/2-2.md` | `02-wallets-sicherheit` | `02-lektion` | `content/modules/02-wallets-sicherheit/02-lektion/lesson.md` |
| `content/modules/module2/2-3.md` | `02-wallets-sicherheit` | `03-lektion` | `content/modules/02-wallets-sicherheit/03-lektion/lesson.md` |
| `content/modules/module2/2-4.md` | `02-wallets-sicherheit` | `04-lektion` | `content/modules/02-wallets-sicherheit/04-lektion/lesson.md` |
| `content/modules/module2/2-5.md` | `02-wallets-sicherheit` | `05-lektion` | `content/modules/02-wallets-sicherheit/05-lektion/lesson.md` |
| `content/modules/module2/2-6.md` | `02-wallets-sicherheit` | `06-lektion` | `content/modules/02-wallets-sicherheit/06-lektion/lesson.md` |
| `content/modules/module3/3-1.md` | `03-blockchain-mechanik` | `01-lektion` | `content/modules/03-blockchain-mechanik/01-lektion/lesson.md` |
| `content/modules/module3/3-2.md` | `03-blockchain-mechanik` | `02-lektion` | `content/modules/03-blockchain-mechanik/02-lektion/lesson.md` |
| `content/modules/module3/3-3.md` | `03-blockchain-mechanik` | `03-lektion` | `content/modules/03-blockchain-mechanik/03-lektion/lesson.md` |
| `content/modules/module3/3-4.md` | `03-blockchain-mechanik` | `04-lektion` | `content/modules/03-blockchain-mechanik/04-lektion/lesson.md` |
| `content/modules/module3/3-5.md` | `03-blockchain-mechanik` | `05-lektion` | `content/modules/03-blockchain-mechanik/05-lektion/lesson.md` |
| `content/modules/module3/3-6.md` | `03-blockchain-mechanik` | `06-lektion` | `content/modules/03-blockchain-mechanik/06-lektion/lesson.md` |
| `content/modules/module4/4-1.md` | `04-dex-mechanik` | `01-lektion` | `content/modules/04-dex-mechanik/01-lektion/lesson.md` |
| `content/modules/module4/4-2.md` | `04-dex-mechanik` | `02-lektion` | `content/modules/04-dex-mechanik/02-lektion/lesson.md` |
| `content/modules/module4/4-3.md` | `04-dex-mechanik` | `03-lektion` | `content/modules/04-dex-mechanik/03-lektion/lesson.md` |
| `content/modules/module4/4-4.md` | `04-dex-mechanik` | `04-lektion` | `content/modules/04-dex-mechanik/04-lektion/lesson.md` |
| `content/modules/module4/4-5.md` | `04-dex-mechanik` | `05-lektion` | `content/modules/04-dex-mechanik/05-lektion/lesson.md` |
| `content/modules/module4/4-6.md` | `04-dex-mechanik` | `06-lektion` | `content/modules/04-dex-mechanik/06-lektion/lesson.md` |
| `content/modules/module5/5-1.md` | `05-liquidity-pools` | `01-lektion` | `content/modules/05-liquidity-pools/01-lektion/lesson.md` |
| `content/modules/module5/5-2.md` | `05-liquidity-pools` | `02-lektion` | `content/modules/05-liquidity-pools/02-lektion/lesson.md` |
| `content/modules/module5/5-3.md` | `05-liquidity-pools` | `03-lektion` | `content/modules/05-liquidity-pools/03-lektion/lesson.md` |
| `content/modules/module5/5-4.md` | `05-liquidity-pools` | `04-lektion` | `content/modules/05-liquidity-pools/04-lektion/lesson.md` |
| `content/modules/module5/5-5.md` | `05-liquidity-pools` | `05-lektion` | `content/modules/05-liquidity-pools/05-lektion/lesson.md` |
| `content/modules/module5/5-6.md` | `05-liquidity-pools` | `06-lektion` | `content/modules/05-liquidity-pools/06-lektion/lesson.md` |
| `content/modules/module6/6-1.md` | `06-lending-markets` | `01-lektion` | `content/modules/06-lending-markets/01-lektion/lesson.md` |
| `content/modules/module6/6-2.md` | `06-lending-markets` | `02-lektion` | `content/modules/06-lending-markets/02-lektion/lesson.md` |
| `content/modules/module6/6-3.md` | `06-lending-markets` | `03-lektion` | `content/modules/06-lending-markets/03-lektion/lesson.md` |
| `content/modules/module6/6-4.md` | `06-lending-markets` | `04-lektion` | `content/modules/06-lending-markets/04-lektion/lesson.md` |
| `content/modules/module6/6-5.md` | `06-lending-markets` | `05-lektion` | `content/modules/06-lending-markets/05-lektion/lesson.md` |
| `content/modules/module6/6-6.md` | `06-lending-markets` | `06-lektion` | `content/modules/06-lending-markets/06-lektion/lesson.md` |
| `content/modules/module7/7-1.md` | `07-sicherheiten-liquidationen` | `01-lektion` | `content/modules/07-sicherheiten-liquidationen/01-lektion/lesson.md` |
| `content/modules/module7/7-2.md` | `07-sicherheiten-liquidationen` | `02-lektion` | `content/modules/07-sicherheiten-liquidationen/02-lektion/lesson.md` |
| `content/modules/module7/7-3.md` | `07-sicherheiten-liquidationen` | `03-lektion` | `content/modules/07-sicherheiten-liquidationen/03-lektion/lesson.md` |
| `content/modules/module7/7-4.md` | `07-sicherheiten-liquidationen` | `04-lektion` | `content/modules/07-sicherheiten-liquidationen/04-lektion/lesson.md` |
| `content/modules/module7/7-5.md` | `07-sicherheiten-liquidationen` | `05-lektion` | `content/modules/07-sicherheiten-liquidationen/05-lektion/lesson.md` |
| `content/modules/module7/7-6.md` | `07-sicherheiten-liquidationen` | `06-lektion` | `content/modules/07-sicherheiten-liquidationen/06-lektion/lesson.md` |
| `content/modules/module8/8-1.md` | `08-stablecoins` | `01-lektion` | `content/modules/08-stablecoins/01-lektion/lesson.md` |
| `content/modules/module8/8-2.md` | `08-stablecoins` | `02-lektion` | `content/modules/08-stablecoins/02-lektion/lesson.md` |
| `content/modules/module8/8-3.md` | `08-stablecoins` | `03-lektion` | `content/modules/08-stablecoins/03-lektion/lesson.md` |
| `content/modules/module8/8-4.md` | `08-stablecoins` | `04-lektion` | `content/modules/08-stablecoins/04-lektion/lesson.md` |
| `content/modules/module8/8-5.md` | `08-stablecoins` | `05-lektion` | `content/modules/08-stablecoins/05-lektion/lesson.md` |
| `content/modules/module8/8-6.md` | `08-stablecoins` | `06-lektion` | `content/modules/08-stablecoins/06-lektion/lesson.md` |
| `content/modules/module9/9-1.md` | `09-yield-strategien` | `01-lektion` | `content/modules/09-yield-strategien/01-lektion/lesson.md` |
| `content/modules/module9/9-2.md` | `09-yield-strategien` | `02-lektion` | `content/modules/09-yield-strategien/02-lektion/lesson.md` |
| `content/modules/module9/9-3.md` | `09-yield-strategien` | `03-lektion` | `content/modules/09-yield-strategien/03-lektion/lesson.md` |
| `content/modules/module9/9-4.md` | `09-yield-strategien` | `04-lektion` | `content/modules/09-yield-strategien/04-lektion/lesson.md` |
| `content/modules/module9/9-5.md` | `09-yield-strategien` | `05-lektion` | `content/modules/09-yield-strategien/05-lektion/lesson.md` |
| `content/modules/module9/9-6.md` | `09-yield-strategien` | `06-lektion` | `content/modules/09-yield-strategien/06-lektion/lesson.md` |
| `content/modules/module10/10-1.md` | `10-leverage-loops` | `01-lektion` | `content/modules/10-leverage-loops/01-lektion/lesson.md` |
| `content/modules/module10/10-2.md` | `10-leverage-loops` | `02-lektion` | `content/modules/10-leverage-loops/02-lektion/lesson.md` |
| `content/modules/module10/10-3.md` | `10-leverage-loops` | `03-lektion` | `content/modules/10-leverage-loops/03-lektion/lesson.md` |
| `content/modules/module10/10-4.md` | `10-leverage-loops` | `04-lektion` | `content/modules/10-leverage-loops/04-lektion/lesson.md` |
| `content/modules/module10/10-5.md` | `10-leverage-loops` | `05-lektion` | `content/modules/10-leverage-loops/05-lektion/lesson.md` |
| `content/modules/module10/10-6.md` | `10-leverage-loops` | `06-lektion` | `content/modules/10-leverage-loops/06-lektion/lesson.md` |
| `content/modules/module11/11-1.md` | `11-mev` | `01-lektion` | `content/modules/11-mev/01-lektion/lesson.md` |
| `content/modules/module11/11-2.md` | `11-mev` | `02-lektion` | `content/modules/11-mev/02-lektion/lesson.md` |
| `content/modules/module11/11-3.md` | `11-mev` | `03-lektion` | `content/modules/11-mev/03-lektion/lesson.md` |
| `content/modules/module11/11-4.md` | `11-mev` | `04-lektion` | `content/modules/11-mev/04-lektion/lesson.md` |
| `content/modules/module11/11-5.md` | `11-mev` | `05-lektion` | `content/modules/11-mev/05-lektion/lesson.md` |
| `content/modules/module11/11-6.md` | `11-mev` | `06-lektion` | `content/modules/11-mev/06-lektion/lesson.md` |
| `content/modules/module12/12-1.md` | `12-flash-loans` | `01-lektion` | `content/modules/12-flash-loans/01-lektion/lesson.md` |
| `content/modules/module12/12-2.md` | `12-flash-loans` | `02-lektion` | `content/modules/12-flash-loans/02-lektion/lesson.md` |
| `content/modules/module12/12-3.md` | `12-flash-loans` | `03-lektion` | `content/modules/12-flash-loans/03-lektion/lesson.md` |
| `content/modules/module12/12-4.md` | `12-flash-loans` | `04-lektion` | `content/modules/12-flash-loans/04-lektion/lesson.md` |
| `content/modules/module12/12-5.md` | `12-flash-loans` | `05-lektion` | `content/modules/12-flash-loans/05-lektion/lesson.md` |
| `content/modules/module12/12-6.md` | `12-flash-loans` | `06-lektion` | `content/modules/12-flash-loans/06-lektion/lesson.md` |
| `content/modules/module13/13-4.md` | `13-vetokenomics` | `04-lektion` | `content/modules/13-vetokenomics/04-lektion/lesson.md` |
| `content/modules/module13/13-5.md` | `13-vetokenomics` | `05-lektion` | `content/modules/13-vetokenomics/05-lektion/lesson.md` |
| `content/modules/module13/13-6.md` | `13-vetokenomics` | `06-lektion` | `content/modules/13-vetokenomics/06-lektion/lesson.md` |
| `content/modules/module14/14-4.md` | `14-cross-chain` | `04-lektion` | `content/modules/14-cross-chain/04-lektion/lesson.md` |
| `content/modules/module14/14-5.md` | `14-cross-chain` | `05-lektion` | `content/modules/14-cross-chain/05-lektion/lesson.md` |
| `content/modules/module14/14-6.md` | `14-cross-chain` | `06-lektion` | `content/modules/14-cross-chain/06-lektion/lesson.md` |
| `content/modules/module15/15-4.md` | `15-on-chain-analytics` | `04-lektion` | `content/modules/15-on-chain-analytics/04-lektion/lesson.md` |
| `content/modules/module15/15-5.md` | `15-on-chain-analytics` | `05-lektion` | `content/modules/15-on-chain-analytics/05-lektion/lesson.md` |
| `content/modules/module16/16-1.md` | `16-composability-risk` | `01-lektion` | `content/modules/16-composability-risk/01-lektion/lesson.md` |
| `content/modules/module16/16-2.md` | `16-composability-risk` | `02-lektion` | `content/modules/16-composability-risk/02-lektion/lesson.md` |
| `content/modules/module16/16-3.md` | `16-composability-risk` | `03-lektion` | `content/modules/16-composability-risk/03-lektion/lesson.md` |

### B) Modul 17 — Abschnitte in einer Datei

| Legacy-Pfad / logischer Abschnitt | Neue UX-ID (Modul) | Neue UX-ID (Lektion) | Neuer Pfad |
|-----------------------------------|--------------------|----------------------|------------|
| `Module/modul-17-portfolio-construction-rwa-FINAL.md` → Abschnitt **Lektion 17.1** | `17-portfolio-future` | `01-lektion` | `content/modules/17-portfolio-future/01-lektion/lesson.md` |
| `Module/modul-17-portfolio-construction-rwa-FINAL.md` → **Lektion 17.2** | `17-portfolio-future` | `02-lektion` | `content/modules/17-portfolio-future/02-lektion/lesson.md` |
| `Module/modul-17-portfolio-construction-rwa-FINAL.md` → **Lektion 17.3** | `17-portfolio-future` | `03-lektion` | `content/modules/17-portfolio-future/03-lektion/lesson.md` |
| `Module/modul-17-portfolio-construction-rwa-FINAL.md` → **Lektion 17.4** | `17-portfolio-future` | `04-lektion` | `content/modules/17-portfolio-future/04-lektion/lesson.md` |
| `Module/modul-17-portfolio-construction-rwa-FINAL.md` → **Lektion 17.5** | `17-portfolio-future` | `05-lektion` | `content/modules/17-portfolio-future/05-lektion/lesson.md` |
| `Module/modul-17-portfolio-construction-rwa-FINAL.md` → **Lektion 17.6** | `17-portfolio-future` | `06-lektion` | `content/modules/17-portfolio-future/06-lektion/lesson.md` |

### C) Sonderfälle — **Klärung vor Migration erforderlich**

| Datei | Problem | Vorschlag (bitte bestätigen) |
|-------|---------|------------------------------|
| `content/modules/module1/lesson1.md` | Parallel zu `1-1.md`; nicht in `getModule()` | **A)** ignorieren / nur ins Archiv mitnehmen; **B)** `1-1.md` ersetzen; **C)** eigenen Archiv-Ordner „alt-lesson1“ ohne UX-Route |
| `content/modules/module1/lesson2.md` | Parallel zu `1-2.md`; nicht in `getModule()` | wie oben |
| `module13`–`16` fehlende `N-1`… | Kein Legacy-Text für mehrere UX-Lektionen | **A)** UX-Ordner ohne `lesson.md` bis Nachlieferung; **B)** Inhalt aus anderen Quellen; **C)** minimale Platzhalter-Lektion (nur nach explizitem OK) |

### D) Legacy-Redirects (Referenz für Phase 5)

Jede Zeile aus Abschnitt A mit bestehender Legacy-Route:

- Von: `/module/module{N}/lesson/{N}-{M}`
- Nach: `/kurs/{uxModulId}/{uxLektionId}`

Beispiel: `/module/module4/lesson/4-1` → `/kurs/04-dex-mechanik/01-lektion`.

**Modul 17:** Heute keine `/module/module17/...`-Lektionen aus Ordnerstruktur — Redirects entstehen erst nach Anlegen der UX-Pfade (optional nur neue URLs).

---

## Kurzstatistik

| Kennzahl | Wert |
|----------|------|
| Legacy-Module mit `moduleN`-Struktur | 16 |
| `N-M.md`-Dateien gesamt (inkl. Lücken-Module) | 87 |
| Zusätzliche nicht-gemappte MDs (module1) | 2 (`lesson1.md`, `lesson2.md`) |
| Modul-17-Lektionen (logisch) | 6 (eine Quelldatei) |
| Erwartete UX-Lektionen laut `courseStructure` | 102 |
| Fehlende Legacy-Inhalte (Slots ohne MD) | 102 − 87 = **15** (sofern `lesson1/2` nicht zählen) — konsistent mit fehlenden 3+3+4+3 Lektionen in Modulen 13–16 |

---

*Phase 1 abgeschlossen. **Phase 2 (Frontmatter-Spez):** [`docs/F7-PHASE2-FRONTMATTER.md`](./F7-PHASE2-FRONTMATTER.md) — nächster Schritt: **OK für Phase 3** (mechanische Migration) inkl. Klärung §C Sonderfälle.*
