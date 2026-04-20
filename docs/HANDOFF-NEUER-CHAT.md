# Handoff — neuer Cursor-Chat (DeFi Academy)

**Stand:** 2026-04-21 · Repo: **Defi-Academy** · Branch: **`main`**

---

## Warum diese Datei?

Lange Cursor-Chats verlieren mit der Zeit **Kontext** (Token-Budget, Zusammenfassungen). Dieses Dokument plus **`docs/SYSTEMKONTEXT.md`** (Changelog) und **`docs/ROADMAP.md`** sollen einen **neuen Chat** sofort produktiv machen — ohne Ratespiele.

---

## Lesereihenfolge für den nächsten Agenten

1. **`docs/AGENTEN-HANDBUCH.md`** — Master (Zahlen, Deploy, Index).
2. **`docs/SYSTEMKONTEXT.md`** — Kurzüberblick + **Abschnitt 9 Changelog** (letzte Änderungen).
3. **`docs/ROADMAP.md`** — Meilensteine F1–F7, Produkt/UX/Content/Video.
4. Je Aufgabe: **`docs/VIDEO_PRODUCTION_WORKFLOW.md`**, **`docs/F7-MAPPING.md`**, **`docs/offeneAufgaben.md`**.

**Nach jeder eigenen Änderung:** betroffene und indexierende Doku anpassen — verbindliche Checkliste **`docs/AGENT-DOKUMENTATION-SYNC.md`** (Changelog, ROADMAP, Handbuch, thematische Docs, `rg` auf alte Pfade).

---

## Tech- und Produkt-Ist (kompakt)

| Thema | Ist |
|--------|-----|
| Framework | Next.js 15, App Router, React 19, TS strict, Tailwind v4, statischer Export (`out/`) |
| Deploy | GitHub Pages; `basePath` wenn `GITHUB_PAGES=true` (`next.config.ts`) |
| Neue Lernshell | `app/(app)/` — `/kurs`, `/kurs/[modulId]/[lektionId]`, Dashboard, Fortschritt, Profil |
| Legacy-Kurs | `app/module/...`, `app/klassisch/` — Content unter `content/modules/module1` … `module16` (+ ggf. 17 nur in `Module/`) |
| Kursstruktur (SSG) | **`data/courseStructure.ts`** — `ALL_MODULES`, Lektions-IDs; **`lib/content/loadModules.ts`**, **`loadLesson.ts`** |
| UX-Content (Slug) | `content/modules/01-defi-grundlagen/`, `02-…`, `03-…` — je `module.json`, `*/lesson.md`, `slides.json` (Pipeline, nicht mehr Folien-UI auf der Seite), `quiz.json` · **Key Takeaways:** `content/takeaways.json` (Free-Module 1–3 mit erster Redaktion befüllt) → `docs/KEY-TAKEAWAYS.md`, Rest: `docs/CONTENT-AGENT-TAKEAWAYS.md` · **Export für Agent:** `npm run export:takeaways-input` |
| Autoren-Quelle | **`Module/modul-NN-*-FINAL.md`** — Modul 17: **`Module/modul-17-portfolio-construction-rwa-FINAL.md`** |
| Fortschritt / Tier | `lib/progress/*`, **`lib/tier/TierGate.tsx`** + **`lib/tier/tierPolicy.ts`** (`isUxModuleAccessible`) — Free-Modul **oder** `progress.tier === "pro"` öffnet Inhalt |
| **Temporär (Entwicklung)** | In **`data/courseStructure.ts`** sind **alle Module `tier: "free"`** (Kommentar in Datei), damit ohne Supabase/Checkout alles in `/kurs/…` testbar ist. **Vor Launch:** Module 4–17 wieder auf `pro` setzen, wenn Zahlung live ist. |
| Voice / TTS | `scripts/generate-voice.js` → **`prepareVoiceForElevenLabs()`** in **`pipeline/voice/voice_pipeline.js`**: **Script Optimizer** (`script_optimizer.js`: Zahlen/Normalisierung + lange Sätze + Prosody) → **Pronunciation** (`preprocess_voice_script.js` + `pronunciation_dictionary.json`, inhaltlich abgestimmt mit **`defi_academy_pronunciation_dictionary.pdf`** im Repo-Root) → ElevenLabs. Doku: **`docs/VIDEO_PRODUCTION_WORKFLOW.md`**. Tests: `npm run test:voice-pipeline` |
| F7 Vorbereitung | **`docs/F7-PHASE2-FRONTMATTER.md`** (Schema), **`npm run f7:redirects`** → `config/f7-*.`, **`docs/F7-REDIRECTS.md`**, **`npm run split:modul-17`** (`--dry-run` oder Ausgabe unter `tmp/modul17-split/`). Tier-Policy-Tests: **`npm run test:tier-policy`**. |
| Content-Merge F7 | **`docs/F7-MAPPING.md`** — Phase 1 (Audit/Mapping) **fertig**; Migration (`_archive/`, Redirects, UX-Ordner 4–17) **noch offen** — siehe ROADMAP F7. |

---

## Meilensteine (Kurz)

| ID | Thema | Stand |
|----|--------|--------|
| F1–F3 | UX-Shell, Free-Module 1–3 UX-Pfad, Videos sichtbar | erledigt (siehe ROADMAP) |
| F4 | Video-Batch 4–17 | offen |
| F5 | Modul 16 Quiz Legacy | erledigt |
| F6 | Zahlung + Pro produktiv / Supabase | offen |
| F7 | Zwei Content-Stränge → eine UX-Struktur + Redirects | Phase 1 Mapping **fertig**; **Phase-2-Artefakte** (Frontmatter-Spec, Redirect-Generator, M17-Split-Skript) im Repo; Phasen 3–6 (Migration, Host-Redirects) ausstehend |

---

## Wichtige Pfade (Copy-Paste)

```
data/courseStructure.ts          # Modul-IDs, tier, lessons[]
lib/content/loadModules.ts       # UX-Module laden
lib/content/loadLesson.ts        # UX-Lektion + Video-URL
lib/tier/TierGate.tsx            # Paywall / Freigabe
pipeline/voice/voice_pipeline.js # TTS-Kette
docs/F7-MAPPING.md               # Legacy → UX Mapping
docs/F7-PHASE2-FRONTMATTER.md    # UX lesson.md Frontmatter (Phase 2)
docs/F7-REDIRECTS.md            # Redirect-Generator + GH Pages Hinweis
docs/AGENT-DOKUMENTATION-SYNC.md # Pflicht: Doku nach Repo-Änderungen
```

---

## Prompt für den neuen Chat (komplett kopieren)

```text
Du arbeitest im Repo „Defi-Academy“ (Next.js 15, GitHub Pages). Antworte auf Deutsch.

Pflichtlektüre (in dieser Reihenfolge):
1) docs/AGENTEN-HANDBUCH.md
2) docs/SYSTEMKONTEXT.md (Abschnitt 9 Changelog)
3) docs/ROADMAP.md
4) docs/HANDOFF-NEUER-CHAT.md
5) docs/AGENT-DOKUMENTATION-SYNC.md (nach eigenen Änderungen anwenden)

Kontext zum Weitermachen:
- Zwei Content-Stränge: Legacy `content/modules/moduleN` + `/module/…` vs. UX-Slug-Ordner `content/modules/01-defi-grundlagen` etc. + `/kurs/[modulId]/[lektionId]`. F7 soll alles in die UX-Struktur migrieren; Mapping steht in docs/F7-MAPPING.md (Phase 1 erledigt, Migration Phasen 2–6 offen).
- data/courseStructure.ts: verbindliche Modul-IDs. Aktuell ALLE Module temporär tier: "free" für Tests ohne Supabase — vor Launch Pro für 4–17 wiederherstellen (Kommentar steht in der Datei).
- Voice: prepareVoiceForElevenLabs = Script Optimizer (script_optimizer.js inkl. Normalizer + Prosody) → preprocess_voice_script / pronunciation_dictionary.json → ElevenLabs. VIDEO_PRODUCTION_WORKFLOW.md ist maßgeblich. npm run test:voice-pipeline.
- Nutzerregeln: Anweisungen vollständig befolgen; im Zweifel Befehle im Repo ausführen, nicht nur vorschlagen.
- Nach jeder relevanten Änderung: Dokumentation mitziehen (docs/AGENT-DOKUMENTATION-SYNC.md).

Aufgabe: [HIER DEIN KONKRETES ZIEL EINTRAGEN — z. B. „F7 Phase 2 starten“ oder „Supabase Auth skizzieren“]

Arbeite repository-genau: nur nötige Dateien ändern, bestehende Konventionen (Imports, Stil) übernehmen.
```

---

*Diese Datei bei größeren Architektur- oder Produktänderungen mit einem Satz im Changelog von `docs/SYSTEMKONTEXT.md` (Abschnitt 9) erwähnen.*
