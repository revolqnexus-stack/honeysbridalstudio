import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

const easing = [0.22, 1, 0.36, 1]

// FadeUp - scroll triggered
export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: easing }}
    >
      {children}
    </motion.div>
  )
}

// FadeIn - directional
export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}) {
  const map = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...map[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: easing }}
    >
      {children}
    </motion.div>
  )
}

// ScaleIn
export function ScaleIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: easing }}
    >
      {children}
    </motion.div>
  )
}

// PremiumBox - hover lift effect
export function PremiumBox({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: easing }}
      whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(202,138,4,0.15)' }}
    >
      {children}
    </motion.div>
  )
}

// StaggerContainer
export function StaggerContainer({
  children,
  className = '',
  stagger = 0.1,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

// StaggerItem
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
      }}
    >
      {children}
    </motion.div>
  )
}

// AnimatedCounter
export function AnimatedCounter({
  target,
  suffix = '',
  className = '',
}: {
  target: number
  suffix?: string
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span ref={ref} className={className}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {isInView ? (
          <Counter target={target} suffix={suffix} />
        ) : '0'}
      </motion.span>
    </span>
  )
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={0}
        animate={isInView ? target : 0}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        onUpdate={(latest) => {
          if (ref.current) {
            ref.current.textContent = `${Math.round(Number(latest))}${suffix}`
          }
        }}
      />
    </motion.span>
  )
}
