import React from 'react';
import {
  Shield,
  BookOpen,
  Microscope,
  Award,
  CheckCircle,
  Star,
  Users,
  Leaf,
  Zap,
  Heart
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './TrustIndicatorsSection.css';

const TrustIndicatorsSection: React.FC = () => {
  const { language } = useLanguage();
  
  const handleCTAClick = () => {
    window.history.pushState({}, '', '/payment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const trustPoints = [
    {
      icon: BookOpen,
      title: "Based on Authentic Texts",
      description: "Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya",
      color: "var(--deep-green)"
    },
    {
      icon: Microscope,
      title: "Scientifically Validated",
      description: "50+ peer-reviewed studies and clinical trials",
      color: "var(--saffron)"
    },
    {
      icon: Award,
      title: "Made for Indian Men",
      description: "By someone who understands the culture and challenges",
      color: "var(--deep-green)"
    },
    {
      icon: Leaf,
      title: "Transparent Pricing",
      description: "No hidden costs, no recurring fees",
      color: "var(--saffron)"
    },
    {
      icon: Zap,
      title: "WhatsApp Support",
      description: "Direct chat for all your queries",
      color: "var(--deep-green)"
    },
    {
      icon: Heart,
      title: "Secure Payment",
      description: "Instant download after secure payment",
      color: "var(--saffron)"
    }
  ];

  const socialProof = [
    {
      number: "10,000+",
      label: "Men Helped",
      icon: Users
    },
    {
      number: "4.9/5",
      label: "Customer Rating",
      icon: Star
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: CheckCircle
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: Award
    }
  ];

  return (
    <section id="trust" className="trust-indicators-section">
      <div className="trust-indicators-container">
        {/* Compact Header */}
        <div className="section-header">
          <h2 className="section-title">
            {language === 'en' 
              ? 'Why Trust AgniVirya?'
              : 'अग्निवीर्य पर क्यों भरोसा करें?'
            }
          </h2>
          <p className="section-subtitle">
            {language === 'en'
              ? 'Join thousands of men who have already transformed their lives'
              : 'उन हजारों पुरुषों में शामिल हों जिन्होंने पहले से ही अपना जीवन बदल दिया है'
            }
          </p>
        </div>

        {/* Compact Trust Points Grid */}
        <div className="trust-points-grid">
          {trustPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div key={index} className="trust-point-card">
                <div className="trust-point-icon" style={{ backgroundColor: point.color }}>
                  <IconComponent className="icon" />
                </div>
                <div className="trust-point-content">
                  <h3 className="trust-point-title">{point.title}</h3>
                  <p className="trust-point-description">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Social Proof */}
        <div className="social-proof-block">
          {socialProof.map((proof, index) => {
            const IconComponent = proof.icon;
            return (
              <div key={index} className="proof-badge">
                <IconComponent className="icon" />
                <span className="proof-number">{proof.number}</span>
                <span className="proof-label">
                  {language === 'en' ? proof.label : proof.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Compact Guarantees */}
        <div className="guarantees-block">
          <h3 className="guarantees-title">
            <Shield className="icon" />
            {language === 'en' ? 'Your Guarantees' : 'आपकी गारंटी'}
          </h3>
          <div className="guarantees-grid">
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <Award className="icon" />
              </div>
              <div className="guarantee-content">
                <h4 className="guarantee-title">
                  {language === 'en' ? '30-day Money-Back Guarantee' : '30-दिन की पैसे वापसी की गारंटी'}
                </h4>
                <p className="guarantee-description">
                  {language === 'en' 
                    ? 'Not satisfied? Get your money back, no questions asked.'
                    : 'संतुष्ट नहीं? अपना पैसा वापस पाएं, कोई सवाल नहीं।'
                  }
                </p>
              </div>
            </div>
            
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <Zap className="icon" />
              </div>
              <div className="guarantee-content">
                <h4 className="guarantee-title">
                  {language === 'en' ? 'Lifetime Access' : 'आजीवन पहुंच'}
                </h4>
                <p className="guarantee-description">
                  {language === 'en' 
                    ? 'One-time payment, access forever to all updates.'
                    : 'एक बार का भुगतान, सभी अपडेट के लिए हमेशा पहुंच।'
                  }
                </p>
              </div>
            </div>
            
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <Award className="icon" />
              </div>
              <div className="guarantee-content">
                <h4 className="guarantee-title">
                  {language === 'en' ? 'Personal WhatsApp Support' : 'व्यक्तिगत व्हाट्सएप सहायता'}
                </h4>
                <p className="guarantee-description">
                  {language === 'en' 
                    ? 'Direct chat support for all your questions and concerns.'
                    : 'आपके सभी प्रश्नों और चिंताओं के लिए सीधी चैट सहायता।'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact CTA */}
        <div className="trust-cta">
          <div className="cta-content">
            <h3 className="cta-title">
              {language === 'en' 
                ? 'Ready to Transform Your Life?'
                : 'अपना जीवन बदलने के लिए तैयार हैं?'
              }
            </h3>
            <p className="cta-description">
              {language === 'en'
                ? 'Join thousands who have already discovered the power of scientifically validated Ayurvedic wisdom.'
                : 'उन हजारों लोगों में शामिल हों जिन्होंने पहले से ही वैज्ञानिक रूप से मान्य आयुर्वेदिक ज्ञान की शक्ति की खोज की है।'
              }
            </p>
            <button className="cta-button" onClick={handleCTAClick}>
              <span className="button-text">
                {language === 'en' ? 'Get My Guide at ₹99' : '₹99 में मेरी गाइड प्राप्त करें'}
              </span>
              <Award className="icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;
