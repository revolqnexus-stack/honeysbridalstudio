import { FadeIn, FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/PremiumAnimations'

export function About() {
  return (
    <section id="about" data-nav-surface="light" className="section-gap bg-bg">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <FadeIn direction="left">
            <div className="relative">
              <img
                src="/photos/vineetha dp.webp"
                alt="Vineetha Benny"
                className="w-full aspect-[3/4] object-cover rounded-[14px] shadow-2xl"
                loading="lazy"
              />
              {/* Badge */}
              <div className="absolute -bottom-6 -right-4 bg-dark text-white p-5 rounded-[14px] shadow-xl text-center">
                <span className="block font-serif text-3xl font-normal text-gold leading-none">10+</span>
                <p className="text-[0.6rem] tracking-[0.12em] uppercase text-white/50 mt-1">Years of Artistry</p>
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <div className="pb-6">
            <FadeUp>
              <p className="mb-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-gold">Our Story</p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl font-normal leading-[1.05] text-dark md:text-5xl lg:text-[3.5rem] mb-5">
                The Artist<br /><em className="text-dark-2">Behind the Magic</em>
              </h2>
              <div className="section-divider mb-6 max-w-[120px]" />
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-text-muted text-lg mb-5 leading-[1.8]">
                Vineetha Benny is a certified airbrush bridal makeup artist and the founder of Honey's Bridal Studio, nestled in the lush highlands of Rajakumari, Idukki, Kerala.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-text-muted text-lg mb-10 leading-[1.8]">
                Her philosophy is simple — every bride deserves to look and feel like her most beautiful self. Through mastery in airbrush techniques, traditional Kerala bridal aesthetics, and deep attention to individual beauty, Vineetha creates timeless looks that photograph beautifully and last through the entire wedding day.
              </p>
            </FadeUp>

            {/* Stats */}
            <StaggerContainer className="flex flex-wrap gap-10 pt-8 border-t border-dark/8">
              {[
                { num: '200+', label: 'Happy Brides' },
                { num: '5★', label: 'Client Rating' },
                { num: 'Kerala', label: 'Wide Service' },
                { num: '♀', label: 'Ladies Only' },
              ].map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="flex flex-col gap-1">
                    <span className="font-serif text-4xl font-normal text-dark leading-none">{stat.num}</span>
                    <span className="text-[0.65rem] tracking-[0.15em] uppercase text-text-muted">{stat.label}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
