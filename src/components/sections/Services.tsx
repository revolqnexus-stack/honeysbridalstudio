import { useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SERVICE_CATEGORIES, LAYOUT } from '@/constants'
import {
  CategoryTabs,
  EditorialImagePanel,
  EditorialMasthead,
  EditorialMobileImage,
  ServicePricingCard,
  EDITORIAL_EASE,
  getCategoryContentMotion,
  getCategoryImageMotion,
} from '@/components/ui/EditorialCatalogue'

export function Services() {
  const [activeSlug, setActiveSlug] = useState<string>(SERVICE_CATEGORIES[0].slug)
  const [direction, setDirection] = useState(0)
  const prevIndexRef = useRef(0)
  const reducedMotion = useReducedMotion()

  const activeCategory =
    SERVICE_CATEGORIES.find((category) => category.slug === activeSlug) ?? SERVICE_CATEGORIES[0]

  const activeIndex = SERVICE_CATEGORIES.findIndex((category) => category.slug === activeSlug)

  const handleCategoryChange = (slug: string) => {
    const nextIndex = SERVICE_CATEGORIES.findIndex((category) => category.slug === slug)
    setDirection(nextIndex >= prevIndexRef.current ? 1 : -1)
    prevIndexRef.current = nextIndex
    setActiveSlug(slug)
  }

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - LAYOUT.headerHeightPx,
        behavior: 'smooth',
      })
    }
  }

  const isBridalRelated = activeSlug === 'makeup' || activeSlug === 'bridal'
  const contentMotion = getCategoryContentMotion(direction, reducedMotion)
  const imageMotion = getCategoryImageMotion(reducedMotion)

  const groups =
    'groups' in activeCategory && activeCategory.groups
      ? activeCategory.groups
      : [{ label: activeCategory.heading, services: activeCategory.services }]

  const priceColumns = 'priceColumns' in activeCategory ? activeCategory.priceColumns : undefined

  return (
    <section id="services" data-nav-surface="light" className="section-gap relative bg-bg-alt">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(202,138,4,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(202,138,4,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-custom relative">
        <EditorialMasthead
          eyebrow="Honey's Beauty House"
          title="Services"
          subtitle="From signature bridal artistry to everyday beauty care — explore our full catalogue of treatments, styling and finishing services."
        />

        <CategoryTabs
          categories={SERVICE_CATEGORIES}
          activeSlug={activeSlug}
          onChange={handleCategoryChange}
          ariaLabel="Service categories"
          layoutId="services-tab-indicator"
        />

        <div className="mx-auto mb-8 h-1 max-w-4xl rounded-full bg-peach/60 md:mb-10" aria-hidden="true" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={activeCategory.slug} custom={direction} {...contentMotion}>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,34%)] lg:gap-12 xl:gap-16">
              <div className="min-w-0">
                <EditorialMobileImage
                  src={activeCategory.image}
                  alt={activeCategory.imageAlt}
                  label={activeCategory.navLabel}
                  heading={activeCategory.heading}
                  tagline={activeCategory.tagline}
                />

                <ServicePricingCard
                  heading={activeCategory.heading}
                  tagline={activeCategory.tagline}
                  groups={groups}
                  priceColumns={priceColumns}
                  onEnquire={() => scrollTo('#contact')}
                />

                <motion.div
                  className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10 lg:justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2, ease: EDITORIAL_EASE }}
                >
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo('#contact')
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-gold bg-gold px-7 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white"
                    whileHover={
                      reducedMotion ? undefined : { y: -2, boxShadow: '0 10px 32px rgba(202,138,4,0.28)' }
                    }
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                  >
                    Enquire About a Service
                  </motion.a>

                  <AnimatePresence mode="wait">
                    {isBridalRelated && (
                      <motion.a
                        key="bridal-link"
                        href="#bridal-studio"
                        onClick={(e) => {
                          e.preventDefault()
                          scrollTo('#bridal-studio')
                        }}
                        className="inline-flex items-center gap-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em] text-dark/60 transition-colors hover:text-gold"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
                      >
                        View bridal experience
                        <motion.span
                          aria-hidden="true"
                          animate={reducedMotion ? undefined : { x: [0, 3, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          →
                        </motion.span>
                      </motion.a>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="relative hidden lg:block">
                <div className="sticky top-[calc(var(--site-header-height)+2rem)]">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeCategory.slug} {...imageMotion}>
                      <EditorialImagePanel
                        src={activeCategory.image}
                        alt={activeCategory.imageAlt}
                        index={activeCategory.id}
                        heading={activeCategory.heading}
                        caption={`${String(activeIndex + 1).padStart(2, '0')} of ${String(SERVICE_CATEGORIES.length).padStart(2, '0')}`}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`meta-${activeCategory.slug}`}
                      className="mt-5 border-t border-dark/8 pt-5 font-sans text-[0.8125rem] leading-relaxed text-text-muted"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, delay: 0.12, ease: EDITORIAL_EASE }}
                    >
                      Tap any service to enquire — consultations available via WhatsApp for all
                      treatments listed.
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
