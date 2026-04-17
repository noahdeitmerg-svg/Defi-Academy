# Trigger GitHub Pages Rebuild ueber repository_dispatch (kein VPS, kein Push).
#
# Usage:
#   $env:GITHUB_TOKEN = "<dein PAT mit Scope repo>"
#   powershell -ExecutionPolicy Bypass -File .\scripts\trigger-pages-deploy.ps1
#
# Optional Parameter:
#   -EventType  <string>   Standard: "pages-deploy"
#   -Repo       <owner/name> Standard: "noahdeitmerg-svg/Defi-Academy"

param(
  [string]$EventType = "pages-deploy",
  [string]$Repo = "noahdeitmerg-svg/Defi-Academy"
)

$ErrorActionPreference = "Stop"

if (-not $env:GITHUB_TOKEN) {
  Write-Error "Bitte zuerst GITHUB_TOKEN als Umgebungsvariable setzen (PAT mit 'repo' Scope)."
}

$uri = "https://api.github.com/repos/$Repo/dispatches"
$headers = @{
  Accept                 = "application/vnd.github+json"
  Authorization          = "Bearer $($env:GITHUB_TOKEN)"
  "X-GitHub-Api-Version" = "2022-11-28"
  "User-Agent"           = "defi-academy-trigger"
}
$body = @{ event_type = $EventType; client_payload = @{} } | ConvertTo-Json -Depth 3

Write-Host "Trigger $EventType an $Repo ..." -ForegroundColor Cyan
Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -Body $body -ContentType "application/json"
Write-Host "OK. Lauf sichtbar unter https://github.com/$Repo/actions" -ForegroundColor Green
