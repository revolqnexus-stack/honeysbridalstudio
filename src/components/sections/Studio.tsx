import { motion } from 'framer-motion'
import { SITE_CONFIG, STUDIO_GALLERY_STRIP } from '@/constants'
import { StudioGalleryStrip } from '@/components/ui/SectionTransition'
import { EditorialMasthead } from '@/components/ui/EditorialCatalogue'

export function Studio() {
  return (
    <section id="studio" data-nav-surface="light" className="section-gap bg-champagne/40">
      <div className="container-custom">
        <EditorialMasthead
          eyebrow="Rajakumari · Idukki"
          title="The Studio"
          subtitle="Step inside Honey's — a warm, intimate space built for bridal preparation, beauty rituals, and the quiet confidence before your day begins."
        />

        <StudioGalleryStrip images={STUDIO_GALLERY_STRIP} className="mb-10 md:mb-12" />

        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans text-sm leading-relaxed text-text-muted md:text-base">
            {SITE_CONFIG.location}
          </p>
          <div className="section-divider mx-auto my-5" />
          <p className="font-serif text-lg italic text-dark/75 md:text-xl">
            Where every bride is seen, styled, and celebrated.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
