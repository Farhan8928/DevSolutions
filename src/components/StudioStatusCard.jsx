import { useEffect, useState } from 'react'

/**
 * Live studio status card. Shows the current Mumbai (IST) time, an
 * "available now / quiet hours" pulse, recently shipped projects,
 * and a one-line capacity indicator. All client-side reactive.
 *
 * No two visits ever look exactly the same — that's the premium signal.
 */
export default function StudioStatusCard() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  // Mumbai (IST = UTC+5:30) office hours: 09:00–22:00
  const istString = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  const istHour = Number(
    now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false })
  )
  const isAwake = istHour >= 9 && istHour < 22

  return (
    <div className="card p-5 md:p-6 relative overflow-hidden">
      {/* Faint top-right glow */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent-lime/10 blur-3xl" aria-hidden />

      {/* Header — live pulse */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-accent-lime ${isAwake ? 'animate-ping opacity-70' : 'opacity-30'}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            Studio · live
          </span>
        </div>
        <span className="font-mono text-[10px] text-white/40">MUM</span>
      </div>

      {/* Time + status */}
      <div className="mt-4">
        <p className="display text-3xl md:text-4xl tabular-nums">
          {istString}
          <span className="ml-2 text-base font-mono text-white/40">IST</span>
        </p>
        <p className="mt-1.5 text-sm text-white/65">
          {isAwake ? 'Available now · founder online' : 'Quiet hours · reply by 09:00 IST'}
        </p>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

      {/* Recently shipped */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          Recently shipped
        </p>
        <ul className="mt-3 space-y-2">
          {[
            { name: 'EliteFX trader v3', when: '2w ago' },
            { name: 'Baker & Co lead routing', when: '4w ago' },
            { name: 'AutoPart booking flow', when: '6w ago' }
          ].map((s) => (
            <li key={s.name} className="flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2 text-white/85">
                <span className="h-1 w-1 rounded-full bg-accent-lime" />
                {s.name}
              </span>
              <span className="font-mono text-[11px] text-white/40">{s.when}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer — capacity */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
        <span className="text-xs text-white/65">Q3 capacity</span>
        <span className="inline-flex items-center gap-2">
          <span className="font-mono text-xs text-white">2 / 4</span>
          <span className="flex gap-0.5">
            <span className="h-2 w-2 rounded-sm bg-accent-lime" />
            <span className="h-2 w-2 rounded-sm bg-accent-lime" />
            <span className="h-2 w-2 rounded-sm bg-white/15" />
            <span className="h-2 w-2 rounded-sm bg-white/15" />
          </span>
        </span>
      </div>
    </div>
  )
}
