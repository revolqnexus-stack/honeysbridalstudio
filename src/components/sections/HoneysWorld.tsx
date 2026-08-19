import { motion } from 'framer-motion'

export function HoneysWorld() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <section
      id="honeys-world"
      data-nav-surface="light"
      className="section-gap bg-bg-alt"
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
            className="font-sans text-gold uppercase tracking-[0.2em] text-xs mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            One House
          </motion.p>
          
          <h2 className="font-serif text-4xl font-normal leading-[1.05] text-dark md:text-5xl lg:text-[3.5rem]">
            Many Expressions of Beauty
          </h2>
          <div className="section-divider my-5" />
          <motion.p
            className="font-sans text-text-muted mt-6 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Honey's is where bridal artistry comes full circle — from the bride's transformation to the artist's education, and beauty that extends beyond the wedding day.
          </motion.p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Bridal Studio */}
          <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => { e.preventDefault(); scrollTo('#bridal-studio') }}
          >
            <div className="relative mb-6 aspect-[4/5] overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent z-10"
                style={{ background: 'linear-gradient(to top, rgba(28,25,23,0.7) 0%, transparent 60%)' }}
              />
              <motion.img
                src="/what we offer pic/bridal makeup,hairstyle and saree drape.jpg.jpeg"
                alt="Bridal Studio"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="font-sans text-gold/80 text-xs uppercase tracking-[0.18em] mb-2">For Brides</p>
                <h3 className="font-serif text-white text-2xl md:text-3xl">Bridal Studio</h3>
              </div>
            </div>
            <p className="font-sans text-text-muted text-sm leading-relaxed mb-4">
              Signature bridal makeup, styling and complete wedding beauty preparation.
            </p>
            <motion.a
              href="#bridal-studio"
              onClick={(e) => { e.preventDefault(); scrollTo('#bridal-studio') }}
              className="inline-flex items-center gap-2 font-sans font-medium text-dark text-xs uppercase tracking-[0.15em] group-hover:text-gold transition-colors"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Discover Bridal Studio
              <span className="text-gold">→</span>
            </motion.a>
          </motion.div>

          {/* Academy */}
          <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => { e.preventDefault(); scrollTo('#academy') }}
          >
            <div className="relative mb-6 aspect-[4/5] overflow-hidden">
              <div
                className="absolute inset-0 z-10"
                style={{ background: 'linear-gradient(to top, rgba(28,25,23,0.7) 0%, transparent 60%)' }}
              />
              <motion.img
                src="/what we offer pic/professional makeup artist.jpg.jpeg"
                alt="Academy"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="font-sans text-gold/80 text-xs uppercase tracking-[0.18em] mb-2">For Artists</p>
                <h3 className="font-serif text-white text-2xl md:text-3xl">Academy</h3>
              </div>
            </div>
            <p className="font-sans text-text-muted text-sm leading-relaxed mb-4">
              Professional makeup education, hands-on bridal training and artistic development.
            </p>
            <motion.a
              href="#academy"
              onClick={(e) => { e.preventDefault(); scrollTo('#academy') }}
              className="inline-flex items-center gap-2 font-sans font-medium text-dark text-xs uppercase tracking-[0.15em] group-hover:text-gold transition-colors"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Explore the Academy
              <span className="text-gold">→</span>
            </motion.a>
          </motion.div>

          {/* Beauty Studio */}
          <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => { e.preventDefault(); scrollTo('#services') }}
          >
            <div className="relative mb-6 aspect-[4/5] overflow-hidden">
              <div
                className="absolute inset-0 z-10"
                style={{ background: 'linear-gradient(to top, rgba(28,25,23,0.7) 0%, transparent 60%)' }}
              />
              <motion.img
                src="/what we offer pic/skin treatments.jpg.jpeg"
                alt="Beauty Studio"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="font-sans text-gold/80 text-xs uppercase tracking-[0.18em] mb-2">For Every Day</p>
                <h3 className="font-serif text-white text-2xl md:text-3xl">Beauty Studio</h3>
              </div>
            </div>
            <p className="font-sans text-text-muted text-sm leading-relaxed mb-4">
              Hair, skin, beauty care, nails and mehendi services.
            </p>
            <motion.a
              href="#services"
              onClick={(e) => { e.preventDefault(); scrollTo('#services') }}
              className="inline-flex items-center gap-2 font-sans font-medium text-dark text-xs uppercase tracking-[0.15em] group-hover:text-gold transition-colors"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Explore Services
              <span className="text-gold">→</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
