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
    linkedin: 'https://www.linkedin.com/company/duostack',
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
export const serviceAreas = [
  { name: 'Andheri',     slug: 'andheri',     lat: 19.1136, lng: 72.8697 },
  { name: 'Bandra',      slug: 'bandra',      lat: 19.0596, lng: 72.8295 },
  { name: 'BKC',         slug: 'bkc',         lat: 19.0664, lng: 72.8682 },
  { name: 'Powai',       slug: 'powai',       lat: 19.1196, lng: 72.9089 },
  { name: 'Lower Parel', slug: 'lower-parel', lat: 19.0030, lng: 72.8302 },
  { name: 'Borivali',    slug: 'borivali',    lat: 19.2299, lng: 72.8567 },
  { name: 'Thane',       slug: 'thane',       lat: 19.2183, lng: 72.9781 },
  { name: 'Navi Mumbai', slug: 'navi-mumbai', lat: 19.0330, lng: 73.0297 }
]

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
