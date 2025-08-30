import React from 'react';
import {
  Crown,
  Users,
  Lightbulb,
  ArrowRight,
  Play,
  CheckCircle,
  Shield,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './SolutionOverviewSection.css';

const SolutionOverviewSection: React.FC = () => {
  const { language, t } = useLanguage();
  
  const handleCTAClick = () => {
    window.history.pushState({}, '', '/payment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const ebookBenefits = [
    {
      icon: Crown,
      title: language === 'en' ? "Premium Quality Content" : "प्रीमियम गुणवत्ता सामग्री",
      description: language === 'en' ? "200+ pages of authentic Ayurvedic wisdom" : "200+ पृष्ठों का प्रामाणिक आयुर्वेदिक ज्ञान",
      color: "var(--saffron)"
    },
    {
      icon: Users,
      title: language === 'en' ? "Expert Guidance" : "विशेषज्ञ मार्गदर्शन",
      description: language === 'en' ? "Step-by-step implementation strategies" : "चरणबद्ध कार्यान्वयन रणनीतियां",
      color: "var(--saffron)"
    }
  ];

  const ebookUSPs = [
    {
      icon: Shield,
      title: language === 'en' ? "100% Natural" : "100% प्राकृतिक",
      description: language === 'en' ? "No chemicals, no side effects" : "कोई रसायन नहीं, कोई दुष्प्रभाव नहीं"
    },
    {
      icon: Clock,
      title: language === 'en' ? "Lifetime Access" : "आजीवन पहुंच",
      description: language === 'en' ? "One payment, unlimited access" : "एक बार भुगतान, असीमित पहुंच"
    }
  ];

  const premiumFeatures = [
    {
      icon: Lightbulb,
      title: language === 'en' ? "Smart Solutions" : "स्मार्ट समाधान",
      description: language === 'en' ? "Intelligent approaches for modern challenges" : "आधुनिक चुनौतियों के लिए बुद्धिमान दृष्टिकोण"
    },
    {
      icon: Users,
      title: language === 'en' ? "Community Support" : "समुदाय समर्थन",
      description: language === 'en' ? "Join thousands of like-minded individuals" : "हजारों समान विचारधारा वाले लोगों में शामिल हों"
    },
    {
      icon: Shield,
      title: language === 'en' ? "Continuous Updates" : "निरंतर अपडेट",
      description: language === 'en' ? "Stay ahead with latest research findings" : "नवीनतम शोध निष्कर्षों के साथ आगे रहें"
    }
  ];

  return (
    <section id="solution" className="solution-overview-section">
      <div className="solution-overview-container">
        {/* Compact Header */}
        <div className="section-header">
          <div className="premium-badge">
            <Crown className="badge-icon" />
            <span>COMPLETE SOLUTION</span>
          </div>
          <h2 className="section-title">
            {language === 'en' 
              ? 'Everything You Need to Know'
              : 'आपको जो कुछ जानने की जरूरत है'
            }
          </h2>
          <p className="section-subtitle">
            {language === 'en'
              ? 'Your comprehensive guide to natural wellness and lasting transformation'
              : 'प्राकृतिक कल्याण और स्थायी परिवर्तन के लिए आपकी व्यापक गाइड'
            }
          </p>
        </div>

        {/* Compact Solution Layout */}
        <div className="solution-layout">
          {/* Ebook Benefits */}
          <div className="ebook-benefits">
            <div className="benefits-header">
              <h3 className="benefits-title">
                {language === 'en' ? 'What You\'ll Get' : 'आपको क्या मिलेगा'}
              </h3>
              <p className="benefits-subtitle">
                {language === 'en' ? 'Comprehensive solutions for every challenge' : 'हर चुनौती के लिए व्यापक समाधान'}
              </p>
            </div>
            
            <div className="benefits-grid">
              {ebookBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="benefit-item premium">
                    <div className="benefit-icon">
                      <IconComponent className="icon" style={{ color: benefit.color }} />
                    </div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">{benefit.title}</h4>
                      <p className="benefit-description">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ebook Mockup */}
          <div className="ebook-mockup">
            <div className="mockup-container premium">
              <div className="mockup-cover">
                <img 
                  src="/assets/ebook-cover.png" 
                  alt="AgniVirya Ebook Cover"
                  className="mockup-image"
                />
                <div className="mockup-glow"></div>
                <div className="premium-stamp">
                  <Crown className="stamp-icon" />
                  <span>PREMIUM</span>
                </div>
              </div>
              
              <div className="mockup-details">
                <div className="mockup-pages">
                  <Shield className="pages-icon" />
                  <span>200+ Pages</span>
                </div>
                <div className="mockup-format">
                  <Play className="format-icon" />
                  <span>PDF Format</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact USP Section */}
        <div className="usp-section premium">
          <h3 className="usp-title">
            {language === 'en' ? 'Why Choose This Guide?' : 'इस गाइड को क्यों चुनें?'}
          </h3>
          <div className="usp-grid">
            {ebookUSPs.map((usp, index) => {
              const IconComponent = usp.icon;
              return (
                <div key={index} className="usp-item premium">
                  <div className="usp-icon">
                    <IconComponent className="icon" />
                  </div>
                  <div className="usp-content">
                    <h4 className="usp-title">{usp.title}</h4>
                    <p className="usp-description">{usp.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Premium Features */}
        <div className="premium-features">
          <h3 className="features-title">
            {language === 'en' ? 'Premium Features' : 'प्रीमियम सुविधाएं'}
          </h3>
          <div className="features-grid">
            {premiumFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="feature-card premium">
                  <div className="feature-icon">
                    <IconComponent className="icon" />
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact CTA */}
        <div className="solution-cta premium">
          <div className="cta-content">
            <div className="cta-header">
              <h3 className="cta-title">
                {language === 'en' ? 'Ready to Transform Your Life?' : 'अपना जीवन बदलने के लिए तैयार हैं?'}
              </h3>
              <p className="cta-subtext">
                {language === 'en' 
                  ? 'Join thousands who have already discovered the power of natural solutions'
                  : 'हजारों लोगों में शामिल हों जिन्होंने पहले से ही प्राकृतिक समाधानों की शक्ति की खोज की है'
                }
              </p>
            </div>
            
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle className="feature-check" />
                <span>200+ Pages of Wisdom</span>
              </div>
              <div className="cta-feature">
                <CheckCircle className="feature-check" />
                <span>Instant Download</span>
              </div>
              <div className="cta-feature">
                <CheckCircle className="feature-check" />
                <span>30-Day Guarantee</span>
              </div>
            </div>
            
            <button className="cta-button premium" onClick={handleCTAClick}>
              <span className="button-text">Get My Guide at ₹99</span>
              <ArrowRight className="button-arrow" />
            </button>
            
            <p className="cta-note">
              {language === 'en' 
                ? 'Join 50,000+ people who have transformed their lives with AgniVirya'
                : '50,000+ लोगों में शामिल हों जिन्होंने अग्निवीर्य के साथ अपना जीवन बदल लिया है'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverviewSection;
