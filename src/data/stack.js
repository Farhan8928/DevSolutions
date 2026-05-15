// Tech stack — every tool we ship with.
// Logos served from local /favicons/stack (downloaded by `npm run favicons`),
// with Google S2 as runtime fallback for anything missing.
import faviconManifest from './favicon-manifest.json'

const remote = (host) => `https://www.google.com/s2/favicons?domain=${host}&sz=128`
const localOrRemote = (id, host) => faviconManifest.stack[id] ?? remote(host)

const tools = {
  // Frontend
  react:         { id: 'react',         name: 'React',          host: 'react.dev',          why: 'Component model we know cold' },
  nextjs:        { id: 'nextjs',        name: 'Next.js',        host: 'nextjs.org',         why: 'SSR, edge, and routing solved' },
  vite:          { id: 'vite',          name: 'Vite',           host: 'vitejs.dev',         why: 'Sub‑second dev loop' },
  typescript:    { id: 'typescript',    name: 'TypeScript',     host: 'typescriptlang.org', why: 'Refactors without fear' },
  tailwindcss:   { id: 'tailwindcss',   name: 'Tailwind CSS',   host: 'tailwindcss.com',    why: 'Design system in your markup' },
  'framer-motion': { id: 'framer-motion', name: 'Framer Motion', host: 'motion.dev',         why: 'Motion that ships fast' },
  // Backend
  nodejs:        { id: 'nodejs',        name: 'Node.js',        host: 'nodejs.org',         why: 'Runtime parity with the front' },
  nestjs:        { id: 'nestjs',        name: 'NestJS',         host: 'nestjs.com',         why: 'Structured backends at scale' },
  express:       { id: 'express',       name: 'Express',        host: 'expressjs.com',      why: 'Minimal API plumbing' },
  graphql:       { id: 'graphql',       name: 'GraphQL',        host: 'graphql.org',        why: 'Typed contract end‑to‑end' },
  postgresql:    { id: 'postgresql',    name: 'PostgreSQL',     host: 'postgresql.org',     why: 'Boring tech that wins' },
  mongodb:       { id: 'mongodb',       name: 'MongoDB',        host: 'mongodb.com',        why: 'Document workloads, fast' },
  // Infra
  vercel:        { id: 'vercel',        name: 'Vercel',         host: 'vercel.com',         why: 'Edge deploys in seconds' },
  aws:           { id: 'aws',           name: 'AWS',            host: 'aws.amazon.com',     why: 'Whatever you actually need' },
  docker:        { id: 'docker',        name: 'Docker',         host: 'docker.com',         why: 'Reproducible everywhere' },
  github:        { id: 'github',        name: 'GitHub Actions', host: 'github.com',         why: 'CI / CD that matches the team' },
  cloudflare:    { id: 'cloudflare',    name: 'Cloudflare',     host: 'cloudflare.com',     why: 'CDN, WAF, R2 in one' },
  sentry:        { id: 'sentry',        name: 'Sentry',         host: 'sentry.io',          why: 'Errors caught before users notice' },
  // Integrations
  mt5:           { id: 'mt5',           name: 'MetaTrader 5',   host: 'metatrader5.com',    why: 'Forex, native to the broker' },
  stripe:        { id: 'stripe',        name: 'Stripe',         host: 'stripe.com',         why: 'Payments without the pain' },
  meta:          { id: 'meta',          name: 'Meta API',       host: 'developers.facebook.com', why: 'Lead Ads → CRM, instant' },
  twilio:        { id: 'twilio',        name: 'Twilio',         host: 'twilio.com',         why: 'SMS, voice, WhatsApp' },
  shopify:       { id: 'shopify',       name: 'Shopify',        host: 'shopify.com',        why: 'Headless storefronts' },
  sanity:        { id: 'sanity',        name: 'Sanity',         host: 'sanity.io',          why: 'Editor‑friendly content' }
}

const decorate = (t) => ({
  ...t,
  logo: localOrRemote(t.id, t.host),
  logoRemote: remote(t.host)
})

export const stackGroups = [
  {
    label: 'Frontend',
    items: ['react', 'nextjs', 'vite', 'typescript', 'tailwindcss', 'framer-motion'].map((k) => decorate(tools[k]))
  },
  {
    label: 'Backend',
    items: ['nodejs', 'nestjs', 'express', 'graphql', 'postgresql', 'mongodb'].map((k) => decorate(tools[k]))
  },
  {
    label: 'Infra & DevOps',
    items: ['vercel', 'aws', 'docker', 'github', 'cloudflare', 'sentry'].map((k) => decorate(tools[k]))
  },
  {
    label: 'Integrations',
    items: ['mt5', 'stripe', 'meta', 'twilio', 'shopify', 'sanity'].map((k) => decorate(tools[k]))
  }
]

export const stackFlat = stackGroups.flatMap((g) => g.items)
