import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { EnquiryType } from '@/utils/whatsappEnquiry'

type EnquiryModalContextValue = {
  isOpen: boolean
  initialType: EnquiryType | null
  open: (type?: EnquiryType) => void
  close: () => void
}

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null)

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialType, setInitialType] = useState<EnquiryType | null>(null)

  const open = useCallback((type?: EnquiryType) => {
    setInitialType(type ?? null)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => {
    setIsOpen(false)
    setInitialType(null)
  }, [])

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
    <EnquiryModalContext.Provider value={{ isOpen, initialType, open, close }}>
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
