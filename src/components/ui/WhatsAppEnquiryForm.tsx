import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ACADEMY_COURSES,
  ENQUIRY_TYPES,
  EXPERIENCE_LEVELS,
  openWhatsAppEnquiry,
  type EnquiryFormData,
  type EnquiryType,
} from '@/utils/whatsappEnquiry'
import { cn } from '@/utils/cn'

const ease = [0.22, 1, 0.36, 1] as const

// Steps vary by enquiry type
const STEPS_DEFAULT = ['type', 'name', 'phone', 'details'] as const
const STEPS_ACADEMY = ['type', 'name', 'phone', 'course', 'details'] as const
const STEPS_BRIDAL = ['type', 'name', 'phone', 'event', 'details'] as const
const STEPS_BEAUTY = ['type', 'name', 'phone', 'event', 'details'] as const

type StepKey = 'type' | 'name' | 'phone' | 'course' | 'event' | 'details'

function getSteps(type: EnquiryType | ''): readonly StepKey[] {
  if (type === 'academy') return STEPS_ACADEMY
  if (type === 'bridal') return STEPS_BRIDAL
  if (type === 'beauty') return STEPS_BEAUTY
  return STEPS_DEFAULT
}

function stepLabel(key: StepKey, type: EnquiryType | ''): string {
  switch (key) {
    case 'type': return 'Enquiry type'
    case 'name': return 'Your name'
    case 'phone': return 'Phone number'
    case 'course': return 'Course interest'
    case 'event': return type === 'academy' ? 'Start date' : 'Event details'
    case 'details': return 'Additional details'
  }
}

type WhatsAppEnquiryFormProps = {
  variant?: 'inline' | 'modal'
  className?: string
  initialType?: EnquiryType | null
  onSuccess?: () => void
}

const initialData: EnquiryFormData = {
  type: '',
  typeLabel: '',
  name: '',
  phone: '',
  eventDate: '',
  eventLocation: '',
  courseInterest: '',
  experienceLevel: '',
  preferredStart: '',
  message: '',
}

export function WhatsAppEnquiryForm({
  variant = 'inline',
  className,
  initialType,
  onSuccess,
}: WhatsAppEnquiryFormProps) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<EnquiryFormData>(() => {
    if (initialType) {
      const found = ENQUIRY_TYPES.find((t) => t.id === initialType)
      return { ...initialData, type: initialType, typeLabel: found?.label ?? '' }
    }
    return initialData
  })

  // If initialType is provided, skip step 0 (type selection)
  const startStep = initialType ? 1 : 0

  useEffect(() => {
    if (initialType) {
      const found = ENQUIRY_TYPES.find((t) => t.id === initialType)
      setData({ ...initialData, type: initialType, typeLabel: found?.label ?? '' })
      setStep(1)
    } else {
      setData(initialData)
      setStep(0)
    }
  }, [initialType])

  const steps = getSteps(data.type)
  const currentKey = steps[step]

  const isInline = variant === 'inline'

  const canContinue = () => {
    switch (currentKey) {
      case 'type': return Boolean(data.type)
      case 'name': return data.name.trim().length >= 2
      case 'phone': return data.phone.replace(/\D/g, '').length >= 10
      case 'course': return Boolean(data.courseInterest) && Boolean(data.experienceLevel)
      case 'event':
      case 'details': return true
    }
  }

  const handleContinue = () => {
    if (step < steps.length - 1) {
      // If type just changed, recalculate steps from new type
      setStep((prev) => prev + 1)
      return
    }
    openWhatsAppEnquiry(data)
    onSuccess?.()
  }

  const handleTypeSelect = (type: EnquiryType, typeLabel: string) => {
    setData((prev) => ({ ...prev, type, typeLabel }))
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

  const selectClass = cn(
    inputClass,
    'cursor-pointer appearance-none',
    isInline ? 'bg-bg' : 'bg-[#1a1410]',
  )

  const totalVisibleSteps = steps.length - startStep
  const currentVisibleStep = step - startStep + 1

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

      {/* Progress */}
      <div className="mb-4 flex items-center justify-between">
        <p className={cn('font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em]', stepClass)}>
          Step {currentVisibleStep} of {totalVisibleSteps} · {stepLabel(currentKey, data.type)}
        </p>
        {data.type && (
          <span
            className={cn(
              'rounded-full px-2.5 py-1 font-sans text-[0.55rem] font-medium uppercase tracking-[0.14em]',
              isInline ? 'bg-gold/10 text-gold' : 'bg-gold/15 text-gold',
            )}
          >
            {ENQUIRY_TYPES.find((t) => t.id === data.type)?.label ?? ''}
          </span>
        )}
      </div>

      <div className="mb-5 h-px bg-gradient-to-r from-gold/50 via-gold/15 to-transparent" />

      {/* Progress bar */}
      <div className={cn('mb-5 h-0.5 w-full rounded-full', isInline ? 'bg-dark/8' : 'bg-white/10')}>
        <motion.div
          className="h-full rounded-full bg-gold"
          animate={{ width: `${(currentVisibleStep / totalVisibleSteps) * 100}%` }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.28, ease }}
        >
          {/* ── STEP: TYPE SELECTION ── */}
          {currentKey === 'type' && (
            <div className="space-y-2.5">
              {ENQUIRY_TYPES.map((type) => {
                const selected = data.type === type.id
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleTypeSelect(type.id, type.label)}
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

          {/* ── STEP: NAME ── */}
          {currentKey === 'name' && (
            <div>
              <label htmlFor="enquiry-name" className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}>
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
                autoFocus
              />
            </div>
          )}

          {/* ── STEP: PHONE ── */}
          {currentKey === 'phone' && (
            <div>
              <label htmlFor="enquiry-phone" className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}>
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
                autoFocus
              />
            </div>
          )}

          {/* ── STEP: COURSE (Academy) ── */}
          {currentKey === 'course' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="course-interest" className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}>
                  Which course interests you?
                </label>
                <div className="space-y-2">
                  {ACADEMY_COURSES.map((course) => (
                    <button
                      key={course}
                      type="button"
                      onClick={() => setData((prev) => ({ ...prev, courseInterest: course }))}
                      className={cn(
                        'w-full rounded-xl border px-4 py-3 text-left font-sans text-sm transition',
                        data.courseInterest === course
                          ? isInline
                            ? 'border-gold/50 bg-gold/8 font-medium text-dark'
                            : 'border-gold/45 bg-gold/12 font-medium text-white'
                          : isInline
                            ? 'border-dark/8 bg-bg-alt text-text-muted hover:border-gold/25'
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20',
                      )}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="experience-level" className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}>
                  Your current experience level
                </label>
                <select
                  id="experience-level"
                  value={data.experienceLevel}
                  onChange={(e) => setData((prev) => ({ ...prev, experienceLevel: e.target.value }))}
                  className={selectClass}
                >
                  <option value="">Select experience level</option>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ── STEP: EVENT (Bridal / Beauty) ── */}
          {currentKey === 'event' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="enquiry-date" className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}>
                  {data.type === 'academy' ? 'Preferred start date' : 'Event date'}
                  {' '}<span className="opacity-60">(optional)</span>
                </label>
                <input
                  id="enquiry-date"
                  type="text"
                  value={data.eventDate}
                  onChange={(e) => setData((prev) => ({ ...prev, eventDate: e.target.value }))}
                  placeholder={data.type === 'academy' ? 'e.g. January 2026' : 'e.g. 15 March 2026'}
                  className={inputClass}
                  autoFocus
                />
              </div>
              {data.type !== 'academy' && (
                <div>
                  <label htmlFor="enquiry-location" className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}>
                    Event location <span className="opacity-60">(optional)</span>
                  </label>
                  <input
                    id="enquiry-location"
                    type="text"
                    value={data.eventLocation}
                    onChange={(e) => setData((prev) => ({ ...prev, eventLocation: e.target.value }))}
                    placeholder="e.g. Idukki, Munnar, Ernakulam…"
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          )}

          {/* ── STEP: DETAILS (final) ── */}
          {currentKey === 'details' && (
            <div className="space-y-4">
              {data.type === 'academy' && (
                <div>
                  <label htmlFor="enquiry-start" className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}>
                    Preferred start date <span className="opacity-60">(optional)</span>
                  </label>
                  <input
                    id="enquiry-start"
                    type="text"
                    value={data.preferredStart}
                    onChange={(e) => setData((prev) => ({ ...prev, preferredStart: e.target.value }))}
                    placeholder="e.g. January 2026 or ASAP"
                    className={inputClass}
                    autoFocus
                  />
                </div>
              )}
              <div>
                <label htmlFor="enquiry-message" className={cn('mb-2 block font-sans text-xs uppercase tracking-[0.14em]', stepClass)}>
                  {data.type === 'academy'
                    ? 'Any questions for us?'
                    : 'Anything else?'}{' '}
                  <span className="opacity-60">(optional)</span>
                </label>
                <textarea
                  id="enquiry-message"
                  value={data.message}
                  onChange={(e) => setData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder={
                    data.type === 'academy'
                      ? 'Course duration, fees, batch timings, certificate…'
                      : 'Ceremony type, specific services needed, preferences…'
                  }
                  rows={3}
                  className={cn(inputClass, 'resize-none')}
                  autoFocus
                />
              </div>

              {/* Summary chip */}
              <div className={cn('rounded-xl border p-4', isInline ? 'border-dark/8 bg-bg-alt' : 'border-white/8 bg-white/4')}>
                <p className={cn('mb-2 font-sans text-[0.6rem] font-medium uppercase tracking-[0.16em]', stepClass)}>
                  Summary
                </p>
                <div className="space-y-1">
                  <SummaryRow label="Type" value={data.typeLabel} isInline={isInline} />
                  <SummaryRow label="Name" value={data.name} isInline={isInline} />
                  <SummaryRow label="Phone" value={data.phone} isInline={isInline} />
                  {data.type === 'academy' ? (
                    <>
                      {data.courseInterest && <SummaryRow label="Course" value={data.courseInterest} isInline={isInline} />}
                      {data.experienceLevel && <SummaryRow label="Experience" value={data.experienceLevel} isInline={isInline} />}
                    </>
                  ) : (
                    <>
                      {data.eventDate && <SummaryRow label="Date" value={data.eventDate} isInline={isInline} />}
                      {data.eventLocation && <SummaryRow label="Location" value={data.eventLocation} isInline={isInline} />}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center gap-3">
        {step > startStep && (
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
          {step === steps.length - 1 ? (
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

function SummaryRow({ label, value, isInline }: { label: string; value: string; isInline: boolean }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className={cn('w-16 shrink-0 font-sans text-[0.6rem] uppercase tracking-[0.12em]', isInline ? 'text-text-muted/60' : 'text-white/35')}>
        {label}
      </span>
      <span className={cn('font-sans text-xs', isInline ? 'text-dark' : 'text-white/80')}>
        {value}
      </span>
    </div>
  )
}
