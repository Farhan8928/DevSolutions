import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import SmartImage from '../components/SmartImage.jsx'

// Tied to real projects — favicons load live from each client domain.
const quotes = [
  {
    body:
      'They rebuilt our lead engine from the ground up. Meta, web and manual leads now flow through one CRM with crisp role‑based routing.',
    name: 'Operations Lead',
    org: 'Baker & Co — Visa CRM',
    host: 'bakerandco.ae',
    favicon: 'https://www.google.com/s2/favicons?domain=bakerandco.ae&sz=128'
  },
  {
    body:
      'The MT5 integration alone would have taken us months. DevSolutions shipped it inside a polished trader dashboard in weeks.',
    name: 'Founder',
    org: 'EliteFX',
    host: 'elitefx.in',
    favicon: 'https://www.google.com/s2/favicons?domain=elitefx.in&sz=128'
  },
  {
    body:
      'Brand, motion, performance — everything came together. The site looks like the studio we always wanted to be.',
    name: 'Marketing Director',
    org: 'Howl',
    host: 'howl.in',
    favicon: 'https://www.google.com/s2/favicons?domain=howl.in&sz=128'
  }
]

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 6500)
    return () => clearInterval(id)
  }, [paused])

  const q = quotes[i]

  return (
    <section
      className="relative border-t border-white/[0.06] py-20 md:py-36 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.16),transparent_60%)] blur-3xl" />
      </div>

      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">05 — Words from clients</span>
            <h2 className="display-xl mt-4">
              Trusted by founders <span className="gradient-text">who ship.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* 5-star rating */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, n) => (
                <Star key={n} size={14} className="fill-accent-lime text-accent-lime" />
              ))}
              <span className="ml-2 text-xs text-white/55">5.0 average</span>
            </div>
            {/* Pagination dots */}
            <div className="hidden md:flex items-center gap-1.5">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? 'w-9 bg-accent-lime' : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Big single quote */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Quote size={36} className="text-accent-lime" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 display-xl leading-[1.05] text-white"
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
                className="mt-10 flex items-center gap-4"
              >
                {/* Real client favicon, not a letter avatar */}
                <a
                  href={`https://${q.host}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.05] border border-white/10 overflow-hidden hover:border-accent-lime/40 transition"
                >
                  <SmartImage
                    sources={[q.favicon]}
                    alt={q.org}
                    className="h-7 w-7"
                    imgClassName="h-7 w-7 object-contain"
                  />
                </a>
                <div>
                  <p className="text-base font-medium text-white">{q.name}</p>
                  <p className="text-sm text-white/55">{q.org}</p>
                  <a
                    href={`https://${q.host}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-accent-lime hover:underline"
                  >
                    {q.host} →
                  </a>
                </div>
              </motion.figcaption>
            </AnimatePresence>
          </div>

          {/* Mini quote list — all visible at once, premium feel */}
          <ul className="lg:col-span-4 space-y-2">
            {quotes.map((quote, idx) => {
              const isActive = idx === i
              return (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => setI(idx)}
                    className={`group relative w-full text-left rounded-2xl border p-4 transition ${
                      isActive
                        ? 'border-accent-lime/40 bg-white/[0.04]'
                        : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Active rail */}
                    {isActive && (
                      <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-accent-lime" aria-hidden />
                    )}
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.05] border border-white/10 overflow-hidden">
                        <SmartImage
                          sources={[quote.favicon]}
                          alt=""
                          className="h-5 w-5"
                          imgClassName="h-5 w-5 object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{quote.org}</p>
                        <p className="truncate text-xs text-white/55">{quote.name}</p>
                      </div>
                    </div>
                    <p className={`mt-3 text-xs leading-relaxed line-clamp-2 transition ${
                      isActive ? 'text-white/70' : 'text-white/45 group-hover:text-white/65'
                    }`}>
                      {quote.body}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
