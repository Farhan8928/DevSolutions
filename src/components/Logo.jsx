/**
 * DevSolutions brandmark.
 *
 * Geometric "D" monogram in the studio brand colours. Construction is
 * mathematically pure on a 64-unit grid:
 *
 *   • Outer letterform : 18-tall vertical stem on the left, half-circle
 *                        bowl of radius 20 on the right.
 *   • Inner counter    : same construction inset by 8 units uniformly.
 *   • Fill rule        : evenodd, so the negative space punches through
 *                        cleanly at every scale.
 *
 * Identical path geometry to /public/favicon.svg, the OG image generator,
 * and scripts/generate-icons.mjs — every surface uses the same mark.
 *
 * Render modes:
 *   • default  — lime chassis + ink letterform (the brandmark)
 *   • bare     — lime letterform on transparent (for tinted/glass tiles
 *                like the footer copyright stamp where the chassis would
 *                read as a double background)
 */

const D_PATH =
  // Outer D
  'M 14 12 H 32 A 20 20 0 0 1 32 52 H 14 Z ' +
  // Inner counter (inset 8 on every edge)
  'M 22 20 H 32 A 12 12 0 0 1 32 44 H 22 Z'

export function LogoMark({ size = 36, className = '', bare = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="DevSolutions"
    >
      {!bare && (
        <rect width="64" height="64" rx="14" fill="#C8FF00" />
      )}
      <path
        d={D_PATH}
        fill={bare ? '#C8FF00' : '#06070A'}
        fillRule="evenodd"
      />
    </svg>
  )
}

/**
 * Wordmark + mark together. Used in the navbar.
 * Mark always renders with its lime chassis here so the brand reads
 * uniformly across nav, OG share image, and platform icons.
 */
export function LogoLockup({
  size = 32,
  className = '',
  showWord = true,
  word = 'DevSolutions'
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showWord && (
        <span className="font-semibold tracking-tight text-white text-[0.95rem] sm:text-base">
          {word}
        </span>
      )}
    </span>
  )
}

export default LogoLockup
