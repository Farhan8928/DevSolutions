import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Razor-thin scroll progress bar at the very top of the page.
 * Stripe and Linear both use this — it's a quiet premium signal.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-accent-lime via-accent-violet to-accent-lime"
      aria-hidden
    />
  )
}
