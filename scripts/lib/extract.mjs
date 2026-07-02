// Pure helpers for the photo-sync Action. No network, no fs — unit-testable.

// Accept image links on GitHub attachment/content hosts, or explicit image extensions.
const IMG_OK = /(?:user-attachments\/assets\/|githubusercontent\.com\/|\.(?:png|jpe?g|gif|webp|heic|heif|avif)(?:[?#]|$))/i;

export function dayKeyFromTitle(title) {
  if (typeof title !== 'string') return null;
  // Giscus (mapping: pathname) normalizes /days/day-4.html -> days/day-4 (it strips
  // the leading slash and .html). Match that canonical form, and also tolerate the
  // raw /days/day-4.html shape for robustness.
  const m = title.trim().match(/^\/?days\/day-(\d+)(?:\.html)?$/i);
  return m ? 'day-' + Number(m[1]) : null;
}

export function extractImages(markdown) {
  if (!markdown) return [];
  const out = [], seen = new Set();
  const push = (url, alt) => {
    url = (url || '').trim();
    if (!/^https?:\/\//i.test(url) || !IMG_OK.test(url) || seen.has(url)) return;
    seen.add(url);
    out.push({ url, alt: (alt || '').trim() });
  };
  const mdRe = /!\[([^\]]*)\]\(\s*(\S+?)(?:\s+["'][^"']*["'])?\s*\)/g;
  let m;
  while ((m = mdRe.exec(markdown))) push(m[2], m[1]);
  const imgRe = /<img\b[^>]*>/gi;
  let t;
  while ((t = imgRe.exec(markdown))) {
    const tag = t[0];
    const src = /\bsrc\s*=\s*["']([^"']+)["']/i.exec(tag);
    const alt = /\balt\s*=\s*["']([^"']*)["']/i.exec(tag);
    if (src) push(src[1], alt ? alt[1] : '');
  }
  return out;
}

function photosFromSource(src) {
  const a = src.author || {};
  return extractImages(src.body).map(img => ({
    url: img.url,
    alt: img.alt,
    author: a.login || null,
    avatarUrl: a.avatarUrl || null,
    postedAt: src.createdAt || null,
    sourceUrl: src.url || null,
  }));
}

export function buildDays(discussions) {
  const days = {};
  // Process oldest-first (by discussion number) so that when a day has duplicate
  // discussions (Giscus race), the oldest one — the one Giscus binds to — becomes
  // the canonical discussionUrl, and photos from all duplicates still merge in.
  const byNumber = [...(discussions || [])].sort((a, b) => (a.number || 0) - (b.number || 0));
  for (const d of byNumber) {
    const key = dayKeyFromTitle(d.title);
    if (!key) continue;
    const sources = [{ body: d.body, url: d.url, author: d.author, createdAt: d.createdAt }];
    for (const c of ((d.comments && d.comments.nodes) || [])) {
      sources.push({ body: c.body, url: c.url, author: c.author, createdAt: c.createdAt });
      for (const r of ((c.replies && c.replies.nodes) || []))
        sources.push({ body: r.body, url: r.url, author: r.author, createdAt: r.createdAt });
    }
    if (!days[key]) days[key] = { discussionUrl: d.url, photos: [], _seen: new Set() };
    for (const s of sources) for (const p of photosFromSource(s)) {
      if (days[key]._seen.has(p.url)) continue;
      days[key]._seen.add(p.url);
      days[key].photos.push(p);
    }
  }
  const ordered = {};
  Object.keys(days).sort((a, b) => Number(a.slice(4)) - Number(b.slice(4))).forEach(k => {
    days[k].photos.sort((a, b) =>
      String(a.postedAt).localeCompare(String(b.postedAt)) || a.url.localeCompare(b.url));
    ordered[k] = { discussionUrl: days[k].discussionUrl, photos: days[k].photos };
  });
  return ordered;
}
