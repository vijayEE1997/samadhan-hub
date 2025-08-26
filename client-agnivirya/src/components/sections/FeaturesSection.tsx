import React from 'react';
import { 
  BookOpen, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  Award, 
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Complete Guide",
      description: "200+ pages of comprehensive content covering all essential topics",
      highlight: "Everything in one place"
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Step-by-step strategies to set and reach your objectives",
      highlight: "Proven methodology"
    },
    {
      icon: Zap,
      title: "Productivity Boost",
      description: "Techniques to maximize your efficiency and output",
      highlight: "Immediate results"
    },
    {
      icon: Shield,
      title: "Mindset Mastery",
      description: "Develop the mental framework for lasting success",
      highlight: "Transform thinking"
    },
    {
      icon: Users,
      title: "Leadership Skills",
      description: "Learn to inspire and guide others effectively",
      highlight: "Lead with confidence"
    },
    {
      icon: Award,
      title: "Certified Content",
      description: "Professionally researched and validated information",
      highlight: "Quality guaranteed"
    }
  ];

  const learningOutcomes = [
    {
      icon: Target,
      title: "Goal Setting",
      items: ["SMART goal framework", "Action planning", "Progress tracking"]
    },
    {
      icon: Zap,
      title: "Productivity",
      items: ["Time management", "Priority setting", "Focus techniques"]
    },
    {
      icon: Shield,
      title: "Mindset",
      items: ["Growth mindset", "Resilience building", "Mental clarity"]
    },
    {
      icon: Users,
      title: "Leadership",
      items: ["Communication skills", "Team building", "Decision making"]
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {/* Features Header */}
        <div className="features-header">
          <div className="features-badge">
            <Star className="icon" />
            <span>Premium Features</span>
          </div>
          
          <h2 className="features-title">
            Everything You Need to
            <span className="title-highlight"> Succeed</span>
          </h2>
          
          <p className="features-description">
            Our comprehensive guide is packed with proven strategies, practical techniques, 
            and actionable insights that will transform your approach to success.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <IconComponent className="icon" />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-highlight">
                    <CheckCircle className="icon" />
                    <span>{feature.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Outcomes */}
        <div className="learning-outcomes">
          <div className="outcomes-header">
            <h3>What You'll Master</h3>
            <p>Comprehensive coverage of essential success skills</p>
          </div>
          
          <div className="outcomes-grid">
            {learningOutcomes.map((outcome, index) => {
              const IconComponent = outcome.icon;
              return (
                <div key={index} className="outcome-card">
                  <div className="outcome-icon">
                    <IconComponent className="icon" />
                  </div>
                  <h4 className="outcome-title">{outcome.title}</h4>
                  <ul className="outcome-list">
                    {outcome.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="outcome-item">
                        <CheckCircle className="icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="features-cta">
          <div className="cta-content">
            <h3>Ready to Transform Your Life?</h3>
            <p>Join thousands who have already achieved their goals</p>
            <button 
              className="cta-button"
              onClick={() => {
                window.history.pushState({}, '', '/payment');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            >
              <Zap className="icon" />
              <span>Get Started Now</span>
              <ArrowRight className="icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
