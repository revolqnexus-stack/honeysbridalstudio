import { SITE_CONFIG } from '@/constants'

export type EnquiryFormData = {
  type: string
  typeLabel: string
  name: string
  phone: string
  eventDate: string
  message: string
}

export const ENQUIRY_TYPES = [
  {
    id: 'bridal',
    label: 'Bridal Experience',
    description: 'Makeup, hair & saree draping',
  },
  {
    id: 'academy',
    label: 'Makeup Academy',
    description: 'Professional artist training',
  },
  {
    id: 'beauty',
    label: 'Beauty Services',
    description: 'Hair, skin, nails & care',
  },
  {
    id: 'general',
    label: 'General Enquiry',
    description: 'Something else entirely',
  },
] as const

export function buildWhatsAppEnquiryUrl(data: EnquiryFormData): string {
  const lines = [
    "Hello Honey's Bridal Studio,",
    '',
    `Enquiry type: ${data.typeLabel}`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
  ]

  if (data.eventDate.trim()) {
    lines.push(`Event / preferred date: ${data.eventDate.trim()}`)
  }

  if (data.message.trim()) {
    lines.push('', 'Details:', data.message.trim())
  }

  lines.push('', 'Sent via honeysbridalstudio.com')

  const text = encodeURIComponent(lines.join('\n'))
  return `${SITE_CONFIG.whatsapp}?text=${text}`
}

export function openWhatsAppEnquiry(data: EnquiryFormData) {
  window.open(buildWhatsAppEnquiryUrl(data), '_blank', 'noopener,noreferrer')
}
