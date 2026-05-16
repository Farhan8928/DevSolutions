import { useState } from 'react'
import { ChevronDown, HelpCircle, MapPin } from 'lucide-react'
import { studio } from '../data/studio.js'

/**
 * Visible FAQ section.
 *
 * Mobile-perf notes:
 *   • Accordion uses the CSS `grid-template-rows: 0fr → 1fr` technique
 *     instead of Framer Motion's `height: auto` animation. The grid
 *     trick is GPU-friendly — no per-frame layout recalc, smooth on
 *     low-end Android. Framer Motion's height-auto path forces full
 *     layout on every frame which is what was causing the jank.
 *   • Background gradient uses a moderate blur (md:blur-3xl) because
 *     blur on phones costs a giant offscreen composite layer. Smaller
 *     blur on mobile = same visual atmosphere, much cheaper to paint.
 *   • No microdata — FAQPage JSON-LD lives in index.html alone.
 *     Two FAQPage entities trip Google's "Duplicate field" error.
 */
const faqs = [
  {
    q: `Where is ${studio.name} based?`,
    a: `${studio.name} is an engineering studio based in ${studio.city}, ${studio.country}. We work remote-first with founders across India, the UAE, the EU and the US, with our core team operating from ${studio.city}.`
  },
  {
    q: `What services does ${studio.name} provide?`,
    a: `Web platforms (React, Next.js, Vite), custom CRM systems, e-commerce on headless Shopify and custom CMS, fintech and forex dashboards with MT5 integration, mobile apps with React Native, and design systems.`
  },
  {
    q: `Who works on my project?`,
    a: `Senior engineers only. You speak directly with one of the two co-founders for every sprint — no account managers, no offshore relays.`
  },
  {
    q: `How fast can ${studio.name} start a new project?`,
    a: `We are currently booking Q3 2026. The founders reply to inquiries on email and WhatsApp within one business day, every day.`
  },
  {
    q: `Does ${studio.name} sign NDAs before discovery?`,
    a: `Yes. We are NDA-first. Source code, designs and infrastructure are 100% transferred to you on day one of go-live — your IP stays yours.`
  },
  {
    q: `Which industries has ${studio.name} shipped products for?`,
    a: `Healthcare (Remesleep), NGO (Humane Warriors), e-commerce (Benzer World), insurtech (ChainThat), visa CRM (Baker & Co), fintech and forex (EliteFX), automotive (AutoPart) and digital marketing (Howl).`
  },
  {
    q: `Do you work with founders outside ${studio.city} or India?`,
    a: `Yes. About half our revenue comes from outside India — UAE, EU, US and the UK. We run async-friendly delivery with overlapping working hours so timezone is never a blocker.`
  },
  {
    q: `What does a typical engagement cost?`,
    a: `Sprint engagements start around $8k for a fixed scope of two to six weeks. Monthly retainers start around $12k/month for an always-on senior team. Embedded engagements are quoted quarterly.`
  }
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="faq"
      className="relative border-t border-white/[0.06] py-20 md:py-32"
    >
      {/* Backdrop — heavy blur only on desktop, lighter on mobile to avoid
          the giant offscreen composite layer that costs FPS on phones. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.10),transparent_60%)] blur-2xl md:blur-3xl" />
      </div>

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Header */}
          <div className="lg:col-span-5">
            <span className="eyebrow">— Frequently asked</span>
            <h2 className="display-xl mt-4">
              Answers, <span className="gradient-text">straight up.</span>
            </h2>
            <p className="mt-6 text-white/65 max-w-md">
              Everything founders ask us before signing. If your question isn't here, ping the studio directly — replies inside one business day.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white/70">
              <MapPin size={12} className="text-accent-lime" />
              {studio.city}, {studio.country} · serving teams worldwide
            </div>

            <div className="mt-6 hidden lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                Still curious?
              </p>
              <a
                href="#contact"
                className="mt-3 inline-flex items-center gap-2 text-sm text-white hover:text-accent-lime transition"
              >
                <HelpCircle size={14} className="text-accent-lime" />
                Send your question to the founders
              </a>
            </div>
          </div>

          {/* Accordion — pure CSS expansion via grid-template-rows */}
          <ol className="lg:col-span-7 space-y-2.5">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <li
                  key={f.q}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen
                      ? 'border-accent-lime/40 bg-white/[0.04]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <h3 className="text-base md:text-lg font-medium text-white">
                      {f.q}
                    </h3>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-transform duration-200 ${
                        isOpen
                          ? 'border-accent-lime bg-accent-lime text-ink-950 rotate-180'
                          : 'border-white/15 text-white/65'
                      }`}
                    >
                      <ChevronDown size={14} />
                    </span>
                  </button>

                  {/* The grid trick:
                      • Wrapper grid animates rows 0fr ↔ 1fr (cheap, GPU-able)
                      • Inner div has min-height:0 so overflow can hide content
                      • No JS animation library involved — pure CSS, 60fps */}
                  <div
                    id={`faq-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-5 -mt-1 text-sm md:text-[15px] leading-relaxed text-white/75">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
