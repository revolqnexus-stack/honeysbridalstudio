import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const

const TAB_SPRING = { type: 'spring' as const, stiffness: 420, damping: 34 }

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EDITORIAL_EASE } },
}

const fadeSlide = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.42, ease: EDITORIAL_EASE } },
}

const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
}

const mastheadStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

const headerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
}

export function getCategoryContentMotion(direction: number, reducedMotion: boolean | null) {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.18 },
    }
  }

  return {
    initial: { opacity: 0, x: direction * 32, y: 8 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: direction * -24, y: -6 },
    transition: { duration: 0.48, ease: EDITORIAL_EASE },
  }
}

export function getCategoryImageMotion(reducedMotion: boolean | null) {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    }
  }

  return {
    initial: { opacity: 0, scale: 1.04, y: 12 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: -8 },
    transition: { duration: 0.58, ease: EDITORIAL_EASE },
  }
}

export type EditorialService = {
  name: string
  description: string
  price?: number | null
  priceBoth?: number | null
  priceOne?: number | null
}

export type ServicePriceColumn = {
  key: 'price' | 'priceBoth' | 'priceOne'
  label: string
}

export type ServiceGroup = {
  label: string
  services: readonly EditorialService[]
}

const DEFAULT_PRICE_COLUMNS: readonly ServicePriceColumn[] = [{ key: 'price', label: 'Price' }]

function formatInr(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

type ServicePricingTableProps = {
  groups: readonly ServiceGroup[]
  priceColumns?: readonly ServicePriceColumn[]
  onEnquire?: () => void
}

export function ServicePricingTable({
  groups,
  priceColumns = DEFAULT_PRICE_COLUMNS,
  onEnquire,
}: ServicePricingTableProps) {
  const reducedMotion = useReducedMotion()

  const renderPriceCell = (service: EditorialService, column: ServicePriceColumn) => {
    const value = service[column.key]
    const hasPrice = typeof value === 'number' && value > 0

    if (hasPrice) {
      return (
        <span className="font-serif text-base tabular-nums text-dark md:text-[1.0625rem]">
          {formatInr(value)}
        </span>
      )
    }

    return (
      <button
        type="button"
        onClick={onEnquire}
        className="font-serif text-sm italic text-text-muted/70 transition-colors hover:text-gold md:text-base"
      >
        Enquire
      </button>
    )
  }

  return (
    <div className="divide-y divide-dark/[0.06]">
      {groups.map((group, groupIndex) => (
        <motion.div
          key={group.label}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: groupIndex * 0.06, ease: EDITORIAL_EASE }}
        >
          <p className="px-4 pb-3 pt-5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-text-muted/75 sm:px-5 md:px-8 md:pt-8">
            {group.label}
          </p>

          {/* Mobile: stacked rows — no table clipping */}
          <ul className="md:hidden">
            {group.services.map((service, rowIndex) => (
              <li
                key={service.name}
                className={`px-4 py-4 sm:px-5 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-blush-row'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-base leading-snug text-dark">{service.name}</p>
                    {service.description && (
                      <p className="mt-1.5 break-words font-sans text-xs leading-relaxed text-text-muted/80">
                        {service.description}
                      </p>
                    )}
                  </div>
                  {priceColumns.length === 1 && (
                    <div className="shrink-0 pt-0.5">{renderPriceCell(service, priceColumns[0])}</div>
                  )}
                </div>
                {priceColumns.length > 1 && (
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-dark/[0.06] pt-3">
                    {priceColumns.map((column) => (
                      <div key={column.key} className="min-w-0">
                        <span className="mb-1 block font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-text-muted/70">
                          {column.label}
                        </span>
                        {renderPriceCell(service, column)}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop: table layout */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blush">
                  <th
                    scope="col"
                    className="px-8 py-3.5 text-left font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-dark/80"
                  >
                    Service
                  </th>
                  {priceColumns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="whitespace-nowrap px-8 py-3.5 text-right font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-dark/80"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.services.map((service, rowIndex) => (
                  <tr
                    key={service.name}
                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-blush-row'}
                  >
                    <td className="max-w-md px-8 py-[1.125rem]">
                      <span className="block font-serif text-[1.0625rem] leading-snug text-dark">
                        {service.name}
                      </span>
                      {service.description && (
                        <span className="mt-1 block break-words font-sans text-[0.8125rem] leading-relaxed text-text-muted/80">
                          {service.description}
                        </span>
                      )}
                    </td>
                    {priceColumns.map((column) => (
                      <td
                        key={column.key}
                        className="whitespace-nowrap px-8 py-[1.125rem] text-right align-top"
                      >
                        {renderPriceCell(service, column)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

type ServicePricingCardProps = {
  heading: string
  tagline: string
  groups: readonly ServiceGroup[]
  priceColumns?: readonly ServicePriceColumn[]
  onEnquire?: () => void
}

export function ServicePricingCard({
  heading,
  tagline,
  groups,
  priceColumns,
  onEnquire,
}: ServicePricingCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 -top-1 select-none overflow-hidden text-center md:-top-4"
        aria-hidden="true"
      >
        <span className="block px-4 font-serif text-[clamp(2rem,9vw,5.5rem)] font-normal leading-none text-gold/[0.09] sm:px-6">
          {heading}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_48px_rgba(26,20,16,0.07)] ring-1 ring-dark/[0.04] md:rounded-3xl">
        <ServicePricingTable groups={groups} priceColumns={priceColumns} onEnquire={onEnquire} />
        <div className="border-t border-dark/[0.06] bg-blush-row/50 px-5 py-4 md:px-8">
          <p className="font-sans text-xs leading-relaxed text-text-muted md:text-[0.8125rem]">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  )
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
  const reducedMotion = useReducedMotion()

  const renderItem = (service: EditorialService, index: number) => {
    const num = startIndex + index

    return (
      <motion.button
        type="button"
        onClick={onItemClick}
        className="group flex w-full items-start gap-4 py-5 text-left transition-colors duration-300 hover:bg-dark/[0.02] md:gap-5 md:py-6"
        whileHover={reducedMotion ? undefined : { x: 3 }}
        whileTap={reducedMotion ? undefined : { scale: 0.995 }}
        transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
      >
        <motion.span
          className="shrink-0 pt-1 font-sans text-[0.6875rem] font-medium tabular-nums tracking-[0.08em] text-gold/70 transition-colors group-hover:text-gold"
          initial={false}
          whileHover={reducedMotion ? undefined : { scale: 1.05 }}
        >
          {String(num).padStart(2, '0')}
        </motion.span>

        <span className="min-w-0 flex-1">
          <span className="mb-1.5 block font-serif text-lg leading-snug text-dark transition-colors duration-300 group-hover:text-dark/90 md:text-xl">
            {service.name}
          </span>
          <span className="block font-sans text-sm leading-relaxed text-text-muted transition-colors duration-300 group-hover:text-text-muted/90">
            {service.description}
          </span>
        </span>

        <span className="relative hidden min-w-[3rem] shrink-0 items-center pt-2 md:flex">
          <motion.span
            className="h-px flex-1 origin-right bg-gold/40"
            initial={{ scaleX: 0 }}
            whileHover={reducedMotion ? undefined : { scaleX: 1 }}
            transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
            aria-hidden="true"
          />
          <motion.span
            className="ml-1 font-sans text-sm text-gold/0 group-hover:text-gold"
            initial={false}
            whileHover={reducedMotion ? undefined : { x: 2, opacity: 1 }}
            transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
            aria-hidden="true"
          >
            ↗
          </motion.span>
        </span>

        <span
          className="shrink-0 pt-1 font-sans text-sm text-gold/50 transition-colors duration-300 group-hover:text-gold md:hidden"
          aria-hidden="true"
        >
          ↗
        </span>
      </motion.button>
    )
  }

  if (animateOnView) {
    return (
      <ul className="divide-y divide-dark/8">
        {services.map((service, index) => (
          <motion.li
            key={service.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.42, delay: index * 0.04, ease: EDITORIAL_EASE }}
          >
            {renderItem(service, index)}
          </motion.li>
        ))}
      </ul>
    )
  }

  return (
    <motion.ul
      className="divide-y divide-dark/8"
      variants={listStagger}
      initial="hidden"
      animate="visible"
    >
      {services.map((service, index) => (
        <motion.li key={service.name} variants={fadeSlide}>
          {renderItem(service, index)}
        </motion.li>
      ))}
    </motion.ul>
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
      variants={headerStagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-3 flex flex-wrap items-center gap-3" variants={fadeUp}>
        <p className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold">
          {String(index).padStart(2, '0')} — {label}
        </p>
        {serviceCount !== undefined && (
          <span className="font-sans text-[0.625rem] uppercase tracking-[0.14em] text-text-muted/70">
            {serviceCount} services
          </span>
        )}
      </motion.div>
      <motion.h3
        className="font-serif text-2xl font-normal leading-tight text-dark md:text-[1.875rem] lg:text-[2rem]"
        variants={fadeUp}
      >
        {heading}
      </motion.h3>
      <motion.div
        className="my-4 h-px max-w-[280px] origin-left"
        style={{ background: 'linear-gradient(to right, #CA8A04, rgba(202,138,4,0.15))' }}
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.75, ease: EDITORIAL_EASE } },
        }}
      />
      <motion.p
        className="font-sans text-[0.9375rem] leading-relaxed text-text-muted md:text-base"
        variants={fadeUp}
      >
        {tagline}
      </motion.p>
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
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0%', '0%'] : ['-4%', '4%'])
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reducedMotion ? [1, 1, 1] : [1.06, 1, 1.06],
  )

  const overlayKey = `${index}-${heading}`

  return (
    <div ref={ref} className="relative aspect-[3/4] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,10,9,0.08) 0%, rgba(12,10,9,0.18) 45%, rgba(12,10,9,0.72) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-6 right-0 w-px bg-gold/25"
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={overlayKey}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: EDITORIAL_EASE }}
          >
            {caption && (
              <p
                className="mb-2 font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold/90"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}
              >
                {caption}
              </p>
            )}
            <p
              className="mb-1 font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-white/60"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}
            >
              {String(index).padStart(2, '0')} — Catalogue
            </p>
            <p
              className="text-balance font-serif text-xl text-white/95 md:text-2xl"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.45)' }}
            >
              {heading}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

type EditorialMobileImageProps = {
  src: string
  alt: string
  label?: string
  heading?: string
  tagline?: string
}

export function EditorialMobileImage({
  src,
  alt,
  label,
  heading,
  tagline,
}: EditorialMobileImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0%', '0%'] : ['-3%', '3%'])
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reducedMotion ? [1, 1, 1] : [1.05, 1, 1.05],
  )

  const hasOverlay = Boolean(label || heading || tagline)
  const textShadow = '0 2px 20px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.35)'

  return (
    <div ref={ref} className="relative mb-6 aspect-[16/10] overflow-hidden sm:mb-8 lg:hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: EDITORIAL_EASE }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: hasOverlay
            ? 'linear-gradient(180deg, rgba(12,10,9,0.28) 0%, rgba(12,10,9,0.12) 40%, rgba(12,10,9,0.82) 100%)'
            : 'linear-gradient(180deg, transparent 50%, rgba(12,10,9,0.22) 100%)',
        }}
      />
      {hasOverlay && (
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
          {label && (
            <p
              className="mb-2 font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold/90"
              style={{ textShadow }}
            >
              {label}
            </p>
          )}
          {heading && (
            <h3
              className="text-balance font-serif text-[clamp(1.5rem,6vw,2rem)] leading-tight text-white"
              style={{ textShadow }}
            >
              {heading}
            </h3>
          )}
          {tagline && (
            <p
              className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/70"
              style={{ textShadow }}
            >
              {tagline}
            </p>
          )}
        </div>
      )}
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
      variants={mastheadStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.p
        className="mb-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-gold"
        variants={fadeUp}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="font-serif text-4xl font-normal leading-[1.05] text-dark md:text-5xl lg:text-[3.5rem]"
        variants={fadeUp}
      >
        {title}
      </motion.h2>
      <motion.div
        className="section-divider my-5 origin-center"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1, transition: { duration: 0.85, ease: EDITORIAL_EASE } },
        }}
      />
      {scriptLine && (
        <motion.p
          className="mb-4 font-serif text-xl italic text-gold/90 md:text-2xl"
          style={{ fontFamily: "'Pinyon Script', cursive" }}
          variants={fadeUp}
        >
          {scriptLine}
        </motion.p>
      )}
      {subtitle && (
        <motion.p
          className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-text-muted md:text-lg"
          variants={fadeUp}
        >
          {subtitle}
        </motion.p>
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
  const reducedMotion = useReducedMotion()

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
      transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
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
                transition={{ duration: 0.4, delay: index * 0.04, ease: EDITORIAL_EASE }}
              >
                <motion.button
                  ref={(node) => {
                    if (node) tabRefs.current.set(category.slug, node)
                    else tabRefs.current.delete(category.slug)
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onChange(category.slug)}
                  className="group relative whitespace-nowrap px-4 py-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 md:px-5 md:text-[0.6875rem] md:tracking-[0.18em]"
                  animate={{
                    opacity: isActive ? 1 : 0.72,
                    y: isActive && !reducedMotion ? -1 : 0,
                  }}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                >
                  <span className={isActive ? 'text-dark' : 'text-text-muted/80'}>
                    {category.navLabel}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId={layoutId}
                      className="absolute bottom-0 left-4 right-4 h-px bg-gold md:left-5 md:right-5"
                      transition={reducedMotion ? { duration: 0.2 } : TAB_SPRING}
                    />
                  )}
                </motion.button>
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
        className="mx-auto mt-3 h-px max-w-4xl origin-center overflow-hidden"
        style={{ background: 'linear-gradient(to right, transparent, rgba(26,20,16,0.12), transparent)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EDITORIAL_EASE }}
      />
    </motion.div>
  )
}
