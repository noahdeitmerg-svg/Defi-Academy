# repository_dispatch "merge-live": merge einen cursor/*-Branch nach main (GitHub Actions).
#
# Usage:
#   $env:GITHUB_TOKEN = "<PAT mit repo + ggf. workflow>"
#   powershell -ExecutionPolicy Bypass -File .\scripts\trigger-merge-live.ps1
#
# Optional:
#   -Branch  <name>   Standard: cursor/publish-live
#   -Repo    <owner/name> Standard: noahdeitmerg-svg/Defi-Academy

param(
  [string]$Branch = "cursor/publish-live",
  [string]$Repo = "noahdeitmerg-svg/Defi-Academy"
)

$ErrorActionPreference = "Stop"

if (-not $env:GITHUB_TOKEN) {
  Write-Error "Bitte GITHUB_TOKEN setzen (PAT mit Zugriff auf repository_dispatch)."
}

if ($Branch -notmatch "^cursor/") {
  Write-Error "Branch muss mit cursor/ beginnen, erhalten: $Branch"
}

$uri = "https://api.github.com/repos/$Repo/dispatches"
$headers = @{
  Accept                 = "application/vnd.github+json"
  Authorization          = "Bearer $($env:GITHUB_TOKEN)"
  "X-GitHub-Api-Version" = "2022-11-28"
  "User-Agent"           = "defi-academy-trigger-merge-live"
}
$payload = @{
  event_type     = "merge-live"
  client_payload = @{ branch = $Branch }
}
$body = $payload | ConvertTo-Json -Depth 5 -Compress

Write-Host "Trigger merge-live (Quelle: $Branch) an $Repo ..." -ForegroundColor Cyan
Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -Body $body -ContentType "application/json"
Write-Host "OK. Lauf unter https://github.com/$Repo/actions (Workflow Merge Live Branch)" -ForegroundColor Green
