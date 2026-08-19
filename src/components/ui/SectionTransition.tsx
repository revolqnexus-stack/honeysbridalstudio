import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08])
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.75], [0, 1, 0])
  const contentY = useTransform(scrollYProgress, [0.15, 0.45], [24, 0])

  const heights = {
    sm: 'min-h-[42vh] md:min-h-[48vh]',
    md: 'min-h-[52vh] md:min-h-[62vh]',
    lg: 'min-h-[62vh] md:min-h-[72vh]',
  }

  return (
    <div
      ref={ref}
      data-nav-surface="dark"
      className={`relative w-full overflow-hidden ${heights[height]}`}
    >
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <StudioImage src={src} fallback={fallback} alt={alt} className="h-full w-full object-cover" />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(12,10,9,0.82) 0%, rgba(12,10,9,0.55) 42%, rgba(12,10,9,0.25) 100%)',
        }}
      />

      <motion.div
        className={`relative z-10 flex h-full items-end px-6 pb-12 md:px-10 md:pb-16 lg:px-12 ${
          align === 'center' ? 'justify-center text-center' : 'justify-start'
        }`}
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className={align === 'center' ? 'max-w-2xl' : 'max-w-xl'}>
          <motion.p
            className="mb-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-gold"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            className="font-serif text-3xl font-normal leading-tight text-white md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="mt-4 font-sans text-sm leading-relaxed text-white/55 md:text-base"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            className={`mt-6 h-px max-w-[100px] bg-gold/50 ${align === 'center' ? 'mx-auto' : ''}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            style={{ originX: align === 'center' ? 0.5 : 0 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

type StudioGalleryStripProps = {
  images: readonly { src: string; fallback: string; alt: string; caption: string }[]
}

export function StudioGalleryStrip({ images }: StudioGalleryStripProps) {
  return (
    <motion.div
      className="mb-12 grid grid-cols-3 gap-2 md:mb-14 md:gap-3"
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
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(180deg, transparent 40%, rgba(12,10,9,0.55) 100%)',
            }}
          />
          <figcaption className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-4">
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
