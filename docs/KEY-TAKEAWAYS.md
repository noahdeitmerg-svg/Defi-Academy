# Key Takeaways — UX-Lektion (`/kurs/…`)

**Zweck:** Kurze, merkfähige Punkte **unter dem Video**, bevor Lernziele, Kernkonzepte und Übung folgen. Die Komponente blendet sich aus, wenn für die Lektion keine Einträge existieren.

---

## Wo liegt was?

| Artefakt | Pfad |
|----------|------|
| Zentrale Daten | `content/takeaways.json` |
| Loader | `lib/content/loadTakeaways.ts` |
| Einbindung in `LessonAssets` | `lib/content/loadLesson.ts` → Feld `keyTakeaways: string[]` |
| UI | `components/lesson/KeyTakeaways.tsx` (in `LessonView` direkt nach dem Video) |
| TypeScript-Typ | `data/types.ts` → `LessonAssets.keyTakeaways` |

**Input für Redaktion / Content-Agent:** `npm run export:takeaways-input` erzeugt `exports/takeaways-input/modul-01.md` … `modul-17.md` (je Modul alle `lesson.md`-Bodies + `quiz.json`, ohne Slides).

---

## JSON-Format (`content/takeaways.json`)

- Root enthält Metafelder (`__description`, `__schema_version`) und ein Objekt **`takeaways`**.
- Pro Lektion: **ein Schlüssel** im Format **`"<modulId>/<lektionId>"`**, Wert: **Array von Strings** (nicht leere Strings nach `trim`).

`modulId` und `lektionId` entsprechen den IDs in `data/courseStructure.ts` (Ordner unter `content/modules/<modulId>/<lektionId>/`).

**Beispiel:**

```json
{
  "__description": "…",
  "__schema_version": 1,
  "takeaways": {
    "01-defi-grundlagen/01-was-ist-defi": [
      "DeFi bezeichnet finanzielle Primitive auf Smart Contracts — ohne zentrale Gegenpartei im klassischen Sinne.",
      "Risiko steht immer im Raum: Smart-Contract-, Oracle- und Governance-Risiken sind Teil des Systems."
    ]
  }
}
```

---

## Regeln für Redaktion

- **3–5 Bulletpoints** pro Lektion (Ausnahme: sehr kurze Intro-Lektionen mit 2 Punkten).
- **Deutsch**, sachlich, **keine Anlageberatung**, keine „moon“-Sprache.
- Jeder Punkt **eine klare Aussage** (keine Aufzählungen im Bullet).
- Begriffe aus dem Kurs **konsistent** mit `lesson.md` / Video-Skript.

Ausführlicher Befüllungsauftrag für Agenten: [`CONTENT-AGENT-TAKEAWAYS.md`](./CONTENT-AGENT-TAKEAWAYS.md).

---

## CI / Validierung

`npm run validate:content` prüft **`content/modules/moduleN`** (Legacy), **nicht** `takeaways.json`. Syntax-Fehler in `takeaways.json` führen beim Build/Laufzeit-Lesen zu leeren Takeaways (Fallback im Loader); deshalb nach manuellen JSON-Edits kurz `npm run typecheck` bzw. `npm run check` ausführen.
