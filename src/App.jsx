import { useEffect } from 'react'
import Cursor from './components/Cursor.jsx'
import Loader from './components/Loader.jsx'
import ProgressRail from './components/ProgressRail.jsx'
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
import Contact from './sections/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  useEffect(() => {
    document.title = 'DevSolutions — Engineering studio for premium digital products'
  }, [])

  return (
    <div className="relative min-h-screen bg-ink-950 text-white overflow-x-clip">
      <Loader />
      <Cursor />
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
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
