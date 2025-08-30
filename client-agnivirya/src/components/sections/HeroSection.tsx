import React from 'react';
import { getImagePath } from '@/utils/assetUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import './HeroSection.css';

interface HeroSectionProps {
  onPaymentClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPaymentClick }) => {
  const { language } = useLanguage();

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Hero Top Row - Sales Pitch Left, eBook Visual Right */}
        <div className="hero-top-row">
          {/* Left Column - Sales Pitch */}
          <div className="hero-sales-pitch">
            {/* Main Headline */}
            <h1 className="hero-title">
              {language === 'en' 
                ? 'Ancient Knowledge, Modern Strength'
                : 'प्राचीन ज्ञान, आधुनिक शक्ति'
              }
            </h1>

            {/* Clear Value Description */}
            <p className="hero-description">
              {language === 'en'
                ? 'Transform your life with ancient secrets that modern science now validates. This comprehensive guide contains everything you need to unlock your natural strength and vitality.'
                : 'आधुनिक विज्ञान द्वारा अब मान्यता प्राप्त प्राचीन रहस्यों के साथ अपना जीवन बदलें। इस व्यापक गाइड में आपकी प्राकृतिक शक्ति और जीवन शक्ति को अनलॉक करने के लिए आवश्यक सब कुछ शामिल है।'
              }
            </p>

            {/* Prominent CTA Card */}
            <div className="hero-cta-card">
              {/* Urgency Line */}
              <div className="urgency-line">
                <span className="urgency-text">
                  {language === 'en' ? 'Limited Time Offer – Only Today ₹99' : 'सीमित समय का प्रस्ताव – आज केवल ₹99'}
                </span>
              </div>
              
              {/* Main CTA Button */}
              <button
                className="hero-cta-button"
                onClick={onPaymentClick}
              > 
                <span className="cta-text">
                  {language === 'en' ? 'Get My Guide at ₹99' : '₹99 में मेरी गाइड प्राप्त करें'}
                </span>
                <span className="cta-price">
                  <span className="price-number">₹99</span>
                  <span className="cta-original">₹1,980</span>
                </span>
                <div className="cta-badge">
                  <span className="discount-number">95%</span> OFF
                </div>
              </button>

              {/* Money-back Guarantee */}
              <p className="cta-guarantee">
                {language === 'en' 
                  ? '30-Day Money-Back Guarantee • Instant Download'
                  : '30-दिन का पैसा वापसी गारंटी • तुरंत डाउनलोड'
                }
              </p>
            </div>
          </div>

          {/* Right Column - eBook Visual */}
          <div className="hero-ebook-visual">
            <div className="ebook-container">
              {/* eBook Mockup */}
              <div className="ebook-mockup">
                <div className="ebook-cover">
                  <img
                    src={getImagePath('agnivirya-logo.png')}
                    alt="AgniVirya Ayurvedic Guide"
                    className="ebook-image"
                  />
                  <div className="ebook-glow"></div>
                </div>
                
                {/* 3D Effect Elements */}
                <div className="ebook-shadow"></div>
                <div className="ebook-highlight"></div>
              </div>
              
              {/* eBook Details */}
              <div className="ebook-details">
                <div className="ebook-pages">
                  <span className="pages-icon">📖</span>
                  <span className="pages-text">
                    {language === 'en' ? '200+ Pages' : '200+ पेज'}
                  </span>
                </div>
                <div className="ebook-format">
                  <span className="format-icon">📱</span>
                  <span className="format-text">
                    {language === 'en' ? 'PDF + Mobile' : 'PDF + मोबाइल'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Row - Below Hero */}
        <div className="hero-features">
          <div className="feature-item">
            <div className="feature-icon">🌿</div>
            <div className="feature-content">
              <span className="feature-title">
                {language === 'en' ? '100% Natural' : '100% प्राकृतिक'}
              </span>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">🔬</div>
            <div className="feature-content">
              <span className="feature-title">
                {language === 'en' ? 'Scientifically Backed' : 'वैज्ञानिक रूप से समर्थित'}
              </span>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <div className="feature-content">
              <span className="feature-title">
                {language === 'en' ? '3-4 Weeks Results' : '3-4 सप्ताह के परिणाम'}
              </span>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">♾️</div>
            <div className="feature-content">
              <span className="feature-title">
                {language === 'en' ? 'Lifetime Access' : 'आजीवन पहुंच'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

