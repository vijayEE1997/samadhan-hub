import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  en: {
    // Hero Section
    'hero.title': 'Agnivirya Ancient Modern Wellness',
    'hero.subtitle.sanskrit': 'प्राचीन ज्ञान, आधुनिक बल',
    'hero.subtitle.english': 'Ancient Ayurvedic wisdom for modern wellness. Transform your health naturally with time-tested formulations.',
    'hero.cta': '🔥 Get Complete eBook Now',
    'hero.guarantee': '60-Day Money Back Guarantee • No Questions Asked',
    
    // Problem Section
    'problem.title': 'The Problems with Modern Medicine',
    'problem.subtitle': 'Why traditional approaches often fail and leave you frustrated',
    'problem.ancient.quote': 'There is an ancient way that has been forgotten...',
    
    // Solution Section
    'solution.title': 'The Ancient Solution',
    'solution.subtitle': 'Rediscover the wisdom that has been passed down for thousands of years',
    'solution.results.title': 'Feel the Difference in 6-8 Weeks',
    'solution.results.subtitle': 'Our ancient formulations work with your body\'s natural rhythms to restore health and vitality',
    'solution.cta': 'Start Your Journey',
    
    // eBook Section
    'ebook.title': 'Your Complete Wellness Guide',
    'ebook.subtitle': 'Discover the ancient secrets that modern medicine has forgotten',
    'ebook.cta': '🔥 Get Your Copy Now - Only ₹997',
    
    // Benefits Section
    'benefits.title': 'Why Choose Ancient Wisdom?',
    'benefits.subtitle': 'Discover the advantages that make traditional Ayurvedic approaches superior to modern alternatives',
    'benefits.comparison.title': 'Ancient vs Modern: The Truth',
    'benefits.cta': '🔥 Start Your Wellness Journey Today',
    
    // Testimonials Section
    'testimonials.title': 'Real Stories from Real People',
    'testimonials.subtitle': 'Discover how thousands of people have transformed their health using ancient Ayurvedic wisdom',
    'testimonials.cta': '🔥 Start Your Transformation Today',
    
    // Guarantee Section
    'guarantee.title': 'Your Complete Protection',
    'guarantee.subtitle': 'We\'re so confident in our ancient wisdom that we offer the strongest guarantee in the wellness industry',
    'guarantee.cta': '🔥 Get Started Now - Only ₹997',
    
    // CTA Section
    'cta.title': 'Your Wellness Journey Starts Now',
    'cta.subtitle': 'Don\'t wait another day to experience the life-changing power of ancient Ayurvedic wisdom. Your transformation is just one click away.',
    'cta.main.button': '🔥 Get Started Now - Transform Your Health',
    'cta.urgency.title': '⚠️ Limited Time Offer - Don\'t Miss Out!',
    'cta.reminder.title': 'Remember: Your Health is Your Wealth',
    'cta.reminder.subtitle': 'Every day you wait is another day of suffering. Take action now and start your journey to natural wellness today.',
    'cta.reminder.button': '🚀 Start My Transformation Now',
    
    // Footer
    'footer.cta.title': 'Ready to Start Your Wellness Journey?',
    'footer.cta.subtitle': 'Join thousands who have already discovered the power of ancient wisdom. Your transformation starts today.',
    'footer.cta.button': '🔥 Get Started Now - Only ₹997',
    
    // Common
    'common.guarantee': '60-Day Money Back Guarantee • No Questions Asked',
    'common.instant': '⚡ Instant Download • 📱 Mobile Optimized',
    'common.secure': '100% Secure Payment • SSL Encrypted',
    'common.price.original': '₹2,997',
    'common.price.discounted': '₹997',
    'common.price.savings': '₹2,000 (67% OFF)',
  },
  hi: {
    // Hindi translations
    'hero.title': 'अग्निवीर्य प्राचीन आधुनिक कल्याण',
    'hero.subtitle.sanskrit': 'प्राचीन ज्ञान, आधुनिक बल',
    'hero.subtitle.english': 'आधुनिक कल्याण के लिए प्राचीन आयुर्वेदिक ज्ञान। समय-परीक्षित सूत्रों के साथ स्वाभाविक रूप से अपने स्वास्थ्य को बदलें।',
    'hero.cta': '🔥 अब पूरी ईबुक प्राप्त करें',
    'hero.guarantee': '60-दिन का पैसा वापस गारंटी • कोई सवाल नहीं',
    
    // Add more Hindi translations as needed
  },
  // Add more languages as needed
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations];
    if (langTranslations && key in langTranslations) {
      return langTranslations[key as keyof typeof langTranslations];
    }
    return key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
