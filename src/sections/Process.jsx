import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, PenTool, Code2, Rocket, ArrowRight
} from 'lucide-react'

const phases = [
  {
    n: '01',
    title: 'Discover',
    icon: Search,
    duration: '~1 week',
    summary:
      'We sit with the problem. Stakeholder interviews, audits, competitive teardowns, and a clear scope before a single pixel moves.',
    deliverables: [
      'Discovery brief',
      'Competitive audit',
      'Tech feasibility memo',
      'Scoped sprint plan'
    ]
  },
  {
    n: '02',
    title: 'Design',
    icon: PenTool,
    duration: '2–3 weeks',
    summary:
      'High‑fidelity flows, prototypes and a design system tuned to your brand. We test ideas in days, not months.',
    deliverables: [
      'Brand & component system',
      'Hi‑fi Figma prototypes',
      'Motion + interaction spec',
      'A/B-tested hero variants'
    ]
  },
  {
    n: '03',
    title: 'Build',
    icon: Code2,
    duration: '4–8 weeks',
    summary:
      'Production engineering with React, Vite and Node. Type‑safe, observable, deployable from day one.',
    deliverables: [
      'Production codebase',
      'Weekly working demo',
      'CI/CD on day one',
      'Test + analytics in place'
    ]
  },
  {
    n: '04',
    title: 'Launch & evolve',
    icon: Rocket,
    duration: 'Ongoing',
    summary:
      'Phased launches, analytics, weekly iteration. We stay in the trenches after go‑live.',
    deliverables: [
      'Soft → public rollout',
      '2‑week post‑launch warranty',
      'Weekly improvement sprint',
      'Quarterly review'
    ]
  }
]

export default function Process() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('[data-phase]')
    if (!items) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number(e.target.getAttribute('data-index')))
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    items.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-16 md:py-32 border-t border-white/[0.06]"
    >
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">03 — How we work</span>
            <h2 className="display-xl mt-4">
              A process built for <span className="gradient-text">clarity & velocity.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/65">
            Four phases. Weekly demos. Fixed scope on every sprint, so you always know what you’re paying for.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky phase indicator (desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ol className="relative">
                <span className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" aria-hidden />
                {phases.map((p, i) => {
                  const Icon = p.icon
                  const isActive = active === i
                  return (
                    <li key={p.n} className="relative pl-12 py-3">
                      <span
                        className={`absolute left-0 top-3 grid h-8 w-8 place-items-center rounded-full border transition ${
                          isActive
                            ? 'border-accent-lime bg-accent-lime text-ink-950'
                            : 'border-white/15 bg-ink-900 text-white/55'
                        }`}
                      >
                        <Icon size={14} />
                      </span>
                      <p className={`font-mono text-[10px] uppercase tracking-[0.22em] transition ${
                        isActive ? 'text-accent-lime' : 'text-white/45'
                      }`}>
                        Phase {p.n} · {p.duration}
                      </p>
                      <p className={`display-lg mt-1 transition ${
                        isActive ? 'text-white' : 'text-white/40'
                      }`}>
                        {p.title}
                      </p>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                  Total typical engagement
                </p>
                <p className="display-lg mt-2">8–12 weeks</p>
                <p className="mt-2 text-sm text-white/60">
                  From signed brief to public launch, including soft rollout.
                </p>
              </div>
            </div>
          </aside>

          {/* Phase cards */}
          <ol className="lg:col-span-8 space-y-4">
            {phases.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.li
                  key={p.n}
                  data-phase
                  data-index={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 hover:border-white/20 transition"
                >
                  <div className="absolute -bottom-px left-0 h-px w-1/3 bg-gradient-to-r from-accent-lime to-transparent transition-all duration-500 group-hover:w-1/2" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.05] border border-white/10">
                        <Icon size={18} className="text-accent-lime" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                          Phase {p.n}
                        </p>
                        <h3 className="display-lg mt-0.5">{p.title}</h3>
                      </div>
                    </div>
                    <span className="chip shrink-0">{p.duration}</span>
                  </div>

                  <p className="mt-5 text-white/70 leading-relaxed max-w-prose">
                    {p.summary}
                  </p>

                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {p.deliverables.map((d) => (
                      <div
                        key={d}
                        className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
                      >
                        <ArrowRight size={12} className="text-accent-lime shrink-0" />
                        <span className="text-sm text-white/80">{d}</span>
                      </div>
                    ))}
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
