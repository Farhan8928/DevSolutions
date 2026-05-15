import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects.js'

export default function Work() {
  return (
    <section id="work" className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">02 — Selected work</span>
            <h2 className="display mt-4 text-5xl md:text-7xl tracking-tight">
              Real products, <span className="gradient-text">live in the wild.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/65">
            Eight shipped products across healthcare, fintech, e‑commerce and beyond — and many more under NDA.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
              className="card group relative overflow-hidden p-6 md:p-8 hover:border-white/20 transition"
            >
              {/* Visual */}
              <div className="relative h-56 md:h-64 overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-800">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
                <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px]" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="display text-5xl md:text-6xl text-white/95 transition-transform duration-700 group-hover:-translate-y-1">
                    {p.title}
                  </span>
                </div>
                <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur transition group-hover:bg-accent-lime group-hover:text-ink-950">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                    <span>{p.domain}</span>
                    <span className="opacity-40">/</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 max-w-xl text-white/65 leading-relaxed">{p.summary}</p>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </motion.a>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center">
          <a href="#contact" className="btn-ghost">
            Want to see case studies under NDA? Get in touch
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
