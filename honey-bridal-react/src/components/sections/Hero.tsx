import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0])
  const contentY = useTransform(scrollY, [0, 350], [0, 40])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  // 80ms stagger after loader (2.5s)
  const base = 2.5
  const s = (i: number) => ({ duration: 0.8, delay: base + i * 0.08, ease: [0.22, 1, 0.36, 1] as const })

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-[640px] overflow-hidden flex items-end"
    >
      {/* Desktop Video — image does the heavy lifting */}
      <video
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center top' }}
        src="/photos/hero video pc.mp4"
        autoPlay muted loop playsInline
        poster="/photos/hero.webp"
      />

      {/* Mobile Video */}
      <video
        className="md:hidden absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center top' }}
        src="/photos/hero video mobile.mp4"
        autoPlay muted loop playsInline
        poster="/photos/hero.webp"
      />

      {/* Overlay — left-heavy so text pops, image breathes on right */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(12,10,9,0.72) 0%, rgba(12,10,9,0.35) 50%, rgba(12,10,9,0.05) 100%),
            linear-gradient(to top, rgba(12,10,9,0.85) 0%, rgba(12,10,9,0.25) 45%, transparent 75%)
          `,
        }}
      />

      {/* ── Content — sits at the bottom left, max 580px wide ── */}
      <motion.div
        className="relative z-10 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="px-6 md:px-16 lg:px-20 pb-14 md:pb-24" style={{ maxWidth: '580px' }}>

          {/* Headline — whisper not scream */}
          {/* Desktop: 2 lines. Mobile: natural wrap at ~52px */}
          <motion.h1
            className="font-serif font-normal text-white"
            style={{
              fontSize: 'clamp(42px, 5.2vw, 78px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={s(1)}
          >
            Gracefully You,<br />
            <em style={{ color: 'rgba(255,255,255,0.75)', fontStyle: 'italic' }}>
              Beautifully Bridal.
            </em>
          </motion.h1>

          {/* Gold accent line — thin, subtle */}
          <motion.div
            style={{
              width: '48px',
              height: '1px',
              marginTop: '18px',
              marginBottom: '18px',
              background: 'rgba(202,138,4,0.6)',
            }}
            initial={{ scaleX: 0, originX: '0%' }}
            animate={{ scaleX: 1 }}
            transition={s(2)}
          />

          {/* Subtitle — max ~34 chars per line */}
          <motion.p
            className="font-sans font-light"
            style={{
              fontSize: 'clamp(14px, 1.6vw, 16px)',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.78)',
              maxWidth: '320px',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={s(3)}
          >
            Kerala's premier certified airbrush artist for Hindu, Christian &amp; Muslim weddings.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={s(4)}
          >
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="inline-flex items-center justify-center font-sans font-medium uppercase text-white text-[0.7rem] tracking-[0.12em] rounded-full border border-white/25 backdrop-blur-sm w-full sm:w-auto"
              style={{ height: '54px', padding: '0 32px', background: 'rgba(12,10,9,0.55)' }}
              whileHover={{ y: -2, background: '#CA8A04', borderColor: '#CA8A04', boxShadow: '0 10px 36px rgba(202,138,4,0.3)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              Book Your Wedding Look
            </motion.a>

            <motion.a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); scrollTo('#portfolio') }}
              className="inline-flex items-center justify-center font-sans font-medium uppercase text-white/75 text-[0.7rem] tracking-[0.12em] rounded-full border border-white/15 w-full sm:w-auto"
              style={{ height: '54px', padding: '0 32px' }}
              whileHover={{ y: -2, color: 'rgba(255,255,255,1)', borderColor: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.07)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              View Portfolio
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.38 }}
        transition={{ delay: base + 0.5, duration: 1 }}
      >
        <span
          className="font-sans font-medium uppercase text-white"
          style={{ fontSize: '0.48rem', letterSpacing: '0.22em', writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="relative overflow-hidden" style={{ width: '1px', height: '44px', background: 'rgba(255,255,255,0.18)' }}>
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gold"
            style={{ height: '40%' }}
            animate={{ y: ['0%', '250%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
