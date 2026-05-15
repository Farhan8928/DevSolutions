import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Maximize2 } from 'lucide-react'
import { projects } from '../data/projects.js'
import SmartImage from '../components/SmartImage.jsx'
import Lightbox from '../components/Lightbox.jsx'

export default function Work() {
  const containerRef = useRef(null)
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(null)

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
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    items.forEach((it) => obs.observe(it))
    return () => obs.disconnect()
  }, [])

  const current = projects[active]

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative border-t border-white/[0.06] py-16 md:py-32"
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

        {/* MOBILE: stacked cards, each self-contained with its own screenshot */}
        <ol className="mt-10 grid gap-5 lg:hidden">
          {projects.map((p, i) => (
            <li
              key={p.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-950/85 px-3.5 py-2">
                <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                <span className="ml-2 truncate font-mono text-[11px] text-white/55">{p.host}</span>
                <button
                  type="button"
                  onClick={() => setZoom(p)}
                  aria-label={`View ${p.title} full size`}
                  className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-white/80 active:bg-white/[0.12]"
                >
                  <Maximize2 size={13} />
                </button>
              </div>

              {/* Screenshot — tap to zoom */}
              <button
                type="button"
                onClick={() => setZoom(p)}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-ink-800"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} pointer-events-none`} />
                <SmartImage
                  sources={[p.local, p.shot, p.shot2, p.logo, p.favicon]}
                  alt={`${p.title} — preview`}
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover object-top"
                />
              </button>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-white/55">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span className="opacity-50">·</span>
                  <span>{p.domain}</span>
                  <span className="opacity-50">·</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="display-lg mt-3">{p.title}</h3>
                <p className="mt-2.5 text-sm text-white/70 leading-relaxed">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>

                {/* CTAs — full width, 48px tall */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-accent-lime text-sm font-medium text-ink-950 active:scale-[0.98] transition"
                  >
                    Visit site <ArrowUpRight size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setZoom(p)}
                    className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] text-sm font-medium text-white/85 active:bg-white/[0.08] transition"
                  >
                    Preview <Maximize2 size={13} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* DESKTOP: sticky showcase + scrollable list */}
        <div className="mt-16 hidden gap-12 lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-ink-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-950/90 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 truncate font-mono text-xs text-white/55">{current.host}</span>
                  <button
                    type="button"
                    onClick={() => setZoom(current)}
                    aria-label="View full size"
                    className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white/80 hover:text-white transition"
                    data-cursor="hover"
                  >
                    <Maximize2 size={13} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setZoom(current)}
                  data-cursor="hover"
                  className="relative block aspect-[16/10] w-full overflow-hidden bg-ink-800 group"
                  aria-label={`Open ${current.title} preview at full size`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${current.accent} pointer-events-none`} />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <SmartImage
                        sources={[current.local, current.shot, current.shot2, current.logo, current.favicon]}
                        alt={`${current.title} — live preview`}
                        className="h-full w-full"
                        imgClassName="h-full w-full object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950/80 backdrop-blur px-3 py-1.5 text-xs text-white border border-white/10">
                      <Maximize2 size={12} /> View full size
                    </span>
                  </div>
                </button>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-ink-950/85 px-5 py-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.05] border border-white/10 overflow-hidden">
                      <SmartImage sources={[current.favicon, current.faviconRemote]} alt="" className="h-5 w-5" imgClassName="h-5 w-5 object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-mono uppercase tracking-[0.22em] text-white/55">
                        {current.domain} · {current.year}
                      </p>
                      <p className="truncate font-medium text-white leading-tight">{current.title}</p>
                    </div>
                  </div>
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent-lime px-3.5 py-2 text-xs font-medium text-ink-950 hover:-translate-y-0.5 transition-transform"
                  >
                    Visit site <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-white/45">
                <span>Sticky showcase · scroll to browse</span>
                <span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6 space-y-2">
            {projects.map((p, i) => {
              const isActive = active === i
              return (
                <li
                  key={p.id}
                  data-project
                  data-index={i}
                  className={`group relative rounded-2xl border p-6 md:p-7 transition-colors duration-500 ${
                    isActive ? 'border-accent-lime/40 bg-white/[0.04]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 text-xs font-mono text-white/50">
                        <span className="grid h-5 w-5 place-items-center rounded-md bg-white/[0.06] overflow-hidden">
                          <SmartImage sources={[p.favicon, p.faviconRemote]} alt="" className="h-4 w-4" imgClassName="h-4 w-4 object-contain" />
                        </span>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <span>·</span>
                        <span className="truncate">{p.host}</span>
                        <span>·</span>
                        <span>{p.year}</span>
                      </div>
                      <h3 className="display-lg mt-3">
                        <button type="button" onClick={() => setZoom(p)} className="text-left hover:text-accent-lime transition">
                          {p.title}
                        </button>
                      </h3>
                      <p className="mt-3 max-w-xl text-white/65 leading-relaxed">{p.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.stack.map((s) => (<li key={s} className="chip">{s}</li>))}
                      </ul>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        aria-label={`Visit ${p.title}`}
                        className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                          isActive ? 'border-accent-lime bg-accent-lime text-ink-950' : 'border-white/15 text-white/85'
                        }`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                      <button
                        type="button"
                        onClick={() => setZoom(p)}
                        aria-label={`Preview ${p.title}`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/65 hover:text-white hover:border-white/30 transition"
                      >
                        <Maximize2 size={13} />
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-12 md:mt-14 flex items-center justify-center">
          <a href="#contact" className="btn-ghost text-xs md:text-sm">
            Want to see case studies under NDA? Get in touch
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <Lightbox project={zoom} onClose={() => setZoom(null)} />
    </section>
  )
}
