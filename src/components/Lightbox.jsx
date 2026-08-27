import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { ctaFor, addressFor } from '../data/projects.js'
import KindIcon from './KindIcon.jsx'

/**
 * Full-screen lightbox showing a single project's screenshot at full size.
 * ESC or backdrop-click to close.
 */
export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] grid place-items-center bg-ink-950/80 backdrop-blur-md p-3 sm:p-6 md:p-10"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl rounded-2xl border border-white/10 bg-ink-900 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-ink-950/90 px-3 sm:px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-2 sm:ml-3 inline-flex min-w-0 items-center gap-1.5 truncate font-mono text-[11px] sm:text-xs text-white/55">
                <KindIcon kind={project.kind} size={12} />
                <span className="truncate">{addressFor(project)}</span>
              </span>

              <a
                href={ctaFor(project).href}
                {...(ctaFor(project).external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                onClick={ctaFor(project).external ? undefined : onClose}
                className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs text-white/85 hover:border-accent-lime/50 hover:text-accent-lime transition"
              >
                <span className="hidden sm:inline">{ctaFor(project).label}</span>
                <span className="sm:hidden">{ctaFor(project).short}</span>
                <ArrowUpRight size={12} />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="ml-2 grid h-8 w-8 sm:h-7 sm:w-7 place-items-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.16] text-white"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* Image */}
            <div className="bg-ink-800 grid place-items-center">
              <img
                src={project.local}
                alt={`${project.title} — full preview`}
                className="block h-auto w-full max-h-[68vh] sm:max-h-[72vh] object-contain"
              />
            </div>

            {/* Footer meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-ink-950/90 px-4 sm:px-5 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/55">
                  {project.domain} · {project.year}
                </p>
                <p className="font-medium text-white truncate">{project.title}</p>
              </div>
              <ul className="hidden sm:flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
