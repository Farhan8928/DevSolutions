import { motion } from 'framer-motion'
import { Sparkles, ArrowUpRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-32 border-t border-white/[0.06]">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">01 — What we do</span>
            <h2 className="display-xl mt-4">
              Services with the <span className="gradient-text">depth of a team,</span>
              <br className="hidden md:block" />
              the speed of a studio.
            </h2>
          </div>
          <p className="md:max-w-sm text-white/65">
            We move from problem to product with one tight team — no handoffs, no agency theatre.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {/* Headline tile */}
          <motion.article
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} custom={0}
            className="card relative md:col-span-4 md:row-span-2 overflow-hidden p-8 md:p-10"
          >
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent-violet/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-lime/15 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="flex items-start justify-between">
                {/* Custom svg glyph: braces — represents engineering */}
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <svg viewBox="0 0 32 32" className="h-6 w-6 text-accent-lime" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 6c-3 0-4 1-4 4v2c0 2-1 3-3 3v2c2 0 3 1 3 3v2c0 3 1 4 4 4" />
                    <path d="M21 6c3 0 4 1 4 4v2c0 2 1 3 3 3v2c-2 0-3 1-3 3v2c0 3-1 4-4 4" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                  Flagship · 01
                </span>
              </div>
              <div>
                <h3 className="display-xl">Web platforms <span className="gradient-text">built to convert.</span></h3>
                <p className="mt-4 max-w-xl text-white/70 leading-relaxed">
                  Marketing sites, dashboards and SaaS products on React, Next.js and modern stacks. Pixel‑precise, accessible, and fast on real networks.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {['Next.js / Vite', 'Headless CMS', 'Edge / Vercel', 'Lighthouse 95+'].map((t) => (
                    <li key={t} className="chip">{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>

          <Tile
            n="02" className="md:col-span-2"
            label="Custom CRM"
            body="Lead capture from Meta, websites and manual sources. Role‑based routing across telecaller, advisor, processing, admin."
            chips={['Meta API', 'RBAC', 'Reporting']}
            glyph={
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="16" cy="9" r="3" />
                <path d="M9 23c0-3 3-6 7-6s7 3 7 6" />
                <path d="M4 26c1-2 3-3 6-3" />
                <path d="M28 26c-1-2-3-3-6-3" />
              </svg>
            }
          />

          <Tile
            n="03" className="md:col-span-2"
            label="Fintech & Forex"
            body="Trader‑grade dashboards, KYC, payments and direct integrations with MT5 and broker platforms."
            chips={['MT5', 'KYC', 'Realtime']}
            glyph={
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M5 22l5-7 5 4 6-9 6 8" />
                <circle cx="10" cy="15" r="1.5" fill="currentColor" />
                <circle cx="21" cy="10" r="1.5" fill="currentColor" />
              </svg>
            }
          />

          <Tile
            n="04" className="md:col-span-2"
            label="E‑commerce"
            body="Headless Shopify and custom CMS storefronts with bespoke merchandising and checkout flows."
            chips={['Shopify', 'Custom CMS', 'CRO']}
            glyph={
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M5 9h22l-2 14H7L5 9z" />
                <path d="M11 9V6a5 5 0 0110 0v3" />
              </svg>
            }
          />

          <Tile
            n="05" className="md:col-span-2"
            label="Mobile apps"
            body="Cross‑platform iOS and Android with React Native — fast launches without compromising native feel."
            chips={['React Native', 'Native modules']}
            glyph={
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="9" y="4" width="14" height="24" rx="3" />
                <path d="M14 24h4" />
              </svg>
            }
          />

          <Tile
            n="06" className="md:col-span-2"
            label="Design systems"
            body="Reusable component libraries, tokens and Figma → code pipelines that keep teams shipping consistently."
            chips={['Tokens', 'Storybook']}
            glyph={
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="5" y="5" width="9" height="9" rx="1.5" />
                <rect x="18" y="5" width="9" height="9" rx="1.5" />
                <rect x="5" y="18" width="9" height="9" rx="1.5" />
                <rect x="18" y="18" width="9" height="9" rx="1.5" />
              </svg>
            }
          />

          {/* Engagement model — wide tile */}
          <motion.article
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} custom={6}
            className="card relative md:col-span-6 overflow-hidden p-6 md:p-9"
          >
            <div className="absolute -top-20 right-10 h-48 w-48 rounded-full bg-accent-lime/10 blur-3xl" aria-hidden />

            <div className="grid gap-6 md:grid-cols-12 items-center">
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-white/50">
                  <Sparkles size={14} className="text-accent-lime" />
                  Engagement model
                </div>
                <h3 className="display-lg mt-4">
                  Sprint, retainer, or embedded — we shape to your roadmap.
                </h3>
              </div>

              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { k: 'Sprint',   v: '2–6 wks', d: 'Fixed scope', from: 'from $8k' },
                  { k: 'Retainer', v: 'Monthly', d: 'Always-on team', from: 'from $12k/mo', highlight: true },
                  { k: 'Embedded', v: 'Quarterly', d: 'Inside your team', from: 'from $30k/qtr' }
                ].map((m) => (
                  <div
                    key={m.k}
                    className={`relative rounded-2xl border p-4 ${
                      m.highlight
                        ? 'border-accent-lime/50 bg-accent-lime/[0.04]'
                        : 'border-white/10 bg-white/[0.03]'
                    }`}
                  >
                    {m.highlight && (
                      <span className="absolute -top-2 right-3 rounded-full bg-accent-lime px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.22em] text-ink-950">
                        Popular
                      </span>
                    )}
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{m.k}</p>
                    <p className="display-lg mt-2">{m.v}</p>
                    <p className="mt-1 text-xs text-white/55">{m.d}</p>
                    <p className="mt-3 text-sm text-white/85">{m.from}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

function Tile({ n, label, body, chips, glyph, className = '' }) {
  return (
    <motion.article
      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} custom={Number(n)}
      className={`card group relative overflow-hidden p-6 md:p-7 hover:border-white/20 transition ${className}`}
    >
      {/* Hover glow */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-violet/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top row: oversized numeral + custom glyph */}
      <div className="flex items-center justify-between">
        <span className="display-xl text-white/85 leading-none">{n}</span>
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-lime">
          {glyph}
        </span>
      </div>

      <h3 className="mt-7 text-lg font-semibold tracking-tight">{label}</h3>
      <p className="mt-2 text-white/65 leading-relaxed text-sm">{body}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {chips.map((c) => (<li key={c} className="chip">{c}</li>))}
      </ul>

      {/* Lime hairline at the bottom on hover */}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-accent-lime transition-all duration-500 group-hover:w-full" aria-hidden />
    </motion.article>
  )
}
