import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const quotes = [
  {
    body:
      'They rebuilt our lead engine from the ground up. Meta, web and manual leads now flow through one CRM with crisp role‑based routing.',
    name: 'Operations Lead',
    org: 'Baker & Co — Visa CRM'
  },
  {
    body:
      'The MT5 integration alone would have taken us months. DevSolutions shipped it inside a polished trader dashboard in weeks.',
    name: 'Founder',
    org: 'EliteFX'
  },
  {
    body:
      'Brand, motion, performance — everything came together. The site looks like the studio we always wanted to be.',
    name: 'Marketing Director',
    org: 'Howl'
  }
]

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">05 — Words from clients</span>
            <h2 className="display mt-4 text-5xl md:text-7xl tracking-tight">
              Trusted by founders <span className="gradient-text">who ship.</span>
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card p-7 md:p-8 flex flex-col gap-6"
            >
              <Quote size={22} className="text-accent-lime" />
              <blockquote className="text-lg leading-relaxed text-white/85">
                {q.body}
              </blockquote>
              <figcaption className="mt-auto pt-6 border-t border-white/10">
                <div className="text-sm font-medium">{q.name}</div>
                <div className="text-sm text-white/55">{q.org}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
