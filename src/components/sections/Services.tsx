import { motion } from 'framer-motion'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/PremiumAnimations'
import { SERVICES } from '@/constants'

export function Services() {
  return (
    <section id="services" className="section-gap bg-bg-alt">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp>
            <p className="text-[0.7rem] font-medium tracking-[0.3em] uppercase text-gold mb-4">What We Offer</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-dark leading-[1.1]">
              Tailored <em className="text-dark-2">For Your</em><br />Perfect Day
            </h2>
          </FadeUp>
        </div>

        {/* Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.1}
        >
          {SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <motion.div
                className="group bg-white rounded-[14px] overflow-hidden shadow-sm border border-dark/5 cursor-pointer"
                whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(12,10,9,0.12)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="overflow-hidden aspect-[4/3]">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="p-6">
                  <span className="text-[0.65rem] tracking-[0.2em] text-gold font-medium block mb-2">
                    {String(service.id).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-xl font-normal text-dark mb-2 leading-tight">{service.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
