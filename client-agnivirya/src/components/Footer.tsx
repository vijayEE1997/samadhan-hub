import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './Footer.css';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <img 
                src="/assets/agnivirya-logo.png"
                alt="AgniVirya Logo"
                className="footer-logo-img"
              />
            </div>
            <h3 className="brand-name">AgniVirya</h3>
            <p className="brand-tagline">
              {language === 'en' 
                ? 'Ancient Wisdom, Modern Results'
                : 'प्राचीन ज्ञान, आधुनिक परिणाम'
              }
            </p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#guide">Guide</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4>Support</h4>
              <ul>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#updates">Updates</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#refund">Refund Policy</a></li>
                <li><a href="#disclaimer">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-contact">
            <h4>Contact Info</h4>
            <div className="contact-item">
              <Mail className="icon" />
              <span>support@samadhaanhub.co.in</span>
            </div>
            <div className="contact-item">
              <Phone className="icon" />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <MapPin className="icon" />
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-info">
            <p className="copyright">
              © 2024 AgniVirya. All rights reserved.
            </p>
            <div className="trust-badges">
              <div className="badge">
                <Shield className="icon" />
                <span>Secure</span>
              </div>
              <div className="badge">
                <Clock className="icon" />
                <span>24/7</span>
              </div>
              <div className="badge">
                <Users className="icon" />
                <span>50K+</span>
              </div>
            </div>
          </div>

          <button className="scroll-top" onClick={scrollToTop}>
            <ArrowUp className="icon" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
