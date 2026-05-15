import { useEffect, useRef } from 'react'

// Canvas dot grid that warps toward the cursor and on scroll. Cheap, 60fps.
export default function InteractiveDots() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0
    let dots = []
    let mouse = { x: -9999, y: -9999, active: false }
    const SPACING = 38
    const RADIUS = 1.2

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      dots = []
      for (let y = SPACING; y < h; y += SPACING) {
        for (let x = SPACING; x < w; x += SPACING) {
          dots.push({ x, y, ox: x, oy: y })
        }
      }
    }

    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      build()
    }
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999 }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        const dx = d.x - mouse.x
        const dy = d.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const force = mouse.active ? Math.max(0, 1 - dist / 220) : 0
        const tx = d.ox + (dx / (dist || 1)) * force * 32
        const ty = d.oy + (dy / (dist || 1)) * force * 32
        d.x += (tx - d.x) * 0.18
        d.y += (ty - d.y) * 0.18

        const a = 0.20 + force * 0.7
        const r = RADIUS + force * 1.6
        ctx.beginPath()
        ctx.fillStyle = force > 0.4
          ? `rgba(200,255,0,${a})`
          : `rgba(255,255,255,${a})`
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    build()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  )
}
