# Code auf GitHub bringen — Kurzanleitung

**Dein Git-Klon (lokal):** `C:\Users\noahd\Documents\GitHub\Defi-Academy`  
Dort liegt z. B. schon `defi_academy_system.md` und `.git` — der **Next.js-Code** aus Cursor muss **einmal** in denselben Ordner (siehe Sync-Skript unten).

## Was du brauchst

- **Git** installiert ([git-scm.com](https://git-scm.com/download/win))
- **Node.js LTS** inkl. npm ([nodejs.org](https://nodejs.org/))
- Auf [github.com](https://github.com) eingeloggt — Repo: **noahdeitmerg-svg/Defi-Academy** (leer oder mit README ist ok)

## A) Code aus Cursor in deinen GitHub-Ordner kopieren

Wenn du in **Cursor** am Projekt `defi-academy` arbeitest und der Klon **`C:\Users\noahd\Documents\GitHub\Defi-Academy`** ist:

1. **Quelle:** der Ordner mit `package.json` (Cursor-Projekt `defi-academy`).
2. PowerShell **in diesem Quell-Ordner** öffnen.
3. Ausführen:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-to-github-clone.ps1
```

(Optional anderes Ziel: `-Destination "D:\..."`)

4. Danach in **`C:\Users\noahd\Documents\GitHub\Defi-Academy`** wechseln und Git nutzen (Abschnitt B).

---

## B) Schnellweg — Git im Klon-Ordner

1. Ordner **`C:\Users\noahd\Documents\GitHub\Defi-Academy`** öffnen (nach dem Sync liegt dort `package.json`).
2. **Adresszeile** → `powershell` → Enter.
3. Ausführen:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-repo.ps1
```

4. Remote setzen und pushen:

```powershell
git remote add origin https://github.com/noahdeitmerg-svg/Defi-Academy.git
git push -u origin main
```

- Wenn **`remote origin already exists`**:

```powershell
git remote -v
git remote set-url origin https://github.com/noahdeitmerg-svg/Defi-Academy.git
git push -u origin main
```

- Wenn das **Repo auf GitHub schon Dateien** hat (z.B. README) und Push abgelehnt wird:

```powershell
git pull origin main --allow-unrelated-histories
# Konflikte in Cursor loesen, dann:
git push -u origin main
```

## Anmeldung bei `git push`

GitHub erlaubt **kein Passwort** mehr per HTTPS. Üblich:

- **GitHub Desktop** installieren, Repo klonen/veröffentlichen — am einfachsten für Einsteiger, oder
- **HTTPS + Personal Access Token** (Settings → Developer settings → PAT), oder
- **SSH-Schlüssel** einrichten und Remote-URL auf `git@github.com:noahdeitmerg-svg/Defi-Academy.git` umstellen.

## Kann Cursor / die KI automatisch für mich pushen?

**Nur indirekt:** Die KI hat **keinen dauerhaften Zugriff** auf dein GitHub-Konto und sollte **kein Passwort/Token im Chat** bekommen.

- **Cursor** nutzt beim Terminal oft **deine** bereits eingerichtete Git-Anmeldung (Credential Manager, SSH-Agent).
- **Sicher:** Du führst `git push` lokal aus oder nutzt **GitHub Desktop**.

## Optional: Cursor Source Control

Links **Source Control** → Änderungen committen → **Publish Branch** / mit verbundenem GitHub-Konto pushen — gleicher Effekt wie in der Shell.
