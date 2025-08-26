import React from 'react';
import {
  BookOpen,
  Zap,
  Shield,
  Users,
  Star,
  Award,
  Clock,
  CheckCircle,
  Gift,
  ArrowRight
} from 'lucide-react';

interface HeroSectionProps {
  onPaymentClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPaymentClick }) => {
  const features = [
    {
      icon: BookOpen,
      title: "Complete Guide",
      description: "200+ pages of comprehensive content"
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Learn at your own pace, forever"
    },
    {
      icon: Zap,
      title: "Instant Download",
      description: "Get started immediately after purchase"
    },
    {
      icon: Gift,
      title: "Bonus Templates",
      description: "Free creative assets included"
    }
  ];

  const trustBadges = [
    {
      icon: Shield,
      text: "100% Secure"
    },
    {
      icon: CheckCircle,
      text: "Money Back"
    },
    {
      icon: Clock,
      text: "Instant Access"
    }
  ];

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Main Hero Content */}
        <div className="hero-main-content">
          <div className="hero-text-content">
            <div className="hero-badge">
              <Star className="icon" />
              <span>Trusted by 10K+ Customers</span>
            </div>

            <h1 className="hero-title">
              Master Your Success with
              <span className="title-highlight"> AgniVirya</span>
            </h1>

            <p className="hero-description">
              Unlock the secrets to achieving your goals with our comprehensive 200+ page guide.
              Learn proven strategies, techniques, and insights that have transformed thousands of lives.
            </p>

            {/* Hero CTA Section */}
            <div className="hero-cta-section">
              <div className="hero-pricing">
                <div className="price-display">
                  <div className="price-original">₹1,980</div>
                  <div className="price-current">₹99</div>
                  <div className="discount-badge">95% OFF</div>
                </div>
                <button onClick={onPaymentClick} className="hero-cta-button">
                  <Zap className="icon" />
                  <span>Get Instant Access</span>
                  <ArrowRight className="icon" />
                </button>
              </div>

              <div className="hero-guarantee">
                <Shield className="icon" />
                <span>30-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-logo-large">
              <img src="src/assets/agnivirya-logo.png" alt="AgniVirya" className="logo-image" />
            </div>
          </div>
        </div>

        {/* Hero Features */}
        <div className="hero-features">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <IconComponent className="icon" />
                </div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="hero-trust-badges">
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div key={index} className="trust-badge">
                <IconComponent className="icon" />
                <span>{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

