import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export type EditorialService = {
  name: string
  description: string
}

type EditorialServiceListProps = {
  services: readonly EditorialService[]
  startIndex?: number
  onItemClick?: () => void
  animateOnView?: boolean
}

export function EditorialServiceList({
  services,
  startIndex = 1,
  onItemClick,
  animateOnView = false,
}: EditorialServiceListProps) {
  const renderItem = (service: EditorialService, index: number) => {
    const num = startIndex + index

    return (
      <button
        type="button"
        onClick={onItemClick}
        className="group flex w-full items-start gap-4 py-5 text-left transition-colors duration-300 hover:bg-dark/[0.02] md:gap-5 md:py-6"
      >
        <span className="shrink-0 pt-1 font-sans text-[0.6875rem] font-medium tabular-nums tracking-[0.08em] text-gold/70 transition-colors group-hover:text-gold">
          {String(num).padStart(2, '0')}
        </span>

        <span className="min-w-0 flex-1">
          <span className="mb-1.5 block font-serif text-lg leading-snug text-dark md:text-xl">
            {service.name}
          </span>
          <span className="block font-sans text-sm leading-relaxed text-text-muted">
            {service.description}
          </span>
        </span>

        <span className="relative hidden min-w-[3rem] shrink-0 items-center pt-2 md:flex">
          <span
            className="h-px flex-1 origin-right scale-x-0 bg-gold/40 transition-transform duration-400 group-hover:scale-x-100"
            aria-hidden="true"
          />
          <span
            className="ml-1 font-sans text-sm text-gold/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold"
            aria-hidden="true"
          >
            ↗
          </span>
        </span>

        <span
          className="shrink-0 pt-1 font-sans text-sm text-gold/50 md:hidden"
          aria-hidden="true"
        >
          ↗
        </span>
      </button>
    )
  }

  return (
    <ul className="divide-y divide-dark/8">
      {services.map((service, index) =>
        animateOnView ? (
          <motion.li
            key={service.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderItem(service, index)}
          </motion.li>
        ) : (
          <motion.li
            key={service.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {renderItem(service, index)}
          </motion.li>
        ),
      )}
    </ul>
  )
}

type EditorialCategoryHeaderProps = {
  index: number
  label: string
  heading: string
  tagline: string
  serviceCount?: number
}

export function EditorialCategoryHeader({
  index,
  label,
  heading,
  tagline,
  serviceCount,
}: EditorialCategoryHeaderProps) {
  return (
    <motion.div
      className="mb-8 max-w-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <p className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold">
          {String(index).padStart(2, '0')} — {label}
        </p>
        {serviceCount !== undefined && (
          <span className="font-sans text-[0.625rem] uppercase tracking-[0.14em] text-text-muted/70">
            {serviceCount} services
          </span>
        )}
      </div>
      <h3 className="font-serif text-2xl font-normal leading-tight text-dark md:text-[1.875rem] lg:text-[2rem]">
        {heading}
      </h3>
      <motion.div
        className="my-4 h-px max-w-[280px]"
        style={{ background: 'linear-gradient(to right, #CA8A04, rgba(202,138,4,0.15))' }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      />
      <p className="font-sans text-[0.9375rem] leading-relaxed text-text-muted md:text-base">
        {tagline}
      </p>
    </motion.div>
  )
}

type EditorialImagePanelProps = {
  src: string
  alt: string
  index: number
  heading: string
  caption?: string
}

export function EditorialImagePanel({ src, alt, index, heading, caption }: EditorialImagePanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06])

  return (
    <div ref={ref} className="relative aspect-[3/4] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(12,10,9,0.04) 0%, rgba(12,10,9,0.28) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-6 right-0 w-px bg-gold/25"
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        {caption && (
          <p className="mb-2 font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold/80">
            {caption}
          </p>
        )}
        <p className="mb-1 font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-white/55">
          {String(index).padStart(2, '0')} — Catalogue
        </p>
        <p className="font-serif text-2xl text-white/95">{heading}</p>
      </div>
    </div>
  )
}

type EditorialMastheadProps = {
  eyebrow: string
  title: string
  subtitle?: string
  scriptLine?: string
}

export function EditorialMasthead({ eyebrow, title, subtitle, scriptLine }: EditorialMastheadProps) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-gold">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl font-normal leading-[1.05] text-dark md:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      <div className="section-divider my-5" />
      {scriptLine && (
        <p
          className="mb-4 font-serif text-xl italic text-gold/90 md:text-2xl"
          style={{ fontFamily: "'Pinyon Script', cursive" }}
        >
          {scriptLine}
        </p>
      )}
      {subtitle && (
        <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

type CategoryTabsProps = {
  categories: readonly { slug: string; navLabel: string }[]
  activeSlug: string
  onChange: (slug: string) => void
  ariaLabel: string
  layoutId?: string
}

export function CategoryTabs({
  categories,
  activeSlug,
  onChange,
  ariaLabel,
  layoutId = 'catalogue-tab-indicator',
}: CategoryTabsProps) {
  const tabRefs = useRef(new Map<string, HTMLButtonElement>())
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const activeTab = tabRefs.current.get(activeSlug)
    const container = scrollContainerRef.current
    if (!activeTab || !container) return

    const tabRect = activeTab.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const offset = tabRect.left - containerRect.left + container.scrollLeft
    const targetScroll = offset - container.clientWidth / 2 + tabRect.width / 2

    container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' })
  }, [activeSlug])

  return (
    <motion.div
      className="relative mb-10 overflow-hidden md:mb-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={scrollContainerRef}
        className="-mx-6 overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="flex w-max min-w-full justify-start gap-0 md:mx-auto md:w-auto md:justify-center"
          role="tablist"
          aria-label={ariaLabel}
        >
        {categories.map((category, index) => {
          const isActive = category.slug === activeSlug

          return (
            <motion.div
              key={category.slug}
              className="flex shrink-0 items-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                ref={(node) => {
                  if (node) tabRefs.current.set(category.slug, node)
                  else tabRefs.current.delete(category.slug)
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(category.slug)}
                className="group relative whitespace-nowrap px-4 py-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 md:px-5 md:text-[0.6875rem] md:tracking-[0.18em]"
              >
                <span className={isActive ? 'text-dark' : 'text-text-muted/80'}>{category.navLabel}</span>
                {isActive && (
                  <motion.span
                    layoutId={layoutId}
                    className="absolute bottom-0 left-4 right-4 h-px bg-gold md:left-5 md:right-5"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
              {index < categories.length - 1 && (
                <span className="hidden select-none text-gold/30 md:inline" aria-hidden="true">
                  ·
                </span>
              )}
            </motion.div>
          )
        })}
        </div>
      </div>
      <motion.div
        className="mx-auto mt-3 h-px max-w-4xl overflow-hidden"
        style={{ background: 'linear-gradient(to right, transparent, rgba(26,20,16,0.12), transparent)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}
