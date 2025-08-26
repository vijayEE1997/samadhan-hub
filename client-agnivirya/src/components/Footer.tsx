// @// React Hooks
import { useState } from 'react'

// @// Constants
import { FOOTER, APP_CONFIG } from '@/constants'

// @// Icons
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Award, 
  Users, 
  Heart 
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src={APP_CONFIG.LOGO_PATH}
                alt={`${APP_CONFIG.NAME} Logo`}
                className="logo-image"
              />
              <div className="logo-text">
                <h3 className="logo-title">{APP_CONFIG.NAME}</h3>
                <p className="logo-subtitle">{APP_CONFIG.DESCRIPTION}</p>
              </div>
            </div>
            
            <p className="company-description">
              Empowering individuals with ancient wisdom and modern wellness practices 
              for a healthier, more balanced life.
            </p>

            {/* Social Links */}
            <div className="social-links">
              {FOOTER.SOCIAL_LINKS.map((social, index) => (
                <a key={index} href={social.href} className="social-link" aria-label={social.label}>
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {FOOTER.QUICK_LINKS.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Wellness Programs Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Wellness Programs</h4>
            <ul className="footer-links">
              {FOOTER.WELLNESS_PROGRAMS.map((program, index) => (
                <li key={index}>
                  <a href={program.href}>{program.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>{FOOTER.CONTACT_INFO.email}</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>{FOOTER.CONTACT_INFO.phone}</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>{FOOTER.CONTACT_INFO.address}</span>
              </div>
              <div className="contact-item">
                <Clock className="contact-icon" />
                <span>{FOOTER.CONTACT_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="trust-badges">
          {FOOTER.TRUST_BADGES.map((badge, index) => (
            <div key={index} className="trust-badge">
              <Shield className="badge-icon" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} {APP_CONFIG.NAME}. All rights reserved.</p>
            </div>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
