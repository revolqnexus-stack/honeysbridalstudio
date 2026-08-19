import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ENQUIRY_TYPES,
  openWhatsAppEnquiry,
  type EnquiryFormData,
} from '@/utils/whatsappEnquiry'
import { cn } from '@/utils/cn'

const STEPS = [
  { label: 'Enquiry type', key: 'type' },
  { label: 'Your name', key: 'name' },
  { label: 'Phone number', key: 'phone' },
  { label: 'Event & details', key: 'details' },
] as const

const ease = [0.22, 1, 0.36, 1] as const

type WhatsAppEnquiryFormProps = {
  variant?: 'inline' | 'modal'
  className?: string
  onSuccess?: () => void
}

const initialData: EnquiryFormData = {
  type: '',
  typeLabel: '',
  name: '',
  phone: '',
  eventDate: '',
  message: '',
}

export function WhatsAppEnquiryForm({
  variant = 'inline',
  className,
  onSuccess,
}: WhatsAppEnquiryFormProps) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<EnquiryFormData>(initialData)

  const isInline = variant === 'inline'

  const canContinue = () => {
    if (step === 0) return Boolean(data.type)
    if (step === 1) return data.name.trim().length >= 2
    if (step === 2) return data.phone.replace(/\D/g, '').length >= 10
    return true
  }

  const handleContinue = () => {
    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1)
      return
    }

    openWhatsAppEnquiry(data)
    onSuccess?.()
  }

  const titleClass = isInline ? 'text-dark' : 'text-white'
  const mutedClass = isInline ? 'text-text-muted' : 'text-white/55'
  const stepClass = isInline ? 'text-text-muted/80' : 'text-white/45'

  const inputClass = cn(
    'w-full rounded-xl border px-4 py-3 font-sans text-sm outline-none transition',
    isInline
      ? 'border-dark/10 bg-bg text-dark placeholder:text-text-muted/60 focus:border-gold/50'
      : 'border-white/12 bg-white/6 text-white placeholder:text-white/35 focus:border-gold/45',
  )

  return (
    <div
      className={cn(
        isInline &&
          'overflow-hidden rounded-2xl border border-dark/10 bg-white p-5 shadow-[0_24px_80px_rgba(12,10,9,0.08)] md:p-6',
        className,
      )}
    >
      {isInline && (
        <div className="mb-5">
          <p className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold">
            Get in touch
          </p>
          <h3 className="mt-1 font-serif text-2xl leading-tight text-dark">Send an enquiry</h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-text-muted">
            A few quick details — we&apos;ll open WhatsApp with everything filled in.
          </p>
        </div>
      )}

      <p className={cn('mb-4 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em]', stepClass)}>
        Step {step + 1} of {STEPS.length} · {STEPS[step].label}
      </p>

      <div className="mb-5 h-px bg-gradient-to-r from-gold/50 via-gold/15 to-transparent" />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.28, ease }}
        >
          {step === 0 && (
            <div className="space-y-2.5">
              {ENQUIRY_TYPES.map((type) => {
                const selected = data.type === type.id

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        type: type.id,
                        typeLabel: type.label,
                      }))
                    }
                    className={cn(
                      'w-full rounded-xl border px-4 py-3.5 text-left transition',
                      selected
                        ? isInline
                          ? 'border-gold/50 bg-gold/8'
                          : 'border-gold/45 bg-gold/12'
                        : isInline
                          ? 'border-dark/8 bg-bg-alt hover:border-gold/25'
                          : 'border-white/10 bg-white/5 hover:border-white/20',
                    )}
                  >
                    <span className={cn('block font-sans text-sm font-medium', titleClass)}>
                      {type.label}
                    </span>
                    <span className={cn('mt-0.5 block font-sans text-xs', mutedClass)}>
                      {type.description}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {step === 1 && (
            <div>
              <label
                htmlFor="enquiry-name"
                className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}
              >
                Full name
              </label>
              <input
                id="enquiry-name"
                type="text"
                value={data.name}
                onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className={inputClass}
                autoComplete="name"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label
                htmlFor="enquiry-phone"
                className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}
              >
                WhatsApp number
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                value={data.phone}
                onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className={inputClass}
                autoComplete="tel"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="enquiry-date"
                  className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}
                >
                  Event date <span className="opacity-60">(optional)</span>
                </label>
                <input
                  id="enquiry-date"
                  type="text"
                  value={data.eventDate}
                  onChange={(e) => setData((prev) => ({ ...prev, eventDate: e.target.value }))}
                  placeholder="e.g. 15 March 2026"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="enquiry-message"
                  className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}
                >
                  Anything else? <span className="opacity-60">(optional)</span>
                </label>
                <textarea
                  id="enquiry-message"
                  value={data.message}
                  onChange={(e) => setData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Ceremony type, location, services needed..."
                  rows={3}
                  className={cn(inputClass, 'resize-none')}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className={cn(
              'inline-flex h-11 items-center justify-center rounded-full border px-5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.13em] transition',
              isInline
                ? 'border-dark/12 text-dark/70 hover:border-gold/30 hover:text-dark'
                : 'border-white/15 text-white/70 hover:border-white/30 hover:text-white',
            )}
          >
            Back
          </button>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue()}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-gold bg-gold font-sans text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-white transition hover:border-[#D5A85A] hover:bg-[#D5A85A] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step === STEPS.length - 1 ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Send on WhatsApp
            </>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  )
}
