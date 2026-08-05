import { useLenis } from '@/hooks/useLenis'
import { Loader } from '@/components/ui/Loader'
import { FloatingAmbience } from '@/components/ui/FloatingAmbience'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Celebrity } from '@/components/sections/Celebrity'
import { Portfolio } from '@/components/sections/Portfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'

function App() {
  useLenis()

  return (
    <>
      <Loader />
      <FloatingAmbience />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Celebrity />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  )
}

export default App
