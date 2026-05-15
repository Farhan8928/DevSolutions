import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services.js'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">01 — What we do</span>
            <h2 className="display mt-4 text-5xl md:text-7xl tracking-tight">
              Services with the <span className="gradient-text">depth of a team,</span>
              <br className="hidden md:block" />
              the speed of a studio.
            </h2>
          </div>
          <p className="md:max-w-sm text-white/65">
            We move from problem to product with one tight team — no handoffs, no agency theatre.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.article
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                custom={i}
                className="card group relative overflow-hidden p-7 hover:border-white/20 transition"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-violet/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.05] border border-white/10">
                    <Icon size={20} className="text-accent-lime" />
                  </div>
                  <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-white/65 leading-relaxed">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="chip">{b}</li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center gap-2 text-sm text-white/50 group-hover:text-accent-lime transition">
                  Learn more <ArrowUpRight size={14} />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
