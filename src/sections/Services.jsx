import { motion } from 'framer-motion'
import {
  Code2, Workflow, ShoppingBag, ShieldCheck, Smartphone, Layers, Sparkles, ArrowUpRight
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 border-t border-white/[0.06]">
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
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.06] border border-white/10">
                  <Code2 size={22} className="text-accent-lime" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">Flagship</span>
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

          {/* CRM */}
          <Tile
            i={1} className="md:col-span-2"
            icon={Workflow} label="Custom CRM"
            body="Lead capture from Meta, websites and manual sources. Role‑based routing across telecaller, advisor, processing, admin."
            chips={['Meta API', 'RBAC', 'Reporting']}
          />

          {/* Fintech */}
          <Tile
            i={2} className="md:col-span-2"
            icon={ShieldCheck} label="Fintech & Forex"
            body="Trader‑grade dashboards, KYC, payments and direct integrations with MT5 and broker platforms."
            chips={['MT5', 'KYC', 'Realtime']}
          />

          {/* E-commerce */}
          <Tile
            i={3} className="md:col-span-2"
            icon={ShoppingBag} label="E‑commerce"
            body="Headless Shopify and custom CMS storefronts with bespoke merchandising and checkout flows."
            chips={['Shopify', 'Custom CMS', 'CRO']}
          />

          {/* Mobile */}
          <Tile
            i={4} className="md:col-span-2"
            icon={Smartphone} label="Mobile apps"
            body="Cross‑platform iOS and Android with React Native — fast launches without compromising native feel."
            chips={['React Native', 'Native modules']}
          />

          {/* Design systems */}
          <Tile
            i={5} className="md:col-span-2"
            icon={Layers} label="Design systems"
            body="Reusable component libraries, tokens and Figma → code pipelines that keep teams shipping consistently."
            chips={['Tokens', 'Storybook']}
          />

          {/* Engagement model — wide tile */}
          <motion.article
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} custom={6}
            className="card relative md:col-span-6 overflow-hidden p-7 md:p-9"
          >
            <div className="grid gap-6 md:grid-cols-12 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-white/50">
                  <Sparkles size={14} className="text-accent-lime" />
                  Engagement model
                </div>
                <h3 className="display-lg mt-4">
                  Fixed‑scope sprints, monthly retainers, or fully embedded teams — pick the model that fits your roadmap.
                </h3>
              </div>
              <div className="md:col-span-5 grid grid-cols-3 gap-3 text-sm">
                {[
                  { k: 'Sprint', v: '2–6 wks' },
                  { k: 'Retainer', v: 'Monthly' },
                  { k: 'Embedded', v: 'Quarterly' }
                ].map((m) => (
                  <div key={m.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">{m.k}</p>
                    <p className="mt-2 text-white">{m.v}</p>
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

function Tile({ icon: Icon, label, body, chips, className = '', i = 0 }) {
  return (
    <motion.article
      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} custom={i}
      className={`card group relative overflow-hidden p-6 md:p-7 hover:border-white/20 transition ${className}`}
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-violet/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.05] border border-white/10">
          <Icon size={18} className="text-accent-lime" />
        </div>
        <span className="font-mono text-xs text-white/40">0{i}</span>
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight">{label}</h3>
      <p className="mt-2 text-white/65 leading-relaxed text-sm">{body}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {chips.map((c) => (<li key={c} className="chip">{c}</li>))}
      </ul>
      <div className="mt-5 flex items-center gap-2 text-sm text-white/45 group-hover:text-accent-lime transition">
        Learn more <ArrowUpRight size={14} />
      </div>
    </motion.article>
  )
}
