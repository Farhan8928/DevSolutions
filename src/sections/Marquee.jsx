// "Now playing" strip — feels like a live studio dashboard, not a generic loop.
// Each row uses a different status verb so the page has rhythm.
const items = [
  { verb: 'Shipping',     subject: 'Visa CRM v2 for Baker & Co' },
  { verb: 'Designing',    subject: 'Attribution dashboard v3 for OutVue' },
  { verb: 'Refactoring',  subject: 'Storefront for Benzer World' },
  { verb: 'Migrating',    subject: 'Healthcare data layer for Remesleep' },
  { verb: 'Wireframing',  subject: 'Donor flow for Humane Warriors' },
  { verb: 'Optimising',   subject: 'Lighthouse 99 on Howl' },
  { verb: 'Integrating',  subject: 'MT5 + Telegram for forex clients' },
  { verb: 'Booking',      subject: 'Q3 2026 — 2 sprints open' }
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <section
      aria-label="Currently in studio"
      className="relative border-y border-white/[0.06] bg-ink-900/40 py-4 md:py-5 overflow-hidden"
    >
      {/* Edge fade so the marquee bleeds in/out cleanly */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-ink-950 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-ink-950 to-transparent" />

      <div className="overflow-hidden">
        <div className="flex w-[200%] animate-marquee items-center gap-10 whitespace-nowrap">
          {row.map((it, i) => (
            <div key={i} className="flex shrink-0 items-center gap-3 md:gap-4 px-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-lime/30 bg-accent-lime/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.22em] text-accent-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime animate-pulse" />
                {it.verb}
              </span>
              <span className="text-base md:text-lg font-medium tracking-tight text-white/85">
                {it.subject}
              </span>
              <span className="text-white/25">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
