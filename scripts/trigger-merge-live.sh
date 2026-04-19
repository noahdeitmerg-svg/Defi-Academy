#!/usr/bin/env bash
# repository_dispatch "merge-live" — merge einen cursor/*-Branch nach main (CI).
#
# Usage:
#   export GITHUB_TOKEN="<PAT>"
#   bash scripts/trigger-merge-live.sh
#   BRANCH=cursor/meine-branch bash scripts/trigger-merge-live.sh

set -euo pipefail

REPO="${REPO:-noahdeitmerg-svg/Defi-Academy}"
BRANCH="${BRANCH:-cursor/publish-live}"

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "GITHUB_TOKEN fehlt" >&2
  exit 1
fi

if [[ "$BRANCH" != cursor/* ]]; then
  echo "Branch muss mit cursor/ beginnen: $BRANCH" >&2
  exit 1
fi

URI="https://api.github.com/repos/${REPO}/dispatches"
BODY="$(printf '%s' "{\"event_type\":\"merge-live\",\"client_payload\":{\"branch\":\"${BRANCH}\"}}")"

echo "Trigger merge-live ($BRANCH) → $REPO ..."
curl -sS -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -H "User-Agent: defi-academy-trigger-merge-live" \
  "$URI" \
  -d "$BODY"
echo ""
echo "OK — https://github.com/${REPO}/actions"
