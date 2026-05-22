import { motion } from 'framer-motion'

// Big rotating brand stamp used at the hero seam — Awwwards-style anchor.
export default function RotatingStamp({ className = '' }) {
  const text = 'DUOSTACK · STUDIO · MMXXVI · '
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      className={`pointer-events-none relative grid place-items-center ${className}`}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <path id="stamp-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text className="fill-white/60 font-mono" style={{ fontSize: 14, letterSpacing: 4 }}>
          <textPath href="#stamp-circle">{text + text}</textPath>
        </text>
      </svg>
      <div className="absolute grid h-16 w-16 place-items-center rounded-full bg-accent-lime text-ink-950">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </motion.div>
  )
}
