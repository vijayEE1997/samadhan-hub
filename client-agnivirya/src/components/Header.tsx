// @// React Hooks
import { useState, useEffect } from 'react'

// @// Contexts & Hooks
import { useLanguage } from '@/contexts/LanguageContext'

// @// Constants
import { NAVIGATION, APP_CONFIG, LANGUAGES } from '@/constants'

// @// Icons
import { Menu, X, Globe, ShoppingCart } from 'lucide-react'

// @// Types
interface HeaderProps {
  className?: string
}

export default function Header({ className = '' }: HeaderProps) {
  const { language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Toggle language
  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
    closeMenu()
  }

  // Scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerHeight = NAVIGATION.HEADER_HEIGHT
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
    }
    closeMenu()
  }

  // Get navigation items with current language
  const navigationItems = NAVIGATION.ITEMS.map(item => ({
    ...item,
    label: item.label[language === 'en' ? 'en' : 'hi']
  }))

  // Get CTA text in current language
  const ctaText = NAVIGATION.CTA_TEXT[language === 'en' ? 'en' : 'hi']

  return (
    <header className={`premium-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          {/* Logo Section */}
          <div className="header-logo">
            <div className="logo-container">
              <img 
                src={APP_CONFIG.LOGO_PATH}
                alt={`${APP_CONFIG.NAME} Logo`}
                className="logo-image"
              />
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text">
              <h1 className="logo-title">{APP_CONFIG.NAME}</h1>
              <p className="logo-subtitle">
                {language === 'en' ? APP_CONFIG.SUBTITLE : 'प्राचीन ज्ञान, आधुनिक बल'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nav-link"
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Section */}
          <div className="header-cta">
            <button 
              className="language-toggle"
              onClick={handleLanguageToggle}
              aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
            >
              <Globe className="icon" />
              <span>{language === 'en' ? 'Hindi' : 'English'}</span>
            </button>
            
            <button 
              className="cta-button"
              onClick={() => {
                // Use window.location.pathname to trigger route change
                window.history.pushState({}, '', '/payment');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              aria-label={ctaText}
            >
              <ShoppingCart className="icon" />
              <span>{ctaText}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Mobile CTA */}
            <div className="mobile-cta">
              <button 
                className="mobile-cta-button"
                onClick={() => {
                  window.history.pushState({}, '', '/payment');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  closeMenu();
                }}
              >
                {ctaText}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
