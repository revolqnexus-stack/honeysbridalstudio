import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const LETTERS = "Honey's".split('')

export function Loader() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in')

  useEffect(() => {
    document.body.classList.add('no-scroll')
    // After letters + bar finish, slide up and exit
    const t1 = setTimeout(() => setPhase('out'), 2200)
    const t2 = setTimeout(() => {
      setPhase('done')
      document.body.classList.remove('no-scroll')
    }, 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); document.body.classList.remove('no-scroll') }
  }, [])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center gap-8"
          animate={phase === 'out' ? { y: '-100%' } : { y: 0 }}
          transition={
            phase === 'out'
              ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
              : { duration: 0 }
          }
        >
          {/* Letters */}
          <div className="flex items-end gap-1 overflow-hidden">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="font-serif text-5xl md:text-6xl italic text-white"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #CA8A04 50%, #fff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
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
            className="font-sans text-xs tracking-[0.35em] uppercase text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            BRIDAL STUDIO
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(to right, #CA8A04, #D97706)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
