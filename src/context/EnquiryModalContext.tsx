import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

type EnquiryModalContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null)

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  return (
    <EnquiryModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </EnquiryModalContext.Provider>
  )
}

export function useEnquiryModal() {
  const ctx = useContext(EnquiryModalContext)
  if (!ctx) {
    throw new Error('useEnquiryModal must be used within EnquiryModalProvider')
  }
  return ctx
}
