import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x, ty = y

    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const enter = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        el.classList.add('hovered')
      }
    }
    const leave = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        el.classList.remove('hovered')
      }
    }

    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enter)
    document.addEventListener('mouseout', leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enter)
      document.removeEventListener('mouseout', leave)
    }
  }, [])

  return <div ref={ref} className="cursor-dot" aria-hidden />
}
