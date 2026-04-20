# Content-Agent: `content/takeaways.json` befüllen

**Ziel:** Für **alle ca. 102 Lektionen** der UX-Kursstruktur (`data/courseStructure.ts`) jeweils **3–5 Key Takeaways** in `content/takeaways.json` eintragen, sodass `components/lesson/KeyTakeaways.tsx` auf `/kurs/[modulId]/[lektionId]` sichtbar wird.

**Spez (Format, Keys, UI):** [`KEY-TAKEAWAYS.md`](./KEY-TAKEAWAYS.md)

---

## Vorgehen

1. **`takeaways`-Objekt** iterativ füllen; `__schema_version` nur bei inhaltlichem Schema-Bruch erhöhen (mit Absprache).
2. **Schlüssel exakt** als `modulId/lektionId` (Slash, keine Leerzeichen). Beide IDs aus `ALL_MODULES[].id` und `ALL_MODULES[].lessons[]` übernehmen.
3. Pro Lektion **`lesson.md`** (UX-Pfad) und bei Bedarf **`Module/modul-NN-*-FINAL.md`** als inhaltliche Quelle nutzen — Takeaways sollen das **Kernlernziel** zusammenfassen, nicht das Skript Wort für Wort wiederholen.
4. Nach jedem größeren Block: JSON validieren (Editor / `node -e "JSON.parse(require('fs').readFileSync('content/takeaways.json','utf8'))"`).

---

## Qualitätskriterien

| Kriterium | Anforderung |
|-----------|-------------|
| Anzahl | 3–5 Strings pro Lektion |
| Länge | lieber zwei prägnante Sätze als ein langer Absatz |
| Ton | deutsch, nüchtern, didaktisch; Risiken nennen wo sinnvoll |
| Fakten | mit Quelltext abgleichen; keine erfundenen Protokoll-Details |
| Doppelungen | gleiche Formulierung nicht in jeder Lektion eines Moduls wiederholen |

---

## Abdeckung (Checkliste)

- [ ] Modul `01-defi-grundlagen` — 6 Lektionen  
- [ ] Modul `02-wallets-sicherheit` — 6 Lektionen  
- [ ] Modul `03-blockchain-mechanik` — 6 Lektionen  
- [ ] Module `04-dex-mechanik` … `17-portfolio-future` — je 6 Lektionen (gesamt 84)

**Hinweis:** Ordner unter `content/modules/` existieren für Modul 4–17 im UX-Pfad ggf. noch nicht — Keys in `takeaways.json` können **trotzdem** gesetzt werden; sobald `lesson.md` existiert, erscheinen die Takeaways automatisch.

---

## Doku-Sync

Nach Abschluss größerer Blöcke: `docs/SYSTEMKONTEXT.md` Abschnitt 9, ggf. `docs/offeneAufgaben.md` und `docs/ROADMAP.md` (Meilenstein „Key-Takeaways-Inhalte“) anpassen — siehe [`AGENT-DOKUMENTATION-SYNC.md`](./AGENT-DOKUMENTATION-SYNC.md).
