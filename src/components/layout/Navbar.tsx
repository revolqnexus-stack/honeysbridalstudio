import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue as _useMotionValue, useSpring as _useSpring } from 'framer-motion'
import { NAV_LINKS, SITE_CONFIG, LAYOUT } from '@/constants'
import { useNavSurface } from '@/hooks/useNavSurface'
import { cn } from '@/utils/cn'

export function Navbar() {
  const overDark = useNavSurface()
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > 60 : false,
  )
  const [open, setOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
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
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - LAYOUT.headerHeightPx,
        behavior: 'smooth',
      })
      window.setTimeout(() => setScrolled(window.scrollY > 60), 400)
    }
  }

  const lightText = overDark
  const headerLight = open || lightText
  const showGlass = scrolled || !overDark
  const useDarkGlass = overDark && showGlass
  const showTopGradient = overDark && !scrolled

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 min-h-[var(--site-header-height)]"
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
        {/* Solid bar when mobile menu is open */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute inset-0 border-b border-white/10 bg-[#110e0c] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Subtle top gradient — navbar protection when not scrolled */}
        <AnimatePresence>
          {showTopGradient && (
            <motion.div
              className="absolute inset-x-0 top-0 bottom-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,.35), transparent)',
                height: '140px',
              }}
            />
          )}
        </AnimatePresence>

        {/* Liquid Glass background pill — only when scrolled */}
        <AnimatePresence>
          {showGlass && (
            <>
              {/* Main glass layer with advanced morphism */}
              <motion.div
                className="absolute inset-x-0 top-0 bottom-0 rounded-none"
                initial={{ opacity: 0, scale: 0.98, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={
                  useDarkGlass
                    ? {
                        background:
                          'linear-gradient(135deg, rgba(12,10,9,0.72) 0%, rgba(12,10,9,0.52) 100%)',
                        backdropFilter: 'blur(32px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        boxShadow:
                          '0 8px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
                      }
                    : {
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.45) 100%)',
                        backdropFilter: 'blur(32px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                        borderBottom: '1px solid rgba(255,255,255,0.4)',
                        boxShadow:
                          '0 8px 48px rgba(12,10,9,0.08), 0 2px 12px rgba(202,138,4,0.05), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(202,138,4,0.08)',
                      }
                }
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
            className={cn('relative font-serif font-normal transition-all duration-500', headerLight ? 'text-white' : 'text-dark')}
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
            className={cn('relative font-sans font-light uppercase transition-all duration-500 group-hover:text-gold/70', headerLight ? 'text-white/50' : 'text-dark/55')}
            style={{ fontSize: '0.46rem', letterSpacing: '0.38em' }}
          >
            BRIDAL ARTISTRY
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
                lightText ? 'text-white' : 'text-dark',
              )}
              style={{ fontSize: '0.68rem', letterSpacing: '0.14em' }}
              whileHover={{
                background: lightText
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(202,138,4,0.08)',
                color: lightText ? '#FFFDF8' : '#1c1917',
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
              lightText ? 'text-white' : 'text-dark'
            )}
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              padding: '10px 22px',
              border: lightText ? '1.5px solid rgba(255,255,255,0.3)' : '1.5px solid rgba(28,25,23,0.18)',
              background: lightText
                ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
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
            <span className="relative z-10">Enquire Now</span>
          </motion.a>
        </motion.div>

        {/* Hamburger */}
        <motion.button
          type="button"
          className={cn(
            'relative z-10 -mr-1 flex h-11 w-11 items-center justify-center rounded-full md:hidden',
            open && 'bg-white/10',
          )}
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <span className="relative block h-[14px] w-[22px]" aria-hidden="true">
            <motion.span
              className={cn(
                'absolute left-0 right-0 top-0 h-px rounded-full',
                open || headerLight ? 'bg-white' : 'bg-dark',
              )}
              animate={
                open
                  ? { top: '50%', rotate: 45, y: '-50%' }
                  : { top: 0, rotate: 0, y: 0 }
              }
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className={cn(
                'absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 rounded-full',
                open || headerLight ? 'bg-white' : 'bg-dark',
              )}
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              className={cn(
                'absolute bottom-0 left-0 right-0 h-px rounded-full',
                open || headerLight ? 'bg-white' : 'bg-dark',
              )}
              animate={
                open
                  ? { bottom: '50%', rotate: -45, y: '50%' }
                  : { bottom: 0, rotate: 0, y: 0 }
              }
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </motion.button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-x-0 bottom-0 z-[90] flex flex-col md:hidden"
            style={{
              top: 'var(--site-header-height)',
              background: 'linear-gradient(180deg, #14100d 0%, #0c0a09 100%)',
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex-1 overflow-y-auto overscroll-contain px-6 pb-4 pt-2">
              <p className="mb-4 font-sans text-[0.625rem] font-medium uppercase tracking-[0.24em] text-gold/70">
                Menu
              </p>

              <ul className="divide-y divide-white/10">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{
                      delay: 0.04 + index * 0.045,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(link.href)
                      }}
                      className="group flex items-center justify-between py-4 active:opacity-80"
                    >
                      <span className="font-serif text-[1.625rem] leading-none text-white transition-colors group-active:text-gold">
                        {link.label}
                      </span>
                      <span className="font-sans text-sm text-gold/45 transition-transform group-active:translate-x-0.5">
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-white/10 px-6 py-5">
              <p className="mb-4 font-sans text-xs leading-relaxed text-white/35">
                {SITE_CONFIG.location}
              </p>

              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-gold/40 bg-gold/15 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors active:bg-gold active:border-gold"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enquire on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
