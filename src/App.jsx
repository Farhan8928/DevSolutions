import { useEffect } from 'react'
import Cursor from './components/Cursor.jsx'
import Loader from './components/Loader.jsx'
import ProgressRail from './components/ProgressRail.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import AvailabilityDock from './components/AvailabilityDock.jsx'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Marquee from './sections/Marquee.jsx'
import Trust from './sections/Trust.jsx'
import Services from './sections/Services.jsx'
import Work from './sections/Work.jsx'
import Process from './sections/Process.jsx'
import Stack from './sections/Stack.jsx'
import Stats from './sections/Stats.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Faq from './sections/Faq.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './components/Footer.jsx'

// `?prerender=1` is set by scripts/prerender.mjs at build time.
// We skip the intro Loader and any cursor effects so the snapshot
// captures the page in its real, content-rich state immediately.
const isPrerender =
  typeof window !== 'undefined' &&
  /[?&]prerender=1\b/.test(window.location.search)

export default function App() {
  useEffect(() => {
    document.title =
      'DuoStack — Web Development Studio in Mumbai, India · React, Next.js, Custom CRM, Mobile Apps'
  }, [])

  return (
    <div className="relative min-h-screen bg-ink-950 text-white overflow-x-clip">
      {!isPrerender && <Loader />}
      {!isPrerender && <Cursor />}
      <ScrollProgress />
      <ProgressRail />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Trust />
        <Services />
        <Work />
        <Process />
        <Stack />
        <Stats />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      {!isPrerender && <AvailabilityDock />}
    </div>
  )
}
