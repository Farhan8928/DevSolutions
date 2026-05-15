import { motion } from 'framer-motion'

const groups = [
  {
    label: 'Frontend',
    items: ['React', 'Vite', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion']
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Nest', 'Express', 'GraphQL', 'PostgreSQL', 'MongoDB']
  },
  {
    label: 'Infra & DevOps',
    items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Cloudflare']
  },
  {
    label: 'Integrations',
    items: ['MT5', 'Stripe', 'Meta API', 'Twilio', 'Shopify', 'Sanity']
  }
]

export default function Stack() {
  return (
    <section id="stack" className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">04 — Tooling</span>
            <h2 className="display-xl mt-4">
              The stack we <span className="gradient-text">trust to ship.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/65">
            Battle‑tested choices, tuned for performance, accessibility and a great developer experience.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">{g.label}</p>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center justify-between text-white/85">
                    <span>{it}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-lime/70" />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
