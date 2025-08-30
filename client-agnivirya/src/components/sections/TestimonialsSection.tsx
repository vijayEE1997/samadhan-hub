import React from 'react';
import { 
  Star, 
  Quote, 
  Zap, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
  const { language } = useLanguage();
  
  const handleCTAClick = () => {
    window.history.pushState({}, '', '/payment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Marketing Manager",
      location: "Mumbai, Maharashtra",
      rating: 5,
      content: "The goal-setting strategies completely transformed my approach to work. I achieved my quarterly targets in just 6 weeks! The productivity techniques are game-changing.",
      benefit: "Goal Achievement & Productivity",
      avatar: "👩‍💼"
    },
    {
      name: "Rajesh Kumar",
      role: "Entrepreneur",
      location: "Delhi, NCR",
      rating: 5,
      content: "As a business owner, I needed better leadership skills. This guide taught me how to inspire my team and make better decisions. My business has grown 40% since implementing these strategies.",
      benefit: "Leadership & Decision Making",
      avatar: "👨‍💼"
    },
    {
      name: "Meera Patel",
      role: "Software Developer",
      location: "Bangalore, Karnataka",
      rating: 5,
      content: "The mindset techniques helped me overcome imposter syndrome. I'm now leading major projects with confidence. The daily routines are simple but incredibly effective.",
      benefit: "Mindset & Confidence",
      avatar: "👩‍💻"
    },
    {
      name: "Arjun Singh",
      role: "Student",
      location: "Pune, Maharashtra",
      rating: 5,
      content: "I was struggling with focus and time management. The productivity section gave me practical tools that helped me improve my grades significantly. Highly recommended!",
      benefit: "Focus & Time Management",
      avatar: "👨‍🎓"
    },
    {
      name: "Anjali Desai",
      role: "HR Professional",
      location: "Chennai, Tamil Nadu",
      rating: 5,
      content: "The communication and team-building strategies have made me a better HR professional. My team's satisfaction scores improved dramatically. This guide is worth every penny!",
      benefit: "Communication & Team Building",
      avatar: "👩‍🎨"
    },
    {
      name: "Vikram Malhotra",
      role: "Teacher",
      location: "Hyderabad, Telangana",
      rating: 5,
      content: "I've been teaching for 15 years, but this guide taught me new ways to inspire my students. The leadership principles apply perfectly to education. My classroom has never been more engaged.",
      benefit: "Inspiration & Engagement",
      avatar: "👨‍🏫"
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        {/* Compact Testimonials Header */}
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <Star className="icon" />
            <span>Success Stories</span>
          </div>
          
          <h2 className="testimonials-title">
            Real Results from
            <span className="title-highlight"> Real People</span>
          </h2>
          
          <p className="testimonials-description">
            Join thousands of satisfied customers who have transformed their lives 
            and achieved their goals with our proven strategies.
          </p>
        </div>

        {/* Compact Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <p className="testimonial-location">{testimonial.location}</p>
                </div>
                <Quote className="quote-icon" />
              </div>
              
              <div className="testimonial-content">
                <p>{testimonial.content}</p>
              </div>
              
              <div className="testimonial-footer">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <div className="testimonial-benefit">
                  <CheckCircle className="icon" />
                  <span>{testimonial.benefit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Social Proof CTA */}
        <div className="social-proof-cta">
          <div className="cta-content">
            <h3>Join the Success Stories</h3>
            <p>Start your transformation journey today</p>
            <button 
              className="cta-button"
              onClick={handleCTAClick}
            >
              <span>Get My Guide at ₹99</span>
              <ArrowRight className="icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
