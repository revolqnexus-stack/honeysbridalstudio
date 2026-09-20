import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    // Delay Lenis initialization until after loader completes
    // This prevents smooth scroll from interfering with scroll lock during load
    const initTimer = setTimeout(() => {
      // Double-check that loader is complete
      if (!document.body.classList.contains('loader-complete')) {
        return
      }
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      // Store lenis instance for cleanup
      ;(window as any).__lenis = lenis
    }, 3200) // Initialize after loader exit animation completes

    return () => {
      clearTimeout(initTimer)
      const lenis = (window as any).__lenis
      if (lenis) {
        lenis.destroy()
        delete (window as any).__lenis
      }
    }
  }, [])
}
