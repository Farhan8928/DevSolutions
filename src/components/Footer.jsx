import { useEffect, useState } from 'react'
import { ArrowUpRight, Mail, MessageCircle, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  // Mumbai is the studio base — show local time in IST
  const istString = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  // Available 09:00–22:00 IST
  const istHour = Number(
    now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false })
  )
  const isAwake = istHour >= 9 && istHour < 22

  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950 overflow-hidden">
      {/* Aurora glow at top of footer */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[400px] w-[1100px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.16),transparent_60%)] blur-3xl" />
      </div>

      <div className="container-x pt-20 md:pt-28 pb-10">
        {/* Final CTA */}
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="eyebrow">— Ready to build?</span>
            <h2 className="display-hero mt-4">
              Let’s make <span className="gradient-text">something real.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-lime px-6 py-3.5 text-sm font-medium text-ink-950 hover:-translate-y-0.5 transition-transform"
            >
              Start a project <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Massive wordmark — fluid clamp, never overflows */}
        <div className="mt-16 md:mt-24 select-none overflow-hidden">
          <p
            className="display leading-[0.85] tracking-tighter bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent bg-clip-text text-transparent"
            style={{ fontSize: 'clamp(3.5rem, 16vw, 18rem)' }}
          >
            DevSolutions
          </p>
        </div>

        {/* Status row */}
        <div className="mt-10 grid gap-6 md:grid-cols-12 border-t border-white/[0.06] pt-8">
          {/* Status */}
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">Status</p>
            <div className="mt-3 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-2xl border border-accent-lime/30 bg-accent-lime/[0.06] px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-accent-lime ${isAwake ? 'animate-ping opacity-60' : 'opacity-30'}`} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
              </span>
              <span className="text-xs text-white/85 font-medium">
                {isAwake ? 'Available now' : 'Quiet hours'}
              </span>
              <span className="font-mono text-[10px] text-white/45 whitespace-nowrap">
                Mumbai · {istString} IST
              </span>
            </div>
            <p className="mt-3 text-xs text-white/55 max-w-xs">
              Founder replies inside one business day, every day, on every channel.
            </p>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">Studio</p>
            <a href="#services" className="text-white/75 hover:text-white">Services</a>
            <a href="#work" className="text-white/75 hover:text-white">Work</a>
            <a href="#process" className="text-white/75 hover:text-white">Process</a>
            <a href="#stack" className="text-white/75 hover:text-white">Stack</a>
            <a href="#trust" className="text-white/75 hover:text-white">Trust</a>
            <a href="#contact" className="text-white/75 hover:text-white">Contact</a>
          </div>

          {/* Channels */}
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">Channels</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="mailto:hello@devsolutions.dev" className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 hover:border-accent-lime/40 transition">
                  <span className="inline-flex items-center gap-2.5 text-sm text-white/85">
                    <Mail size={14} className="text-accent-lime" />
                    hello@devsolutions.dev
                  </span>
                  <ArrowUpRight size={13} className="text-white/40 group-hover:text-accent-lime transition" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 hover:border-accent-lime/40 transition">
                  <span className="inline-flex items-center gap-2.5 text-sm text-white/85">
                    <MessageCircle size={14} className="text-accent-lime" />
                    WhatsApp
                  </span>
                  <ArrowUpRight size={13} className="text-white/40 group-hover:text-accent-lime transition" />
                </a>
              </li>
              <li className="grid grid-cols-2 gap-2">
                <a href="#" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 hover:border-accent-lime/40 transition">
                  <span className="inline-flex items-center gap-2 text-sm text-white/85">
                    <Linkedin size={14} className="text-accent-lime" />
                    LinkedIn
                  </span>
                  <ArrowUpRight size={12} className="text-white/40 group-hover:text-accent-lime transition" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 hover:border-accent-lime/40 transition">
                  <span className="inline-flex items-center gap-2 text-sm text-white/85">
                    <Github size={14} className="text-accent-lime" />
                    GitHub
                  </span>
                  <ArrowUpRight size={12} className="text-white/40 group-hover:text-accent-lime transition" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom legal strip */}
        <div className="mt-10 flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-white/45">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-lime text-ink-950 text-xs font-bold">
              D
            </span>
            <span>© {new Date().getFullYear()} DevSolutions. All rights reserved.</span>
          </div>
          <div className="font-mono uppercase tracking-[0.18em] text-[10px]">
            Built with React · Vite · Tailwind · Framer Motion
          </div>
        </div>
      </div>
    </footer>
  )
}
