import { motion } from 'framer-motion'
import {
  ArrowUpRight, Sparkles, Star, ShieldCheck, Clock, MessageCircle
} from 'lucide-react'
import KineticHeading from '../components/KineticHeading.jsx'
import InteractiveDots from '../components/InteractiveDots.jsx'
import Magnetic from '../components/Magnetic.jsx'
import RotatingStamp from '../components/RotatingStamp.jsx'
import StudioStatusCard from '../components/StudioStatusCard.jsx'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-24 sm:pt-28 md:pt-36 pb-12 md:pb-20 grain overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <InteractiveDots />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[1100px] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.22),transparent_60%)] blur-3xl animate-aurora" />
        <div className="absolute top-40 left-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.16),transparent_60%)] blur-3xl animate-float" />
        <div className="absolute -bottom-20 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,92,138,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(6,7,10,0.4)_70%,#06070A)]" />
      </div>

      <div className="container-x">
        {/* Top meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center gap-2.5"
        >
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime animate-pulse" />
            Booking Q3 2026
          </span>
          <span className="chip">
            <Star size={12} className="text-accent-lime" /> 8 products shipped
          </span>
          <span className="chip hidden sm:inline-flex">Remote · India · UAE</span>
          <span className="chip hidden md:inline-flex">
            <ShieldCheck size={12} className="text-accent-lime" /> NDA‑first
          </span>
        </motion.div>

        {/* Headline (2 lines, fluid clamp, never overflows) */}
        <div className="mt-7">
          <KineticHeading
            delay={0.5}
            lines={[
              { text: 'Engineering studio' },
              { text: 'for premium products.', highlight: true }
            ]}
          />
        </div>

        {/* Sub copy + CTAs */}
        <div className="mt-8 grid gap-8 md:grid-cols-12 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="md:col-span-7 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed"
          >
            We design and ship web, mobile and CRM products for ambitious teams in
            <span className="text-white/90"> healthcare, fintech, e‑commerce, NGO, and automotive</span>.
            Senior engineers only — no handoffs, no agency theatre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="md:col-span-5 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 md:justify-end"
          >
            <Magnetic strength={28}>
              <a href="#contact" className="btn-primary text-sm md:text-base h-12 sm:h-auto px-6 sm:px-6 justify-center w-full sm:w-auto">
                <Sparkles size={16} /> Start a project <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic strength={16}>
              <a href="#work" className="btn-ghost text-sm md:text-base h-12 sm:h-auto px-6 justify-center w-full sm:w-auto">
                See selected work
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Inline trust strip — high impact, sits right under the CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-7 md:mt-8 grid grid-cols-2 sm:flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/70"
        >
          <span className="inline-flex items-center gap-2">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-accent-lime text-accent-lime" />
              ))}
            </span>
            <span><b className="text-white">5.0</b> rating</span>
          </span>
          <span className="hidden sm:inline-block h-4 w-px bg-white/15" />
          <span className="inline-flex items-center gap-2">
            <Clock size={14} className="text-accent-lime" />
            <span>Reply <b className="text-white">&lt;1 day</b></span>
          </span>
          <span className="hidden sm:inline-block h-4 w-px bg-white/15" />
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={14} className="text-accent-lime" />
            <span>100% on‑time</span>
          </span>
          <span className="hidden sm:inline-block h-4 w-px bg-white/15" />
          <a
            href="https://wa.me/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/85 hover:text-white"
          >
            <MessageCircle size={14} className="text-accent-lime" />
            WhatsApp
          </a>
        </motion.div>

        {/* Hero panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-14 grid gap-4 md:grid-cols-12 relative"
        >
          <div className="hidden lg:block absolute -top-12 right-2 h-28 w-28 z-10">
            <RotatingStamp className="h-full w-full" />
          </div>

          <div className="card ring-glow md:col-span-8 p-5 md:p-7 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(200,255,0,0.08),transparent_60%)]" />
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="ml-3 truncate">~/devsolutions/manifest.ts</span>
            </div>
            <pre className="mt-4 overflow-x-auto text-[12px] sm:text-sm md:text-[15px] leading-relaxed font-mono text-white/85">
{`export const studio = {
  name:    "DevSolutions",
  shipped: ["healthcare", "fintech", "ecommerce", "ngo", "automotive"],
  stack:   ["React", "Vite", "Next.js", "Node", "PostgreSQL", "MT5"],
  promise: "Pixel-precise. Measurable. Built to scale.",
}`}
            </pre>
          </div>

          <div className="md:col-span-4">
            <StudioStatusCard />
          </div>
        </motion.div>
      </div>

      {/* Bottom scrolling hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="container-x mt-12 flex flex-wrap items-center justify-between gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.22em] text-white/45"
      >
        <span>↓ Scroll to explore</span>
        <span className="hidden md:inline">N 19.07° · E 72.87° · MUMBAI</span>
        <span>v1.0 · {new Date().getFullYear()}</span>
      </motion.div>
    </section>
  )
}
