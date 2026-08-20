/** Shared layout tokens — keep in sync with --site-header-height in index.css */
export const LAYOUT = {
  headerHeightPx: 92,
} as const

export const SITE_CONFIG = {
  name: "Honey's",
  tagline: "Bridal Artistry · Kerala",
  motto: "Gracefully You, Beautifully Bridal.",
  description: "From signature bridal transformations to professional makeup education, Honey's brings beauty, artistry and technique together under one roof.",
  phone: "+916282551317",
  whatsapp: "https://wa.me/916282551317",
  instagram: "https://www.instagram.com/vineetha_honeys_",
  location: "Rajakumari, Idukki District, Kerala, India",
  googleMaps: "https://maps.app.goo.gl/GSVDcUn5dzfFS4mc7",
} as const

export const SERVICES = [
  {
    id: 1,
    title: "Professional Makeup Artist",
    description: "Flawless, expertly applied makeup looks crafted to enhance your natural beauty for any occasion.",
    image: "/what we offer pic/professional makeup artist.jpg.jpeg",
  },
  {
    id: 2,
    title: "Bridal Makeup, Hairstyle & Saree Drape",
    description: "Complete bridal transformations including makeup, custom hair styling, and perfect traditional saree draping.",
    image: "/what we offer pic/bridal makeup,hairstyle and saree drape.jpg.jpeg",
  },
  {
    id: 3,
    title: "Haircuts & Styling",
    description: "Trendy and classic hair cuts with professional styling tailored to frame your face perfectly.",
    image: "/what we offer pic/haircuts and styling.jpg.jpeg",
  },
  {
    id: 4,
    title: "Hair Treatments",
    description: "Nourishing treatments to restore shine, strength, and health to your hair using premium products.",
    image: "/what we offer pic/hair treatments.jpg.jpeg",
  },
  {
    id: 5,
    title: "Skin Treatments",
    description: "Rejuvenating skin therapies and facials designed to clear and brighten your complexion.",
    image: "/what we offer pic/skin treatments.jpg.jpeg",
  },
  {
    id: 6,
    title: "Mehndi Design",
    description: "Intricate, beautiful henna and mehndi designs applied by skilled artists for your special moments.",
    image: "/what we offer pic/mehndi design.jpg.jpeg",
  },
] as const

export const TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    text: "Thanku so much chechikuttiii. make up super aarunnu. oral polum moshm comment parnjila. ellarum super arnnunn parnju. saree draping paryan ilato — adipoli arnn. hair style um nannayit chythu!",
    name: "Bridal Client",
    occasion: "Wedding & Photography Look",
  },
  {
    id: 2,
    rating: 5,
    text: "Thank you chechi! Wedding look ethra special aayi — simpleum elegantum aayi oru perfect touch undayirunnu. Hair style um njan aagrahichapole thanne set cheythu thannu. Ellarkkum othiri ishtamaay!",
    name: "Bridal Client",
    occasion: "Wedding Vibe",
  },
  {
    id: 3,
    rating: 5,
    text: "Thank you so much chechi for making me gorgeous on my big day! The three looks was entirely different and amazing. You made me feel absolutely beautiful and I felt confidence and completely myself.",
    name: "Bridal Client",
    occasion: "Three Big Day Looks",
  },
  {
    id: 4,
    rating: 5,
    text: "Chechi serikkum work orupaadu ishttappettutto ❤ Make up, hair, photography ellam ishttamaayi. Njan normally makeup use cheyyathathukond nalla tension undairunnu. But vijarichathilum adipoli!",
    name: "Bridal Client",
    occasion: "Comfort & Effort",
  },
  {
    id: 5,
    rating: 5,
    text: "Chechiii make-up set ayerutooo! Full day makeup oru problem elland ninnu — set ayerunnu. Ellam agrahichapole thanne ellam chechi nallapolee cheyyth thannu!",
    name: "Bridal Client",
    occasion: "Makeup Longevity",
  },
] as const

/** Studio interior shots — files live in public/photos/studio/ */
export const STUDIO_INTERIOR_IMAGES = [
  {
    src: '/photos/studio/interior6.png',
    fallback: '/photos/studio/interior.jpeg',
    alt: "Honey's studio interior — bridal preparation space",
    caption: 'Bridal Suite',
    eyebrow: 'Rajakumari · Idukki',
    title: 'A space designed for transformation',
    subtitle: 'Warm light, considered details, and the calm before your walk down the aisle.',
  },
  {
    src: '/photos/studio/interior7.png',
    fallback: '/photos/studio/interior1.jpeg',
    alt: "Honey's beauty house interior",
    caption: 'Beauty House',
    eyebrow: 'Honey\'s Beauty House',
    title: 'Where everyday beauty meets artistry',
    subtitle: 'Hair, skin, and beauty care in an environment as refined as the service.',
  },
  {
    src: '/photos/studio/interior4.jpeg',
    fallback: '/photos/studio/interior5.jpeg',
    alt: "Honey's studio styling area",
    caption: 'The Atelier',
    eyebrow: 'The Studio',
    title: 'Every detail, intentionally placed',
    subtitle: 'From mirror to makeup chair — a studio built for brides and artists alike.',
  },
] as const

export const STUDIO_GALLERY_STRIP = [
  {
    src: '/photos/studio/interior.jpeg',
    fallback: '/photos/studio/interior1.jpeg',
    alt: 'Studio interior detail',
    caption: 'The Suite',
  },
  {
    src: '/photos/studio/interior1.jpeg',
    fallback: '/photos/studio/interior.jpeg',
    alt: 'Studio mirror and light',
    caption: 'The Light',
  },
  {
    src: '/photos/studio/interior6.png',
    fallback: '/photos/studio/interior3.jpeg',
    alt: 'Studio styling area',
    caption: 'The Studio',
  },
  {
    src: '/photos/studio/interior3.jpeg',
    fallback: '/photos/studio/interior4.jpeg',
    alt: 'Studio styling corner',
    caption: 'The Detail',
  },
  {
    src: '/photos/studio/interior7.png',
    fallback: '/photos/studio/interior4.jpeg',
    alt: 'Studio preparation area',
    caption: 'The Space',
  },
  {
    src: '/photos/studio/interior4.jpeg',
    fallback: '/photos/studio/interior5.jpeg',
    alt: 'Studio preparation area',
    caption: 'The Atelier',
  },
  {
    src: '/photos/studio/interior5.jpeg',
    fallback: '/photos/studio/interior4.jpeg',
    alt: 'Studio finishing touches',
    caption: 'The Finishing',
  },
] as const

export const PORTFOLIO_IMAGES = [
  "/photos/1.jpg.jpeg",
  "/photos/2.webp",
  "/photos/3.webp",
  "/photos/4.webp",
  "/photos/5.webp",
  "/photos/6.webp",
  "/photos/7.jpg.jpeg",
  "/photos/8.jpg.jpeg",
  "/photos/9.webp",
  "/photos/10.webp",
  "/photos/11.webp",
  "/photos/12.webp",
] as const

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Bridal Studio", href: "#bridal-studio" },
  { label: "Academy", href: "#academy" },
  { label: "Services", href: "#services" },
  { label: "Brides", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
] as const

export const MARQUEE_ITEMS = [
  "Bridal Artistry",
  "Ladies Only",
  "Professional Makeup Education",
  "Bridal Makeup",
  "Hairstyle & Saree Drape",
  "Ladies Only Salon",
  "Haircuts & Styling",
  "Hair Treatments",
  "Skin Treatments",
  "Mehndi Design",
] as const

export const ACADEMY_PROGRAMS = [
  {
    id: 1,
    title: "Basic Beauty",
    slug: "basic-beauty",
    description: "Foundation-level beauty training for beginners.",
    audience: "Beginners",
    outcomes: [
      "Beauty & skincare basics",
      "Self makeup",
      "Product knowledge",
      "Hair basics",
      "Party makeup"
    ]
  },
  {
    id: 2,
    title: "Professional Makeup",
    slug: "professional-makeup",
    description: "Professional makeup techniques and working fundamentals.",
    audience: "Aspiring Makeup Artists",
    outcomes: [
      "HD makeup",
      "Airbrush makeup",
      "Eye makeup",
      "Self grooming",
      "Saree draping",
      "Client handling"
    ]
  },
  {
    id: 3,
    title: "Advanced Bridal",
    slug: "advanced-bridal",
    description: "Advanced bridal artistry and specialized bridal techniques.",
    audience: "Working Makeup Artists",
    outcomes: [
      "Bridal makeup",
      "Advanced hairstyling",
      "Bridal hair",
      "Hair extensions basics",
      "Portfolio development"
    ]
  },
  {
    id: 4,
    title: "Master Artist",
    slug: "master-artist",
    description: "Advanced professional development and career-focused artistry.",
    audience: "Professional Artists",
    outcomes: [
      "Creative hair styling",
      "Editorial & creative looks",
      "Business & marketing",
      "Career development",
      "Professional portfolio"
    ]
  }
] as const

export const SERVICE_CATEGORIES = [
  {
    id: 1,
    title: "Makeup",
    navLabel: "Makeup",
    slug: "makeup",
    heading: "Makeup Artistry",
    tagline: "Signature makeup artistry for brides, celebrations and every occasion worth remembering.",
    image: "/what we offer pic/professional makeup artist.jpg.jpeg",
    imageAlt: "Professional makeup artistry at Honey's Bridal Studio",
    services: [
      {
        name: "Bridal Makeup",
        description: "Bespoke bridal looks crafted around your features, outfit, jewellery and ceremony.",
      },
      {
        name: "Engagement Makeup",
        description: "Refined makeup for engagement ceremonies and intimate celebrations.",
      },
      {
        name: "Reception Makeup",
        description: "Sophisticated evening looks designed for reception lighting and photography.",
      },
      {
        name: "Party Makeup",
        description: "Elevated occasion makeup for celebrations, events and special evenings.",
      },
      {
        name: "Guest Makeup",
        description: "Polished, effortless makeup for wedding guests and family.",
      },
      {
        name: "HD / Ultra HD Makeup",
        description: "High-definition finishes designed to remain seamless under photography and video.",
      },
      {
        name: "Waterproof Makeup",
        description: "Long-wear makeup designed for Kerala's climate and demanding occasions.",
      },
      {
        name: "Airbrush Makeup",
        description: "Lightweight, finely finished coverage with a smooth photographic finish.",
      },
      {
        name: "Glass Skin / Glow Makeup",
        description: "Luminous, skin-focused makeup with a fresh, radiant finish.",
      },
    ],
  },
  {
    id: 2,
    title: "Bridal Services",
    navLabel: "Bridal Services",
    slug: "bridal",
    heading: "Bridal Services",
    tagline: "The details that complete the bridal transformation.",
    image: "/what we offer pic/bridal makeup,hairstyle and saree drape.jpg.jpeg",
    imageAlt: "Bridal styling, saree draping and finishing at Honey's",
    services: [
      {
        name: "Bridal Hairstyling",
        description: "Custom hair design tailored to your face, outfit and ceremony traditions.",
      },
      {
        name: "Saree Draping",
        description: "Elegant, secure draping in Kerala and South Indian styles.",
      },
      {
        name: "Jewellery Setting",
        description: "Precise placement and adjustment of bridal jewellery for a polished finish.",
      },
      {
        name: "Flower Setting",
        description: "Fresh floral adornments arranged with care for traditional bridal looks.",
      },
      {
        name: "Pre-Pleating",
        description: "Expert pleating preparation so your saree falls beautifully throughout the day.",
      },
      {
        name: "Bridal Box Folding",
        description: "Meticulous folding and presentation of bridal essentials for the ceremony.",
      },
      {
        name: "Hanger Folding",
        description: "Careful garment preparation to keep bridal wear pristine before and after.",
      },
    ],
  },
  {
    id: 3,
    title: "Hair",
    navLabel: "Hair",
    slug: "hair",
    heading: "Hair Care & Styling",
    tagline: "From everyday refinement to occasion-ready styling and restorative treatments.",
    image: "/what we offer pic/haircuts and styling.jpg.jpeg",
    imageAlt: "Hair styling and treatments at Honey's",
    services: [
      {
        name: "Hair Cut",
        description: "Precision cuts shaped to complement your features and lifestyle.",
      },
      {
        name: "Hair Spa",
        description: "Deep nourishment and relaxation for healthier, more manageable hair.",
      },
      {
        name: "Korean Hair Spa",
        description: "Advanced Korean-inspired treatment for shine, softness and scalp care.",
      },
      {
        name: "Hair Treatment",
        description: "Targeted therapies to restore strength, moisture and vitality.",
      },
      {
        name: "Hair Wash",
        description: "Professional cleansing and conditioning with premium products.",
      },
      {
        name: "Hair Setting",
        description: "Structured styling for events, photography and everyday elegance.",
      },
      {
        name: "Bridal & Party Hairstyling",
        description: "Occasion-ready hair designed to complement your makeup and attire.",
      },
    ],
  },
  {
    id: 4,
    title: "Skin Care",
    navLabel: "Skin Care",
    slug: "skin",
    heading: "Skin Care",
    tagline: "Restorative facials and treatments to reveal a clear, luminous complexion.",
    image: "/what we offer pic/skin treatments.jpg.jpeg",
    imageAlt: "Skin care treatments at Honey's",
    services: [
      {
        name: "Facial",
        description: "Customised facial treatments to cleanse, nourish and revitalise the skin.",
      },
      {
        name: "HydraFacial",
        description: "Advanced hydration and exfoliation for an instantly refreshed glow.",
      },
      {
        name: "Cleanup",
        description: "Thorough deep cleansing to remove impurities and restore clarity.",
      },
      {
        name: "De-Tan",
        description: "Gentle treatment to reduce tan and even out skin tone.",
      },
      {
        name: "Scrub & Face Pack",
        description: "Exfoliation and masking for smoother, brighter skin.",
      },
      {
        name: "Face Hair Removal",
        description: "Precise, gentle removal for a clean and polished appearance.",
      },
      {
        name: "Bridal Skin Care",
        description: "Pre-wedding skin preparation tailored for your big day.",
      },
    ],
  },
  {
    id: 5,
    title: "Beauty Care",
    navLabel: "Beauty Care",
    slug: "beauty-care",
    heading: "Beauty Care",
    tagline: "Essential grooming and body care delivered with precision and hygiene.",
    image: "/what we offer pic/hair treatments.jpg.jpeg",
    imageAlt: "Beauty and body care at Honey's",
    services: [
      {
        name: "Threading",
        description: "Precise eyebrow and facial threading for a defined, natural shape.",
      },
      {
        name: "Waxing",
        description: "Professional waxing with careful attention to comfort and results.",
      },
      {
        name: "Manicure",
        description: "Nail shaping, cuticle care and finishing for polished hands.",
      },
      {
        name: "Pedicure",
        description: "Foot care and nail refinement for a complete, well-groomed look.",
      },
      {
        name: "Hand & Leg De-Tan",
        description: "Targeted de-tanning to restore even tone on exposed skin.",
      },
      {
        name: "Head Massage",
        description: "Relaxing scalp massage to relieve tension and promote wellbeing.",
      },
    ],
  },
  {
    id: 6,
    title: "Nails & Mehendi",
    navLabel: "Nails & Mehendi",
    slug: "nails-mehendi",
    heading: "Nails & Mehendi",
    tagline: "Artful nail design and intricate mehendi for celebrations and bridal moments.",
    image: "/what we offer pic/mehndi design.jpg.jpeg",
    imageAlt: "Mehendi and nail art at Honey's",
    priceColumns: [
      { key: "priceBoth", label: "Both / Feet" },
      { key: "priceOne", label: "One Hand" },
    ] as const,
    groups: [
      {
        label: "Nail Art & Polish",
        services: [
          {
            name: "Nail Art",
            description: "Creative nail design for occasions, celebrations and everyday elegance.",
          },
        ],
      },
      {
        label: "Mehendi",
        services: [
          {
            name: "Mehendi Work",
            description: "Beautiful henna designs for festivals, functions and special events.",
          },
          {
            name: "Bridal Mehendi",
            description: "Elaborate bridal mehendi crafted with tradition, detail and artistry.",
          },
        ],
      },
    ] as const,
    services: [
      {
        name: "Nail Art",
        description: "Creative nail design for occasions, celebrations and everyday elegance.",
      },
      {
        name: "Mehendi Work",
        description: "Beautiful henna designs for festivals, functions and special events.",
      },
      {
        name: "Bridal Mehendi",
        description: "Elaborate bridal mehendi crafted with tradition, detail and artistry.",
      },
    ],
  },
] as const
