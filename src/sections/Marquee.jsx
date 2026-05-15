const items = [
  'Healthcare', 'Forex', 'E‑commerce', 'NGO', 'InsurTech',
  'Visa CRM', 'Automotive', 'Fintech', 'Marketing', 'SaaS'
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <section aria-label="Industries" className="border-y border-white/[0.06] bg-ink-900/40 py-6">
      <div className="overflow-hidden">
        <div className="flex w-[200%] animate-marquee gap-12 whitespace-nowrap">
          {row.map((it, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="display text-3xl md:text-4xl text-white/70">{it}</span>
              <span className="text-accent-lime">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
