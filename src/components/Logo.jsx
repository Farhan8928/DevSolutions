/**
 * DuoStack brandmark.
 *
 * The mark visualises both halves of the name in one geometric glyph:
 *   • DUO   — two equal-weight rounded bars (the co-founder pair)
 *   • STACK — bars are stacked vertically with a clean gap; the top
 *             bar sits inset from the left, suggesting a stack that
 *             "builds up" from a wider base to a narrower top piece
 *
 * Constructed on a 64-unit grid with mathematical purity:
 *   • Lime chassis: full-bleed rounded square, rx 14
 *   • Bottom bar  : x 12 → 52, y 34 → 46  (full width 40)
 *   • Top bar     : x 18 → 52, y 14 → 26  (right-aligned, width 34)
 *   • Gap         : 8 units between bars (matches stroke-grid spacing)
 *
 * Two render modes:
 *   • default — lime chassis + ink letterform (the brandmark)
 *   • bare    — lime letterform on transparent (for tinted/glass tiles
 *               like the footer copyright stamp where the chassis
 *               would read as a double background)
 */

const STACK_BARS = (
  <>
    {/* Top bar — narrower, right-aligned (the "duo" tip of the stack) */}
    <rect x="18" y="14" width="34" height="12" rx="6" />
    {/* Bottom bar — full width (the "stack" base) */}
    <rect x="12" y="34" width="40" height="12" rx="6" />
  </>
)

export function LogoMark({ size = 36, className = '', bare = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="DuoStack"
    >
      {!bare && (
        <rect width="64" height="64" rx="14" fill="#C8FF00" />
      )}
      <g fill={bare ? '#C8FF00' : '#06070A'}>
        {STACK_BARS}
      </g>
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
  word = 'DuoStack'
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
