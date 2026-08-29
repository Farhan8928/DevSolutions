// Single source of truth for studio identity, contact channels, and links.
// Update once here — every section pulls from this.

export const studio = {
  name: 'DuoStack',
  legalName: 'DuoStack Studio',
  tagline: 'Two senior engineers. One full-stack studio.',
  // Live production domain. Update this single value to migrate the
  // studio to a new domain — sitemap, canonical URLs, OG tags and
  // JSON-LD all derive from it.
  siteUrl: 'https://duostack.in',
  founded: '2022',
  city: 'Mumbai',
  region: 'Maharashtra',
  regionCode: 'IN-MH',
  country: 'India',
  countryCode: 'IN',
  postalCode: '400001',
  street: 'Mumbai, Maharashtra',  // refine when you publish a public address
  geo: { lat: 19.0760, lng: 72.8777 },
  email: 'farhan.sayyed.tech@gmail.com',
  phone: '+918928040454',          // E.164 form for tel: links
  phoneDisplay: '+91 89280 40454', // human-readable
  whatsapp: '918928040454',        // wa.me uses no plus sign
  whatsappText:
    'Hi DuoStack, I came across your studio and would love to discuss a project.',
  // Social profiles — fill with real URLs when available, used in JSON-LD `sameAs`.
  social: {
    linkedin: 'https://www.linkedin.com/in/duo-stack-b84289411',
    github:   'https://github.com/duostack',
    x:        '',
    instagram:'',
    dribbble: ''
  }
}

// Mumbai neighbourhoods we explicitly target. These power both the visible
// "Service area" block on landing pages and the `areaServed` enumeration in
// every JSON-LD payload, so Google sees the same coverage statement in
// rendered DOM and structured data — the consistency that local pack ranks on.
//
// Derived from areas.js rather than duplicated: that file carries the full
// per-area profile and per-service relevance copy used by the landing-page
// grid, and two hand-maintained lists of the same places drift apart quickly.
import { areas } from './areas.js'

// `district` is carried through deliberately: Thane, Navi Mumbai and Panvel are
// separate cities/districts, and page titles need it to avoid printing
// "Thane, Mumbai".
export const serviceAreas = areas.map(({ name, slug, lat, lng, district }) => ({
  name,
  slug,
  lat,
  lng,
  district
}))

// Two co-founders.
// Initials are auto-derived from the name in the UI for the avatar tile.
export const founders = [
  {
    name: 'Farhan Sayyed',
    role: 'Co‑founder · Engineering',
    initials: 'FS'
  },
  {
    name: 'Sameer Ansari',
    role: 'Co‑founder · Product',
    initials: 'SA'
  }
]

// Pre-formatted helpers used across the page.
export const contact = {
  mailto: `mailto:${studio.email}`,
  tel:    `tel:${studio.phone}`,
  whatsapp: `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(studio.whatsappText)}`,
  emailLabel:    studio.email,
  whatsappLabel: studio.phoneDisplay
}
