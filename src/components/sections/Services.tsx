import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICE_CATEGORIES, LAYOUT } from '@/constants'
import {
  CategoryTabs,
  EditorialCategoryHeader,
  EditorialImagePanel,
  EditorialMasthead,
  EditorialServiceList,
} from '@/components/ui/EditorialCatalogue'

export function Services() {
  const [activeSlug, setActiveSlug] = useState<string>(SERVICE_CATEGORIES[0].slug)

  const activeCategory =
    SERVICE_CATEGORIES.find((category) => category.slug === activeSlug) ?? SERVICE_CATEGORIES[0]

  const activeIndex = SERVICE_CATEGORIES.findIndex((category) => category.slug === activeSlug)

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

  return (
    <section id="services" data-nav-surface="light" className="section-gap overflow-x-hidden bg-bg-alt">
      <div className="container-custom">
        <EditorialMasthead
          eyebrow="Honey's Beauty House"
          title="Services"
          subtitle="From signature bridal artistry to everyday beauty care — explore our full catalogue of treatments, styling and finishing services."
        />

        <CategoryTabs
          categories={SERVICE_CATEGORIES}
          activeSlug={activeSlug}
          onChange={setActiveSlug}
          ariaLabel="Service categories"
          layoutId="services-tab-indicator"
        />

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,40%)] lg:gap-14 xl:gap-20">
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative mb-8 aspect-[16/10] overflow-hidden lg:hidden">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.imageAlt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 50%, rgba(12,10,9,0.22) 100%)',
                    }}
                  />
                </div>

                <EditorialCategoryHeader
                  index={activeCategory.id}
                  label={activeCategory.navLabel}
                  heading={activeCategory.heading}
                  tagline={activeCategory.tagline}
                  serviceCount={activeCategory.services.length}
                />

                <EditorialServiceList
                  services={activeCategory.services}
                  onItemClick={() => scrollTo('#contact')}
                />

                <motion.div
                  className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo('#contact')
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-gold bg-gold px-7 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white"
                    whileHover={{ y: -2, boxShadow: '0 10px 32px rgba(202,138,4,0.28)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enquire About a Service
                  </motion.a>

                  {isBridalRelated && (
                    <a
                      href="#bridal-studio"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo('#bridal-studio')
                      }}
                      className="inline-flex items-center gap-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em] text-dark/60 transition-colors hover:text-gold"
                    >
                      View bridal experience
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-[calc(var(--site-header-height)+2rem)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.slug}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <EditorialImagePanel
                    src={activeCategory.image}
                    alt={activeCategory.imageAlt}
                    index={activeCategory.id}
                    heading={activeCategory.heading}
                    caption={`${String(activeIndex + 1).padStart(2, '0')} of ${String(SERVICE_CATEGORIES.length).padStart(2, '0')}`}
                  />
                </motion.div>
              </AnimatePresence>

              <motion.div
                key={`meta-${activeCategory.slug}`}
                className="mt-5 border-t border-dark/8 pt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <p className="mb-2 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-gold/70">
                  Category {String(activeCategory.id).padStart(2, '0')}
                </p>
                <p className="font-sans text-[0.8125rem] leading-relaxed text-text-muted">
                  Tap any service to enquire — consultations available via WhatsApp for all
                  treatments listed.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
