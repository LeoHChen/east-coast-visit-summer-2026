# The Northeast Circuit . Summer 2026

A family **trip album and journal** for the Chen family's nine-day Northeast road
trip, **June 28 to July 6, 2026**. Six college towns (Harvard, MIT, Brown, RISD,
Yale, Princeton, Penn) plus a Newport coastal day, timed to land in Philadelphia
for the **250th Fourth of July** before dropping Alrisha at the Penn summer
program.

The plan lives here now. As the trip happens, the family adds photos and journal
entries to each day, and the site becomes the trip blog.

## How it is built

Static site, **no build step**, served by GitHub Pages.

```
index.html            Home: hero, day index, flights, interactive route map, before-you-go
days/day-1..9.html    One page per day (plan + sights + food + photos/journal)
journal.html          The blog feed: links to every day's journal
assets/trip.js        Single source of truth (all itinerary content + links)
assets/render.js      Builds each page from trip.js
assets/app.js         Theme toggle, scroll reveal, Leaflet map, Giscus loader
assets/styles.css     Theme, layout, animations
sitemap.xml           Static sitemap
```

To edit the itinerary, change **`assets/trip.js`** in one place; every page
updates. Each site links to its Google Maps location and a Wikipedia article.

### Run it locally

The pages load data over `fetch`/scripts and the map needs HTTP, so use a local
server rather than opening the file directly:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

### Features

- **US flag / Independence Day theme**: navy + Old Glory red + cream, with a stars watermark on the home and the Jul 4 page.
- **Per-page color**: each day picks up its city or university's color (Harvard crimson, Brown brick, Newport teal, Yale blue, Princeton orange, Penn red, and so on) with a subtle watermark motif.
- **Page-turn animation** between days (View Transitions API, with a reduced-motion fallback).
- **Light and dark mode** (follows the system; toggle in the top right).
- **Interactive route map** (Leaflet + OpenStreetMap/CARTO tiles, no API key) with numbered pins and a leg-by-leg distance table (about 375 mi, 7.5 hr total).
- **Photos and journal per day** via Giscus (already configured for this repo).

## Adding photos and journals (the family)

Each day page has a **Photos and journal** section. Sign in there with your
GitHub account, then write an entry or drag in photos. Posts are saved to GitHub
(as a Discussion for that day; photos upload to GitHub) and appear on the page
right away. The journal page lists every day's entries in one place.

## One-time Giscus setup (trip owner)

Photos and journals run on [Giscus](https://giscus.app), which stores entries in
GitHub Discussions. Nothing secret is committed. Do this once:

1. **Enable Discussions:** repo **Settings → General → Features →** check **Discussions**.
2. **Install the Giscus app:** visit <https://github.com/apps/giscus> → **Install** → select this repo.
3. **Get the IDs:** go to <https://giscus.app>, enter the repo
   `LeoHChen/east-coast-visit-summer-2026`, choose **mapping: pathname** and a
   Discussions **Category** (for example *General* or *Announcements*). The page
   shows a `data-repo-id` and `data-category-id`.
4. **Paste them in** `assets/app.js`, in the `GISCUS` config block at the top:
   set `repoId`, `category`, and `categoryId`. These IDs are public and safe to commit.
5. Commit and push. Until this is done, the section shows a friendly "setup
   pending" note instead of a broken widget.

## Publishing

The site deploys automatically via GitHub Actions (`.github/workflows/static.yml`)
on every push to `main`.

- **Live:** <https://ec2026.haochen.net> (custom domain; the root `CNAME` file points Pages at it)
- DNS: a Cloudflare `CNAME` record `ec2026` to `leohchen.github.io` (DNS only / grey cloud)
- Underlying Pages URL: `https://leohchen.github.io/east-coast-visit-summer-2026/`

The `.nojekyll` file tells Pages to serve files as-is (no Jekyll build).

**Cache note:** CSS and JS are referenced with a `?v=N` query (for example
`assets/styles.css?v=3`). GitHub Pages caches assets for about 10 minutes, so
when you change a CSS or JS file, bump that number in the HTML files and visitors
get the new version immediately instead of a stale cached one.

---

*A shareable family keepsake. Dates, hotels, and confirmation numbers reflect the
confirmed bookings as of June 2026.*
