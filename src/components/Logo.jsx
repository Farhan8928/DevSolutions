/**
 * DevSolutions brandmark.
 *
 * The mark is a single closed monoline path that reads two ways:
 *  - As a stylised "D" silhouette at small sizes (favicon, nav)
 *  - As an opening + closing angle bracket {<  >} at larger sizes
 *    — a custom code glyph specific to this studio.
 *
 * Pure SVG. Recolorable via `currentColor`. Works from 12px to 400px.
 */

export function LogoMark({ size = 36, className = '', strokeWidth = 2.4 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Square chassis */}
      <rect
        x="2.5" y="2.5"
        width="35" height="35"
        rx="9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Inner monogram: { D } —
          left bracket descending, vertical spine,
          right bracket ascending. Drawn as a single path. */}
      <path
        d="
          M14 12
          L11 14
          L11 26
          L14 28

          M14 12
          L18 12
          C24 12, 28 14, 28 20
          C28 26, 24 28, 18 28
          L14 28

          M26 12
          L29 14
          L29 26
          L26 28
        "
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

/**
 * Wordmark + mark together. Used in the navbar and footer.
 * Compact, intentional spacing.
 */
export function LogoLockup({
  size = 32,
  className = '',
  showWord = true,
  word = 'DevSolutions'
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="grid place-items-center rounded-xl bg-accent-lime text-ink-950"
        style={{ height: size, width: size }}
      >
        <LogoMark size={size * 0.62} strokeWidth={2.6} />
      </span>
      {showWord && (
        <span className="font-semibold tracking-tight text-white text-[0.95rem] sm:text-base">
          {word}
        </span>
      )}
    </span>
  )
}

export default LogoLockup
