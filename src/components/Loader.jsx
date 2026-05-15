import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      p += Math.random() * 14 + 6
      if (p >= 100) {
        p = 100
        clearInterval(id)
        setProgress(100)
        setTimeout(() => setDone(true), 350)
      } else {
        setProgress(Math.floor(p))
      }
    }, 110)
    return () => clearInterval(id)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="container-x flex flex-col items-stretch gap-10">
            <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span>DevSolutions</span>
              <span>Booting · MMXXVI</span>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="display text-[14vw] md:text-[10vw] leading-[0.9] tracking-tight"
              >
                Engineering <span className="gradient-text">premium</span> products.
              </motion.h2>
            </div>

            <div className="flex items-center justify-between gap-6">
              <div className="relative h-[2px] flex-1 overflow-hidden bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent-lime"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <span className="font-mono text-sm tabular-nums text-white/60">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
