import React from 'react';
import { 
  BookOpen, 
  Target, 
  Award, 
  Users, 
  Star, 
  Shield, 
  CheckCircle, 
  Zap} from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* Main About Content */}
        <div className="about-main-content">
          <div className="about-text-content">
            <div className="about-badge">
              <Award className="icon" />
              <span>Proven Success Method</span>
            </div>
            
            <h2 className="about-title">
              Why Choose
              <span className="title-highlight"> AgniVirya</span>
            </h2>
            
            <p className="about-description">
              Our comprehensive guide is built on years of research and real-world success stories. 
              We've distilled the most effective strategies into a step-by-step system that anyone can follow.
            </p>
            
            {/* Key Benefits */}
            <div className="about-benefits">
              <div className="benefit-item">
                <CheckCircle className="icon" />
                <span>200+ pages of actionable content</span>
              </div>
              <div className="benefit-item">
                <CheckCircle className="icon" />
                <span>Proven strategies that actually work</span>
              </div>
              <div className="benefit-item">
                <CheckCircle className="icon" />
                <span>Step-by-step implementation guide</span>
              </div>
              <div className="benefit-item">
                <CheckCircle className="icon" />
                <span>Lifetime access to updates</span>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="about-illustration">
              <div className="illustration-main">
                <BookOpen className="icon" />
                <span>Complete Guide</span>
              </div>
              <div className="illustration-badges">
                <div className="mini-badge">
                  <Star className="icon" />
                  <span>Premium</span>
                </div>
                <div className="mini-badge">
                  <Zap className="icon" />
                  <span>Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="about-learning">
          <div className="learning-header">
            <h3>What You'll Learn</h3>
            <p>Comprehensive coverage of essential topics</p>
          </div>
          
          <div className="learning-grid">
            <div className="learning-card">
              <div className="learning-icon">
                <Target className="icon" />
              </div>
              <h4>Goal Setting</h4>
              <p>Master the art of setting and achieving meaningful goals</p>
            </div>
            
            <div className="learning-card">
              <div className="learning-icon">
                <Zap className="icon" />
              </div>
              <h4>Productivity</h4>
              <p>Boost your efficiency with proven techniques</p>
            </div>
            
            <div className="learning-card">
              <div className="learning-icon">
                <Shield className="icon" />
              </div>
              <h4>Mindset</h4>
              <p>Develop the mental framework for success</p>
            </div>
            
            <div className="learning-card">
              <div className="learning-icon">
                <Users className="icon" />
              </div>
              <h4>Leadership</h4>
              <p>Learn to inspire and guide others effectively</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="about-trust">
          <div className="trust-header">
            <h3>Why People Trust Us</h3>
          </div>
          
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <Award className="icon" />
              </div>
              <h4>Proven Track Record</h4>
              <p>Thousands of success stories and testimonials</p>
            </div>
            
            <div className="trust-item">
              <div className="trust-icon">
                <Shield className="icon" />
              </div>
              <h4>Money-Back Guarantee</h4>
              <p>30-day guarantee with no questions asked</p>
            </div>
            
            <div className="trust-item">
              <div className="trust-icon">
                <CheckCircle className="icon" />
              </div>
              <h4>Quality Content</h4>
              <p>Carefully researched and professionally written</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
