import { motion } from 'framer-motion'

// Splits children words/letters and animates them in with a stagger from below.
export default function KineticHeading({
  text,
  highlight = '',
  className = '',
  delay = 0
}) {
  const words = text.split(' ')
  let charIndex = 0

  return (
    <h1 className={`display ${className}`} aria-label={text + ' ' + highlight}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {Array.from(w).map((c, ci) => {
            const i = charIndex++
            return (
              <span key={ci} className="relative inline-block overflow-hidden align-baseline">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: delay + i * 0.025,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
      {highlight && (
        <span className="block">
          {Array.from(highlight).map((c, i) => (
            <span key={i} className="relative inline-block overflow-hidden align-baseline">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: delay + (charIndex + i) * 0.025,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block gradient-text"
              >
                {c === ' ' ? '\u00A0' : c}
              </motion.span>
            </span>
          ))}
        </span>
      )}
    </h1>
  )
}
