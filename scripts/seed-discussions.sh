#!/usr/bin/env bash
# One-time: create the 9 per-day discussions Giscus binds to (mapping: pathname).
# Prereq: gh auth login (repo scope). Run from repo root: bash scripts/seed-discussions.sh
set -euo pipefail
OWNER="LeoHChen"; NAME="east-coast-visit-summer-2026"
REPO_ID="R_kgDOTHIccw"          # assets/app.js -> GISCUS.repoId
CAT_ID="DIC_kwDOTHIcc84DABxK"   # assets/app.js -> GISCUS.categoryId (General)

echo "Existing discussion titles (avoid creating duplicates):"
gh api graphql -f query='query($o:String!,$n:String!){ repository(owner:$o,name:$n){ discussions(first:100){ nodes{ title url } } } }' \
  -f o="$OWNER" -f n="$NAME" --jq '.data.repository.discussions.nodes[] | "  " + .title + "  " + .url'
echo "---"
for n in $(seq 1 9); do
  title="/days/day-${n}.html"
  gh api graphql -f query='mutation($r:ID!,$c:ID!,$t:String!,$b:String!){ createDiscussion(input:{repositoryId:$r,categoryId:$c,title:$t,body:$b}){ discussion{ url } } }' \
    -f r="$REPO_ID" -f c="$CAT_ID" -f t="$title" \
    -f b="Photos & journal for Day ${n}. Drag photos into a comment and they appear in the site gallery for this day." \
    --jq '"created: " + .data.createDiscussion.discussion.url' \
    || echo "skipped/failed: $title (already exists? check list above)"
done
