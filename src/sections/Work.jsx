import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects.js'

export default function Work() {
  const containerRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('[data-project]')
    if (!items) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute('data-index'))
            setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    items.forEach((it) => obs.observe(it))
    return () => obs.disconnect()
  }, [])

  const current = projects[active]

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">02 — Selected work</span>
            <h2 className="display-xl mt-4">
              Real products, <span className="gradient-text">live in the wild.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/65">
            Eight shipped products across healthcare, fintech, e‑commerce and beyond — and many more under NDA.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-ink-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${current.accent}`} />
                    <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      <div className="flex items-start justify-between text-xs font-mono text-white/70">
                        <span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                        <span>{current.year}</span>
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-[0.22em] text-white/65">{current.domain}</p>
                        <h3 className="display-xl mt-3 text-white">{current.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] text-white/50">
                <span>Sticky showcase · scroll →</span>
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent-lime hover:underline"
                >
                  Visit live <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Scrollable list */}
          <ol className="lg:col-span-6 space-y-2">
            {projects.map((p, i) => {
              const isActive = active === i
              return (
                <li
                  key={p.id}
                  data-project
                  data-index={i}
                  className={`group relative rounded-2xl border p-6 md:p-7 transition-colors duration-500 ${
                    isActive
                      ? 'border-accent-lime/40 bg-white/[0.04]'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-mono text-white/50">
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <span>·</span>
                        <span>{p.domain}</span>
                        <span>·</span>
                        <span>{p.year}</span>
                      </div>
                      <h3 className="display-lg mt-3">
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-lime transition">
                          {p.title}
                        </a>
                      </h3>
                      <p className="mt-3 max-w-xl text-white/65 leading-relaxed">{p.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <li key={s} className="chip">{s}</li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition ${
                        isActive
                          ? 'border-accent-lime bg-accent-lime text-ink-950'
                          : 'border-white/15 text-white/85'
                      }`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </li>
              )
            })}
          </ol>
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
