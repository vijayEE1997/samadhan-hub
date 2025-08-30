// @// React Hooks
import { useState, useEffect } from 'react'

// @// Contexts & Hooks
import { useLanguage } from '@/contexts/LanguageContext'

// @// Constants
import { NAVIGATION, APP_CONFIG } from '@/constants'

// @// Icons
import { Book } from 'lucide-react'
import './Header.css';
import { getImagePath } from '@/utils/assetUtils';

// @// Types
interface HeaderProps {
  // className?: string
}

export default function Header({ }: HeaderProps) {
  const { language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 50)
        
        // Detect which section is currently active
        if (!NAVIGATION?.ITEMS) {
          console.warn('NAVIGATION.ITEMS not available')
          return
        }
        
        const sections = NAVIGATION.ITEMS.map(item => item.href.replace('#', ''))
        const headerHeight = (NAVIGATION?.HEADER_HEIGHT || 80) + 20
        
        let currentSection = ''
        sections.forEach(sectionId => {
          try {
            const element = document.getElementById(sectionId)
            if (element) {
              const rect = element.getBoundingClientRect()
              if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
                currentSection = sectionId
              }
            }
          } catch (error) {
            console.warn(`Error checking section ${sectionId}:`, error)
          }
        })
        
        setActiveSection(currentSection)
      } catch (error) {
        console.warn('Error in scroll handler:', error)
      }
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

  // Enhanced smooth scroll to section
  const scrollToSection = (href: string) => {
    try {
      // Remove the # from the href to get the section ID
      const sectionId = href.replace('#', '')
      const element = document.getElementById(sectionId)
      
      if (element) {
        // Get header height for offset
        const headerHeight = NAVIGATION?.HEADER_HEIGHT || 80
        
        // Calculate the target position
        const elementPosition = element.offsetTop - headerHeight - 20 // Add 20px extra offset for better spacing
        
        // Smooth scroll to the element
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
        
        // Add a subtle highlight effect to the target section
        element.style.transition = 'all 0.3s ease'
        element.style.transform = 'scale(1.02)'
        element.style.boxShadow = '0 0 20px rgba(255, 153, 51, 0.3)'
        
        // Remove the highlight effect after animation
        setTimeout(() => {
          element.style.transform = 'scale(1)'
          element.style.boxShadow = 'none'
        }, 300)
        
        // Update URL hash without jumping
        window.history.pushState(null, '', href)
      } else {
        console.warn(`Section with ID "${sectionId}" not found`)
      }
    } catch (error) {
      console.error('Error scrolling to section:', error)
    }
    
    // Close mobile menu if open
    closeMenu()
  }

  // Get navigation items with current language
  const navigationItems = (NAVIGATION?.ITEMS || []).map(item => ({
    ...item,
    label: item.label[language === 'en' ? 'en' : 'hi']
  }))

  // Get CTA text in current language
  const ctaText = (NAVIGATION?.CTA_TEXT || { en: 'Get eBook', hi: 'ई-बुक पाएँ' })[language === 'en' ? 'en' : 'hi']

  // Get current language display name
  const currentLanguageName = language === 'en' ? 'हिंदी' : 'English'

  return (
    <header className={`agnivirya-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo Section */}
        <a href="#" className="header-logo">
          <img 
            src={getImagePath('agnivirya-logo.png')}
            alt={`${APP_CONFIG.NAME} Logo`}
          />
          <div className="header-brand">
            <span className="header-logo-text">{APP_CONFIG.NAME}</span>
            <span className="header-tagline">{APP_CONFIG.SUBTITLE}</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <ul className="nav-links">
            {navigationItems.map((item, index) => {
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId
              
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions">
          <button 
            className="language-toggle"
            onClick={handleLanguageToggle}
            aria-label={`Switch to ${currentLanguageName}`}
          >
            <span className="language-text">{currentLanguageName}</span>
          </button>
          
          <a 
            href="/payment"
            className="header-cta"
            aria-label={ctaText}
          >
            <Book className="icon" />
            <span>{ctaText}</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <ul className="mobile-nav-links">
              {navigationItems.map((item, index) => {
                const sectionId = item.href.replace('#', '')
                const isActive = activeSection === sectionId
                
                return (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => scrollToSection(item.href)}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
          
          {/* Mobile Actions */}
          <div className="mobile-actions">
            <button 
              className="language-toggle mobile-language-toggle"
              onClick={handleLanguageToggle}
            >
              <span className="language-text">{currentLanguageName}</span>
            </button>
            
            <a 
              href="/payment"
              className="header-cta mobile-header-cta"
              onClick={closeMenu}
            >
              {ctaText}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
