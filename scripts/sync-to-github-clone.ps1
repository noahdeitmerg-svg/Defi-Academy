# Kopiert den kompletten App-Stand aus DIESEM Ordner (defi-academy) in deinen GitHub-Klon.
# Standard-Ziel: C:\Users\noahd\Documents\GitHub\Defi-Academy
#
# Ausfuehrung (PowerShell, im Ordner defi-academy):
#   powershell -ExecutionPolicy Bypass -File .\scripts\sync-to-github-clone.ps1
# Anderes Ziel:
#   powershell -ExecutionPolicy Bypass -File .\scripts\sync-to-github-clone.ps1 -Destination "D:\pfad\Defi-Academy"

param(
  [string]$Destination = "C:\Users\noahd\Documents\GitHub\Defi-Academy"
)

$ErrorActionPreference = "Stop"
$Source = Split-Path -Parent $PSScriptRoot

if (-not (Test-Path $Destination)) {
  Write-Error "Zielordner existiert nicht: $Destination"
}

Write-Host "Von:  $Source" -ForegroundColor Cyan
Write-Host "Nach: $Destination" -ForegroundColor Cyan

# /E alle Unterordner; /XD: keine node_modules, .next, .git aus der Quelle; Ziel-.git bleibt
$robolog = Join-Path $env:TEMP "robocopy-defi-academy.log"
robocopy $Source $Destination /E /XD node_modules .next .git /R:2 /W:2 /LOG:$robolog | Out-Host

$code = $LASTEXITCODE
$exitMsg = "robocopy Exit-Code: $code | Log: $robolog | Hinweis: 0-7 OK, ab 8 Fehler"
Write-Host $exitMsg -ForegroundColor $(if ($code -ge 8) { "Red" } else { "Green" })

if ($code -ge 8) { exit $code }

Write-Host ""
Write-Host "Naechste Schritte im Zielordner: git status, git add, commit, push" -ForegroundColor Yellow
