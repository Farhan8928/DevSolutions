import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { stackGroups, stackFlat } from '../data/stack.js'
import SmartImage from '../components/SmartImage.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Stack() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="stack" className="relative py-16 md:py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Soft accent glow behind the section */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.12),transparent_60%)] blur-3xl" />
      </div>

      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">04 — Tooling</span>
            <h2 className="display-xl mt-4">
              The stack we <span className="gradient-text">trust to ship.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/65">
            24 battle‑tested tools across four layers. Picked for performance,
            developer experience, and a long, boring uptime record.
          </p>
        </div>

        {/* Headline metrics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { v: '24', l: 'Tools we ship with' },
            { v: '4', l: 'Architecture layers' },
            { v: '5+', l: 'Years on each tool' },
            { v: '100%', l: 'Open standards' }
          ].map((m, i) => (
            <motion.div
              key={m.l}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-5"
            >
              <p className="display text-3xl md:text-4xl">{m.v}</p>
              <p className="mt-1.5 text-xs text-white/55">{m.l}</p>
            </motion.div>
          ))}
        </div>

        {/* Stack groups — premium logo grid */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] md:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((g, gi) => (
            <div
              key={g.label}
              className="bg-ink-950/85 p-5 md:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                  {g.label}
                </p>
                <p className="font-mono text-[10px] text-white/30">
                  0{gi + 1}
                </p>
              </div>

              <ul className="mt-5 grid grid-cols-3 gap-2.5">
                {g.items.map((tool, i) => (
                  <motion.li
                    key={tool.name}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    custom={i}
                    onMouseEnter={() => setHovered(tool.name)}
                    onMouseLeave={() => setHovered(null)}
                    className="group relative aspect-square"
                  >
                    <div
                      className={`relative grid h-full w-full place-items-center rounded-xl border bg-white/[0.02] transition ${
                        hovered === tool.name
                          ? 'border-accent-lime/50 bg-white/[0.06]'
                          : 'border-white/[0.06] hover:border-white/15'
                      }`}
                      title={`${tool.name} — ${tool.why}`}
                    >
                      <SmartImage
                        sources={[tool.logo]}
                        alt={tool.name}
                        className="h-7 w-7 md:h-8 md:w-8"
                        imgClassName="h-7 w-7 md:h-8 md:w-8 object-contain transition group-hover:scale-110"
                      />

                      {/* Tooltip on desktop */}
                      <div
                        className={`pointer-events-none absolute left-1/2 z-10 hidden md:block bottom-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-ink-950 px-2.5 py-1.5 text-[11px] text-white shadow-lg transition ${
                          hovered === tool.name
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-1'
                        }`}
                      >
                        <span className="font-medium">{tool.name}</span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Hovered tool detail strip — replaces the bullet list */}
        <div className="mt-6 min-h-[44px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-sm text-white/70"
              >
                <span className="text-white font-medium">{hovered}</span>
                <span className="mx-2 text-white/30">·</span>
                <span>
                  {stackFlat.find((t) => t.name === hovered)?.why}
                </span>
              </motion.div>
            ) : (
              <motion.span
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-xs uppercase tracking-[0.22em] text-white/30"
              >
                Hover any tool for the why
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Infinite logo marquee */}
        <div className="mt-12 -mx-6 md:-mx-10 lg:-mx-16 overflow-hidden border-y border-white/[0.06] bg-white/[0.015]">
          <div className="flex w-[200%] animate-marquee items-center gap-12 py-6 whitespace-nowrap">
            {[...stackFlat, ...stackFlat].map((tool, i) => (
              <div key={i} className="flex shrink-0 items-center gap-3 px-2 opacity-65 hover:opacity-100 transition-opacity">
                <SmartImage
                  sources={[tool.logo]}
                  alt={tool.name}
                  className="h-6 w-6"
                  imgClassName="h-6 w-6 object-contain"
                />
                <span className="text-base md:text-lg font-medium tracking-tight text-white/85">
                  {tool.name}
                </span>
                <span className="text-accent-lime/70">/</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
