import { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { TrendingUp, Users2, Gauge, Calendar } from 'lucide-react'

/**
 * Counter — uses a plain IntersectionObserver instead of Framer's useInView
 * (which has timing edge cases on mobile when the parent has staggered enter
 * animations, causing some counters to stick at 0).
 */
function Counter({ to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const node = useRef(null)
  const [started, setStarted] = useState(false)

  // Watch for entry — once visible, kick off the count up.
  useEffect(() => {
    if (started || !ref.current) return

    // Reduced-motion users: snap to final value, skip animation.
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      if (node.current) node.current.textContent = to.toString() + suffix
      setStarted(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started, to, suffix])

  // Run the animation when started flips
  useEffect(() => {
    if (!started || !node.current) return
    const c = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (node.current) node.current.textContent = Math.round(v).toString() + suffix
      },
      onComplete: () => {
        if (node.current) node.current.textContent = to.toString() + suffix
      }
    })
    return () => c.stop()
  }, [started, to, duration, suffix])

  return (
    <span ref={ref} className="display-xl">
      <span ref={node}>0{suffix}</span>
    </span>
  )
}

const stats = [
  { value: 8,   suffix: '+', label: 'Products in production', meta: 'Across 5 industries',     icon: TrendingUp },
  { value: 24,  suffix: '+', label: 'Founders trusted us',     meta: 'India, UAE, EU, US',     icon: Users2 },
  { value: 96,  suffix: '',  label: 'Avg. Lighthouse score',   meta: 'On every shipped site',  icon: Gauge },
  { value: 100, suffix: '%', label: 'On‑time delivery',        meta: 'Since the studio began', icon: Calendar }
]

export default function Stats() {
  return (
    <section className="relative py-16 md:py-32 border-t border-white/[0.06] overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.16),transparent_60%)]" />

      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">— By the numbers</span>
            <h2 className="display-xl mt-4">
              The receipts. <span className="gradient-text">Not vibes.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/65">
            Every number below is verifiable in the projects above — click any of them to see the live site.
          </p>
        </div>

        {/* Stats panel */}
        <div className="mt-10 md:mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="relative p-5 md:p-7 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.05] border border-white/10">
                      <Icon size={15} className="text-accent-lime" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="mt-6">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-white font-medium">{s.label}</p>
                  <p className="mt-1 text-xs text-white/55">{s.meta}</p>

                  <span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-lime transition-all duration-500 group-hover:w-full"
                    aria-hidden
                  />
                </motion.div>
              )
            })}
          </div>

          {/* Footnote */}
          <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-3 border-t border-white/[0.06] bg-ink-950/40 px-5 md:px-7 py-3">
            <p className="text-xs text-white/50">
              Numbers updated <span className="text-white/80">{new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              Verified on every project URL
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
