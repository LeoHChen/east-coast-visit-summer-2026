# CLAUDE.md — East Coast Visit, Summer 2026

Project context and working instructions for Claude Code. This repo publishes a
one-page itinerary website (GitHub Pages) for the Chen family's Northeast road
trip. The current `index.html` works and is live; the next phase is a visual
redesign plus a map and driving distances.

---

## 1. What this project is

A single static `index.html` (no build step, no framework, no dependencies)
served via GitHub Pages at:
`git@github.com:LeoHChen/east-coast-visit-summer-2026.git`

It is a shareable family itinerary. The audience is the family — including a
**design-interested teenager (Alrisha)**, who is the reason for the visual
upgrade. Keep it a single self-contained file unless there's a strong reason to
split; GitHub Pages serves it as-is (`.nojekyll` is present).

**Repo files**
- `index.html` — the whole site
- `README.md` — overview + GitHub Pages publishing steps
- `.nojekyll` — tells Pages to skip Jekyll

---

## 2. The trip (source of truth — confirmed bookings)

Nine days, Boston → Philadelphia, timed to land in Philly for the **250th
Fourth of July** (America's Semiquincentennial), then drop Alrisha at a
**UPenn summer program that starts July 5**. Part college tour, part
founding-era history trip. Travelers: **4 outbound, 3 on the return** (Alrisha
stays at Penn).

### Flights (United — booked)
- **Out:** Sun Jun 28 — UA 2356, SFO 10:05 AM → BOS 6:59 PM, 737 MAX 9, 5h54m. Seats 8C/8B/15C/15B.
- **Return:** Mon Jul 6 — UA 2661, PHL 6:00 AM → SFO 8:58 AM, 737 MAX 9, 5h58m. Seats 12D/12E/14D.

### Rental car (booked)
- Avis **Standard SUV**, confirmation **13843363US2**. Pick up BOS Jun 28 (~7:30 PM after landing). **Return to PHL the evening of Jul 5** (not Jul 6 — the return flight is 6:00 AM, so don't deal with the car pre-dawn).

### Hotels (all booked)
| Nights | Hotel | Address | Parking |
|---|---|---|---|
| Jun 28–30 | Sheraton Commander | 16 Garden St, Cambridge, MA 02138 | Valet $45/day |
| Jun 30–Jul 1 | Renaissance Providence Downtown | 5 Avenue of the Arts, Providence, RI 02903 | Valet $45/day |
| Jul 1–2 | Newport Harbor Island Resort | 1 Goat Island, Newport, RI 02840 | On-site |
| Jul 2–3 | Courtyard by Marriott New Haven at Yale | 30 Whalley Ave, New Haven, CT 06511 | On-site $25/day |
| Jul 3–4 | The Westin Princeton at Forrestal Village | 201 Village Blvd, Princeton, NJ 08540 | — |
| Jul 4–6 | Sheraton Philadelphia University City | 3549 Chestnut St, Philadelphia, PA 19104 | — |

### Day-by-day (current running order)
1. **Jun 28 (Sun)** — Land BOS, drive to Cambridge.
2. **Jun 29 (Mon)** — Harvard + MIT.
3. **Jun 30 (Tue)** — Drive to Providence (~1 hr); Brown + RISD.
4. **Jul 1 (Wed)** — Drive to Newport (~45 min); Cliff Walk + The Breakers.
5. **Jul 2 (Thu)** — Drive to New Haven (~2h15); Yale.
6. **Jul 3 (Fri)** — Drive to Princeton (~2h15); Nassau Hall, chapel, art museum.
7. **Jul 4 (Sat)** — Drive to Philadelphia (~1 hr, leave early); Independence Day, 250th.
8. **Jul 5 (Sun)** — Drop Alrisha at UPenn; return SUV to PHL in the evening.
9. **Jul 6 (Mon)** — Pre-dawn to PHL; UA 2661 home.

### Driving legs (for the map / distance section)
- Cambridge → Providence: ~50 mi, ~1 hr
- Providence → Newport: ~35 mi, ~45 min
- Newport → New Haven: ~125 mi, ~2 hr 15 min
- New Haven → Princeton: ~120 mi, ~2 hr 15 min
- Princeton → Philadelphia: ~45 mi, ~1 hr
- **Total ≈ 375 driving miles, ~7.5 hr of drive time** (verify each leg before shipping)

---

## 3. Content already written (keep, don't lose)

The current `index.html` has six sections that should survive the redesign:
01 By Air, 02 Day by Day, 03 What's Worth Seeing, 04 Where to Eat,
05 Shows & Tickets, 06 Before You Go.

### Sightseeing "why it's worth it" (per stop)
- **Boston/Cambridge:** Harvard Yard + Smith Center tour; MIT Infinite Corridor / Great Dome / MIT Museum; the Freedom Trail (Boston = birthplace of the Revolution, 250th of Bunker Hill & Revere's ride).
- **Providence:** Brown (Main Green, Thayer St); RISD Museum; Benefit Street "Mile of History."
- **Newport:** Cliff Walk; The Breakers (buy timed tour); colonial Newport (1763 Touro Synagogue).
- **New Haven:** Yale Old Campus + Sterling Library; Yale University Art Gallery (free); Wooster St apizza.
- **Princeton:** Nassau Hall (was U.S. Capitol for 4 months in 1783); University Chapel + Art Museum (reopened 2025); Princeton Battlefield.
- **Philadelphia:** Independence Hall (free; **no timed ticket needed Jul 1-4, 2026 — just walk up**; timed tickets via recreation.gov resume from Jul 5, so reserve only if visiting on Jul 5); Liberty Bell; First Bank of the U.S. (reopening to public Jul 1, 2026); Museum of the American Revolution; UPenn + Wharton (Locust Walk, Penn Museum — Alrisha's summer home).

### Time-locked 250th events (must be on-spot, on-time)
- **Jul 4 evening:** Wawa Welcome America **"Party on the Parkway"** — free concert + fireworks over the Art Museum (Rocky steps). The place to be in the U.S. on July 4, 2026.
- **Jul 4 daytime:** national **time capsule** burial on Independence Mall — heavy security + road closures across Old City and the Parkway.

### Restaurants (one dinner/night, ~$50pp; local-authentic + American/Asian alternate)
- **Cambridge:** Wusong Road (Cantonese-tiki, 4.8★) / Alden & Harlow (New American, 4.4★).
- **Providence:** The Patio on Broadway (4.7★) / The Slow Rhode (4.7★).
- **Newport:** The Mooring (seafood, 4.6★) / The Red Parrot (4.4★). Resort-town pricing, may exceed $50pp.
- **New Haven:** Frank Pepe (apizza original, white clam pie, 4.5★) / Zeneli (Neapolitan, 4.8★).
- **Princeton:** Agricola Eatery (farm-to-table, 4.5★) / The Meeting House (4.3★).
- **Philadelphia:** White Dog Cafe (University City, 4.4★) / Louie Louie (brasserie, 4.2★) / Reading Terminal Market (lunch, not dinner).

### Reminders ("Before You Go")
1. Jul 6 flight is 6:00 AM → leave for PHL ~4:15 AM; book a PHL airport hotel for the last night OR pre-arrange a 4 AM rideshare; return the SUV on Jul 5.
2. Independence Hall is free and needs **no reservation Jul 1-4, 2026** — just walk up, go early for crowds + security. Timed tickets resume Jul 5; book on recreation.gov only if visiting that day.
3. Expect Philadelphia road closures on Jul 4; leave Princeton early, park once.
4. Most campus tours run weekdays only — already scheduled Mon–Fri; reserve each.
5. Newport and Jul 4 Philly dinners will run above $50pp — use the alternates to save.
7. Early-July East Coast heat + humidity; comfortable shoes for cobblestones and the Cliff Walk.

---

## 4. PENDING TASKS (the redesign — do these)

The brief from the trip owner, in priority order:

### Task A — Redesign with the Taste Skill
Install and follow the taste-skill v2 ruleset as the source of design rules:
```
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```
Read its SKILL.md fully, then do an **audit-first redesign** (it has a Section 11
redesign protocol: audit current tokens/IA/patterns-to-preserve/patterns-to-retire,
post the audit, then implement).

**Design read for this project (starting point — refine it yourself):**
*A design-interested teenager's keepsake of a milestone family trip — editorial
and photographic, lively motion, but keep the founding-era gravity. Audience is
the family, led by a design-conscious teen (Alrisha).*

**Anti-slop guardrails the skill enforces — watch for these specifically:**
- **Do NOT** use the beige/cream + brass "premium" palette. (The current site is
  parchment/oxblood and reads as exactly that default — the redesign must move
    off it, not reskin it.)
- No three-equal-feature-cards.
- Vary section rhythm (some large, some compact) — don't make every section the same.
- Motion must be justified, not scattered. One orchestrated moment beats many small effects.
- Audit every visible string for accuracy (dates, hotel names, confirmation #s).
- Respect `prefers-reduced-motion`, keyboard focus, and mobile down to ~380px.

### Task B — Add photos / stronger visuals
Make it visually appealing for a design-loving teen. **Decision still open** —
the trip owner was asked to choose between:
1. Unsplash live photos (free Unsplash license, real places, loads from the web), or
2. Custom illustrated/SVG art (no copyright risk, fully offline), or
3. Both — Unsplash hero photos + custom map and icons.

**→ Ask the trip owner which option before embedding images.** Do not embed
copyrighted/stock photos of the specific campuses, mansions, or landmarks. If
using Unsplash, use the official Unsplash Source/API with proper attribution and
free-license images only. If illustrating, draw original SVG (campus skylines,
a Liberty Bell, the Cliff Walk coastline, pizza, etc.).

### Task C — Add an interactive map + driving distances
- Embed an interactive map (Leaflet + OpenStreetMap tiles is the no-key option;
  do not commit a paid API key to a public repo) showing all stops with a route
        line BOS → Providence → Newport → New Haven → Princeton → Philadelphia.
        - Add a clear **leg-by-leg distance + drive-time** breakdown (numbers in §2 above;
          verify before shipping) and the ~375 mi / ~7.5 hr total.
          - Markers should match the day-by-day order; consider numbered pins 1–6.

### Task D — Publish
- Commit and push to `main`.
- Confirm GitHub Pages is serving from `main` / root (Settings → Pages).
- Sanity-check the live URL on mobile.

---

## 5. House rules / preferences

- **Single file.** Keep everything in `index.html` unless there's a real reason to split. If you add map JS/CSS, prefer CDN links (Leaflet) over committing libraries.
- **No secrets in the repo.** It's public. No API keys.
- **Accuracy is non-negotiable.** This drives real travel — never invent a hotel, time, price, or confirmation number. If unsure, flag it rather than guess.
- **Owner is technical** (a CTO comfortable across hardware, cloud, and web) — explain design *decisions* concisely, skip basic hand-holding.
- **The Princeton/Philly timing:** currently Princeton is a Jul 3 overnight and Philadelphia check-in is Jul 4 (matches hotel bookings). If anyone asks to see Princeton on the morning of the 4th instead, that's a known possible edit.
- Don't reintroduce the parchment/oxblood theme — that's the look we're moving away from.

---

## 6. Quick start for this session

1. `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"` and read its SKILL.md.
2. Run the redesign audit on the current `index.html`; post it before changing code.
3. Ask the owner the **Task B photo question** (Unsplash vs. illustrated vs. both).
4. Implement Tasks A + B + C in `index.html`.
5. Test locally (open `index.html`), check mobile + reduced-motion.
6. Commit, push to `main`, verify the live Pages URL.
