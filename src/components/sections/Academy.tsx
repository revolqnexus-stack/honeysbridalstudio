import { motion } from 'framer-motion'
import { ACADEMY_PROGRAMS, LAYOUT } from '@/constants'
import { useEnquiryModal } from '@/context/EnquiryModalContext'

export function Academy() {
  const { open: openEnquiry } = useEnquiryModal()

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
    <section
      id="academy"
      data-nav-surface="dark"
      className="section-gap bg-dark"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-12 max-w-4xl text-center md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="mb-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-gold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Honey&apos;s Academy
          </motion.p>

          <h2 className="font-serif text-4xl font-normal leading-[1.05] text-white md:text-5xl lg:text-[3.5rem]">
            Master the Art of Bridal Beauty
          </h2>

          <div
            className="mx-auto my-5 h-px max-w-[120px]"
            style={{ background: 'linear-gradient(to right, transparent, #CA8A04, transparent)' }}
          />

          <motion.p
            className="font-serif text-xl italic text-gold/90 md:text-2xl"
            style={{ fontFamily: "'Pinyon Script', cursive" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Learn. Create. Succeed.
          </motion.p>

          <motion.p
            className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/60 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Professional bridal makeup education designed to develop technique, product knowledge,
            confidence and professional artistry.
          </motion.p>

          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              openEnquiry('academy')
            }}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-gold bg-gold px-7 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white"
            whileHover={{ y: -2, boxShadow: '0 10px 32px rgba(202,138,4,0.28)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Enquire About a Course
          </motion.a>
        </motion.div>

        {/* Editorial program catalogue */}
        <div className="mx-auto max-w-3xl">
          <ul className="divide-y divide-white/10">
            {ACADEMY_PROGRAMS.map((program, index) => (
              <motion.li
                key={program.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => openEnquiry('academy')}
                  className="group flex w-full items-start gap-4 py-6 text-left transition-colors duration-300 hover:bg-white/[0.03] md:gap-5 md:py-7"
                >
                  <span className="shrink-0 pt-1 font-sans text-[0.6875rem] font-medium tabular-nums tracking-[0.08em] text-gold/70 transition-colors group-hover:text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-gold/60">
                      {program.audience}
                    </span>
                    <span className="mb-2 block font-serif text-xl leading-snug text-white md:text-2xl">
                      {program.title}
                    </span>
                    <span className="mb-3 block font-sans text-sm leading-relaxed text-white/50">
                      {program.description}
                    </span>
                    <span className="block font-sans text-xs leading-relaxed text-white/35">
                      {program.outcomes.slice(0, 4).join(' · ')}
                    </span>
                  </span>

                  <span
                    className="shrink-0 pt-1 font-sans text-sm text-gold/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold/80"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Credibility strip */}
        <motion.div
          className="mt-12 border-t border-white/10 pt-10 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="mb-6 text-center font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold/70">
            What You Gain
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
            {[
              'Certified Courses',
              'Expert Trainers',
              'Hands-on Practicals',
              'Product Knowledge',
              'Portfolio Development',
              'Lifetime Support',
            ].map((item, index, arr) => (
              <span key={item} className="flex items-center gap-6 md:gap-10">
                <span className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-white/50">
                  {item}
                </span>
                {index < arr.length - 1 && (
                  <span className="hidden text-gold/40 md:inline" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
