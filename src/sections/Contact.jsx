import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [data, setData] = useState({
    name: '', email: '', company: '', budget: '10k–25k', message: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    // Wire to your backend / service later
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-16 md:py-32 border-t border-white/[0.06]">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">06 — Let’s talk</span>
            <h2 className="display-xl mt-4">
              Have an idea? <br />
              <span className="gradient-text">Let’s build it.</span>
            </h2>
            <p className="mt-6 text-white/65 max-w-md">
              Drop a line about your product, timeline and budget. You’ll hear from a senior engineer within one business day.
            </p>

            <ul className="mt-8 space-y-4 text-white/80">
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.05] border border-white/10">
                  <Mail size={16} className="text-accent-lime" />
                </span>
                <a href="mailto:hello@devsolutions.dev" className="hover:text-white">
                  hello@devsolutions.dev
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.05] border border-white/10">
                  <MapPin size={16} className="text-accent-lime" />
                </span>
                Remote · India · UAE
              </li>
            </ul>
          </div>

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
                <h3 className="display text-3xl">Brief received.</h3>
                <p className="text-white/65 max-w-md">
                  Thanks {data.name || 'there'} — we’ll review your brief and reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Your name" required value={data.name}
                    onChange={(v) => setData({ ...data, name: v })} placeholder="Farhan A." />
                  <Field label="Email" type="email" required value={data.email}
                    onChange={(v) => setData({ ...data, email: v })} placeholder="you@company.com" />
                </div>
                <Field label="Company" value={data.company}
                  onChange={(v) => setData({ ...data, company: v })} placeholder="DevSolutions" />

                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-white/45 font-mono">Budget</label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['<10k', '10k–25k', '25k–50k', '50k+'].map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setData({ ...data, budget: b })}
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          data.budget === b
                            ? 'border-accent-lime bg-accent-lime text-ink-950'
                            : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]'
                        }`}
                      >
                        ${b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-white/45 font-mono">Tell us about it</label>
                  <textarea
                    required
                    rows={5}
                    value={data.message}
                    onChange={(e) => setData({ ...data, message: e.target.value })}
                    placeholder="What are you building, who is it for, and when do you need it?"
                    className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-ink-900/60 p-4 text-white placeholder:text-white/30 focus:border-accent-lime focus:outline-none"
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-xs text-white/45">We reply within 1 business day.</p>
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

function Field({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.18em] text-white/45 font-mono">
        {label}{required && <span className="text-accent-lime"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-ink-900/60 p-4 text-white placeholder:text-white/30 focus:border-accent-lime focus:outline-none"
      />
    </label>
  )
}
