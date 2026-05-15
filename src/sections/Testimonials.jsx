import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 6000)
    return () => clearInterval(id)
  }, [])

  const q = quotes[i]

  return (
    <section className="relative border-t border-white/[0.06] py-28 md:py-36 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.18),transparent_60%)] blur-3xl" />
      </div>
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">05 — Words from clients</span>
            <h2 className="display mt-4 text-5xl md:text-7xl tracking-tight">
              Trusted by founders <span className="gradient-text">who ship.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? 'w-10 bg-accent-lime' : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 mx-auto max-w-4xl">
          <Quote size={36} className="text-accent-lime" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 display text-3xl md:text-5xl leading-[1.1] text-white"
            >
              “{q.body}”
            </motion.blockquote>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.figcaption
              key={i + '-c'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-8 flex items-center gap-4 text-sm text-white/65"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] border border-white/10 font-mono">
                {q.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </span>
              <span>
                <span className="block text-white">{q.name}</span>
                <span className="block text-white/55">{q.org}</span>
              </span>
            </motion.figcaption>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
