# DeFi Academy - einmalig: npm install + Git initialisieren + erster Commit
# Ausfuehrung (PowerShell):  cd zum Ordner defi-academy, dann:
#   powershell -ExecutionPolicy Bypass -File .\scripts\setup-repo.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "== Ordner: $Root ==" -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git ist nicht installiert. Bitte https://git-scm.com/download/win installieren."
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Error "Node/npm nicht gefunden. Bitte Node.js LTS installieren: https://nodejs.org/"
}

Write-Host "`n== npm install ==" -ForegroundColor Cyan
npm install

if (-not (Test-Path ".git")) {
  Write-Host "`n== git init ==" -ForegroundColor Cyan
  git init
}

Write-Host "`n== git add / commit ==" -ForegroundColor Cyan
git add -A
$status = git status --porcelain
if (-not $status) {
  Write-Host "Nichts zu committen (alles schon committed)." -ForegroundColor Yellow
} else {
  git commit -m "Initial DeFi Academy platform build"
  git branch -M main 2>$null
}

Write-Host "`n== Optional: Build pruefen ==" -ForegroundColor Cyan
Write-Host "  powershell -ExecutionPolicy Bypass -File .\scripts\check-build.ps1"

Write-Host "`n== Naechste Schritte (Remote + Push) ==" -ForegroundColor Green
Write-Host "Falls noch kein Remote:"
Write-Host '  git remote add origin https://github.com/noahdeitmerg-svg/Defi-Academy.git'
Write-Host ""
Write-Host "Falls origin schon existiert und falsch ist:"
Write-Host '  git remote remove origin'
Write-Host '  git remote add origin https://github.com/noahdeitmerg-svg/Defi-Academy.git'
Write-Host ""
Write-Host "Dann pushen:"
Write-Host "  git push -u origin main"
Write-Host ""
Write-Host "(Beim ersten Push fragt GitHub nach Login: Browser, Personal Access Token, oder SSH.)"
