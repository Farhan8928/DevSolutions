// Real DuoStack project portfolio.
//
// Every entry has a `kind`, because not all shipped work is a public website:
//
//   'site'    — a live public URL. Preview is a screenshot of the real site,
//               captured by `npm run screenshots`. CTA opens it.
//   'private' — a client-internal product (CRM, ops tool). There is no public
//               URL to send anyone to, so the preview is a screenshot of the
//               real app running against seeded demo data, and the CTA asks
//               for a walkthrough instead of linking out.
//   'app'     — a published mobile app. CTA goes to the store listing.
//
// Remote asset helpers (used for `kind: 'site'` only):
//   - favicon: local copy first (downloaded by `npm run favicons`),
//              Google S2 / the site's own icon as fallback.
//   - shot:    WordPress mShots (free, no key) — runtime fallback only.
//   - shot2:   Microlink screenshot (second fallback).

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

const make = (p) => {
  const kind = p.kind ?? 'site'
  // Only public sites have a host we can pull remote assets for. Private CRMs
  // and store apps fall back to the locally-captured screenshot alone.
  const host = p.host ?? null
  const isSite = kind === 'site'

  return {
    ...p,
    kind,
    // SmartImage walks these — local screenshot first, then live services.
    favicon: host ? fav(p.id, host) : null,
    faviconRemote: host ? favRemote(host) : null,
    logo: host && isSite ? logo(host) : null,
    local: `/projects/${p.id}.jpg`,
    shot: isSite && p.url ? shot(p.url) : null,
    shot2: isSite && p.url ? shot2(p.url) : null
  }
}

/**
 * Not every shipped product is a public website, so the call-to-action has to
 * change with the kind. A client-internal CRM has no URL a visitor could open —
 * sending them to a login wall reads worse than saying it is private and
 * offering a walkthrough. Store apps go to the listing.
 */
export const ctaFor = (p) => {
  if (p.kind === 'private') {
    return {
      label: 'Request a walkthrough',
      short: 'Walkthrough',
      href: '#contact',
      external: false
    }
  }
  if (p.kind === 'app') {
    return {
      label: 'View on Google Play',
      short: 'Google Play',
      href: p.url,
      external: true
    }
  }
  return { label: 'Visit site', short: 'Visit site', href: p.url, external: true }
}

/** What sits in the fake browser chrome's address bar. */
export const addressFor = (p) => {
  if (p.kind === 'private') return `${p.client} · private build`
  if (p.kind === 'app') return `${p.title} · Google Play`
  return p.host
}

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
    id: 'outvue',
    title: 'OutVue',
    domain: 'SaaS / Analytics',
    host: 'outvue.io',
    year: '2026',
    summary:
      'Growth-spend intelligence platform for UK enterprises — blended ROI attribution across ad accounts, scenario modelling and board-ready reporting.',
    stack: ['React', 'Redux', 'Node', 'MongoDB', 'Stripe'],
    url: 'https://www.outvue.io/',
    accent: 'from-violet-400/25 via-fuchsia-400/10 to-transparent'
  }),
  make({
    id: 'saadcargo',
    kind: 'private',
    title: 'Saad Cargo — Logistics CRM',
    domain: 'Logistics CRM',
    client: 'Saad Cargo, Mumbai',
    year: '2026',
    summary:
      'Railway parcel logistics CRM — consignment booking, POD/bilti generation, party ledgers, GST invoicing and outstanding reports, with SMS status alerts to consignees.',
    stack: ['React', 'TypeScript', 'Node', 'MongoDB', 'PDFKit'],
    accent: 'from-orange-400/25 via-amber-300/10 to-transparent'
  }),
  make({
    id: 'srfpower',
    kind: 'private',
    title: 'SRF Power — Genset Sales CRM',
    domain: 'Sales CRM',
    client: 'SRF Power Machine',
    year: '2026',
    summary:
      'Genset sales CRM with a capacity calculator that sizes a generator from connected load, then turns the sizing into a quotation — plus leads, inventory, attendance and IndiaMART lead sync.',
    stack: ['React', 'TypeScript', 'Node', 'MongoDB', 'WhatsApp API'],
    accent: 'from-blue-400/25 via-sky-300/10 to-transparent'
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
    id: 'mossanomarmo',
    title: 'Mossano Marmo',
    domain: 'Natural Stone',
    host: 'mossano-marmo.vercel.app',
    year: '2026',
    summary:
      'Natural-stone sourcing platform for architects and designers — verified slab availability, actual slab photography and private sourcing enquiries.',
    stack: ['React', 'TanStack Query', 'Node', 'MongoDB'],
    url: 'https://mossano-marmo.vercel.app/',
    accent: 'from-stone-300/25 via-neutral-300/10 to-transparent'
  }),
  make({
    id: 'saumstudio',
    title: 'Saum Studio',
    domain: 'Interior Design',
    host: 'saumstudio.com',
    year: '2026',
    summary:
      'Mumbai interior design studio — residential, commercial and turnkey interiors, modular kitchens, civil work and 3D visualisation.',
    stack: ['React', 'Framer Motion', 'Tailwind', 'Vercel'],
    url: 'https://www.saumstudio.com/',
    accent: 'from-rose-300/25 via-orange-200/10 to-transparent'
  }),
  make({
    id: 'autopart',
    title: 'AutoPart',
    domain: 'Automotive',
    host: 'autodoorspecialist.com',
    year: '2025',
    summary:
      'Booking platform for premium car repair — quote builder, service catalogue and slot management.',
    stack: ['React', 'Vite', 'Tailwind', 'Vercel'],
    url: 'https://www.autodoorspecialist.com/',
    accent: 'from-cyan-300/25 via-blue-400/10 to-transparent'
  }),
  make({
    id: 'zaidelectronics',
    title: 'Zaid Electronics',
    domain: 'Local Services',
    host: 'zaidelectronicsmumbai.com',
    year: '2026',
    summary:
      'Doorstep TV repair across Mumbai — LED, LCD, Smart TV and panel bonding — with brand‑wise service pages and call/WhatsApp lead capture.',
    stack: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    url: 'https://zaidelectronicsmumbai.com/',
    accent: 'from-indigo-300/25 via-purple-400/10 to-transparent'
  }),
  make({
    id: 'gourifurnishing',
    title: 'Gouri Furnishing',
    domain: 'Home Interiors',
    host: 'gourifurnishing.com',
    year: '2026',
    summary:
      'Made‑to‑measure curtains, blinds and mattresses in Thane — service catalogue, free home‑measurement booking and fixed‑price quoting before any work starts.',
    stack: ['React', 'Vite', 'Tailwind', 'Vercel'],
    url: 'https://gourifurnishing.com/',
    accent: 'from-orange-300/25 via-amber-200/10 to-transparent'
  })
]
