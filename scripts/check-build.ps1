# Einmal pruefen: Dependencies + Lint + Production-Build (lokal, nach Node-Install)
#   powershell -ExecutionPolicy Bypass -File .\scripts\check-build.ps1

$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Error "npm nicht gefunden. Node.js LTS installieren: https://nodejs.org/ und Terminal neu starten."
}

Write-Host "== npm install ==" -ForegroundColor Cyan
npm install

Write-Host "`n== npm run check (lint + typecheck + build) ==" -ForegroundColor Cyan
npm run check

Write-Host "`nOK. Zum lokalen Test: npm run dev" -ForegroundColor Green
