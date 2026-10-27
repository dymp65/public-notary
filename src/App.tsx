import { useRef, useState } from 'react'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { ServiceDialog } from './components/ServiceDialog.tsx'
import { SkipLink } from './components/SkipLink.tsx'
import { About } from './sections/About.tsx'
import { Hero } from './sections/Hero.tsx'
import { Insights } from './sections/Insights.tsx'
import { Office } from './sections/Office.tsx'
import { PracticeAreas } from './sections/PracticeAreas.tsx'
import { Values } from './sections/Values.tsx'
import type { ServiceId } from './types/site.ts'

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
    <div className="min-h-screen overflow-x-clip bg-cream text-ink">
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
