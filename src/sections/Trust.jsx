import { motion } from 'framer-motion'
import {
  ShieldCheck, MessageCircle, Mail, MapPin, BadgeCheck,
  Clock, Lock, Award
} from 'lucide-react'

const clients = [
  'Remesleep', 'Humane Warriors', 'Howl', 'Benzer World',
  'ChainThat', 'Baker & Co', 'EliteFX', 'AutoPart'
]

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
      className="relative border-t border-white/[0.06] py-20 md:py-28 overflow-hidden"
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

        {/* Logo wall */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          {clients.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="group flex h-24 items-center justify-center bg-ink-950/80 px-4 transition hover:bg-ink-900"
            >
              <span className="display-lg text-white/55 transition group-hover:text-white">
                {c}
              </span>
            </motion.div>
          ))}
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
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-accent-lime/30 to-accent-violet/30 text-2xl font-semibold border border-white/10">
                F
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-mono">Founder</p>
                <p className="text-lg font-semibold">Farhan · DevSolutions</p>
              </div>
            </div>

            <p className="mt-6 text-white/75 leading-relaxed">
              “You will talk to me directly through every sprint. No account
              managers, no offshore relays. If we miss a deadline, the next sprint
              is on us.”
            </p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://wa.me/"
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
                href="mailto:hello@devsolutions.dev"
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
              Mumbai, India · serving teams worldwide
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

        {/* Industries strip */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <div className="flex items-center gap-3 text-sm text-white/65">
            <ShieldCheck size={16} className="text-accent-lime" />
            Industries we’ve shipped in
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['Healthcare', 'Forex / Fintech', 'E‑commerce', 'NGO', 'InsurTech', 'Visa CRM', 'Automotive'].map((it) => (
              <span key={it} className="chip">{it}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
