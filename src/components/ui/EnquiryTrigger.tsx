import { cn } from '@/utils/cn'
import { useEnquiryModal } from '@/context/EnquiryModalContext'

type EnquiryTriggerProps = {
  className?: string
  children?: React.ReactNode
}

export function EnquiryTrigger({ className, children }: EnquiryTriggerProps) {
  const { open } = useEnquiryModal()

  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        'inline-flex items-center gap-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/55 transition hover:text-gold',
        className,
      )}
    >
      {children ?? (
        <>
          Send a quick enquiry
          <span aria-hidden="true">→</span>
        </>
      )}
    </button>
  )
}
