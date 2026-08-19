import { motion } from 'framer-motion'
import { LAYOUT } from '@/constants'

export function DualCTA() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - LAYOUT.headerHeightPx,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="dual-cta" data-nav-surface="dark" className="section-gap bg-dark">
      <div className="container-custom">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-gold">
            Begin
          </p>
          <h2 className="font-serif text-4xl font-normal leading-[1.05] text-white md:text-5xl lg:text-[3.5rem]">
            Ready to Begin?
          </h2>
          <div
            className="mx-auto my-5 h-px max-w-[120px]"
            style={{ background: 'linear-gradient(to right, transparent, #CA8A04, transparent)' }}
          />
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-0 md:grid-cols-2">
          {/* For Brides */}
          <motion.div
            className="border-t border-white/10 px-0 py-10 md:border-r md:border-t-0 md:px-10 md:py-8"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-gold/70">
              For Brides
            </p>
            <h3 className="mb-4 font-serif text-2xl text-white md:text-3xl">Your Bridal Journey</h3>
            <p className="mb-8 font-sans text-sm leading-relaxed text-white/55">
              Plan your bridal experience with signature makeup, styling and complete wedding beauty
              preparation.
            </p>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#contact')
              }}
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-gold bg-gold font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white md:w-auto md:px-8"
              whileHover={{ y: -2, boxShadow: '0 10px 32px rgba(202,138,4,0.28)' }}
              whileTap={{ scale: 0.98 }}
            >
              Enquire Now
            </motion.a>
          </motion.div>

          {/* For Artists */}
          <motion.div
            className="border-t border-white/10 px-0 py-10 md:border-t-0 md:px-10 md:py-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-gold/70">
              For Artists
            </p>
            <h3 className="mb-4 font-serif text-2xl text-white md:text-3xl">Your Artistry Path</h3>
            <p className="mb-8 font-sans text-sm leading-relaxed text-white/55">
              Begin your journey into bridal artistry with professional makeup education and hands-on
              training.
            </p>
            <motion.a
              href="#academy"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#academy')
              }}
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-gold/50 bg-transparent font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white md:w-auto md:px-8"
              whileHover={{ y: -2, background: 'rgba(202,138,4,0.12)', borderColor: '#CA8A04' }}
              whileTap={{ scale: 0.98 }}
            >
              Explore the Academy
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
