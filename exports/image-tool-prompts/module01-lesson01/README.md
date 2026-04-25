# module01-lesson01 — Bilder manuell erzeugen

## Ziel

Pro generiertem Bild eine Datei `visualNN.png` in:

`assets-input/module01-lesson01/`

(Reihenfolge wie unten: 01 → `visual01.png`, …)

## Vorgehen

1. **Midjourney (Discord):** Inhalt von `visual01-MJ.txt` etc. als **einen** Prompt posten. Typische Parameter: `--ar 16:9 --style raw` (Modell je nach Abo anpassen). Wenn der Prompt zu lang ist: `GLOBAL-PROMPT.txt` einmal ins Profil / Stil-Notiz legen, dann nur die **eine** nummerierte Zeile aus derselben `visualNN-MJ.txt` (unterhalb des Blocks) nutzen.
2. **DALL·E / Firefly / andere:** Gleicher Text; Seitenverhältnis **16:9** wählen, Auflösung möglichst **1920×1080**.
3. **Gamma Web-UI:** Pro Seite ein Bild exportieren — **kein** fertiges „Slide-Deck“ mit Titeln nutzen; nur die Grafik. Kein Text auf der Fläche (siehe GLOBAL-PROMPT).
4. Exportierte Bilder als **PNG** speichern und exakt `visual01.png` … `visual06.png` benennen.

## Dateien in diesem Ordner

| Datei | Inhalt |
|-------|--------|
| `GLOBAL-PROMPT.txt` | Brand + Verbote (nur Referenz) |
| `visualNN-MJ.txt` | GLOBAL + eine Zeile — **Copy-Paste** pro Bild |

**Anzahl Frames:** 6

---

Siehe auch: `docs/VIDEO_PRODUCTION_WORKFLOW.md` §3 und `docs/SLIDE_GENERATION_RULES.md`.
