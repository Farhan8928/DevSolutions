// Real DevSolutions project portfolio.
// Assets are pulled live from each client domain via public services:
//   - favicon: Google S2 (always works)
//   - logo:    Clearbit Logo API (works for established brands; falls back to favicon)
//   - shot:    thum.io live page screenshot (free, no key)

const fav = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=128`
const logo = (d) => `https://logo.clearbit.com/${d}`
const shot = (url) =>
  `https://image.thum.io/get/width/1600/crop/1200/noanimate/maxAge/24/${url}`

export const projects = [
  {
    id: 'remesleep',
    title: 'Remesleep',
    domain: 'Healthcare',
    host: 'remesleep.com',
    year: '2024',
    summary:
      'Sleep & recovery healthcare platform with patient onboarding, clinician dashboards and telehealth flows.',
    stack: ['React', 'Node', 'PostgreSQL', 'Stripe'],
    url: 'https://www.remesleep.com/',
    accent: 'from-emerald-300/30 via-cyan-400/10 to-transparent',
    favicon: fav('remesleep.com'),
    logo: logo('remesleep.com'),
    shot: shot('https://www.remesleep.com/')
  },
  {
    id: 'humanewarriors',
    title: 'Humane Warriors',
    domain: 'NGO',
    host: 'humanewarriors.ch',
    year: '2024',
    summary:
      'Global NGO website that mobilises donors and volunteers across regions with rich storytelling.',
    stack: ['React', 'CMS', 'GSAP'],
    url: 'https://humanewarriors.ch/',
    accent: 'from-amber-300/25 via-rose-300/10 to-transparent',
    favicon: fav('humanewarriors.ch'),
    logo: logo('humanewarriors.ch'),
    shot: shot('https://humanewarriors.ch/')
  },
  {
    id: 'howl',
    title: 'Howl',
    domain: 'Marketing',
    host: 'howl.in',
    year: '2024',
    summary:
      'Brand-led website for a digital marketing agency with bold motion and lead capture.',
    stack: ['Next.js', 'Framer Motion', 'Sanity'],
    url: 'https://www.howl.in/',
    accent: 'from-fuchsia-400/25 via-violet-400/10 to-transparent',
    favicon: fav('howl.in'),
    logo: logo('howl.in'),
    shot: shot('https://www.howl.in/')
  },
  {
    id: 'benzer',
    title: 'Benzer World',
    domain: 'E‑commerce',
    host: 'benzerworld.com',
    year: '2023',
    summary:
      'Headless commerce on Shopify + custom CMS — catalogue, merchandising and checkout tuned for conversion.',
    stack: ['Shopify', 'Custom CMS', 'Liquid', 'Node'],
    url: 'https://benzerworld.com/',
    accent: 'from-amber-200/25 via-yellow-300/10 to-transparent',
    favicon: fav('benzerworld.com'),
    logo: logo('benzerworld.com'),
    shot: shot('https://benzerworld.com/')
  },
  {
    id: 'chainthat',
    title: 'ChainThat',
    domain: 'InsurTech',
    host: 'chainthat.com',
    year: '2023',
    summary:
      'Brand and product site for an enterprise insurance technology company.',
    stack: ['React', 'TypeScript', 'GraphQL'],
    url: 'https://chainthat.com/',
    accent: 'from-sky-400/25 via-indigo-400/10 to-transparent',
    favicon: fav('chainthat.com'),
    logo: logo('chainthat.com'),
    shot: shot('https://chainthat.com/')
  },
  {
    id: 'bakerandco',
    title: 'Baker & Co — Visa CRM',
    domain: 'Custom CRM',
    host: 'bakerandco.ae',
    year: '2024',
    summary:
      'End‑to‑end visa lead CRM. Captures leads from Meta, websites and manual entry. Role‑based routing across telecallers, advisors, processing and admin.',
    stack: ['React', 'Node', 'MongoDB', 'Meta API', 'Twilio'],
    url: 'https://bakerandco.ae/',
    accent: 'from-lime-300/30 via-emerald-300/10 to-transparent',
    favicon: fav('bakerandco.ae'),
    logo: logo('bakerandco.ae'),
    shot: shot('https://bakerandco.ae/')
  },
  {
    id: 'elitefx',
    title: 'EliteFX',
    domain: 'Forex / Fintech',
    host: 'elitefx.in',
    year: '2024',
    summary:
      'Full forex website plus client and admin CRM with native MT5 and broker‑platform integrations baked in.',
    stack: ['React', 'Node', 'MT5', 'WebSockets', 'PostgreSQL'],
    url: 'https://www.elitefx.in/',
    accent: 'from-rose-300/25 via-orange-300/10 to-transparent',
    favicon: fav('elitefx.in'),
    logo: logo('elitefx.in'),
    shot: shot('https://www.elitefx.in/')
  },
  {
    id: 'autopart',
    title: 'AutoPart',
    domain: 'Automotive',
    host: 'autopart-web.vercel.app',
    year: '2025',
    summary:
      'Booking platform for premium car repair — quote builder, service catalogue and slot management.',
    stack: ['React', 'Vite', 'Tailwind', 'Vercel'],
    url: 'https://autopart-web.vercel.app/',
    accent: 'from-cyan-300/25 via-blue-400/10 to-transparent',
    favicon: fav('autopart-web.vercel.app'),
    logo: logo('autopart-web.vercel.app'),
    shot: shot('https://autopart-web.vercel.app/')
  }
]
