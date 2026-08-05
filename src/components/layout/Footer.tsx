import { motion } from 'framer-motion'
import { SITE_CONFIG } from '@/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0C0A09] pt-20 pb-6 relative overflow-hidden">
      <div className="container-custom">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-white/6">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="font-serif text-4xl italic text-white">
                Honey's
              </span>
              <span className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-white/40">
                BRIDAL STUDIO
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Luxury bridal makeup & beauty by certified airbrush artist Vineetha Benny, Rajakumari, Idukki, Kerala.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[0.7rem] tracking-[0.2em] uppercase text-white/30 mb-6">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#about" className="text-sm text-white/50 hover:text-gold transition-colors">
                About
              </a>
              <a href="#services" className="text-sm text-white/50 hover:text-gold transition-colors">
                Services
              </a>
              <a href="#portfolio" className="text-sm text-white/50 hover:text-gold transition-colors">
                Portfolio
              </a>
              <a href="#testimonials" className="text-sm text-white/50 hover:text-gold transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="text-sm text-white/50 hover:text-gold transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[0.7rem] tracking-[0.2em] uppercase text-white/30 mb-6">
              Connect
            </h4>
            <div className="flex flex-col gap-4">
              <a 
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-gold transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
              <a 
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-gold transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 text-center text-xs text-white/20">
          <p>© {currentYear} Honey's Bridal Studio. All rights reserved.</p>
        </div>
      </div>

      {/* Wordmark */}
      <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 font-serif text-[10rem] md:text-[14rem] font-bold italic text-white/[0.025] whitespace-nowrap pointer-events-none select-none tracking-tighter">
        Honey's
      </div>
    </footer>
  )
}
