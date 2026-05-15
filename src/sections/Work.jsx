import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects.js'
import SmartImage from '../components/SmartImage.jsx'

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
                {/* Tinted accent base, behind the screenshot */}
                <div className={`absolute inset-0 bg-gradient-to-br ${current.accent}`} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {/* Browser-frame screenshot */}
                    <div className="absolute inset-4 md:inset-6 rounded-2xl overflow-hidden border border-white/10 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                      <div className="flex items-center gap-1.5 bg-ink-950/90 px-3 py-2 border-b border-white/10">
                        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                        <span className="ml-3 truncate font-mono text-[11px] text-white/45">
                          {current.host}
                        </span>
                      </div>
                      <SmartImage
                        sources={[current.shot, current.logo, current.favicon]}
                        alt={`${current.title} — live preview`}
                        className="h-[calc(100%-30px)] w-full"
                        imgClassName="h-full w-full object-cover object-top"
                      />
                    </div>

                    {/* Bottom meta overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 backdrop-blur border border-white/10 overflow-hidden">
                          <SmartImage
                            sources={[current.favicon]}
                            alt=""
                            className="h-6 w-6"
                            imgClassName="h-6 w-6 object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/65">
                            {current.domain} · {current.year}
                          </p>
                          <h3 className="display-lg leading-none mt-1 text-white">
                            {current.title}
                          </h3>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-white/65">
                        {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </span>
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
                  Visit {current.host} <ArrowUpRight size={12} />
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
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 text-xs font-mono text-white/50">
                        <span className="grid h-5 w-5 place-items-center rounded-md bg-white/[0.06] overflow-hidden">
                          <SmartImage
                            sources={[p.favicon]}
                            alt=""
                            className="h-4 w-4"
                            imgClassName="h-4 w-4 object-contain"
                          />
                        </span>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <span>·</span>
                        <span className="truncate">{p.host}</span>
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
