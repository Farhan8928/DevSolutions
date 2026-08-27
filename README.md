# DuoStack — Studio Site

Premium single‑page experience for DuoStack, built with **React + Vite + Tailwind + Framer Motion**.

## Highlights
- Immersive aurora hero with gradient display type
- Animated stats counters, marquee, and scroll‑in motion
- Custom cursor with hover‑aware scale
- 13 real projects baked in (Remesleep, OutVue, Saad Cargo CRM, SRF Power CRM, Baker & Co Visa CRM, Humane Warriors, Howl, Benzer World, Mossano Marmo, Saum Studio, AutoPart, Zaid Electronics, Gouri Furnishing)

### Project kinds

`src/data/projects.js` tags every entry with a `kind`:

| kind | preview comes from | call to action |
| --- | --- | --- |
| `site` | `npm run screenshots` against the live URL | Visit site |
| `private` | a screenshot of the real app run **locally** against seeded demo data — never production, so no client PII ships | Request a walkthrough → `#contact` |
| `app` | store listing / device capture | View on Google Play |

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
