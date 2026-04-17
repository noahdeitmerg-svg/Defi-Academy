#!/usr/bin/env bash
# Trigger GitHub Pages Rebuild ueber repository_dispatch (kein VPS, kein Push).
#
# Usage:
#   GITHUB_TOKEN=<dein PAT mit Scope repo> bash scripts/trigger-pages-deploy.sh
#
# Optionale Umgebungsvariablen:
#   EVENT_TYPE  (default: pages-deploy)
#   REPO        (default: noahdeitmerg-svg/Defi-Academy)

set -euo pipefail

: "${GITHUB_TOKEN:?Bitte GITHUB_TOKEN setzen (PAT mit 'repo' Scope)}"
EVENT_TYPE="${EVENT_TYPE:-pages-deploy}"
REPO="${REPO:-noahdeitmerg-svg/Defi-Academy}"

curl -fsS -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/${REPO}/dispatches" \
  -d "{\"event_type\":\"${EVENT_TYPE}\",\"client_payload\":{}}"

echo
echo "OK. Lauf sichtbar unter https://github.com/${REPO}/actions"
