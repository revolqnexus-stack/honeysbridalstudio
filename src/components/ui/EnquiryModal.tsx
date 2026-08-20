import { AnimatePresence, motion } from 'framer-motion'
import { useEnquiryModal } from '@/context/EnquiryModalContext'
import { WhatsAppEnquiryForm } from '@/components/ui/WhatsAppEnquiryForm'

const ease = [0.22, 1, 0.36, 1] as const

export function EnquiryModal() {
  const { isOpen, close, initialType } = useEnquiryModal()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close enquiry form"
            className="fixed inset-0 z-[200] bg-[#0c0a09]/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />

          {/* Mobile: bottom sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Send enquiry on WhatsApp"
            className="fixed inset-x-0 bottom-0 z-[201] max-h-[min(92dvh,680px)] overflow-hidden rounded-t-[1.35rem] border border-white/10 bg-[#14100d] shadow-[0_-32px_80px_rgba(0,0,0,0.5)] md:hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.38, ease }}
          >
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-white/20" aria-hidden="true" />
            <ModalChrome onClose={close} initialType={initialType} />
            <div className="overflow-y-auto overscroll-contain px-5 pb-8 pt-2" style={{ maxHeight: 'calc(min(92dvh, 680px) - 4.5rem)' }}>
              <WhatsAppEnquiryForm key={`mobile-${initialType ?? 'default'}`} variant="modal" initialType={initialType} onSuccess={close} />
            </div>
          </motion.div>

          {/* Desktop: centred card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Send enquiry on WhatsApp"
            className="fixed inset-0 z-[201] hidden items-center justify-center p-6 md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <motion.div
              className="flex max-h-[min(88dvh,680px)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#14100d] shadow-[0_32px_100px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.32, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalChrome onClose={close} initialType={initialType} />
              <div className="overflow-y-auto overscroll-contain px-6 pb-6 pt-2">
                <WhatsAppEnquiryForm key={`desktop-${initialType ?? 'default'}`} variant="modal" initialType={initialType} onSuccess={close} />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ModalChrome({ onClose, initialType }: { onClose: () => void; initialType?: string | null }) {
  const title = initialType === 'academy'
    ? 'Academy enquiry'
    : initialType === 'bridal'
      ? 'Bridal experience enquiry'
      : initialType === 'beauty'
        ? 'Beauty services enquiry'
        : 'Plan your enquiry'

  return (
    <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4 md:px-6">
      <div>
        <p className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold">
          Honey&apos;s Bridal Studio
        </p>
        <p className="font-serif text-xl text-white">{title}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  )
}
