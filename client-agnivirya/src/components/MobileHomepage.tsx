import React from 'react';
import { useTranslation } from 'react-i18next';
import MobileHeader from './MobileHeader';
import './MobileHomepage.css';

interface MobileHomepageProps {
  onPaymentClick?: () => void;
}

const MobileHomepage: React.FC<MobileHomepageProps> = ({ onPaymentClick }) => {
  const { t } = useTranslation();

  const handlePaymentClick = () => {
    if (onPaymentClick) {
      onPaymentClick();
    } else {
      // Fallback navigation
      window.location.href = '/payment';
    }
  };

  return (
    <div className="mobile-homepage">
      {/* Mobile Header */}
      <MobileHeader onPaymentClick={handlePaymentClick} />
      
      {/* Mobile Hero Section */}
      <section className="mobile-hero">
        <div className="mobile-hero-container">
          <div className="mobile-hero-badge">
            <span className="mobile-badge-icon">🎯</span>
            <span>Transform Your Health</span>
          </div>
          
          <h1 className="mobile-hero-title">
            Discover the Ancient Secrets of Natural Healing
          </h1>
          
          <p className="mobile-hero-subtitle">
            Unlock the power of traditional remedies and modern science for optimal wellness
          </p>
          
          <div className="mobile-cta-card">
            <div className="mobile-urgency">
              <span className="mobile-urgency-text">🔥 Limited Time Offer</span>
            </div>
            
            <div className="mobile-price-section">
              <div className="mobile-price-main">
                <span className="mobile-price-currency">₹</span>
                <span className="mobile-price-amount">497</span>
              </div>
              <div className="mobile-price-original">₹1997</div>
              <div className="mobile-discount-badge">75% OFF</div>
            </div>
            
            <button className="mobile-cta-button" onClick={handlePaymentClick}>
              <span className="mobile-cta-text">Get Your Copy Now</span>
              <span className="mobile-cta-arrow">→</span>
            </button>
            
            <p className="mobile-guarantee">
              30-Day Money Back Guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Problem Statement */}
      <section className="mobile-problems">
        <div className="mobile-problems-container">
          <h2 className="mobile-section-title">
            Struggling with Health Issues?
          </h2>
          
          <div className="mobile-problems-grid">
            <div className="mobile-problem-card">
              <div className="mobile-problem-icon">💔</div>
              <h3>Chronic Health Problems</h3>
              <p>Dealing with persistent health issues that modern medicine can't fully resolve</p>
            </div>
            
            <div className="mobile-problem-card">
              <div className="mobile-problem-icon">😰</div>
              <h3>Side Effects & Dependencies</h3>
              <p>Concerned about medication side effects and long-term dependencies</p>
            </div>
            
            <div className="mobile-problem-card">
              <div className="mobile-problem-icon">⏰</div>
              <h3>Time & Cost Constraints</h3>
              <p>Limited time and budget for expensive treatments and consultations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Solution Overview */}
      <section className="mobile-solution">
        <div className="mobile-solution-container">
          <h2 className="mobile-section-title">
            Your Complete Solution
          </h2>
          
          <div className="mobile-solution-grid">
            <div className="mobile-solution-card">
              <div className="mobile-solution-icon">📚</div>
              <h3>Comprehensive Guide</h3>
              <p>200+ pages of proven natural remedies and healing techniques</p>
            </div>
            
            <div className="mobile-solution-card">
              <div className="mobile-solution-icon">🎯</div>
              <h3>Targeted Solutions</h3>
              <p>Specific remedies for common health issues and chronic conditions</p>
            </div>
            
            <div className="mobile-solution-card">
              <div className="mobile-solution-icon">⚡</div>
              <h3>Quick Results</h3>
              <p>See improvements in days, not months with our proven methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Benefits */}
      <section className="mobile-benefits">
        <div className="mobile-benefits-container">
          <h2 className="mobile-section-title">
            Why Choose Our Guide?
          </h2>
          
          <div className="mobile-benefits-grid">
            <div className="mobile-benefit-item">
              <div className="mobile-benefit-icon">✅</div>
              <div className="mobile-benefit-content">
                <h4>Scientifically Proven</h4>
                <p>All remedies backed by research and traditional wisdom</p>
              </div>
            </div>
            
            <div className="mobile-benefit-item">
              <div className="mobile-benefit-icon">✅</div>
              <div className="mobile-benefit-content">
                <h4>Easy to Follow</h4>
                <p>Step-by-step instructions anyone can implement</p>
              </div>
            </div>
            
            <div className="mobile-benefit-item">
              <div className="mobile-benefit-icon">✅</div>
              <div className="mobile-benefit-content">
                <h4>Cost Effective</h4>
                <p>Natural remedies that cost pennies instead of thousands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Testimonials */}
      <section className="mobile-testimonials">
        <div className="mobile-testimonials-container">
          <h2 className="mobile-section-title">
            What Our Readers Say
          </h2>
          
          <div className="mobile-testimonials-grid">
            <div className="mobile-testimonial-card">
              <div className="mobile-testimonial-avatar">👤</div>
              <p className="mobile-testimonial-text">
                "This guide completely changed how I approach my health. Highly recommended!"
              </p>
              <div className="mobile-testimonial-author">- Priya S.</div>
              <div className="mobile-testimonial-rating">⭐⭐⭐⭐⭐</div>
            </div>
            
            <div className="mobile-testimonial-card">
              <div className="mobile-testimonial-avatar">👤</div>
              <p className="mobile-testimonial-text">
                "Simple, practical, and effective. Exactly what I needed!"
              </p>
              <div className="mobile-testimonial-author">- Rajesh K.</div>
              <div className="mobile-testimonial-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Trust Indicators */}
      <section className="mobile-trust">
        <div className="mobile-trust-container">
          <div className="mobile-trust-grid">
            <div className="mobile-trust-item">
              <div className="mobile-trust-icon">🔒</div>
              <span>Secure Payment</span>
            </div>
            
            <div className="mobile-trust-item">
              <div className="mobile-trust-icon">📱</div>
              <span>Instant Access</span>
            </div>
            
            <div className="mobile-trust-item">
              <div className="mobile-trust-icon">💯</div>
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Final CTA */}
      <section className="mobile-final-cta">
        <div className="mobile-final-cta-container">
          <h2>Ready to Transform Your Health?</h2>
          <p>Join thousands who have already taken the first step</p>
          
          <div className="mobile-final-price">
            <span className="mobile-final-price-main">₹497</span>
            <span className="mobile-final-price-original">₹1997</span>
            <span className="mobile-final-discount">75% OFF</span>
          </div>
          
          <button className="mobile-final-cta-button" onClick={handlePaymentClick}>
            Get Started Now
          </button>
          
          <p className="mobile-final-guarantee">
            Risk-free with our 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
};

export default MobileHomepage;
