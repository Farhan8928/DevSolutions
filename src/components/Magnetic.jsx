import { useRef } from 'react'

// Lightweight magnetic wrapper. Children get pulled toward the cursor when hovered.
export default function Magnetic({ children, strength = 28, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </span>
  )
}
