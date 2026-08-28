# DuoStack — Studio Site

Premium single‑page experience for DuoStack, built with **React + Vite + Tailwind + Framer Motion**.

## Highlights
- Immersive aurora hero with gradient display type
- Animated stats counters, marquee, and scroll‑in motion
- Custom cursor with hover‑aware scale
- 15 real projects baked in, in display order: OutVue, Mossano Marmo,
  Benzer World, Howl, Saum Studio, Humane Warriors, Saad Cargo CRM, AshShifa,
  PlusVeda, Baker & Co Visa CRM, Remesleep, Zakir Auto Works, Zaid Electronics,
  SRF Power CRM, Gouri Furnishing

The array order in `src/data/projects.js` **is** the display order, and it is
deliberate rather than chronological:

- **Strongest first** — the sticky showcase opens on entry 1. Rank on the whole
  site, not the hero screenshot: Humane Warriors and Benzer World both look
  modest above the fold but carry the deepest interior work (a multi-currency
  recurring donation flow, and a faceted catalogue with switchable grid density).
- **Alternate light and dark previews** so no two adjacent cards read the same.
  Watch the near-duplicates specifically: the cream local-service cards (Zaid,
  Gouri) and the three light dashboards (Saad Cargo, PlusVeda, SRF Power) are
  each kept apart.
- **Space out the entries with no public link** — the two CRMs and the
  closed-testing app — so a visitor never hits two dead ends in a row.

Reordering is safe; nothing else keys off the index. Reorder by editing the
array, and keep each entry wrapped in `make({ ... })` — a bare `({ ... })` still
compiles and still builds clean, but silently skips `make()`, which is what
attaches `local`, `favicon` and `shot`. Every image on the page disappears.

### Project kinds

`src/data/projects.js` tags every entry with a `kind`:

| kind | preview comes from | call to action |
| --- | --- | --- |
| `site` | `npm run screenshots` against the live URL | Visit site |
| `private` | a screenshot of the real app run **locally** against seeded demo data — never production, so no client PII ships | Request a walkthrough → `#contact` |
| `app` | three raw phone screens composed into device frames at 1600×1000 | View on Google Play |
| `beta` | same as `app` — but the build is still in closed testing, so there is no listing to link | Request early access → `#contact` |

App cards are composed rather than cropped: phone screens are 9:19.5 and the card
is 16:10, so a single screenshot would letterbox or crop the UI away. Source
screens come from each app repo's `store-assets/raw-screens/` (or its UI-audit
redesign folder, whichever is newer).

**Icons.** `npm run favicons` can only fetch icons for projects with a public
host. `private`, `app` and `beta` entries have none, so their icon is copied in
by hand from the source repo — each app's own `public/favicon.svg` or
`assets/icon.png`, which is already square and built to read at ~20px (a wide
logo lockup or a detailed crest turns to mush at that size). `download-favicons.mjs`
builds the manifest from what is on disk, so those hand-placed files survive a
re-run. The lock/phone badge still shows in the address bar, so a real icon
never hides that a build is private.

Private-CRM JPGs in `public/projects/` are committed by hand; `capture-screenshots.mjs`
only covers public sites. To re-shoot one, run that CRM's backend against a local
MongoDB (`mongod --dbpath …`), run its `seed:user` / `seed:demo` scripts, then
capture at 1600×1000. Never point a seed or reset script at a production database.
- Fully responsive, dark, accessible

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Project map

```
src/
  components/   Nav, Footer, Cursor
  sections/     Hero, Marquee, Services, Work, Process, Stack, Stats, Testimonials, Contact
  data/         projects.js, services.js
  styles/       index.css
```

Edit content in `src/data/*` and copy in each `src/sections/*` file.
