const items = [
  'Healthcare', 'Forex', 'E‑commerce', 'NGO', 'InsurTech',
  'Visa CRM', 'Automotive', 'Fintech', 'Marketing', 'SaaS'
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <section aria-label="Industries" className="border-y border-white/[0.06] bg-ink-900/40 py-5 md:py-6">
      <div className="overflow-hidden">
        <div className="flex w-[200%] animate-marquee items-center gap-10 whitespace-nowrap">
          {row.map((it, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="display-lg text-white/65">{it}</span>
              <span className="text-accent-lime">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
