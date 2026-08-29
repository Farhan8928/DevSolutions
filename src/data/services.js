/**
 * Service lines used to generate the service hub pages and the
 * service × area landing pages.
 *
 * Every line here is backed by work we have actually shipped — the `proof`
 * field names the project and is rendered on the page. Do not add a service
 * we cannot point at a build for: a landing page for work you have never
 * done is a lead you cannot convert and a claim you cannot defend.
 *
 * `slug` doubles as the URL for the hub page and as the key used in each
 * area's `relevance` map in areas.js. The six original slugs are load-bearing
 * — they are already indexed — so they must not be renamed.
 */

export const services = [
  {
    slug: 'web-development-company-mumbai',
    key: 'web',
    name: 'Web development',
    pair: 'Web development',
    h1: 'Web development company in Mumbai',
    blurb: 'Marketing sites, dashboards and full web platforms in React, Next.js and Vite.',
    proof: 'Remesleep, Howl and Saum Studio',
    from: '₹20k'
  },
  {
    slug: 'custom-crm-development-mumbai',
    key: 'crm',
    name: 'Custom CRM development',
    pair: 'Custom CRM development',
    h1: 'Custom CRM development in Mumbai',
    blurb: 'Lead capture, role-based routing and the ops screens your team actually lives in.',
    proof: 'Baker & Co visa CRM, Saad Cargo and SRF Power',
    from: '₹2L'
  },
  {
    slug: 'react-native-app-development-mumbai',
    key: 'app',
    name: 'React Native app development',
    pair: 'React Native app development',
    h1: 'React Native app development in Mumbai',
    blurb: 'Cross-platform Android and iOS apps, built with Expo and shipped to the stores.',
    proof: 'AshShifa, live on Google Play in 176 countries',
    from: '₹2L'
  },
  {
    slug: 'shopify-development-company-mumbai',
    key: 'shopify',
    name: 'Shopify development',
    pair: 'Shopify development',
    h1: 'Shopify development company in Mumbai',
    blurb: 'Headless Hydrogen builds and custom Liquid themes, GST-compliant and conversion-tuned.',
    proof: 'Benzer World',
    from: '₹2L'
  },
  {
    slug: 'fintech-platform-development-mumbai',
    key: 'fintech',
    name: 'Fintech platform development',
    pair: 'Fintech platform development',
    h1: 'Fintech and forex platform development in Mumbai',
    blurb: 'Trader dashboards, MT5 manager-API integration, KYC/AML and payment rails.',
    proof: 'a broker platform shipped in twelve weeks, MT5 in eighteen working days',
    from: '₹6.5L'
  },
  {
    slug: 'healthcare-software-development-mumbai',
    key: 'health',
    name: 'Healthcare software development',
    pair: 'Healthcare software development',
    h1: 'Healthcare software development in Mumbai',
    blurb: 'Patient apps, clinician dashboards and telehealth, DPDP- and HIPAA-aligned.',
    proof: 'Remesleep and the PlusVeda pharmacy platform',
    from: '₹6.5L'
  },
  {
    slug: 'saas-product-development-mumbai',
    key: 'saas',
    name: 'SaaS product development',
    pair: 'SaaS product development',
    h1: 'SaaS product development in Mumbai',
    blurb: 'Multi-tenant products with billing, roles and the analytics your board asks for.',
    proof: 'OutVue, a UK growth-intelligence platform',
    from: '₹6.5L'
  },
  {
    slug: 'logistics-software-development-mumbai',
    key: 'logistics',
    name: 'Logistics software development',
    pair: 'Logistics software development',
    h1: 'Logistics and transport software development in Mumbai',
    blurb: 'Consignment booking, POD and bilti generation, party ledgers and GST invoicing.',
    proof: 'the Saad Cargo railway-parcel CRM',
    from: '₹2L'
  },
  {
    slug: 'inventory-software-development-mumbai',
    key: 'inventory',
    name: 'Inventory software development',
    pair: 'Inventory software development',
    h1: 'Inventory and billing software development in Mumbai',
    blurb: 'Batch-level stock, expiry control, barcode billing and multi-warehouse transfers.',
    proof: 'PlusVeda, with FEFO batch picking and expiry value-at-risk',
    from: '₹2L'
  },
  {
    slug: 'nextjs-development-company-mumbai',
    key: 'nextjs',
    name: 'Next.js development',
    pair: 'Next.js development',
    h1: 'Next.js development company in Mumbai',
    blurb: 'Server-rendered React for sites that have to rank and load fast on Indian networks.',
    proof: 'Howl',
    from: '₹75k'
  },
  {
    slug: 'ngo-website-development-mumbai',
    key: 'ngo',
    name: 'NGO website development',
    pair: 'NGO website development',
    h1: 'NGO and donation website development in Mumbai',
    blurb: 'Multi-currency donation flows, recurring giving, campaign progress and 80G receipting.',
    proof: 'Humane Warriors, raising in CHF with one-time and monthly giving',
    from: '₹75k'
  },
  {
    slug: 'interior-design-website-development-mumbai',
    key: 'interior',
    name: 'Interior and architecture websites',
    pair: 'Interior and architecture website development',
    h1: 'Interior design and architecture website development in Mumbai',
    blurb: 'Project galleries that hold up at full-bleed, plus enquiry capture that qualifies.',
    proof: 'Saum Studio, Mossano Marmo and Gouri Furnishing',
    from: '₹75k'
  }
]

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]))
export const serviceByKey = Object.fromEntries(services.map((s) => [s.key, s]))

/** URL for a service × area landing page. */
export const crossSlug = (service, area) =>
  `${service.slug.replace(/-mumbai$/, '')}-${area.slug}`
