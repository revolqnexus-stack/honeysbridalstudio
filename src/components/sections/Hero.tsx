import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion'
import { LAYOUT, SITE_CONFIG } from '@/constants'
import { useEnquiryModal } from '@/context/EnquiryModalContext'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const videoDesktopRef = useRef<HTMLVideoElement>(null)
  const videoMobileRef = useRef<HTMLVideoElement>(null)

  const { scrollY } = useScroll()
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0])
  const contentY = useTransform(scrollY, [0, 350], [0, 40])

  const videoScaleMotion = useMotionValue(1)
  const videoScale = useSpring(videoScaleMotion, { stiffness: 6, damping: 40 })

  const [videoReady, setVideoReady] = useState(false)

  const startZoom = () => {
    animate(videoScaleMotion, 1.04, {
      duration: 25,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'mirror',
    })
  }

  const handleVideoReady = () => {
    const desktopReady = (videoDesktopRef.current?.readyState ?? 0) >= 4
    const mobileReady = (videoMobileRef.current?.readyState ?? 0) >= 4
    if (desktopReady || mobileReady) {
      setVideoReady(true)
      startZoom()
    }
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

  const { open: openEnquiry } = useEnquiryModal()

  const base = 2.5
  const s = (i: number) => ({ duration: 0.8, delay: base + i * 0.1, ease: [0.22, 1, 0.36, 1] as const })

  return (
    <section
      ref={containerRef}
      id="hero"
      data-nav-surface="dark"
      className="relative h-screen min-h-[640px] overflow-hidden"
    >
      {/* ── VIDEO LAYER ── */}
      <motion.img
        src="/photos/hero.webp"
        alt=""
        className="absolute inset-0 z-[1] h-full w-full object-cover object-[center_38%] md:object-[74%_20%]"
        fetchPriority="high"
        animate={{ opacity: videoReady ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.video
        ref={videoDesktopRef}
        className="absolute inset-0 z-[0] hidden h-full w-full object-cover md:block"
        style={{ objectPosition: '74% 20%', scale: videoScale }}
        src="/photos/hero video pc.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onCanPlayThrough={handleVideoReady}
      />

      <motion.video
        ref={videoMobileRef}
        className="absolute inset-0 z-[0] h-full w-full object-cover md:hidden"
        style={{ objectPosition: 'center 35%', scale: videoScale }}
        src="/photos/hero video mobile.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onCanPlayThrough={handleVideoReady}
      />

      {/* ── CINEMATIC GRADE — soft vignette, no hard panels ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: 'rgba(18, 12, 8, 0.06)' }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 42%, transparent 42%, rgba(6,5,4,0.32) 100%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,5,4,0.28) 0%, transparent 28%, transparent 68%, rgba(6,5,4,0.42) 100%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
        style={{
          background:
            'linear-gradient(108deg, rgba(8,6,4,0.5) 0%, rgba(8,6,4,0.22) 18%, rgba(8,6,4,0.06) 32%, transparent 46%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[5] md:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,5,4,0.55) 0%, rgba(6,5,4,0.28) 28%, transparent 58%)',
        }}
      />

      {/* ── HERO CONTENT LAYER — structural grid below header safe zone ── */}
      <motion.div
        className="relative z-10 flex h-full flex-col"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Header safe zone — reserves navbar territory */}
        <div
          className="shrink-0"
          style={{ height: 'var(--site-header-height)' }}
          aria-hidden="true"
        />

        {/* Editorial composition area */}
        <div
          className="flex flex-1 flex-col md:justify-center"
          style={{
            paddingTop: 'var(--hero-content-gap)',
            paddingBottom: 'clamp(3rem, 8vh, 5.5rem)',
          }}
        >
          {/* Desktop */}
          <div className="container-custom hidden md:block">
            <div className="relative max-w-xl lg:max-w-[540px]">
            <motion.p
              className="font-sans uppercase"
              style={{
                fontWeight: 500,
                fontSize: '0.6875rem',
                letterSpacing: '0.22em',
                color: '#C79A4A',
                marginBottom: '1rem',
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(1)}
            >
              {SITE_CONFIG.tagline}
            </motion.p>

            <motion.h1
              className="font-serif"
              style={{
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textShadow: '0 1px 2px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.45), 0 24px 64px rgba(0,0,0,0.25)',
                maxWidth: '520px',
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(2)}
            >
              <span
                style={{
                  display: 'block',
                  fontWeight: 400,
                  color: 'rgba(199,154,74,0.82)',
                  fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                BEAUTY,
              </span>
              <span
                style={{
                  display: 'block',
                  fontWeight: 400,
                  color: 'rgba(245,240,232,0.96)',
                  fontSize: 'clamp(3rem, 5.2vw, 4.75rem)',
                  marginTop: '-0.02em',
                }}
              >
                MASTERED.
              </span>
            </motion.h1>

            <motion.p
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontWeight: 400,
                fontSize: 'clamp(1.75rem, 2.4vw, 2.375rem)',
                lineHeight: 1.15,
                color: '#ffffff',
                marginTop: '0.5rem',
                marginLeft: '0.75rem',
                textShadow: '0 2px 16px rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(3)}
            >
              {SITE_CONFIG.motto}
            </motion.p>

            <motion.div
              className="flex items-center gap-3"
              style={{ marginTop: '1.375rem', marginBottom: '1.375rem', maxWidth: '280px' }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={s(2)}
            >
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, #C79A4A, rgba(199,154,74,0.2))' }} />
              <span style={{ fontSize: '0.625rem', color: '#C79A4A' }}>✦</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, #C79A4A, rgba(199,154,74,0.2))' }} />
            </motion.div>

            <motion.p
              className="font-sans"
              style={{
                fontWeight: 400,
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.78)',
                maxWidth: '22rem',
                textShadow: '0 1px 3px rgba(0,0,0,0.45)',
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(4)}
            >
              {SITE_CONFIG.description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(5)}
            >
              <motion.button
                type="button"
                onClick={() => openEnquiry('bridal')}
                className="inline-flex items-center justify-center rounded-full border border-[#C79A4A] bg-[#C79A4A] px-7 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-white"
                style={{
                  height: '2.75rem',
                  boxShadow: '0 4px 24px rgba(199,154,74,0.28)',
                }}
                whileHover={{
                  y: -2,
                  background: '#D5A85A',
                  borderColor: '#D5A85A',
                  boxShadow: '0 10px 36px rgba(199,154,74,0.4)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22 }}
              >
                Book Your Bridal Experience
              </motion.button>

              <motion.a
                href="#academy"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#academy')
                }}
                className="inline-flex items-center gap-2 rounded-full border px-5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.13em]"
                style={{
                  height: '2.75rem',
                  color: 'rgba(255,253,248,0.92)',
                  background: 'rgba(255,255,255,0.07)',
                  borderColor: 'rgba(255,255,255,0.28)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
                whileHover={{
                  color: '#FFFDF8',
                  background: 'rgba(255,255,255,0.14)',
                  borderColor: 'rgba(199,154,74,0.55)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22 }}
              >
                Explore the Academy
                <span style={{ fontSize: '0.875rem', lineHeight: 1 }}>↗</span>
              </motion.a>
            </motion.div>
            </div>
          </div>
          <div
            className="flex flex-1 flex-col justify-end px-6 md:hidden"
            style={{ paddingBottom: '1.5rem' }}
          >
            <motion.p
              className="font-sans uppercase"
              style={{
                fontWeight: 500,
                fontSize: '0.625rem',
                letterSpacing: '0.18em',
                color: '#C79A4A',
                marginBottom: '0.75rem',
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(1)}
            >
              {SITE_CONFIG.tagline}
            </motion.p>

            <motion.h1
              className="font-serif"
              style={{
                lineHeight: 0.92,
                letterSpacing: '-0.035em',
                textShadow: '0 4px 20px rgba(0,0,0,0.35)',
                maxWidth: '18rem',
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(2)}
            >
              <span
                style={{
                  display: 'block',
                  fontWeight: 400,
                  color: 'rgba(199,154,74,0.85)',
                  fontSize: 'clamp(1.75rem, 7.5vw, 2.25rem)',
                }}
              >
                BEAUTY,
              </span>
              <span
                style={{
                  display: 'block',
                  fontWeight: 400,
                  color: 'rgba(245,240,232,0.95)',
                  fontSize: 'clamp(2.375rem, 10vw, 3rem)',
                  marginTop: '-0.04em',
                }}
              >
                MASTERED.
              </span>
            </motion.h1>

            <motion.p
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontWeight: 400,
                fontSize: 'clamp(1.625rem, 6vw, 2rem)',
                lineHeight: 1.15,
                color: '#ffffff',
                marginTop: '0.375rem',
                marginLeft: '0.375rem',
                textShadow: '0 2px 16px rgba(0,0,0,0.5)',
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(3)}
            >
              {SITE_CONFIG.motto}
            </motion.p>

            <motion.div
              className="flex items-center gap-3"
              style={{ marginTop: '1.125rem', marginBottom: '1.125rem', maxWidth: '220px' }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={s(2)}
            >
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, #C79A4A, rgba(199,154,74,0.2))' }} />
              <span style={{ fontSize: '0.6875rem', color: '#C79A4A' }}>✦</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, #C79A4A, rgba(199,154,74,0.2))' }} />
            </motion.div>

            <motion.p
              className="font-sans"
              style={{
                fontWeight: 400,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(245,240,232,0.75)',
                maxWidth: '18.75rem',
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(4)}
            >
              {SITE_CONFIG.description}
            </motion.p>

            <motion.div
              className="mt-6 flex flex-col gap-2.5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={s(5)}
            >
              <motion.button
                type="button"
                onClick={() => openEnquiry('bridal')}
                className="inline-flex h-11 w-full max-w-xs items-center justify-center rounded-full border border-[#C79A4A] bg-[#C79A4A] font-sans text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white"
                style={{ boxShadow: '0 4px 20px rgba(199,154,74,0.28)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22 }}
              >
                Book Your Bridal Experience
              </motion.button>

              <motion.a
                href="#academy"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#academy')
                }}
                className="inline-flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-full border font-sans text-[0.62rem] font-medium uppercase tracking-[0.12em]"
                style={{
                  color: 'rgba(255,253,248,0.92)',
                  background: 'rgba(255,255,255,0.08)',
                  borderColor: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
                whileHover={{
                  color: '#FFFDF8',
                  background: 'rgba(255,255,255,0.14)',
                  borderColor: 'rgba(199,154,74,0.45)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22 }}
              >
                Explore the Academy
                <span style={{ fontSize: '0.8125rem', lineHeight: 1 }}>↗</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint — desktop only */}
      <motion.div
        className="absolute bottom-24 right-8 z-10 hidden flex-col items-center gap-2.5 md:flex md:right-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: base + 0.6, duration: 1 }}
      >
        <span
          className="font-sans font-medium uppercase text-white"
          style={{ fontSize: '0.5625rem', letterSpacing: '0.22em', writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div
          className="relative overflow-hidden"
          style={{ width: '1px', height: '44px', background: 'rgba(255,255,255,0.12)' }}
        >
          <motion.div
            className="absolute left-0 right-0 top-0"
            style={{ height: '40%', background: '#C79A4A' }}
            animate={{ y: ['0%', '250%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
