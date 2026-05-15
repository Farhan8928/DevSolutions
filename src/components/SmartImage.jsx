import { useEffect, useRef, useState } from 'react'

/**
 * Walks a fallback chain on error so a broken/missing source never shows.
 * Sources are tried in order. If a source loads but the image is suspiciously
 * tiny (a placeholder, e.g. mShots' "still generating" gray frame), the
 * component will retry once after a short delay before moving to the next.
 *
 * Usage:
 *   <SmartImage sources={[shot, shot2, logo, favicon]} alt="..." />
 */
export default function SmartImage({
  sources = [],
  alt = '',
  className = '',
  imgClassName = 'h-full w-full object-cover',
  placeholderTreshold = 8000, // bytes-ish; below this we suspect a placeholder
  retryDelay = 2200,
  maxRetries = 4,
  fallback = null
}) {
  const [idx, setIdx] = useState(0)
  const [retry, setRetry] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setIdx(0)
    setRetry(0)
    setLoaded(false)
  }, [sources.join('|')])

  const baseSrc = sources[idx]
  const exhausted = idx >= sources.length
  // Cache-busting param used only on retries so the browser refetches
  const src = baseSrc
    ? retry === 0
      ? baseSrc
      : `${baseSrc}${baseSrc.includes('?') ? '&' : '?'}_r=${retry}`
    : null

  if (!src && exhausted) return fallback

  const onLoad = (e) => {
    const img = e.currentTarget
    const w = img.naturalWidth || 0
    const h = img.naturalHeight || 0
    // mShots placeholder is 400x300, Clearbit logo can be tiny — keep tiny logos.
    // Only treat as placeholder if it's a very small "screenshot-shaped" image.
    const looksPlaceholder =
      w > 0 && h > 0 && w <= 410 && h <= 320 && Math.abs(w / h - 4 / 3) < 0.2

    if (looksPlaceholder && retry < maxRetries) {
      setLoaded(false)
      setTimeout(() => setRetry((v) => v + 1), retryDelay)
      return
    }
    setLoaded(true)
  }

  const onError = () => {
    if (idx < sources.length - 1) {
      setIdx((v) => v + 1)
      setRetry(0)
      setLoaded(false)
    } else {
      setIdx(sources.length) // exhausted
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-white/[0.04]" aria-hidden />
      )}
      <img
        ref={ref}
        key={src} /* force remount when we change sources or retry */
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={onLoad}
        onError={onError}
        className={`${imgClassName} transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
