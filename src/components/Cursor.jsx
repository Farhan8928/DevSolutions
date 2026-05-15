import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let dx = mx, dy = my
    let rx = mx, ry = my

    const move = (e) => { mx = e.clientX; my = e.clientY }
    const enter = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        ring.current?.classList.add('hovered')
      }
    }
    const leave = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        ring.current?.classList.remove('hovered')
      }
    }

    const tick = () => {
      dx += (mx - dx) * 0.55
      dy += (my - dy) * 0.55
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
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

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  )
}
