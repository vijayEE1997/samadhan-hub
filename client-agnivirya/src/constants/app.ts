// Application-wide constants for the client application

// App Configuration
export const APP_CONFIG = {
  NAME: 'अग्निवीर्य',
  SUBTITLE: 'प्राचीन ज्ञान, आधुनिक बल',
  DESCRIPTION: 'Ancient Ayurvedic Wisdom for Modern Men',
  VERSION: '1.0.0',
} as const;

// Navigation Constants
export const NAVIGATION = {
  ITEMS: [
    { href: '#problem', label: { en: 'Problem', hi: 'समस्या' } },
    { href: '#solution', label: { en: 'Solution', hi: 'समाधान' } },
    { href: '#recipes', label: { en: 'Recipes', hi: 'नुस्खे' } },
    { href: '#science', label: { en: 'Science', hi: 'विज्ञान' } },
    { href: '#trust', label: { en: 'Trust', hi: 'भरोसा' } },
    { href: '#testimonials', label: { en: 'Results', hi: 'परिणाम' } },
    { href: '#faq', label: { en: 'FAQ', hi: 'सवाल-जवाब' } }
  ],
  CTA_TEXT: { en: 'Get eBook', hi: 'ई-बुक पाएँ' },
  HEADER_HEIGHT: 80,
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
    email: 'info@samadhaanhub.co.in',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India',
    hours: 'Mon-Fri: 9AM-6PM'
  }
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
