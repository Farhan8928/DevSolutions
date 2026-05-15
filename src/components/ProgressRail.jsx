import { useEffect, useState } from 'react'

const sections = [
  { id: 'top', label: '00 / Intro' },
  { id: 'services', label: '01 / Services' },
  { id: 'work', label: '02 / Work' },
  { id: 'process', label: '03 / Process' },
  { id: 'stack', label: '04 / Stack' },
  { id: 'contact', label: '05 / Contact' }
]

export default function ProgressRail() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <aside
      aria-hidden
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className="space-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <li key={s.id} className="flex items-center justify-end gap-3">
              <span
                className={`transition-opacity duration-300 ${
                  isActive ? 'opacity-100 text-white' : 'opacity-40 text-white/60'
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block h-px transition-all duration-500 ${
                  isActive ? 'w-12 bg-accent-lime' : 'w-5 bg-white/30'
                }`}
              />
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
