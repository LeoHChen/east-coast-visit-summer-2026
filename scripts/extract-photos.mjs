#!/usr/bin/env node
// Fetch repo discussions (or a fixture) and write assets/photos.json when it changes.
import { readFile, writeFile } from 'node:fs/promises';
import { buildDays } from './lib/extract.mjs';

const OUT = new URL('../assets/photos.json', import.meta.url);
const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const fxIdx = argv.indexOf('--fixture');
const FIXTURE = fxIdx > -1 ? argv[fxIdx + 1] : process.env.FIXTURE;

// Keep the nested first: counts small — GitHub caps a query at 500,000 possible
// nodes (discussions * comments * replies), so 20*100*20 = 40,000 stays well under.
const QUERY = `query($owner:String!,$name:String!,$cursor:String){
  repository(owner:$owner,name:$name){
    discussions(first:20,after:$cursor){
      pageInfo{ hasNextPage endCursor }
      nodes{
        number title url body createdAt
        author{ login avatarUrl }
        comments(first:100){ nodes{
          body url createdAt author{ login avatarUrl }
          replies(first:20){ nodes{ body url createdAt author{ login avatarUrl } } }
        } }
      }
    }
  }
}`;

async function fetchDiscussions(owner, name, token) {
  const all = [];
  let cursor = null;
  do {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { authorization: 'bearer ' + token, 'content-type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { owner, name, cursor } }),
    });
    if (!res.ok) throw new Error('GraphQL HTTP ' + res.status + ': ' + (await res.text()));
    const json = await res.json();
    if (json.errors) throw new Error('GraphQL errors: ' + JSON.stringify(json.errors));
    const conn = json.data.repository.discussions;
    all.push(...conn.nodes);
    cursor = conn.pageInfo.hasNextPage ? conn.pageInfo.endCursor : null;
  } while (cursor);
  return all;
}

async function main() {
  let discussions;
  if (FIXTURE) {
    discussions = JSON.parse(await readFile(FIXTURE, 'utf8'));
  } else {
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPOSITORY || 'LeoHChen/east-coast-visit-summer-2026';
    if (!token) throw new Error('GITHUB_TOKEN required (or pass --fixture <path>)');
    const [owner, name] = repo.split('/');
    discussions = await fetchDiscussions(owner, name, token);
  }
  const next = JSON.stringify({ days: buildDays(discussions) }, null, 2) + '\n';
  if (DRY) { process.stdout.write(next); return; }
  let prev = '';
  try { prev = await readFile(OUT, 'utf8'); } catch {}
  if (next === prev) { console.log('photos.json unchanged'); return; }
  await writeFile(OUT, next);
  const n = Object.keys(JSON.parse(next).days).length;
  console.log('photos.json updated: ' + n + ' day(s) with photos');
}

main().catch(e => { console.error(e); process.exit(1); });
