import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' }
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'pt-3' : 'pt-6'
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between rounded-full border border-white/10 px-4 md:px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? 'bg-ink-900/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.35)]'
              : 'bg-ink-900/30 backdrop-blur-md'
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-lime text-ink-950 font-bold">
              D
            </span>
            <span className="text-sm md:text-base font-semibold tracking-tight">
              DevSolutions
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-white/70 transition hover:text-white hover:bg-white/[0.05]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white text-ink-950 px-4 py-2 text-sm font-medium hover:bg-accent-lime transition-colors"
            >
              Start a project <ArrowUpRight size={14} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-3 rounded-3xl border border-white/10 bg-ink-900/95 backdrop-blur-xl p-3"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3.5 text-base text-white/85 hover:bg-white/[0.05] active:bg-white/[0.08]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-between rounded-2xl bg-accent-lime px-4 py-3.5 text-ink-950 font-medium"
              >
                Start a project <ArrowUpRight size={16} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
