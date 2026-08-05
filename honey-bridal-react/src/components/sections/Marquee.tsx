import { motion } from 'framer-motion'
import { MARQUEE_ITEMS } from '@/constants'

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div className="bg-dark overflow-hidden py-4 border-t border-b border-white/6">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-10">
            <span className="text-xs tracking-[0.15em] uppercase text-white/50">
              {item}
            </span>
            <span className="text-gold">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
