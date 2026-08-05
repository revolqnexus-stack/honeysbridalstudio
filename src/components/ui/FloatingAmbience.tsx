import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  left: string
  size: string
  delay: string
  duration: string
  opacity: number
  symbol: string
}

export function FloatingAmbience() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const items: Sparkle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${8 + Math.random() * 4}px`,
      delay: `${Math.random() * 12}s`,
      duration: `${8 + Math.random() * 8}s`,
      opacity: 0.25 + Math.random() * 0.3,
      symbol: Math.random() > 0.5 ? '✦' : '✧',
    }))
    setSparkles(items)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute text-gold animate-float-up"
          style={{
            left: s.left,
            fontSize: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
            opacity: s.opacity,
            bottom: '-20px',
          }}
        >
          {s.symbol}
        </span>
      ))}
    </div>
  )
}
