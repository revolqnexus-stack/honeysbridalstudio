import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const videoDesktopRef = useRef<HTMLVideoElement>(null)
  const videoMobileRef = useRef<HTMLVideoElement>(null)

  const { scrollY } = useScroll()
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0])
  const contentY = useTransform(scrollY, [0, 350], [0, 40])

  // Continuous slow zoom on the video — 1.00 → 1.03 over 25s, loop
  const videoScaleMotion = useMotionValue(1)
  const videoScale = useSpring(videoScaleMotion, { stiffness: 6, damping: 40 })

  const [videoReady, setVideoReady] = useState(false)

  // Start the slow zoom once video starts playing
  const startZoom = () => {
    animate(videoScaleMotion, 1.04, {
      duration: 25,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'mirror',
    })
  }

  // Only mark ready when the browser has buffered enough to play without stalling
  const handleVideoReady = () => {
    const desktopReady = (videoDesktopRef.current?.readyState ?? 0) >= 4
    const mobileReady  = (videoMobileRef.current?.readyState  ?? 0) >= 4
    if (desktopReady || mobileReady) {
      setVideoReady(true)
      startZoom()
    }
  }

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  // Stagger after loader finishes (2.5 s)
  const base = 2.5
  const s = (i: number) => ({ duration: 0.8, delay: base + i * 0.1, ease: [0.22, 1, 0.36, 1] as const })

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-[640px] overflow-hidden flex items-end"
    >
      {/* ── Poster — dissolves into video ── */}
      <motion.img
        src="/photos/hero.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        style={{ objectPosition: 'center top' }}
        fetchPriority="high"
        animate={{ opacity: videoReady ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Desktop Video ── */}
      <motion.video
        ref={videoDesktopRef}
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-[0]"
        style={{ objectPosition: 'center top', scale: videoScale }}
        src="/photos/hero video pc.mp4"
        autoPlay muted loop playsInline
        preload="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onCanPlayThrough={handleVideoReady}
      />

      {/* ── Mobile Video ── */}
      <motion.video
        ref={videoMobileRef}
        className="md:hidden absolute inset-0 w-full h-full object-cover z-[0]"
        style={{ objectPosition: 'center top', scale: videoScale }}
        src="/photos/hero video mobile.mp4"
        autoPlay muted loop playsInline
        preload="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onCanPlayThrough={handleVideoReady}
      />

      {/* ── Focal glow — naturally draws the eye to the bride ── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 42% 32%, rgba(255,220,170,0.08), transparent 45%)',
        }}
      />

      {/* ── Directional overlay — headline pops, image breathes right ── */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(9,8,7,0.82) 0%, rgba(9,8,7,0.46) 52%, rgba(9,8,7,0.08) 100%),
            linear-gradient(to top,   rgba(9,8,7,0.90) 0%, rgba(9,8,7,0.32) 45%, transparent 72%)
          `,
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="px-6 md:px-16 lg:px-20 pb-14 md:pb-24" style={{ maxWidth: '620px' }}>

          {/* Tag */}
          <motion.p
            className="font-sans font-medium uppercase"
            style={{ fontSize: '0.62rem', letterSpacing: '0.32em', color: '#C99643', marginBottom: '24px' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={s(0)}
          >
            Certified Bridal Makeup · Kerala
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-serif"
            style={{
              fontSize: 'clamp(40px, 5vw, 74px)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              textShadow: '0 6px 24px rgba(0,0,0,0.28)',
            }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={s(1)}
          >
            <span style={{ fontWeight: 700, display: 'block', color: '#FFFDF8' }}>
              Gracefully You,
            </span>
            <em style={{
              fontStyle: 'italic',
              fontWeight: 400,
              display: 'block',
              color: 'rgba(255,253,248,0.68)',
              marginTop: '0.04em',
            }}>
              Beautifully Bridal.
            </em>
          </motion.h1>

          {/* Gold accent line */}
          <motion.div
            style={{
              width: '52px',
              height: '1px',
              marginTop: '28px',
              marginBottom: '28px',
              background: 'linear-gradient(to right, #C99643, rgba(201,150,67,0.25))',
            }}
            initial={{ scaleX: 0, originX: '0%' }}
            animate={{ scaleX: 1 }}
            transition={s(2)}
          />

          {/* Subtitle */}
          <motion.p
            className="font-sans"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, 1.5vw, 15.5px)',
              lineHeight: 1.75,
              color: 'rgba(221,212,199,0.9)',
              maxWidth: '380px',
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={s(3)}
          >
            Kerala's premier certified airbrush artist for Hindu, Christian &amp; Muslim weddings.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-11"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={s(4)}
          >
            {/* Primary — gold */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="inline-flex items-center justify-center font-sans font-semibold uppercase text-white text-[0.68rem] tracking-[0.13em] rounded-full w-full sm:w-auto"
              style={{
                height: '54px',
                padding: '0 36px',
                background: '#C99643',
                border: '1px solid #C99643',
                boxShadow: '0 4px 28px rgba(201,150,67,0.32)',
              }}
              whileHover={{
                y: -2,
                background: '#D7A95A',
                borderColor: '#D7A95A',
                boxShadow: '0 14px 44px rgba(201,150,67,0.46)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22 }}
            >
              Book a Consultation
            </motion.a>

            {/* Secondary — ghost */}
            <motion.a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); scrollTo('#portfolio') }}
              className="inline-flex items-center justify-center font-sans font-medium uppercase text-[0.68rem] tracking-[0.13em] rounded-full w-full sm:w-auto"
              style={{
                height: '54px',
                padding: '0 36px',
                color: 'rgba(221,212,199,0.82)',
                border: '1px solid rgba(221,212,199,0.2)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{
                y: -2,
                color: '#FFFDF8',
                borderColor: 'rgba(221,212,199,0.42)',
                background: 'rgba(255,255,255,0.09)',
              }}
              whileTap={{ scale: 0.97 }}
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
        animate={{ opacity: 0.3 }}
        transition={{ delay: base + 0.6, duration: 1 }}
      >
        <span
          className="font-sans font-medium uppercase text-white"
          style={{ fontSize: '0.46rem', letterSpacing: '0.22em', writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div
          className="relative overflow-hidden"
          style={{ width: '1px', height: '44px', background: 'rgba(255,255,255,0.12)' }}
        >
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{ height: '40%', background: '#C99643' }}
            animate={{ y: ['0%', '250%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
