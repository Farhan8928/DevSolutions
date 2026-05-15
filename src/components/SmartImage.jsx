import { useEffect, useRef, useState } from 'react'

/**
 * Walks a fallback chain on error so a broken/missing source never shows.
 * Sources are tried in order. While loading, an opacity fade-in is applied.
 *
 * Usage:
 *   <SmartImage sources={[shot, logo, favicon]} alt="..." />
 */
export default function SmartImage({
  sources = [],
  alt = '',
  className = '',
  imgClassName = 'h-full w-full object-cover',
  fallback = null
}) {
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setIdx(0)
    setLoaded(false)
  }, [sources.join('|')])

  const src = sources[idx]
  const exhausted = idx >= sources.length

  if (!src && exhausted) return fallback

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-white/[0.04]" aria-hidden />
      )}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (idx < sources.length - 1) {
            setIdx((v) => v + 1)
            setLoaded(false)
          } else {
            setIdx(sources.length) // exhausted
          }
        }}
        className={`${imgClassName} transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
