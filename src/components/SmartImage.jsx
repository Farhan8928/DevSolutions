import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Walks a fallback chain on error so a broken/missing source never shows.
 * Sources are tried in order. If a source loads but the image is suspiciously
 * tiny (a placeholder, e.g. mShots' "still generating" gray frame), the
 * component will retry once after a short delay before moving to the next.
 *
 * Cache-aware: handles the React + cached-image race condition properly.
 *
 * Pattern reference (top-voted SO answers, react/img cache race):
 *  - https://stackoverflow.com/q/39777833
 *  - https://stackoverflow.com/q/12354865
 *
 * The fix is a ref callback (not useEffect) — the cached-state check happens
 * synchronously during commit, before the browser paints. useEffect-based
 * checks introduce a one-frame flicker on cached images.
 */
export default function SmartImage({
  sources = [],
  alt = '',
  className = '',
  imgClassName = 'h-full w-full object-cover',
  retryDelay = 2200,
  maxRetries = 4,
  fallback = null
}) {
  const [idx, setIdx] = useState(0)
  const [retry, setRetry] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // Reset state when the source list changes
  useEffect(() => {
    setIdx(0)
    setRetry(0)
    setLoaded(false)
  }, [sources.join('|')])

  const baseSrc = sources[idx]
  const exhausted = idx >= sources.length
  const src = baseSrc
    ? retry === 0
      ? baseSrc
      : `${baseSrc}${baseSrc.includes('?') ? '&' : '?'}_r=${retry}`
    : null

  const evaluate = useCallback((img) => {
    if (!img) return
    const w = img.naturalWidth || 0
    const h = img.naturalHeight || 0

    // Only treat the image as a placeholder if the source is from mShots
    // (the "still generating" gray frame is 400x300). Local images are
    // never placeholders.
    const fromMshots = typeof src === 'string' && src.includes('s.wordpress.com/mshots')
    const looksPlaceholder =
      fromMshots && w > 0 && h > 0 && w <= 410 && h <= 320 && Math.abs(w / h - 4 / 3) < 0.2

    if (looksPlaceholder && retry < maxRetries) {
      setLoaded(false)
      setTimeout(() => setRetry((v) => v + 1), retryDelay)
      return
    }
    setLoaded(true)
  }, [src, retry, retryDelay, maxRetries])

  const advanceToNextSource = useCallback(() => {
    if (idx < sources.length - 1) {
      setIdx((v) => v + 1)
      setRetry(0)
      setLoaded(false)
    } else {
      setIdx(sources.length)
    }
  }, [idx, sources.length])

  // Ref callback runs synchronously during commit. If the image is already
  // loaded (cache hit), we set loaded=true in the same render — no flicker.
  // If it's not yet loaded, we attach native listeners as a backup to the
  // React onLoad handler, which protects against any synthetic-event race.
  const refCallback = useCallback((img) => {
    if (!img) return

    if (img.complete && img.naturalWidth > 0) {
      // Image was already in cache — flip loaded immediately
      evaluate(img)
      return
    }

    // Image is loading — also attach native listeners as a safety net
    const onLoad = () => evaluate(img)
    const onError = () => advanceToNextSource()
    img.addEventListener('load', onLoad)
    img.addEventListener('error', onError)
    // No cleanup needed: when src changes, the <img key={src}> remounts,
    // so the old element's listeners go with it.
  }, [evaluate, advanceToNextSource])

  if (!src && exhausted) return fallback

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-white/[0.04]" aria-hidden />
      )}
      <img
        ref={refCallback}
        key={src}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => evaluate(e.currentTarget)}
        onError={advanceToNextSource}
        className={`${imgClassName} transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
