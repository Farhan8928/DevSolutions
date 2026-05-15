import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

function Counter({ to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const value = useMotionValue(0)
  const node = useRef(null)

  useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (node.current) node.current.textContent = Math.round(v).toString() + suffix
      }
    })
    return () => controls.stop()
  }, [inView, to, duration, suffix, value])

  return (
    <span ref={ref} className="display-xl">
      <span ref={node}>0{suffix}</span>
    </span>
  )
}

const stats = [
  { value: 8, suffix: '+', label: 'Products in production' },
  { value: 5, suffix: '', label: 'Industries served' },
  { value: 96, suffix: '', label: 'Avg. Lighthouse score' },
  { value: 100, suffix: '%', label: 'On‑time delivery' }
]

export default function Stats() {
  return (
    <section className="relative py-16 md:py-32 border-t border-white/[0.06] overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.18),transparent_60%)]" />
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="border-l border-white/10 pl-4 md:pl-6"
            >
              <Counter to={s.value} suffix={s.suffix} />
              <p className="mt-3 text-sm md:text-base text-white/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
