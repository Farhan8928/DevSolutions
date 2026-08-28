import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight, CheckCircle2, Mail, MapPin, Calendar, Clock,
  ShieldCheck, MessageCircle
} from 'lucide-react'
import { contact, studio } from '../data/studio.js'

const projectTypes = [
  'Web platform', 'Mobile app', 'CRM', 'E‑commerce',
  'Fintech / Forex', 'Brand site', 'Other'
]

// Indian-first budget bands, aligned to the engagement tiers so a pick here
// maps to a tier without translation: Launch, Business, Sprint, Pro, then
// Enterprise. Plus a "not sure yet" option so genuinely undecided founders
// aren't blocked at the first field.
const budgets = [
  '< ₹50k',
  '₹50k – ₹2L',
  '₹2L – ₹6L',
  '₹6L – ₹25L',
  '₹25L+',
  'Not sure yet'
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    company: '',
    type: 'Web platform',
    budget: '₹2L – ₹6L',
    message: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    // Wire to your backend / service later
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-16 md:py-32 border-t border-white/[0.06]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.08),transparent_60%)] blur-3xl" />
      </div>

      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Left column — pitch */}
          <div className="md:col-span-5">
            <span className="eyebrow">06 — Let’s talk</span>
            <h2 className="display-xl mt-4">
              Have an idea? <br />
              <span className="gradient-text">Let’s build it.</span>
            </h2>
            <p className="mt-6 text-white/65 max-w-md">
              Drop a line about your product, timeline and budget. You’ll hear from a senior engineer within one business day.
            </p>

            {/* Promise list */}
            <ul className="mt-8 space-y-3">
              {[
                { icon: Clock, text: 'Reply within 1 business day' },
                { icon: ShieldCheck, text: 'NDA on request, before discovery' },
                { icon: Calendar, text: 'Free 30‑min scoping call if it’s a fit' }
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-white/80">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.04] border border-white/10">
                    <Icon size={14} className="text-accent-lime" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            {/* Direct contact */}
            <div className="mt-10 space-y-3">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/[0.02] p-5 hover:border-accent-lime/40 transition"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                    WhatsApp · fastest reply
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-white truncate">
                    <MessageCircle size={15} className="text-accent-lime" />
                    {contact.whatsappLabel}
                  </p>
                </div>
                <ArrowUpRight size={16} className="text-white/40 group-hover:text-accent-lime transition shrink-0" />
              </a>

              <a
                href={contact.mailto}
                className="group flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/[0.02] p-5 hover:border-accent-lime/40 transition"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                    Email
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-white truncate">
                    <Mail size={15} className="text-accent-lime shrink-0" />
                    <span className="truncate">{contact.emailLabel}</span>
                  </p>
                </div>
                <ArrowUpRight size={16} className="text-white/40 group-hover:text-accent-lime transition shrink-0" />
              </a>

              <div className="flex items-center gap-2 px-1 text-xs text-white/55">
                <MapPin size={12} className="text-accent-lime" />
                {studio.city}, {studio.country} · serving teams worldwide
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 card p-6 md:p-8 ring-glow"
          >
            {sent ? (
              <div className="flex flex-col items-start gap-4 py-8">
                <CheckCircle2 size={36} className="text-accent-lime" />
                <h3 className="display-xl">Brief received.</h3>
                <p className="text-white/65 max-w-md">
                  Thanks {data.name || 'there'} — we’ll review your brief and reply within one business day.
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Reference · DS‑{Math.floor(Math.random() * 9000 + 1000)}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <FloatField label="Your name" required value={data.name}
                    onChange={(v) => setData({ ...data, name: v })} placeholder="Farhan A." />
                  <FloatField label="Email" type="email" required value={data.email}
                    onChange={(v) => setData({ ...data, email: v })} placeholder="you@company.com" />
                </div>
                <FloatField label="Company" value={data.company}
                  onChange={(v) => setData({ ...data, company: v })} placeholder="DuoStack" />

                {/* Project type chips */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                    What are you building?
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projectTypes.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setData({ ...data, type: t })}
                        className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                          data.type === t
                            ? 'border-accent-lime bg-accent-lime text-ink-950'
                            : 'border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.06]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget pills */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                    Budget
                  </label>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setData({ ...data, budget: b })}
                        className={`rounded-full border px-3.5 py-2.5 text-sm transition ${
                          data.budget === b
                            ? 'border-accent-lime bg-accent-lime text-ink-950'
                            : 'border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.06]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <FloatField
                  label="Tell us about it"
                  multiline rows={5}
                  required
                  value={data.message}
                  onChange={(v) => setData({ ...data, message: v })}
                  placeholder="What are you building, who is it for, and when do you need it?"
                />

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                  <p className="text-xs text-white/45">
                    By submitting you agree to a 30‑min scoping call if we’re a fit.
                  </p>
                  <button type="submit" className="btn-primary h-12 sm:h-auto justify-center w-full sm:w-auto">
                    Send brief <ArrowUpRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Linear-style floating label field. The label sits inside the field on rest,
 * lifts and shrinks the moment the user focuses or types.
 */
function FloatField({
  label, value, onChange, type = 'text',
  required, placeholder, multiline = false, rows = 4
}) {
  const [focused, setFocused] = useState(false)
  const filled = (value ?? '').length > 0
  const lifted = focused || filled

  const Tag = multiline ? 'textarea' : 'input'

  return (
    <label className="group relative block">
      <span
        className={`pointer-events-none absolute left-4 z-10 origin-left bg-ink-900/0 px-1 transition-all duration-200 ${
          lifted
            ? 'top-2 text-[10px] uppercase tracking-[0.22em] text-accent-lime'
            : 'top-4 text-sm text-white/45'
        }`}
      >
        {label}{required && <span className="text-accent-lime"> *</span>}
      </span>
      <Tag
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={lifted ? placeholder : ''}
        className={`w-full rounded-2xl border bg-ink-900/60 px-4 ${
          multiline ? 'pt-7 pb-3' : 'pt-6 pb-2'
        } text-white placeholder:text-white/25 focus:outline-none transition resize-none ${
          lifted
            ? 'border-accent-lime/60'
            : 'border-white/10 group-hover:border-white/20'
        }`}
      />
    </label>
  )
}
