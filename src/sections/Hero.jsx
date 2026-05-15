import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, Star } from 'lucide-react'
import KineticHeading from '../components/KineticHeading.jsx'
import InteractiveDots from '../components/InteractiveDots.jsx'
import Magnetic from '../components/Magnetic.jsx'
import RotatingStamp from '../components/RotatingStamp.jsx'

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-16 md:pb-24 grain overflow-hidden">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <InteractiveDots />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[1100px] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.22),transparent_60%)] blur-3xl animate-aurora" />
        <div className="absolute top-40 left-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.16),transparent_60%)] blur-3xl animate-float" />
        <div className="absolute -bottom-20 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,92,138,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(6,7,10,0.4)_70%,#06070A)]" />
      </div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime animate-pulse" />
            Booking Q3 2026
          </span>
          <span className="chip">
            <Star size={12} className="text-accent-lime" /> 8 products shipped this year
          </span>
          <span className="chip">Remote · India · UAE</span>
        </motion.div>

        <div className="mt-8">
          <KineticHeading
            text="We build digital"
            highlight="products that scale."
            delay={0.6}
            className="text-[12vw] md:text-[7.5rem] lg:text-[9rem]"
          />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="md:col-span-6 max-w-xl text-lg md:text-xl text-white/70 leading-relaxed"
          >
            DevSolutions is a small, senior engineering studio. We design and ship
            premium web, mobile and CRM products across healthcare, fintech, e‑commerce
            and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="md:col-span-6 flex flex-wrap items-center gap-3 md:justify-end"
          >
            <Magnetic strength={36}>
              <a href="#contact" className="btn-primary text-base">
                <Sparkles size={16} /> Start a project <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic strength={20}>
              <a href="#work" className="btn-ghost">See selected work</a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Hero panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 grid gap-4 md:grid-cols-12 relative"
        >
          {/* Stamp anchor */}
          <div className="hidden md:block absolute -top-14 right-2 h-32 w-32 z-10">
            <RotatingStamp className="h-full w-full" />
          </div>

          <div className="card ring-glow md:col-span-8 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(200,255,0,0.08),transparent_60%)]" />
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="ml-3">~/devsolutions/manifest.ts</span>
            </div>
            <pre className="mt-5 overflow-x-auto text-sm md:text-[15px] leading-relaxed font-mono text-white/85">
{`export const studio = {
  name:    "DevSolutions",
  shipped: ["healthcare", "fintech", "ecommerce", "ngo", "automotive"],
  stack:   ["React", "Vite", "Next.js", "Node", "PostgreSQL", "MT5"],
  promise: "Pixel-precise. Measurable. Built to scale.",
}`}
            </pre>
          </div>

          <div className="md:col-span-4 grid gap-4">
            <div className="card p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50 font-mono">Live products</p>
              <p className="display mt-3 text-5xl">8+</p>
              <p className="mt-2 text-sm text-white/60">In production across 5 industries.</p>
            </div>
            <div className="card p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50 font-mono">Avg. lighthouse</p>
              <p className="display mt-3 text-5xl">96</p>
              <p className="mt-2 text-sm text-white/60">Performance score on shipped sites.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom scrolling hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="container-x mt-16 flex items-center justify-between text-xs font-mono uppercase tracking-[0.22em] text-white/45"
      >
        <span>↓ Scroll to explore</span>
        <span className="hidden md:inline">N 19.07° · E 72.87° · MUMBAI</span>
        <span>v1.0 · {new Date().getFullYear()}</span>
      </motion.div>
    </section>
  )
}
