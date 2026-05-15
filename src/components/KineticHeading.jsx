import { motion } from 'framer-motion'

/**
 * Splits children into letters and animates them in with a stagger.
 * Letters wrap naturally at the word level — never forces a single line,
 * so it stays bulletproof on every viewport.
 */
export default function KineticHeading({
  lines = [],          // array of { text, highlight?: boolean }
  className = '',
  delay = 0
}) {
  let i = 0
  return (
    <h1 className={`display-hero ${className}`} aria-label={lines.map((l) => l.text).join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.text.split(' ').map((w, wi, words) => (
            <span key={wi} className="inline-block">
              {Array.from(w).map((c, ci) => {
                const idx = i++
                return (
                  <span key={ci} className="relative inline-block overflow-hidden align-baseline">
                    <motion.span
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: delay + idx * 0.022,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className={`inline-block ${line.highlight ? 'gradient-text' : ''}`}
                    >
                      {c}
                    </motion.span>
                  </span>
                )
              })}
              {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
