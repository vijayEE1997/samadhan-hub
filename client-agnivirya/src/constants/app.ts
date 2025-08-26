// Application-wide constants for the client application

// App Configuration
export const APP_CONFIG = {
  NAME: 'Agnivirya',
  SUBTITLE: 'Ancient Wisdom, Modern Strength',
  DESCRIPTION: 'Ancient Modern Wellness',
  VERSION: '1.0.0',
  LOGO_PATH: '/src/assets/agnivirya-logo.png',
} as const;

// Navigation Constants
export const NAVIGATION = {
  ITEMS: [
    { href: '#home', label: { en: 'Home', hi: 'होम' } },
    { href: '#about', label: { en: 'About Us', hi: 'हमारे बारे में' } },
    { href: '#features', label: { en: 'Features', hi: 'विशेषताएं' } },
    { href: '#testimonials', label: { en: 'Testimonials', hi: 'प्रशंसापत्र' } },
    { href: '#faq', label: { en: 'FAQ', hi: 'सवाल-जवाब' } }
  ],
  CTA_TEXT: { en: 'Get E-Book Now', hi: 'ई-बुक पाएँ' },
  HEADER_HEIGHT: 80,
} as const;

// Language Constants
export const LANGUAGES = {
  SUPPORTED: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ],
  DEFAULT: 'en',
} as const;

// Download Items Configuration
export const DOWNLOAD_ITEMS = [
  {
    name: 'Agnivirya Ancient Modern Wellness eBook',
    format: 'PDF',
    size: '2.4 MB',
    icon: 'BookOpen',
    description: 'Complete wellness guide with ancient wisdom'
  },
  {
    name: 'Meditation Audio Collection',
    format: 'MP3',
    size: '15.2 MB',
    icon: 'Heart',
    description: 'Guided meditation sessions for daily practice'
  },
  {
    name: 'Wellness Checklist & Tracker',
    format: 'PDF',
    size: '0.8 MB',
    icon: 'CheckCircle',
    description: 'Printable wellness tracking tools'
  },
  {
    name: 'Bonus: Ancient Remedies Guide',
    format: 'PDF',
    size: '1.1 MB',
    icon: 'Gift',
    description: 'Exclusive bonus content'
  }
] as const;

// Next Steps Configuration
export const NEXT_STEPS = [
  {
    step: 1,
    title: 'Download Your Materials',
    description: 'All files are ready for instant download',
    icon: 'Download',
    color: 'text-blue-600'
  },
  {
    step: 2,
    title: 'Start Reading',
    description: 'Begin with the main eBook for foundational knowledge',
    icon: 'BookOpen',
    color: 'text-green-600'
  },
  {
    step: 3,
    title: 'Practice Daily',
    description: 'Implement one wellness practice each day',
    icon: 'Heart',
    color: 'text-purple-600'
  },
  {
    step: 4,
    title: 'Track Progress',
    description: 'Use the checklist to monitor your wellness journey',
    icon: 'CheckCircle',
    color: 'text-orange-600'
  }
] as const;

// Success Page Configuration
export const SUCCESS_PAGE = {
  COUNTDOWN_DURATION: 5,
  SUCCESS_TITLE: '🎉 Payment Successful!',
  SUCCESS_DESCRIPTION: 'Welcome to your wellness transformation! Your ancient wisdom journey begins now.',
  COUNTDOWN_MESSAGE: '⏰ Your downloads will be ready in',
  ORDER_SUMMARY_TITLE: 'Order Summary',
} as const;

// Footer Configuration
export const FOOTER = {
  QUICK_LINKS: [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#features', label: 'Features' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' }
  ],
  WELLNESS_PROGRAMS: [
    { href: '#stress-relief', label: 'Stress Relief' },
    { href: '#immunity', label: 'Immunity Boost' },
    { href: '#energy', label: 'Energy Enhancement' },
    { href: '#sleep', label: 'Sleep Optimization' },
    { href: '#digestion', label: 'Digestive Health' },
    { href: '#meditation', label: 'Meditation' }
  ],
  SOCIAL_LINKS: [
    { href: '#', label: 'Facebook', icon: '📘' },
    { href: '#', label: 'Instagram', icon: '📷' },
    { href: '#', label: 'YouTube', icon: '📺' },
    { href: '#', label: 'LinkedIn', icon: '💼' }
  ],
  CONTACT_INFO: {
    email: 'info@agnivirya.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India',
    hours: 'Mon-Fri: 9AM-6PM'
  },
  TRUST_BADGES: [
    { icon: 'Shield', label: 'Secure & Trusted' },
    { icon: 'Award', label: 'Quality Assured' },
    { icon: 'Users', label: '10K+ Users' },
    { icon: 'Heart', label: 'Customer First' }
  ]
} as const;

// Floating Action Button Configuration
export const FAB = {
  PRICING: {
    DISCOUNT: '95% OFF',
    PRICE: '₹99',
    ORIGINAL: '₹1,980'
  },
  SCROLL_TOP_LABEL: 'Scroll to top'
} as const;

// Error Page Configuration
export const ERROR_PAGE = {
  NOT_FOUND: {
    TITLE: '404 - Page Not Found',
    MESSAGE: 'The page you are looking for does not exist.',
    BUTTON_TEXT: 'Go Back Home'
  }
} as const;

// API Configuration
export const API = {
  ENDPOINTS: {
    CONFIG: '/api/config',
    HEALTH: '/api/health'
  },
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3
} as const;

// UI Constants
export const UI = {
  ANIMATIONS: {
    SCROLL_BEHAVIOR: 'smooth',
    TRANSITION_DURATION: 300
  },
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1280
  },
  Z_INDEX: {
    HEADER: 50,
    FAB: 40,
    MODAL: 100,
    TOOLTIP: 200
  }
} as const;

// Payment Configuration
export const PAYMENT = {
  CURRENCY: 'INR',
  AMOUNT: 99,
  ORIGINAL_AMOUNT: 1980,
  DISCOUNT_PERCENTAGE: 95
} as const;
