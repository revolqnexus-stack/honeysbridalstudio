import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const LETTERS = "Honey's".split('')

export function Loader() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in')

  useEffect(() => {
    // Force immediate scroll to top on mount - multiple approaches for reliability
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Lock body overflow to prevent any scrolling during load
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
    
    // Disable browser scroll restoration to prevent auto-scroll to previous position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    // Keep forcing scroll to top during initial render phase
    const scrollLock = setInterval(() => {
      window.scrollTo(0, 0)
    }, 50)
    
    // After letters + bar finish, slide up and exit
    const t1 = setTimeout(() => {
      clearInterval(scrollLock)
      setPhase('out')
    }, 2200)
    
    const t2 = setTimeout(() => {
      // Final scroll enforcement before allowing page interaction
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      setPhase('done')
      
      // Use multiple RAF to ensure scroll position sticks after all browser rendering
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        
        // Unlock body and mark loader as complete
        document.body.style.overflow = ''
        document.body.style.height = ''
        document.body.classList.add('loader-complete')
        
        requestAnimationFrame(() => {
          window.scrollTo(0, 0)
        })
      })
    }, 3100) // Slightly longer to ensure slide-up animation completes
    
    return () => {
      clearInterval(scrollLock)
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
      document.body.style.height = ''
    }
  }, [])

  if (phase === 'done') return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loader"
        className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center"
        style={{ gap: 'clamp(1rem, 4vh, 2rem)' }}
        initial={{ y: 0 }}
        animate={phase === 'out' ? { y: '-100%' } : { y: 0 }}
        exit={{ y: '-100%' }}
        transition={
          phase === 'out'
            ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
        }
      >
        {/* Letters */}
        <div className="flex items-end gap-[2px] overflow-hidden px-4">
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              className="font-serif italic text-white"
              style={{
                fontSize: 'clamp(2.5rem, 12vw, 4rem)',
                lineHeight: 1.1,
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-sans uppercase text-white/40"
          style={{
            fontSize: 'clamp(0.55rem, 2.2vw, 0.75rem)',
            letterSpacing: '0.35em',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Bridal Studio · Kerala
        </motion.p>

        {/* Progress bar */}
        <div
          className="overflow-hidden bg-white/10"
          style={{ width: 'clamp(8rem, 40vw, 12rem)', height: '1px' }}
        >
          <motion.div
            className="h-full"
            style={{ background: 'linear-gradient(to right, #CA8A04, #D97706)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
