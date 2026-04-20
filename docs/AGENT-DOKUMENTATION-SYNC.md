# Agenten: Dokumentation nach Änderungen synchronisieren

**Verbindlich für alle Cursor-/KI-Agenten** (Content, UX, Video, Build). Ziel: `main` und die Doku bleiben für **parallel arbeitende Agenten** und **neue Chats** konsistent.

**Master-Kontext:** [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md)

---

## Wann?

Nach **jeder** merge-fähigen Änderung am Repo, die mindestens eines der folgenden Bereiche berührt:

- App-Code (`app/`, `components/`, `lib/`, `data/`)
- Content-Struktur oder Loader (`content/`, Skripte unter `scripts/` die Verhalten dokumentiert haben)
- Pipeline / Video / Voice (`pipeline/`, `video-renderer/`, `lesson-asset-generator/`, …)
- CI, Deploy, Env (`.github/`, `next.config.ts`, `.env.example`)

**Kleinst-Änderungen** (Tippfehler in einem Kommentar ohne fachliche Auswirkung): nur Changelog, wenn überhaupt nötig.

---

## Checkliste (abarbeiten)

1. **`docs/SYSTEMKONTEXT.md`** — Abschnitt **9 Changelog**: eine Zeile *Was / Warum* (Datum).
2. **`docs/AGENTEN-HANDBUCH.md`** — falls sich **Ist-Zustand**, Zahlen, Deploy, Pfade oder der Doku-Index ändern.
3. **`docs/ROADMAP.md`** — Meilensteine oder offene Punkte, wenn die Änderung die Roadmap berührt.
4. **`docs/HANDOFF-NEUER-CHAT.md`** — Tabellen/Pfade/Tech-Ist, wenn neue Chats sonst falsch ansetzen würden.
5. **`docs/README.md`** — Doku-Index, wenn neue Doku-Dateien hinzukommen oder wichtige Einträge wechseln.
6. **`docs/offeneAufgaben.md`** — erledigte/neue Tasks, wenn das Backlog betroffen ist.
7. **Thematische Fach-Doku** — alles, was die Änderung beschreibt oder noch **veraltete Pfade/Komponentennamen** enthält (z. B. `defi-akademie-build-dokument.md`, `VIDEO_*`, `F7-*`, `BUILD.md`, `academy-structure.md`).

**Suche nach Altlasten:** z. B. `rg "Komponentenname" docs/` nach Umbenennung oder Verschiebung.

---

## Was nicht vergessen werden soll

- **`slides.json`**: kann unverändert bleiben, aber wenn die **Lektions-UI** sie nicht mehr nutzt, muss das in Spez/Handbuch stehen (weiterhin Input für Video-Pipeline).
- **`content/takeaways.json`**: Key Takeaways für `/kurs/…`; bei Schema- oder Key-Änderungen `docs/KEY-TAKEAWAYS.md` und Loader (`lib/content/loadTakeaways.ts`) prüfen.
- **Archiv-Ordner** (`components/_deprecated/` o. ä.): im Handbuch oder UX-Spez erwähnen, damit niemand „verlorene“ Dateien sucht.

---

*Diese Datei bei Änderung der Sync-Regel selbst mit anpassen und im Changelog erwähnen.*
