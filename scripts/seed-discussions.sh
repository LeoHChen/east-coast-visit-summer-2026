#!/usr/bin/env bash
# One-time: pre-create the per-day discussions Giscus binds to, so the "Add your
# photos" deep-link and the extractor have a stable target and there is no
# creation race when multiple people open a day at once.
#
# IMPORTANT: Giscus (mapping: pathname) normalizes the page path
# /days/day-N.html to the discussion title "days/day-N" (no leading slash, no
# .html). Titles MUST match that exactly, or Giscus creates its own duplicate.
#
# Prereq: gh auth login (repo scope). Run from repo root: bash scripts/seed-discussions.sh
set -euo pipefail
OWNER="LeoHChen"; NAME="east-coast-visit-summer-2026"
REPO_ID="R_kgDOTHIccw"          # assets/app.js -> GISCUS.repoId
CAT_ID="DIC_kwDOTHIcc84DABxK"   # assets/app.js -> GISCUS.categoryId (General)

existing="$(gh api graphql -f query='query($o:String!,$n:String!){ repository(owner:$o,name:$n){ discussions(first:100){ nodes{ title } } } }' \
  -f o="$OWNER" -f n="$NAME" --jq '.data.repository.discussions.nodes[].title')"
echo "Existing titles:"; echo "$existing" | sed 's/^/  /'
echo "---"
for n in $(seq 1 9); do
  title="days/day-${n}"
  if grep -qxF "$title" <<<"$existing"; then
    echo "exists, skip: $title"; continue
  fi
  gh api graphql -f query='mutation($r:ID!,$c:ID!,$t:String!,$b:String!){ createDiscussion(input:{repositoryId:$r,categoryId:$c,title:$t,body:$b}){ discussion{ url } } }' \
    -f r="$REPO_ID" -f c="$CAT_ID" -f t="$title" \
    -f b="Photos & journal for Day ${n}. Drag photos into a comment and they appear in the site gallery for this day." \
    --jq '"created: " + .data.createDiscussion.discussion.url' \
    || echo "failed: $title"
done
