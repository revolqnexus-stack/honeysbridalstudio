import { useEffect, useState } from 'react'

/** Returns true when the fixed nav sits over a dark surface (hero, academy, etc.). */
export function useNavSurface() {
  const [overDark, setOverDark] = useState(true)

  useEffect(() => {
    const probeY = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')
      const headerPx = parseFloat(raw) || 92
      return Math.min(headerPx * 0.55, window.innerHeight * 0.06)
    }

    const resolveSurface = () => {
      const x = window.innerWidth / 2
      const y = probeY()
      let el = document.elementFromPoint(x, y) as HTMLElement | null

      while (el && el !== document.body && !el.dataset.navSurface) {
        el = el.parentElement
      }

      setOverDark(el?.dataset.navSurface !== 'light')
    }

    resolveSurface()

    window.addEventListener('scroll', resolveSurface, { passive: true })
    window.addEventListener('resize', resolveSurface, { passive: true })
    window.addEventListener('hashchange', resolveSurface)

    const t = window.setTimeout(resolveSurface, 120)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('scroll', resolveSurface)
      window.removeEventListener('resize', resolveSurface)
      window.removeEventListener('hashchange', resolveSurface)
    }
  }, [])

  return overDark
}
