import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    title: 'Discover',
    body: 'We sit with the problem. Stakeholder interviews, audits, competitive teardowns, and a clear scope before a single pixel moves.'
  },
  {
    n: '02',
    title: 'Design',
    body: 'High‑fidelity flows, prototypes and a design system tuned to your brand. We test ideas in days, not months.'
  },
  {
    n: '03',
    title: 'Build',
    body: 'Production engineering with React, Vite and Node. Type‑safe, observable, deployable from day one.'
  },
  {
    n: '04',
    title: 'Launch & evolve',
    body: 'Phased launches, analytics, weekly iteration. We stay in the trenches after go‑live.'
  }
]

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">03 — How we work</span>
            <h2 className="display mt-4 text-5xl md:text-7xl tracking-tight">
              A process built for <span className="gradient-text">clarity & velocity.</span>
            </h2>
          </div>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-2">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card relative overflow-hidden p-7 md:p-9"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-accent-lime">{s.n}</span>
                <span className="font-mono text-xs text-white/40">phase</span>
              </div>
              <h3 className="display mt-6 text-3xl md:text-4xl">{s.title}</h3>
              <p className="mt-3 text-white/65 leading-relaxed max-w-prose">{s.body}</p>
              <div className="absolute -bottom-px left-0 h-px w-1/3 bg-gradient-to-r from-accent-lime to-transparent" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
