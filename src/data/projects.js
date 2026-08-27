// Real DuoStack project portfolio.
// Assets are pulled live from each client domain via free public services:
//   - favicon: local copy first (downloaded by `npm run favicons`),
//              Google S2 as runtime fallback for any missing local file.
//   - logo:    Clearbit Logo API (works for most established brands)
//   - shot:    WordPress mShots (free, no key, no auth)
//   - shot2:   Microlink screenshot (free fallback)

import faviconManifest from './favicon-manifest.json'

const fav = (id, host) =>
  faviconManifest.clients[id] ??
  `https://www.google.com/s2/favicons?domain=${host}&sz=128`

const favRemote = (host) =>
  `https://www.google.com/s2/favicons?domain=${host}&sz=128`

const logo = (d) => `https://logo.clearbit.com/${d}`
const shot = (url) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1600&h=1000`
const shot2 = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900`

const make = (p) => ({
  ...p,
  // SmartImage walks this list — local first, S2 second, then logo, then nothing
  favicon: fav(p.id, p.host),
  faviconRemote: favRemote(p.host),
  logo: logo(p.host),
  // Local screenshot captured by `npm run screenshots`. Tried first; if missing,
  // SmartImage falls through to live services then to logo/favicon.
  local: `/projects/${p.id}.jpg`,
  shot: shot(p.url),
  shot2: shot2(p.url)
})

export const projects = [
  make({
    id: 'remesleep',
    title: 'Remesleep',
    domain: 'Healthcare',
    host: 'remesleep.com',
    year: '2024',
    summary:
      'Sleep & recovery healthcare platform with patient onboarding, clinician dashboards and telehealth flows.',
    stack: ['React', 'Node', 'PostgreSQL', 'Stripe'],
    url: 'https://www.remesleep.com/',
    accent: 'from-emerald-300/30 via-cyan-400/10 to-transparent'
  }),
  make({
    id: 'humanewarriors',
    title: 'Humane Warriors',
    domain: 'NGO',
    host: 'humanewarriors.ch',
    year: '2024',
    summary:
      'Global NGO website that mobilises donors and volunteers across regions with rich storytelling.',
    stack: ['React', 'CMS', 'GSAP'],
    url: 'https://humanewarriors.ch/',
    accent: 'from-amber-300/25 via-rose-300/10 to-transparent'
  }),
  make({
    id: 'howl',
    title: 'Howl',
    domain: 'Marketing',
    host: 'howl.in',
    year: '2024',
    summary:
      'Brand-led website for a digital marketing agency with bold motion and lead capture.',
    stack: ['Next.js', 'Framer Motion', 'Sanity'],
    url: 'https://www.howl.in/',
    accent: 'from-fuchsia-400/25 via-violet-400/10 to-transparent'
  }),
  make({
    id: 'benzer',
    title: 'Benzer World',
    domain: 'E‑commerce',
    host: 'benzerworld.com',
    year: '2023',
    summary:
      'Headless commerce on Shopify + custom CMS — catalogue, merchandising and checkout tuned for conversion.',
    stack: ['Shopify', 'Custom CMS', 'Liquid', 'Node'],
    url: 'https://benzerworld.com/',
    accent: 'from-amber-200/25 via-yellow-300/10 to-transparent'
  }),
  make({
    id: 'chainthat',
    title: 'ChainThat',
    domain: 'InsurTech',
    host: 'chainthat.com',
    year: '2023',
    summary:
      'Brand and product site for an enterprise insurance technology company.',
    stack: ['React', 'TypeScript', 'GraphQL'],
    url: 'https://chainthat.com/',
    accent: 'from-sky-400/25 via-indigo-400/10 to-transparent'
  }),
  make({
    id: 'bakerandco',
    title: 'Baker & Co — Visa CRM',
    domain: 'Custom CRM',
    host: 'bakerandco.ae',
    year: '2024',
    summary:
      'End‑to‑end visa lead CRM. Captures leads from Meta, websites and manual entry. Role‑based routing across telecallers, advisors, processing and admin.',
    stack: ['React', 'Node', 'MongoDB', 'Meta API', 'Twilio'],
    url: 'https://bakerandco.ae/',
    accent: 'from-lime-300/30 via-emerald-300/10 to-transparent'
  }),
  make({
    id: 'elitefx',
    title: 'EliteFX',
    domain: 'Forex / Fintech',
    host: 'elitefx.in',
    year: '2024',
    summary:
      'Full forex website plus client and admin CRM with native MT5 and broker‑platform integrations baked in.',
    stack: ['React', 'Node', 'MT5', 'WebSockets', 'PostgreSQL'],
    url: 'https://www.elitefx.in/',
    accent: 'from-rose-300/25 via-orange-300/10 to-transparent'
  }),
  make({
    id: 'autopart',
    title: 'AutoPart',
    domain: 'Automotive',
    host: 'autopart-web.vercel.app',
    year: '2025',
    summary:
      'Booking platform for premium car repair — quote builder, service catalogue and slot management.',
    stack: ['React', 'Vite', 'Tailwind', 'Vercel'],
    url: 'https://www.autodoorspecialist.com/',
    accent: 'from-cyan-300/25 via-blue-400/10 to-transparent'
  })
]
