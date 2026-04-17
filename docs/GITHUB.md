# GitHub & Git – Kurzanleitung

## Zielmodell: **ein Klon-Ordner** (wie AlphaCycle)

- **Ein** Verzeichnis auf dem PC = **dieses Repository** (enthält `.git` + `package.json`).
- In **Cursor** genau **diesen Ordner** öffnen.
- Änderungen committen, `git push` – gleicher Workflow wie bei AlphaCycle; öffentliche URL über **GitHub Pages** (siehe [GITHUB_PAGES.md](GITHUB_PAGES.md)).

Es gibt **keinen** zweiten „Arbeits-Ordner“ als Pflicht.

---

## Einmal: Repo holen

```powershell
cd C:\Users\noahd\Documents\GitHub
git clone https://github.com/noahdeitmerg-svg/Defi-Academy.git
cd Defi-Academy
```

Dann in Cursor: **Open Folder** → `...\Defi-Academy`.

---

## Täglich: pushen

```powershell
git add -A
git status
git commit -m "kurze beschreibung"
git push origin main
```

---

## Was du brauchst

- **Git:** [git-scm.com](https://git-scm.com/download/win)
- **Node.js LTS + npm:** [nodejs.org](https://nodejs.org/) – nach Install **Terminal neu starten**, testen: `node -v`, `npm -v`

---

## Push-Fehler: PAT und `workflow`

Wenn GitHub ablehnt:

`refusing to allow a Personal Access Token ... workflow ... without workflow scope`

**Option A:** Neues Token mit **`repo`** + **`workflow`**.

**Option B:** Keine `.github/workflows/*.yml` ins Repo legen (dieses Projekt braucht keine Pflicht-CI-Datei).

---

## Anmeldung bei HTTPS-Push

GitHub: kein Account-Passwort per HTTPS – **PAT**, **GitHub Desktop**, oder **SSH** (`git@github.com:noahdeitmerg-svg/Defi-Academy.git`).

---

## Optional: alter zweiter Ordner + Sync

Nur wenn du **zwei** Kopien hast (z.B. `C:\Users\noahd\defi-academy` ohne `.git` und daneben den echten Klon):

```powershell
cd C:\Users\noahd\defi-academy
powershell -ExecutionPolicy Bypass -File .\scripts\sync-to-github-clone.ps1
```

Danach im **Klon** committen und pushen. **Besser:** Cursor nur noch auf den Klon zeigen lassen, dann entfällt das dauerhaft.

---

## KI / Cursor und „automatisch pushen“

Die KI hat **kein** eigenes GitHub-Konto. Pushen läuft über **deine** Anmeldung (Terminal, Cursor Source Control, GitHub Desktop).
