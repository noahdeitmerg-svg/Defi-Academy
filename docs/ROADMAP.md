# Roadmap — Video-Pipeline & Distribution

**Kontext:** [`docs/AGENTEN-HANDBUCH.md`](./AGENTEN-HANDBUCH.md) (Master) · Stand: wird bei Meilensteinen angepasst.

## Phasen (Reihenfolge)

### Phase 1 — Video + Gamma „High Quality“ ans Laufen

**Ziel:** End-to-End-Qualität stabilisieren, bevor alles skaliert wird.

- **Remotion / Renderer:** Slide-Template, Timing, Stimme (ElevenLabs), Asset-Resolver — bei Bedarf Feinschliff (Parameter, Model `eleven_multilingual_v2`, etc.).
- **Gamma:** Nur **Visual-Assets** (`visual01.png` …) laut `slides_prompt.txt` / `docs/SLIDE_GENERATION_RULES.md` — kein Slide-Layout in Gamma.
- **Abnahme:** Mindestens ein Modul (z. B. Modul 1) visuell und inhaltlich „release-tauglich“ (nicht nur Platzhalter), inkl. Naming (`publish-videos` ↔ Plattform-Slugs `moduleM-M-N`).

### Phase 2 — Alle Videos automatisch generieren

**Ziel:** Batch ohne manuelle Einzelschritte pro Lektion (soweit technisch möglich).

- `academy-build` / `generate-assets` → Voice → Render-Batch mit sinnvoller Parallelität.
- Optional: Restmodule content-final, dann ein Lauf über alle Lektionen.
- **Qualitätssicherung:** `validate-lessons`, Spot-Checks, Logs (`logs/render-*.log`).

### Phase 3 — Vor Push auf GitHub: Vimeo (o. ä.) statt großer MP4s im Repo

**Ziel:** Repository schlank halten; Streaming/Analytics über Host.

- Videos auf **Vimeo** (oder vergleichbar) hochladen; **Embed-IDs/URLs** pro Lektion (Frontmatter oder `config/`), Plattform zeigt Embed statt `public/videos/*.mp4`.
- **Erst danach** oder parallel: CI/Pages-Deploy ohne 100+ MB Binärdateien im Git — optional **LFS** nur falls lokal noch Roh-MP4s versioniert werden sollen.

## Kurz merken

1. **Erst** Qualität (Video + Gamma) sitzen.  
2. **Dann** Automatisierung für alle Lektionen.  
3. **Dann** vor dem „finalen“ GitHub-Push: **Vimeo/Hosting** statt großer Assets im Repo.

Siehe auch: `docs/offeneAufgaben.md`, `docs/VIDEO_PRODUCTION_WORKFLOW.md`, `docs/SLIDE_GENERATION_RULES.md`.
