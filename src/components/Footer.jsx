import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-lime text-ink-950 font-bold">
                D
              </span>
              <span className="text-base font-semibold">DevSolutions</span>
            </div>
            <p className="mt-5 max-w-md text-white/60">
              An engineering studio building premium web, mobile and CRM products.
              We pair sharp design with systems that scale.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="mailto:hello@devsolutions.dev" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 hover:bg-white/[0.06]" aria-label="Email">
                <Mail size={16} />
              </a>
              <a href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 hover:bg-white/[0.06]" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 hover:bg-white/[0.06]" aria-label="GitHub">
                <Github size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono">Studio</p>
            <ul className="mt-4 space-y-2 text-white/80">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#work" className="hover:text-white">Work</a></li>
              <li><a href="#process" className="hover:text-white">Process</a></li>
              <li><a href="#stack" className="hover:text-white">Stack</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono">Get in touch</p>
            <a
              href="#contact"
              className="mt-4 group flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-5 hover:border-accent-lime/50 transition"
            >
              <div>
                <div className="text-lg font-medium">Have a project in mind?</div>
                <div className="text-white/60 text-sm">Tell us what you are building.</div>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-lime text-ink-950 transition group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-sm text-white/50">
          <div>© {new Date().getFullYear()} DevSolutions. All rights reserved.</div>
          <div className="font-mono text-xs">Crafted with React · Vite · Tailwind</div>
        </div>
      </div>
    </footer>
  )
}
