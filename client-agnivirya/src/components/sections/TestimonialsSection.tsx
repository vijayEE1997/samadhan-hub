import React from 'react';
import { 
  Star, 
  Quote, 
  Heart, 
  Zap, 
  Users, 
  Award, 
  Shield, 
  CheckCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const TestimonialsSection: React.FC = () => {
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
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Testimonials Header */}
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

        {/* Testimonials Grid */}
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

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <div className="trust-header">
            <h3>Why People Trust Us</h3>
            <p>Proven track record and commitment to your success</p>
          </div>
          
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <Award className="icon" />
              </div>
              <h4>Proven Results</h4>
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
                <Users className="icon" />
              </div>
              <h4>Expert Content</h4>
              <p>Carefully researched and professionally written</p>
            </div>
          </div>
        </div>

        {/* Social Proof CTA */}
        <div className="social-proof-cta">
          <div className="cta-content">
            <h3>Join the Success Stories</h3>
            <p>Start your transformation journey today</p>
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

export default TestimonialsSection;
