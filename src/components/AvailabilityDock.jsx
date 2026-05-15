import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

/**
 * Floating availability dock — appears after the user has scrolled past
 * the hero. Shows a live pulse + "Available now" + a one-tap WhatsApp link.
 * Dismissible. Premium agencies (chipsa, framer) all use a variation.
 */
export default function AvailabilityDock() {
  const [show, setShow] = useState(false)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    if (closed) return
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.6
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 600
      setShow(past && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [closed])

  return (
    <AnimatePresence>
      {show && !closed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/85 backdrop-blur-xl pl-1 pr-1 py-1 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            {/* Pulse */}
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-accent-lime animate-ping opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
            </span>

            <span className="text-xs sm:text-sm font-medium text-white">
              Available now
            </span>
            <span className="hidden sm:inline text-xs text-white/45 font-mono">
              · Booking Q3 2026
            </span>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-accent-lime px-3 py-1.5 text-xs font-medium text-ink-950 hover:-translate-y-0.5 transition-transform"
            >
              <MessageCircle size={12} />
              Chat
            </a>

            <button
              type="button"
              onClick={() => setClosed(true)}
              aria-label="Dismiss"
              className="grid h-7 w-7 place-items-center rounded-full text-white/40 hover:bg-white/[0.06] hover:text-white transition"
            >
              <X size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
