import { useRef, useEffect, useState } from 'react'
import { FadeUp } from '@/components/ui/PremiumAnimations'
import { TESTIMONIALS } from '@/constants'

// RAF-driven drag marquee for testimonials
export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const speedRef = useRef(0.5)
  const isDragging = useRef(false)
  const dragStart = useRef(0)
  const rafRef = useRef<number>(0)
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [_paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function tick() {
      if (!pausedRef.current && !isDragging.current) {
        posRef.current -= speedRef.current
        const half = track!.scrollWidth / 2
        if (Math.abs(posRef.current) >= half) posRef.current = 0
        track!.style.transform = `translateX(${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const pause = () => { pausedRef.current = true; setPaused(true) }
  const resume = () => {
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false
      setPaused(false)
    }, 2000)
  }

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    dragStart.current = e.clientX - posRef.current
    pause()
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    posRef.current = e.clientX - dragStart.current
    if (trackRef.current) trackRef.current.style.transform = `translateX(${posRef.current}px)`
  }
  const onMouseUp = () => { isDragging.current = false; resume() }

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section id="testimonials" data-nav-surface="light" className="section-gap bg-bg-alt overflow-hidden">
      <div className="container-custom mb-12 md:mb-16">
        <div className="text-center">
          <FadeUp>
            <p className="text-[0.7rem] font-medium tracking-[0.3em] uppercase text-gold mb-4">Bride Diaries</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-dark leading-[1.1]">
              Words From<br /><em className="text-dark-2">Our Brides</em>
            </h2>
          </FadeUp>
        </div>
      </div>

      {/* Marquee testimonials */}
      <div
        className="relative cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={pause}
        onMouseLeave={() => { isDragging.current = false; resume() }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F0EBE3, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F0EBE3, transparent)' }} />

        <div ref={trackRef} className="flex gap-6 w-max" style={{ transform: 'translateX(0)' }}>
          {doubled.map((t, i) => (
            <div
              key={i}
              className="flex w-[340px] flex-shrink-0 flex-col gap-4 border-t border-gold/30 bg-champagne/40 p-7 pt-6"
            >
              <div className="flex gap-1 text-gold">
                {[...Array(t.rating)].map((_, s) => (
                  <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-text-muted leading-relaxed italic flex-1">"{t.text}"</p>
              <div className="border-t border-dark/6 pt-4">
                <span className="block text-sm font-medium text-dark">{t.name}</span>
                <span className="block text-[0.65rem] tracking-[0.12em] uppercase text-gold mt-1">{t.occasion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
