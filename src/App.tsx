import { useLenis } from '@/hooks/useLenis'
import { Loader } from '@/components/ui/Loader'
import { FloatingAmbience } from '@/components/ui/FloatingAmbience'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { SectionOrnament, StudioInterlude } from '@/components/ui/SectionTransition'
import { Navbar } from '@/components/layout/Navbar'
import { About } from '@/components/sections/About'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { HoneysWorld } from '@/components/sections/HoneysWorld'
import { BridalExperience } from '@/components/sections/BridalExperience'
import { Academy } from '@/components/sections/Academy'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { DualCTA } from '@/components/sections/DualCTA'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { STUDIO_INTERIOR_IMAGES } from '@/constants'

function App() {
  useLenis()

  const [studioOne, studioTwo, studioThree] = STUDIO_INTERIOR_IMAGES

  return (
    <>
      <Loader />
      <FloatingAmbience />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <SectionOrnament label="Three Worlds" variant="champagne" />
        <HoneysWorld />

        <StudioInterlude
          src={studioOne.src}
          fallback={studioOne.fallback}
          alt={studioOne.alt}
          eyebrow={studioOne.eyebrow}
          title={studioOne.title}
          subtitle={studioOne.subtitle}
          height="md"
        />

        <BridalExperience />

        <SectionOrnament label="For Artists" variant="dark" />

        <Academy />

        <StudioInterlude
          src={studioTwo.src}
          fallback={studioTwo.fallback}
          alt={studioTwo.alt}
          eyebrow={studioTwo.eyebrow}
          title={studioTwo.title}
          subtitle={studioTwo.subtitle}
          height="sm"
          align="center"
        />

        <Services />

        <StudioInterlude
          src={studioThree.src}
          fallback={studioThree.fallback}
          alt={studioThree.alt}
          eyebrow={studioThree.eyebrow}
          title={studioThree.title}
          subtitle={studioThree.subtitle}
          height="sm"
        />

        <SectionOrnament label="Our Brides" variant="light" />
        <Portfolio />
        <Testimonials />
        <DualCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  )
}

export default App
