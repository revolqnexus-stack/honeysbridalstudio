import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Celebrity() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section 
      ref={sectionRef}
      className="section-gap bg-dark "
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Images */}
          <motion.div
            className="relative max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <img
              src="/photos/binny vineetha 1.webp"
              alt="Vineetha Benny with Binny Sebastian"
              className="w-full aspect-[3/4] object-cover rounded-md shadow-lg"
              loading="lazy"
            />
            <motion.img
              src="/photos/binny2.webp"
              alt="Binny Sebastian"
              className="absolute w-[45%] aspect-square object-cover rounded-sm -bottom-8 -right-8 border-4 border-dark shadow-md"
              loading="lazy"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>

          {/* Text */}
          <div>
            <motion.p
              className="text-xs font-medium tracking-[0.25em] uppercase text-gold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Celebrity Testimonial
            </motion.p>

            <motion.div
              className="flex gap-1 text-gold text-xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </motion.div>

            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-[1.15] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <em className="text-white/65">Binny Sebastian</em>
            </motion.h2>

            <motion.blockquote
              className="font-serif text-lg md:text-xl italic text-white/75 leading-relaxed mb-6 border-l-2 border-gold pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              "Vineetha's makeup artistry is truly exceptional. She understands how to enhance natural beauty while maintaining elegance and grace. I highly recommend Honey's Bridal Studio for brides who want a flawless and sophisticated look."
            </motion.blockquote>

            <motion.p
              className="text-sm tracking-[0.15em] uppercase text-text-muted"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Malayalam Cinema Actress
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
