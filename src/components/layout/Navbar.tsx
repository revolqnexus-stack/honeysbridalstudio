import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue as _useMotionValue, useSpring as _useSpring } from 'framer-motion'
import { NAV_LINKS, SITE_CONFIG } from '@/constants'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    return () => document.body.classList.remove('no-scroll')
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollTo = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10"
        initial={{ y: -100, opacity: 0, paddingTop: 28, paddingBottom: 28 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          paddingTop: scrolled ? 12 : 28, 
          paddingBottom: scrolled ? 12 : 28 
        }}
        transition={{ 
          y: { duration: 0.6, delay: 2.4, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.6, delay: 2.4, ease: [0.22, 1, 0.36, 1] },
          paddingTop: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          paddingBottom: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }}
      >
        {/* Liquid Glass background pill — only when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <>
              {/* Main glass layer with advanced morphism */}
              <motion.div
                className="absolute inset-x-0 top-0 bottom-0 rounded-none"
                initial={{ opacity: 0, scale: 0.98, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.45) 100%)',
                  backdropFilter: 'blur(32px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                  borderBottom: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 8px 48px rgba(12,10,9,0.08), 0 2px 12px rgba(202,138,4,0.05), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(202,138,4,0.08)',
                }}
              />
              
              {/* Liquid shimmer overlay */}
              <motion.div
                className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(202,138,4,0.12) 50%, transparent 100%)',
                    transform: 'translateX(-100%)',
                  }}
                  animate={{
                    x: ['0%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 2,
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Logo with liquid glass hover */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
          className="relative z-10 flex flex-col items-start leading-none gap-[3px] group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Hover glow effect */}
          <motion.div
            className="absolute -inset-3 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(circle at center, rgba(202,138,4,0.08) 0%, transparent 70%)',
              filter: 'blur(12px)',
            }}
            transition={{ duration: 0.3 }}
          />
          
          <span
            className={cn('relative font-serif font-normal transition-all duration-500', scrolled ? 'text-dark' : 'text-white')}
            style={{ fontSize: '1.9rem', letterSpacing: '-0.01em', lineHeight: 1 }}
          >
            Honey's
            <motion.span
              className="absolute -bottom-0.5 left-0 h-[1px] bg-gold opacity-0 group-hover:opacity-100"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
          <span
            className={cn('relative font-sans font-light uppercase transition-all duration-500 group-hover:text-gold/70', scrolled ? 'text-dark/50' : 'text-white/50')}
            style={{ fontSize: '0.46rem', letterSpacing: '0.38em' }}
          >
            BRIDAL&nbsp;&nbsp;STUDIO
          </span>
        </motion.a>

        {/* Desktop links with liquid glass pills */}
        <motion.div
          className="relative z-10 hidden md:flex items-center"
          style={{ gap: '44px' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); setActiveLink(link.href) }}
              onMouseEnter={() => setActiveLink(link.href)}
              onMouseLeave={() => setActiveLink('')}
              className={cn(
                'relative font-sans font-medium uppercase transition-all duration-300 px-4 py-2 rounded-full',
                scrolled ? 'text-dark' : 'text-white/75',
              )}
              style={{ fontSize: '0.68rem', letterSpacing: '0.14em' }}
              whileHover={{
                background: scrolled 
                  ? 'rgba(202,138,4,0.08)' 
                  : 'rgba(255,255,255,0.12)',
              }}
            >
              {link.label}
              
              {/* Liquid underline */}
              <motion.span
                className="absolute -bottom-0 left-4 right-4 h-[2px] rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #CA8A04 50%, transparent 100%)',
                }}
                animate={{ 
                  scaleX: activeLink === link.href ? 1 : 0,
                  opacity: activeLink === link.href ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Glow effect on hover */}
              <motion.span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(202,138,4,0.15) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
                animate={{
                  opacity: activeLink === link.href ? 1 : 0,
                  scale: activeLink === link.href ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}

          {/* Book Now — enhanced liquid glass pill */}
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
            className={cn(
              'relative font-sans font-medium uppercase rounded-full transition-all duration-400 overflow-hidden',
              scrolled ? 'text-dark' : 'text-white'
            )}
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              padding: '10px 22px',
              border: scrolled ? '1.5px solid rgba(28,25,23,0.15)' : '1.5px solid rgba(255,255,255,0.3)',
              background: scrolled 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)' 
                : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              boxShadow: '0 2px 12px rgba(12,10,9,0.08), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
            whileHover={{
              background: 'linear-gradient(135deg, #CA8A04 0%, #B87A03 100%)',
              borderColor: '#CA8A04',
              color: '#ffffff',
              y: -2,
              boxShadow: '0 12px 32px rgba(202,138,4,0.35), 0 4px 12px rgba(202,138,4,0.2)',
              scale: 1.02,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Shimmer effect */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              }}
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 3,
              }}
            />
            <span className="relative z-10">Book Now</span>
          </motion.a>
        </motion.div>

        {/* Hamburger — morphing */}
        <motion.button
          className="relative z-10 md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.span
            className={cn('block h-[1.5px] w-full origin-center', open || !scrolled ? 'bg-white' : 'bg-dark')}
            animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className={cn('block h-[1.5px] origin-center', open || !scrolled ? 'bg-white' : 'bg-dark')}
            animate={open ? { width: '0%', opacity: 0 } : { width: '75%', opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className={cn('block h-[1.5px] w-full origin-center', open || !scrolled ? 'bg-white' : 'bg-dark')}
            animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.button>
      </motion.nav>

      {/* ── Fullscreen mobile menu ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Blur backdrop */}
            <motion.div
              className="fixed inset-0 z-[89]"
              style={{
                background: 'rgba(12,10,9,0.3)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />

            {/* Menu panel — liquid glass morphism */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[90] flex flex-col justify-between p-8 pt-24 overflow-hidden"
              style={{
                width: 'min(340px, 85vw)',
                background: 'linear-gradient(165deg, rgba(18,16,15,0.92) 0%, rgba(12,10,9,0.95) 100%)',
                backdropFilter: 'blur(48px) saturate(180%)',
                WebkitBackdropFilter: 'blur(48px) saturate(180%)',
                borderLeft: '1px solid rgba(202,138,4,0.15)',
                boxShadow: '-24px 0 96px rgba(0,0,0,0.5), inset 1px 0 0 rgba(255,255,255,0.04)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Animated gradient orb */}
              <motion.div
                className="absolute top-20 right-10 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(202,138,4,0.15) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(202,138,4,0.08) 50%, transparent 100%)',
                }}
                animate={{
                  y: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 2,
                }}
              />

              {/* Links with liquid glass hover */}
              <nav className="relative z-10 flex flex-col gap-1">
                {[...NAV_LINKS, { label: 'Contact', href: '#contact' }].map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                    className="relative font-serif text-4xl text-white py-3 border-b border-white/8 overflow-hidden group"
                    style={{ fontStyle: 'normal' }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ 
                      paddingLeft: '12px',
                      color: '#CA8A04',
                    }}
                  >
                    {/* Liquid glass background on hover */}
                    <motion.span
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, rgba(202,138,4,0.12) 0%, transparent 100%)',
                        backdropFilter: 'blur(8px)',
                      }}
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    
                    {/* Glow effect */}
                    <motion.span
                      className="absolute -left-2 top-1/2 w-1 h-8 -translate-y-1/2 rounded-full bg-gold opacity-0 group-hover:opacity-100"
                      style={{
                        boxShadow: '0 0 20px rgba(202,138,4,0.6)',
                        filter: 'blur(4px)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <span className="relative z-10">{link.label}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Footer info */}
              <motion.div
                className="flex flex-col gap-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

                <p className="font-sans text-xs text-white/30 leading-relaxed">
                  {SITE_CONFIG.location}
                </p>

                {/* WA CTA */}
                <motion.a
                  href={SITE_CONFIG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 font-sans font-medium uppercase text-white rounded-full"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    height: '48px',
                    padding: '0 24px',
                    background: 'rgba(202,138,4,0.15)',
                    border: '1px solid rgba(202,138,4,0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                  whileHover={{ background: '#CA8A04', borderColor: '#CA8A04' }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Book a Consultation
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
