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
    
    // Hero Section - English specific keys
    'hero.title.english': 'AgniVirya',
    'hero.subtitle.english': 'Ancient Wisdom, Modern Strength',
    'hero.description.english': 'Transform Your Sexual Health Naturally with Ancient Ayurvedic Wisdom',
    
    // Problem Section - Basic keys (detailed keys moved to Hindi section)
    
    // Solution Section - Basic keys (detailed keys moved to Hindi section)
    
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
    
    // Floating Action Button
    'fab.cta': 'Get E-Book Now',
    'fab.scrollTop': 'Scroll to top',
    'fab.discount': '95% OFF',
    'fab.price': '₹99',
    'fab.original': '₹1,980',
    
    // Success Stories Section
    'success.title.hindi': 'वास्तविक पुरुषों के वास्तविक परिणाम',
    'success.title.english': 'Real Results from Real Men',
    'success.subtitle': 'Don\'t just take our word for it. Here are the actual stories of men who have transformed their lives using AgniVirya\'s ancient wisdom.',
    'success.stories.title': 'Success Stories',
    'success.join.title': 'Join Thousands of Success Stories',
    'success.join.description': 'Every day, more men are discovering the power of AgniVirya and transforming their lives. You could be next!',
    'success.cta.title': 'Ready to Write Your Success Story?',
    'success.cta.description': 'Join Rajesh, Amit, Vikash, and thousands of other men who have already transformed their lives with AgniVirya.',
    'success.cta.market': 'Market solutions: ₹2000-5000/month',
    'success.cta.agnivirya': 'AgniVirya: ₹99 one-time',
    'success.cta.savings': 'Save ₹2000-5000 monthly',
    
    // AgniVirya Transformation Section
    'transformation.title': 'The AgniVirya Transformation',
    'transformation.before': 'Before',
    'transformation.after': 'After',
    
    // Results Statistics
    'stats.successRate': 'Success Rate',
    'stats.successDescription': 'Of men see significant improvement',
    'stats.rating': 'Customer Rating',
    'stats.ratingDescription': 'Based on 10,000+ reviews',
    'stats.timeToResults': 'Time to Results',
    'stats.timeDescription': 'Average improvement timeline',
    'stats.cost': 'One-time Cost',
    'stats.costDescription': 'vs ₹2000-5000 monthly',
    
    // Proof Highlights
    'proof.transformed': '10,000+ men already transformed',
    'proof.rating': '4.9/5 average customer rating',
    'proof.success': '95% success rate',
    
    // Problem Statement Section
    'problem.title': 'The Problems with Modern Medicine',
    'problem.subtitle': 'Why traditional approaches often fail and leave you frustrated',
    'problem.ancient.quote': 'There is an ancient way that has been forgotten...',
    'problem.modern.title': 'Modern Medicine Approach',
    'problem.ancient.title': 'Ancient Ayurvedic Approach',
    'problem.modern.points': 'Chemical dependency, Side effects, Temporary relief, High cost, Risk of complications',
    'problem.ancient.points': 'Natural ingredients, No side effects, Root cause treatment, Affordable, Safe & proven',
    
    // Solution Overview Section
    'solution.title': 'The Ancient Solution',
    'solution.subtitle': 'Rediscover the wisdom that has been passed down for thousands of years',
    'solution.results.title': 'Feel the Difference in 6-8 Weeks',
    'solution.results.subtitle': 'Our ancient formulations work with your body\'s natural rhythms to restore health and vitality',
    'solution.cta': 'Start Your Journey',
    'solution.benefits': 'Natural & Safe, Scientifically Proven, Affordable, Long-lasting Results',
    
    // Recipe Preview Section
    'recipe.title': 'Your Complete Wellness Guide',
    'recipe.subtitle': 'Discover the ancient secrets that modern medicine has forgotten',
    'recipe.cta': '🔥 Get Your Copy Now - Only ₹99',
    'recipe.features': '10 Proven Recipes, Step-by-step Instructions, Ingredient Lists, Timing Guidelines, Expected Results',
    
    // Scientific Validation Section
    'scientific.title': 'Modern Science Validates Ancient Wisdom',
    'scientific.subtitle': 'Research-backed evidence that proves the effectiveness of traditional Ayurvedic approaches',
    'scientific.studies': 'Clinical trials on natural ingredients, Peer-reviewed research papers, University studies, Traditional knowledge validation',
    'scientific.cta': 'Learn More About the Science',
    
    // Trust Indicators Section
    'trust.title': 'Why Trust AgniVirya?',
    'trust.subtitle': 'Join thousands of men who have already transformed their lives',
    'trust.reasons': '5000+ Years of Proven Wisdom, Scientifically Validated, No Side Effects, Affordable Solution, Money-back Guarantee',
    'trust.cta': 'Start Your Transformation',
    
    // Pricing Section
    'pricing.title': 'Smart Investment, Smart Results',
    'pricing.subtitle': 'Get the complete solution for less than the cost of a single doctor visit',
    'pricing.original': '₹1,980',
    'pricing.discounted': '₹99',
    'pricing.savings': '95% OFF',
    'pricing.features': 'Complete eBook Guide, 10 Proven Recipes, Lifetime Access, Mobile Optimized, Instant Download',
    'pricing.cta': 'Get Your Copy Now',
    'pricing.guarantee': '30-Day Money Back Guarantee',
    
    // FAQ Section
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about AgniVirya',
    'faq.question1': 'How long does it take to see results?',
    'faq.answer1': 'Most men see significant improvement within 3-4 weeks of following our recipes.',
    'faq.question2': 'Are the ingredients safe?',
    'faq.answer2': 'All ingredients are 100% natural and have been used safely for thousands of years.',
    'faq.question3': 'What if it doesn\'t work for me?',
    'faq.answer3': 'We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your money.',
    'faq.question4': 'Do I need any special equipment?',
    'faq.answer4': 'No special equipment needed. All recipes use common kitchen items and ingredients.',
    
    // Footer Section
    'footer.title': 'Ready to Start Your Wellness Journey?',
    'footer.subtitle': 'Join thousands who have already discovered the power of ancient wisdom',
    'footer.cta': '🔥 Get Started Now - Only ₹99',
    'footer.home': 'Home',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2024 AgniVirya. All rights reserved.',
    
    // Common Elements
    'common.learnMore': 'Learn More',
    'common.getStarted': 'Get Started',
    'common.viewAll': 'View All',
    'common.readMore': 'Read More',
    'common.seeResults': 'See Results',
    'common.trustedBy': 'Trusted by',
    'common.thousands': 'Thousands',
    'common.men': 'Men',
    'common.worldwide': 'Worldwide',
    'common.natural': 'Natural',
    'common.safe': 'Safe',
    'common.proven': 'Proven',
    'common.effective': 'Effective',
    'common.affordable': 'Affordable',
    'common.guaranteed': 'Guaranteed',
  },
  hi: {
    // Hindi translations
    'hero.title': 'अग्निवीर्य प्राचीन आधुनिक कल्याण',
    'hero.subtitle.sanskrit': 'प्राचीन ज्ञान, आधुनिक बल',
    'hero.subtitle.english': 'आधुनिक कल्याण के लिए प्राचीन आयुर्वेदिक ज्ञान। समय-परीक्षित सूत्रों के साथ स्वाभाविक रूप से अपने स्वास्थ्य को बदलें।',
    'hero.cta': '🔥 अब पूरी ईबुक प्राप्त करें',
    'hero.guarantee': '60-दिन का पैसा वापस गारंटी • कोई सवाल नहीं',
    
    // Floating Action Button
    'fab.cta': 'अब ईबुक प्राप्त करें',
    'fab.scrollTop': 'ऊपर जाएं',
    'fab.discount': '95% छूट',
    'fab.price': '₹99',
    'fab.original': '₹1,980',
    
    // Success Stories Section
    'success.title.hindi': 'वास्तविक पुरुषों के वास्तविक परिणाम',
    'success.title.english': 'Real Results from Real Men',
    'success.subtitle': 'सिर्फ हमारी बात पर भरोसा न करें। यहाँ उन पुरुषों की वास्तविक कहानियाँ हैं जिन्होंने अग्निवीर्य के प्राचीन ज्ञान का उपयोग करके अपने जीवन को बदल दिया है।',
    'success.stories.title': 'सफलता की कहानियाँ',
    'success.join.title': 'हजारों सफलता की कहानियों में शामिल हों',
    'success.join.description': 'हर दिन, अधिक पुरुष अग्निवीर्य की शक्ति की खोज कर रहे हैं और अपने जीवन को बदल रहे हैं। आप अगले हो सकते हैं!',
    'success.cta.title': 'अपनी सफलता की कहानी लिखने के लिए तैयार हैं?',
    'success.cta.description': 'राजेश, अमित, विकास और हजारों अन्य पुरुषों में शामिल हों जिन्होंने पहले ही अग्निवीर्य के साथ अपने जीवन को बदल दिया है।',
    'success.cta.market': 'बाजार के समाधान: ₹2000-5000/महीना',
    'success.cta.agnivirya': 'अग्निवीर्य: ₹99 एक बार',
    'success.cta.savings': '₹2000-5000 मासिक बचाएं',
    
    // AgniVirya Transformation Section
    'transformation.title': 'अग्निवीर्य परिवर्तन',
    'transformation.before': 'पहले',
    'transformation.after': 'बाद में',
    
    // Results Statistics
    'stats.successRate': 'सफलता दर',
    'stats.successDescription': 'पुरुषों में महत्वपूर्ण सुधार देखा',
    'stats.rating': 'ग्राहक रेटिंग',
    'stats.ratingDescription': '10,000+ समीक्षाओं के आधार पर',
    'stats.timeToResults': 'परिणामों का समय',
    'stats.timeDescription': 'औसत सुधार समय',
    'stats.cost': 'एक बार की लागत',
    'stats.costDescription': 'बनाम ₹2000-5000 मासिक',
    
    // Proof Highlights
    'proof.transformed': '10,000+ पुरुष पहले ही बदल चुके हैं',
    'proof.rating': '4.9/5 औसत ग्राहक रेटिंग',
    'proof.success': '95% सफलता दर',
    
    // Hero Section - Hindi specific keys
    'hero.title.hindi': 'अग्निवीर्य',
    'hero.subtitle.hindi': 'प्राचीन ज्ञान, आधुनिक बल',
    'hero.description.hindi': 'प्राचीन आयुर्वेदिक ज्ञान के साथ स्वाभाविक रूप से अपना यौन स्वास्थ्य बदलें',
    'hero.usp.ebook.label': 'पूरी ईबुक गाइड',
    'hero.usp.ebook.value': 'सिद्ध नुस्खे',
    'hero.usp.price.label': 'विशेष मूल्य',
    'hero.usp.price.value': 'केवल',
    'hero.usp.discount.label': 'सीमित समय',
    'hero.usp.discount.value': 'छूट',
    'hero.cta.button': 'अपनी ईबुक अभी प्राप्त करें',
    'hero.cta.guarantee': '✅ 30-दिन का पैसा वापस गारंटी • ⚡ तुरंत डाउनलोड',
    'hero.trust.proven': '5000+ वर्ष सिद्ध',
    'hero.trust.validated': 'वैज्ञानिक रूप से मान्य',
    'hero.benefits.natural.title': '100% प्राकृतिक और सुरक्षित',
    'hero.benefits.natural.description': 'कोई दुष्प्रभाव नहीं - शुद्ध आयुर्वेदिक ज्ञान',
    'hero.benefits.scientific.title': 'वैज्ञानिक रूप से प्रमाणित',
    'hero.benefits.scientific.description': 'सदियों से सिद्ध प्राचीन नुस्खे',
    'hero.benefits.results.title': '3-4 सप्ताह में परिणाम',
    'hero.benefits.results.description': 'स्वाभाविक रूप से अपना स्वास्थ्य बदलें',
    'hero.benefits.price.title': '₹99 में पूरी गाइड',
    'hero.benefits.price.description': '₹2000+ नहीं - आज 95% बचाएं',
    
    // Problem Statement Section
    'problem.title': 'आधुनिक चिकित्सा की समस्याएं',
    'problem.subtitle': 'क्यों पारंपरिक दृष्टिकोण अक्सर विफल होते हैं और आपको निराश छोड़ देते हैं',
    'problem.ancient.quote': 'एक प्राचीन तरीका है जिसे भुला दिया गया है...',
    'problem.modern.title': 'आधुनिक चिकित्सा दृष्टिकोण',
    'problem.ancient.title': 'प्राचीन आयुर्वेदिक दृष्टिकोण',
    'problem.modern.points': 'रासायनिक निर्भरता, दुष्प्रभाव, अस्थायी राहत, उच्च लागत, जटिलताओं का जोखिम',
    'problem.ancient.points': 'प्राकृतिक सामग्री, कोई दुष्प्रभाव नहीं, मूल कारण उपचार, सस्ती, सुरक्षित और सिद्ध',
    
    // Solution Overview Section
    'solution.title': 'प्राचीन समाधान',
    'solution.subtitle': 'हजारों वर्षों से चली आ रही ज्ञान को फिर से खोजें',
    'solution.results.title': '6-8 सप्ताह में अंतर महसूस करें',
    'solution.results.subtitle': 'हमारे प्राचीन सूत्र आपके शरीर की प्राकृतिक लय के साथ काम करते हैं',
    'solution.cta': 'अपनी यात्रा शुरू करें',
    'solution.benefits': 'प्राकृतिक और सुरक्षित, वैज्ञानिक रूप से सिद्ध, सस्ती, दीर्घकालिक परिणाम',
    
    // Recipe Preview Section
    'recipe.title': 'आपकी पूरी कल्याण गाइड',
    'recipe.subtitle': 'आधुनिक चिकित्सा द्वारा भुलाए गए प्राचीन रहस्यों की खोज करें',
    'recipe.cta': '🔥 अब अपनी कॉपी प्राप्त करें - केवल ₹99',
    'recipe.features': '10 सिद्ध नुस्खे, चरण-दर-चरण निर्देश, सामग्री सूची, समय निर्देश, अपेक्षित परिणाम',
    
    // Scientific Validation Section
    'scientific.title': 'आधुनिक विज्ञान प्राचीन ज्ञान को मान्य करता है',
    'scientific.subtitle': 'अनुसंधान-समर्थित साक्ष्य जो पारंपरिक आयुर्वेदिक दृष्टिकोणों की प्रभावशीलता साबित करते हैं',
    'scientific.studies': 'प्राकृतिक सामग्रियों पर नैदानिक परीक्षण, सहकर्मी-समीक्षित अनुसंधान पत्र, विश्वविद्यालय अध्ययन, पारंपरिक ज्ञान मान्यीकरण',
    'scientific.cta': 'विज्ञान के बारे में और जानें',
    
    // Trust Indicators Section
    'trust.title': 'अग्निवीर्य पर क्यों भरोसा करें?',
    'trust.subtitle': 'हजारों पुरुषों में शामिल हों जिन्होंने पहले ही अपने जीवन को बदल दिया है',
    'trust.reasons': '5000+ वर्षों का सिद्ध ज्ञान, वैज्ञानिक रूप से मान्य, कोई दुष्प्रभाव नहीं, सस्ता समाधान, पैसा वापस गारंटी',
    'trust.cta': 'अपना परिवर्तन शुरू करें',
    
    // Pricing Section
    'pricing.title': 'स्मार्ट निवेश, स्मार्ट परिणाम',
    'pricing.subtitle': 'एक डॉक्टर की यात्रा की लागत से कम में पूरा समाधान प्राप्त करें',
    'pricing.original': '₹1,980',
    'pricing.discounted': '₹99',
    'pricing.savings': '95% छूट',
    'pricing.features': 'पूरी ईबुक गाइड, 10 सिद्ध नुस्खे, आजीवन पहुंच, मोबाइल अनुकूलित, तुरंत डाउनलोड',
    'pricing.cta': 'अब अपनी कॉपी प्राप्त करें',
    'pricing.guarantee': '30-दिन का पैसा वापस गारंटी',
    
    // FAQ Section
    'faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
    'faq.subtitle': 'अग्निवीर्य के बारे में आपको जो कुछ जानने की आवश्यकता है',
    'faq.question1': 'परिणाम देखने में कितना समय लगता है?',
    'faq.answer1': 'अधिकांश पुरुष हमारे नुस्खों का पालन करने के 3-4 सप्ताह के भीतर महत्वपूर्ण सुधार देखते हैं।',
    'faq.question2': 'क्या सामग्री सुरक्षित हैं?',
    'faq.answer2': 'सभी सामग्री 100% प्राकृतिक हैं और हजारों वर्षों से सुरक्षित रूप से उपयोग की जा रही हैं।',
    'faq.question3': 'अगर यह मेरे लिए काम नहीं करता तो क्या होगा?',
    'faq.answer3': 'हम 30-दिन का पैसा वापस गारंटी देते हैं। यदि आप संतुष्ट नहीं हैं, तो हम आपका पैसा वापस कर देंगे।',
    'faq.question4': 'क्या मुझे कोई विशेष उपकरण चाहिए?',
    'faq.answer4': 'कोई विशेष उपकरण नहीं चाहिए। सभी नुस्खे सामान्य रसोई के सामान और सामग्रियों का उपयोग करते हैं।',
    
    // Footer Section
    'footer.title': 'अपनी कल्याण यात्रा शुरू करने के लिए तैयार हैं?',
    'footer.subtitle': 'हजारों लोगों में शामिल हों जिन्होंने पहले ही प्राचीन ज्ञान की शक्ति की खोज की है',
    'footer.cta': '🔥 अब शुरू करें - केवल ₹99',
    'footer.home': 'होम',
    'footer.about': 'हमारे बारे में',
    'footer.contact': 'संपर्क',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    'footer.copyright': '© 2024 अग्निवीर्य। सर्वाधिकार सुरक्षित।',
    
    // Common Elements
    'common.learnMore': 'और जानें',
    'common.getStarted': 'शुरू करें',
    'common.viewAll': 'सभी देखें',
    'common.readMore': 'और पढ़ें',
    'common.seeResults': 'परिणाम देखें',
    'common.trustedBy': 'द्वारा विश्वसनीय',
    'common.thousands': 'हजारों',
    'common.men': 'पुरुष',
    'common.worldwide': 'दुनिया भर में',
    'common.natural': 'प्राकृतिक',
    'common.safe': 'सुरक्षित',
    'common.proven': 'सिद्ध',
    'common.effective': 'प्रभावी',
    'common.affordable': 'सस्ती',
    'common.guaranteed': 'गारंटीकृत',
    
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
  const [language, setLanguage] = useState('hi');

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
