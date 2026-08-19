import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

function StudioImage({
  src,
  fallback,
  alt,
  className,
}: {
  src: string
  fallback: string
  alt: string
  className?: string
}) {
  const [current, setCurrent] = useState(src)

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (current !== fallback) setCurrent(fallback)
      }}
    />
  )
}

type SectionOrnamentProps = {
  label?: string
  variant?: 'light' | 'dark' | 'champagne'
}

export function SectionOrnament({ label, variant = 'light' }: SectionOrnamentProps) {
  const lineColor =
    variant === 'dark'
      ? 'rgba(255,255,255,0.12)'
      : variant === 'champagne'
        ? 'rgba(202,138,4,0.22)'
        : 'rgba(26,20,16,0.1)'

  return (
    <motion.div
      className={`relative py-10 md:py-14 ${variant === 'dark' ? 'bg-dark' : ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease }}
      aria-hidden={!label}
    >
      <div className="container-custom flex flex-col items-center gap-4">
        {label && (
          <motion.p
            className={`font-sans text-[0.625rem] font-medium uppercase tracking-[0.28em] ${
              variant === 'dark' ? 'text-gold/70' : 'text-gold'
            }`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            {label}
          </motion.p>
        )}

        <div className="flex w-full max-w-md items-center gap-4">
          <motion.span
            className="h-px flex-1 origin-right"
            style={{ background: lineColor }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          />
          <motion.span
            className="text-gold text-xs select-none"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
          >
            ✦
          </motion.span>
          <motion.span
            className="h-px flex-1 origin-left"
            style={{ background: lineColor }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          />
        </div>
      </div>
    </motion.div>
  )
}

type InterludeCopyProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align: 'left' | 'center'
}

function InterludeCopy({ eyebrow, title, subtitle, align }: InterludeCopyProps) {
  const textShadow = '0 2px 24px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.35)'

  return (
    <div
      className={`w-full ${
        align === 'center'
          ? 'mx-auto max-w-[min(100%,34rem)] text-center md:max-w-2xl'
          : 'max-w-[min(100%,28rem)] md:max-w-xl'
      }`}
    >
      <motion.p
        className="mb-2 font-sans text-[0.625rem] font-medium uppercase tracking-[0.24em] text-gold md:mb-3 md:text-[0.6875rem] md:tracking-[0.28em]"
        style={{ textShadow }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease }}
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        className="text-balance font-serif text-[clamp(1.75rem,5.8vw,3rem)] font-normal leading-[1.12] text-white md:text-[clamp(2rem,3.2vw,3rem)] md:leading-[1.08] lg:text-5xl"
        style={{ textShadow }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, delay: 0.06, ease }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`mt-3 font-sans text-sm leading-relaxed text-white/75 md:mt-4 md:text-base md:text-white/60 ${
            align === 'center' ? 'mx-auto max-w-prose' : 'max-w-md'
          }`}
          style={{ textShadow }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className={`mt-5 h-px max-w-[72px] bg-gold/60 md:mt-6 md:max-w-[100px] ${align === 'center' ? 'mx-auto' : ''}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.75, delay: 0.18, ease }}
        style={{ originX: align === 'center' ? 0.5 : 0 }}
      />
    </div>
  )
}

type StudioInterludeProps = {
  src: string
  fallback: string
  alt: string
  eyebrow?: string
  title?: string
  subtitle?: string
  height?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center'
}

export function StudioInterlude({
  src,
  fallback,
  alt,
  eyebrow = 'The Studio',
  title = 'Where artistry unfolds',
  subtitle,
  height = 'md',
  align = 'left',
}: StudioInterludeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['-6%', '6%'],
  )
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reducedMotion ? [1, 1, 1] : [1.06, 1, 1.06],
  )

  const heights = {
    sm: 'min-h-[50vh] md:min-h-[52vh]',
    md: 'min-h-[58vh] md:min-h-[64vh]',
    lg: 'min-h-[64vh] md:min-h-[72vh]',
  }

  const overlayPosition =
    align === 'center'
      ? 'items-center justify-center px-5 py-14 text-center md:px-10 md:py-16'
      : 'items-end justify-start px-5 pb-11 pt-16 md:px-10 md:pb-16 md:pt-20 lg:px-12'

  return (
    <div
      ref={ref}
      data-nav-surface="dark"
      className={`relative isolate w-full overflow-hidden ${heights[height]}`}
    >
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <StudioImage src={src} fallback={fallback} alt={alt} className="h-full w-full object-cover" />
      </motion.div>

      {align === 'center' ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12,10,9,0.62) 0%, rgba(12,10,9,0.38) 42%, rgba(12,10,9,0.72) 100%)',
          }}
        />
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(12,10,9,0.35) 0%, rgba(12,10,9,0.2) 35%, rgba(12,10,9,0.82) 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(105deg, rgba(12,10,9,0.84) 0%, rgba(12,10,9,0.52) 38%, rgba(12,10,9,0.18) 68%, rgba(12,10,9,0.08) 100%)',
            }}
          />
        </>
      )}

      <div className={`absolute inset-0 z-10 flex ${overlayPosition}`}>
        <InterludeCopy eyebrow={eyebrow} title={title} subtitle={subtitle} align={align} />
      </div>
    </div>
  )
}

type StudioGalleryStripProps = {
  images: readonly { src: string; fallback: string; alt: string; caption: string }[]
  className?: string
}

export function StudioGalleryStrip({ images, className = '' }: StudioGalleryStripProps) {
  return (
    <motion.div
      className={`grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 ${className}`.trim()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {images.map((image, index) => (
        <motion.figure
          key={image.src}
          className="group relative aspect-[4/5] overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.96 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.7, ease },
            },
          }}
        >
          <StudioImage
            src={image.src}
            fallback={image.fallback}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100"
            style={{
              background: 'linear-gradient(180deg, transparent 40%, rgba(12,10,9,0.55) 100%)',
            }}
          />
          <figcaption className="absolute bottom-0 left-0 right-0 p-3 opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-500 sm:group-hover:opacity-100 md:p-4">
            <span className="font-sans text-[0.5625rem] uppercase tracking-[0.18em] text-gold/90">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-serif text-sm text-white/90">{image.caption}</p>
          </figcaption>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold/30"
            aria-hidden="true"
          />
        </motion.figure>
      ))}
    </motion.div>
  )
}

export function RevealLine({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`h-px bg-gradient-to-r from-gold/60 via-gold/20 to-transparent ${className}`}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, ease }}
    />
  )
}
