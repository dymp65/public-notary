import { useRef, useState } from 'react'
import { SkipLink } from '../components/SkipLink.tsx'
import type { ServiceId } from '../types/site.ts'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { ServiceDialog } from './components/ServiceDialog.tsx'
import { About } from './sections/About.tsx'
import { Hero } from './sections/Hero.tsx'
import { Insights } from './sections/Insights.tsx'
import { Office } from './sections/Office.tsx'
import { PracticeAreas } from './sections/PracticeAreas.tsx'
import { Values } from './sections/Values.tsx'

// V3 review design (docs/design-switcher): the current page's content in the dark,
// cinematic style of the owner's 2026-10-28 reference. Copy, facts, and flags are shared.
function App() {
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const openService = (id: ServiceId, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setSelectedService(id)
  }

  const closeService = () => {
    setSelectedService(null)
    triggerRef.current?.focus()
  }

  return (
    <div data-design="v3" className="min-h-screen overflow-x-clip bg-night text-white">
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="scroll-mt-[72px]">
        <Hero />
        <About />
        <Values />
        <PracticeAreas onOpen={openService} />
        <Office />
        <Insights />
      </main>
      <Footer />
      <ServiceDialog serviceId={selectedService} onClose={closeService} />
    </div>
  )
}

export default App
