import { ChevronDown, HelpCircle, MapPin } from 'lucide-react'
import { studio } from '../data/studio.js'

/**
 * FAQ section.
 *
 * Why we use the native <details>/<summary> element here instead of a
 * JS-controlled accordion:
 *
 *   1. No animation cost. height-auto, max-height, and grid-template-rows
 *      are all layout properties — none can be GPU-composited. Animating
 *      them on mobile chews CPU and visibly lags low/mid-range Android.
 *      <details> open/close is instant by browser default — zero jank.
 *
 *   2. No React state. No useState, no AnimatePresence, no per-tap render
 *      cascade. The browser handles open/close in a single paint frame.
 *
 *   3. The `name="faq"` attribute (baseline-supported across all evergreen
 *      browsers since 2024) gives accordion behaviour for free — opening
 *      one item closes the others.
 *
 *   4. Accessible by default. Native keyboard support, screen-reader
 *      semantics, and crawlable by Google's content extractor without
 *      any extra ARIA wiring.
 *
 * Structured data still lives in index.html FAQPage JSON-LD — keep the
 * Q&A copy below in lockstep with that block.
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
    a: `Healthcare (Remesleep), SaaS analytics (OutVue), logistics CRM (Saad Cargo), visa CRM (Baker & Co), NGO (Humane Warriors), e-commerce (Benzer World), natural stone (Mossano Marmo), automotive (AutoPart) and digital marketing (Howl).`
  },
  {
    q: `Do you work with founders outside ${studio.city} or India?`,
    a: `Yes. About half our revenue comes from outside India — UAE, EU, US and the UK. We run async-friendly delivery with overlapping working hours so timezone is never a blocker.`
  },
  {
    q: `What does a typical engagement cost?`,
    a: `Pricing scales with scope. Starter landing pages from ₹20k (~$240). Sprint custom builds from ₹2L (~$2.5k). Full Pro web platforms from ₹6.5L (~$8k). Enterprise embedded engagements quoted quarterly from ₹25L. Every engagement is fixed-scope with the price agreed upfront — no hourly billing.`
  }
]

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative border-t border-white/[0.06] py-20 md:py-32"
    >
      {/* Backdrop — moderate blur on mobile, fuller on desktop. We deliberately
          keep this layer outside the accordion's compositing tree so the
          open/close paint never re-rasterises the blur. */}
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

          {/* Accordion — native <details> with `name="faq"` for one-open-at-a-time */}
          <ol className="lg:col-span-7 space-y-2.5 list-none p-0">
            {faqs.map((f, i) => (
              <li key={f.q}>
                <details
                  name="faq"
                  open={i === 0}
                  className="faq-item group rounded-2xl border border-white/10 bg-white/[0.02] open:border-accent-lime/40 open:bg-white/[0.04] transition-colors"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base md:text-lg font-medium text-white">
                      {f.q}
                    </h3>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-white/65 transition-transform duration-200 group-open:rotate-180 group-open:border-accent-lime group-open:bg-accent-lime group-open:text-ink-950">
                      <ChevronDown size={14} />
                    </span>
                  </summary>
                  <p className="px-5 pb-5 -mt-1 text-sm md:text-[15px] leading-relaxed text-white/75">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
