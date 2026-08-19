import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LAYOUT, SERVICE_CATEGORIES } from '@/constants'
import {
  CategoryTabs,
  EditorialCategoryHeader,
  EditorialImagePanel,
  EditorialMasthead,
  EditorialServiceList,
} from '@/components/ui/EditorialCatalogue'

const BRIDAL_CATEGORY_SLUGS = ['makeup', 'bridal'] as const

const BRIDAL_PULL_QUOTES = [
  'Every look begins with understanding your features, your outfit, and the story of your day.',
  'From the first touch of makeup to the final fold of your saree — every detail is considered.',
] as const

export function BridalExperience() {
  const bridalCategories = useMemo(
    () =>
      SERVICE_CATEGORIES.filter((category) =>
        (BRIDAL_CATEGORY_SLUGS as readonly string[]).includes(category.slug),
      ),
    [],
  )

  const [activeSlug, setActiveSlug] = useState<string>(bridalCategories[0]?.slug ?? 'makeup')

  const activeCategory =
    bridalCategories.find((category) => category.slug === activeSlug) ?? bridalCategories[0]

  const serviceOffset = useMemo(() => {
    let offset = 0
    for (const category of bridalCategories) {
      if (category.slug === activeSlug) return offset
      offset += category.services.length
    }
    return 0
  }, [activeSlug, bridalCategories])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - LAYOUT.headerHeightPx,
        behavior: 'smooth',
      })
    }
  }

  if (!activeCategory) return null

  return (
    <section id="bridal-studio" data-nav-surface="light" className="section-gap bg-bg">
      <div className="container-custom">
        <EditorialMasthead
          eyebrow="Your Day"
          title="Your Artistry"
          scriptLine="Beautifully, entirely you."
          subtitle="Personalized bridal beauty that celebrates your unique style, tradition, and the quiet confidence of your wedding day."
        />

        {/* Editorial bridge */}
        <motion.blockquote
          className="mx-auto mb-12 max-w-2xl border-l-2 border-gold/40 py-1 pl-6 md:mb-14"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif text-lg italic leading-relaxed text-dark/85 md:text-xl">
            &ldquo;Honey&apos;s provides much more than makeup — we craft your complete bridal preparation
            ritual.&rdquo;
          </p>
        </motion.blockquote>

        <div className="mb-8 text-center md:mb-10">
          <h3 className="font-serif text-3xl font-normal leading-tight text-dark md:text-4xl">
            The Complete Bridal Experience
          </h3>
        </div>

        <CategoryTabs
          categories={bridalCategories}
          activeSlug={activeSlug}
          onChange={setActiveSlug}
          ariaLabel="Bridal service categories"
          layoutId="bridal-tab-indicator"
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
                  label={activeCategory.title}
                  heading={activeCategory.heading}
                  tagline={activeCategory.tagline}
                  serviceCount={activeCategory.services.length}
                />

                <p className="-mt-4 mb-6 max-w-lg font-sans text-sm italic leading-relaxed text-text-muted/90">
                  {BRIDAL_PULL_QUOTES[activeCategory.slug === 'makeup' ? 0 : 1]}
                </p>

                <EditorialServiceList
                  services={activeCategory.services}
                  startIndex={serviceOffset + 1}
                  onItemClick={() => scrollTo('#contact')}
                />

                <motion.div
                  className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
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
                    Plan Your Bridal Experience
                  </motion.a>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo('#services')
                    }}
                    className="inline-flex items-center gap-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em] text-dark/60 transition-colors hover:text-gold"
                  >
                    Explore all services
                    <span aria-hidden="true">→</span>
                  </a>
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
                    caption="Bridal Studio"
                  />
                </motion.div>
              </AnimatePresence>

              <motion.p
                key={`note-${activeCategory.slug}`}
                className="mt-5 font-sans text-[0.6875rem] leading-relaxed tracking-[0.06em] text-text-muted/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                On-location across Idukki, Munnar, Ernakulam and surrounding districts.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
