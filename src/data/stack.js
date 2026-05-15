// Tech stack — every tool we ship with.
// Logos are pulled live via Google S2 (favicon.ico from each tool's domain).
const fav = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=128`

export const stackGroups = [
  {
    label: 'Frontend',
    items: [
      { name: 'React',         host: 'react.dev',           why: 'Component model we know cold' },
      { name: 'Next.js',       host: 'nextjs.org',          why: 'SSR, edge, and routing solved' },
      { name: 'Vite',          host: 'vitejs.dev',          why: 'Sub‑second dev loop' },
      { name: 'TypeScript',    host: 'typescriptlang.org',  why: 'Refactors without fear' },
      { name: 'Tailwind CSS',  host: 'tailwindcss.com',     why: 'Design system in your markup' },
      { name: 'Framer Motion', host: 'motion.dev',          why: 'Motion that ships fast' }
    ]
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js',     host: 'nodejs.org',     why: 'Runtime parity with the front' },
      { name: 'NestJS',      host: 'nestjs.com',     why: 'Structured backends at scale' },
      { name: 'Express',     host: 'expressjs.com',  why: 'Minimal API plumbing' },
      { name: 'GraphQL',     host: 'graphql.org',    why: 'Typed contract end‑to‑end' },
      { name: 'PostgreSQL',  host: 'postgresql.org', why: 'Boring tech that wins' },
      { name: 'MongoDB',     host: 'mongodb.com',    why: 'Document workloads, fast' }
    ]
  },
  {
    label: 'Infra & DevOps',
    items: [
      { name: 'Vercel',         host: 'vercel.com',     why: 'Edge deploys in seconds' },
      { name: 'AWS',            host: 'aws.amazon.com', why: 'Whatever you actually need' },
      { name: 'Docker',         host: 'docker.com',     why: 'Reproducible everywhere' },
      { name: 'GitHub Actions', host: 'github.com',     why: 'CI / CD that matches the team' },
      { name: 'Cloudflare',     host: 'cloudflare.com', why: 'CDN, WAF, R2 in one' },
      { name: 'Sentry',         host: 'sentry.io',      why: 'Errors caught before users notice' }
    ]
  },
  {
    label: 'Integrations',
    items: [
      { name: 'MetaTrader 5', host: 'metatrader5.com',     why: 'Forex, native to the broker' },
      { name: 'Stripe',       host: 'stripe.com',          why: 'Payments without the pain' },
      { name: 'Meta API',     host: 'developers.facebook.com', why: 'Lead Ads → CRM, instant' },
      { name: 'Twilio',       host: 'twilio.com',          why: 'SMS, voice, WhatsApp' },
      { name: 'Shopify',      host: 'shopify.com',         why: 'Headless storefronts' },
      { name: 'Sanity',       host: 'sanity.io',           why: 'Editor‑friendly content' }
    ]
  }
].map((g) => ({
  ...g,
  items: g.items.map((it) => ({ ...it, logo: fav(it.host) }))
}))

// Flat list for the marquee
export const stackFlat = stackGroups.flatMap((g) => g.items)
