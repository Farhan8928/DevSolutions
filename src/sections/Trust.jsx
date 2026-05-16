import { motion } from 'framer-motion'
import {
  ShieldCheck, MessageCircle, Mail, MapPin, BadgeCheck,
  Clock, Lock, Award
} from 'lucide-react'
import { projects } from '../data/projects.js'
import { contact, studio, founders } from '../data/studio.js'
import SmartImage from '../components/SmartImage.jsx'

const guarantees = [
  {
    icon: BadgeCheck,
    title: 'Senior engineers only',
    body: 'No juniors hidden behind a brand. Every line of code is written by a senior engineer with 5+ years of production experience.'
  },
  {
    icon: Lock,
    title: 'NDA‑first, IP yours',
    body: 'We sign before discovery. Source code, designs and infra are 100% transferred to you on day one of go‑live.'
  },
  {
    icon: Clock,
    title: 'Weekly demo, fixed scope',
    body: 'You see working software every week. Sprints are scoped and priced upfront, no surprise invoices.'
  },
  {
    icon: Award,
    title: 'Two‑week post‑launch warranty',
    body: 'Free bug‑fixes for two weeks after go‑live, plus a clear handover to your in‑house team or our retainer.'
  }
]

export default function Trust() {
  return (
    <section
      id="trust"
      className="relative border-t border-white/[0.06] py-16 md:py-28 overflow-hidden"
    >
      <div className="container-x">
        {/* Top label row */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">— Trusted by founders worldwide</span>
            <h2 className="display-xl mt-4">
              Eight live products. <br className="hidden md:block" />
              <span className="gradient-text">Zero refunds, zero late deliveries.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/65">
            Founders from 5 industries trust DevSolutions to design, build and ship
            production software that earns revenue from week one.
          </p>
        </div>

        {/* Client logotype strip — single line, premium, no duplication of Work section */}
        <div className="mt-10 md:mt-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              {projects.length} live products · 5 industries
            </p>
            <a
              href="#work"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 hover:text-accent-lime transition"
            >
              See projects ↓
            </a>
          </div>

          <div className="relative -mx-6 md:-mx-10 lg:-mx-16 overflow-hidden border-y border-white/[0.06] bg-white/[0.015]">
            {/* Edge fades */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-ink-950 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-ink-950 to-transparent" />

            <div className="flex w-[200%] animate-marquee items-center gap-12 md:gap-16 py-7 md:py-9 whitespace-nowrap">
              {[...projects, ...projects].map((c, i) => (
                <a
                  key={i}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group inline-flex shrink-0 items-center gap-3 px-2 transition-opacity"
                >
                  <SmartImage
                    sources={[c.favicon, c.faviconRemote]}
                    alt=""
                    className="h-6 w-6 md:h-7 md:w-7"
                    imgClassName="h-6 w-6 md:h-7 md:w-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white/55 group-hover:text-white transition-colors">
                    {c.title.split(' — ')[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Founder + guarantees */}
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Founder card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="card relative overflow-hidden lg:col-span-5 p-6 md:p-8"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent-lime/15 blur-3xl" />

            <div className="flex items-center gap-4">
              {/* Stacked / overlapping avatar tiles — premium two-founder pattern */}
              <div className="flex -space-x-3">
                {founders.map((f, i) => (
                  <span
                    key={f.name}
                    className={`grid h-14 w-14 place-items-center rounded-2xl border border-ink-900 text-base font-semibold ring-1 ring-white/10 ${
                      i === 0
                        ? 'bg-gradient-to-br from-accent-lime/40 to-accent-lime/10 text-ink-950'
                        : 'bg-gradient-to-br from-accent-violet/40 to-accent-violet/10 text-white'
                    }`}
                    title={f.name}
                  >
                    {f.initials}
                  </span>
                ))}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-mono">
                  Co‑founders · {studio.city}
                </p>
                <p className="text-base md:text-lg font-semibold leading-tight">
                  {founders.map((f) => f.name).join(' · ')}
                </p>
              </div>
            </div>

            {/* Per-founder one-liner roles */}
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {founders.map((f) => (
                <li
                  key={f.name}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-semibold text-white/85">
                    {f.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{f.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45 leading-snug">
                      {f.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-white/75 leading-relaxed">
              “You will talk to one of us directly through every sprint. No
              account managers, no offshore relays. If we miss a deadline, the
              next sprint is on us.”
            </p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-accent-lime/40 transition"
              >
                <span className="inline-flex items-center gap-2.5 text-sm">
                  <MessageCircle size={16} className="text-accent-lime" />
                  WhatsApp
                </span>
                <span className="font-mono text-xs text-white/55">Direct</span>
              </a>
              <a
                href={contact.mailto}
                data-cursor="hover"
                className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-accent-lime/40 transition"
              >
                <span className="inline-flex items-center gap-2.5 text-sm">
                  <Mail size={16} className="text-accent-lime" />
                  Email
                </span>
                <span className="font-mono text-xs text-white/55">&lt;1 day</span>
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-white/50">
              <MapPin size={12} className="text-accent-lime" />
              {studio.city}, {studio.country} · serving teams worldwide
            </div>
          </motion.div>

          {/* Guarantees grid */}
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {guarantees.map((g, i) => {
              const Icon = g.icon
              return (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="card p-5 md:p-6"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] border border-white/10">
                    <Icon size={16} className="text-accent-lime" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{g.title}</h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">{g.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
