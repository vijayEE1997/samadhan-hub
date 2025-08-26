// @// React Hooks
import { useState, useEffect } from 'react'

// @// Contexts & Providers
import { LanguageProvider } from '@/contexts/LanguageContext'

// @// UI Components
import { Toaster } from '@/components/ui/toaster'

// @// Constants
import { UI } from '@/constants'

// @// Styles
import './App.css'

// Import all Agnivirya components
import Header from './components/Header'
import HeroSection from './components/sections/HeroSection'
import FeaturesSection from './components/sections/FeaturesSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import FAQSection from './components/sections/FAQSection'
import AboutSection from './components/sections/AboutSection'
import Footer from './components/Footer'
import PaymentPage from './pages/PaymentPage'
import DownloadPage from './pages/DownloadPage'
import MetricsBubble from './components/sections/MetricsBubble';

interface AppProps {
  initialState?: {
    currentUrl?: string
    timestamp?: string
    ssr?: boolean
    mode?: string
    environment?: string
  }
}

function App({ initialState }: AppProps) {
  const [currentRoute, setCurrentRoute] = useState(initialState?.currentUrl || '/')


  useEffect(() => {
    // Handle client-side routing
    const handleRouteChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    // Set initial route from current URL
    setCurrentRoute(window.location.pathname);

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);

    // Set initial route from props if available
    if (initialState?.currentUrl) {
      setCurrentRoute(initialState.currentUrl);
    }

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [initialState?.currentUrl]);

  // Additional effect to handle URL changes
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== currentRoute) {
      setCurrentRoute(currentPath);
    }
  }, [currentRoute]);

  // Navigation handler
  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
  };

  // Payment handlers
  const handlePaymentClick = () => {
    navigateTo('/payment');
  };

  // Render route content based on current route
  const renderRouteContent = () => {
    switch (currentRoute) {
      case '/payment':
        return <PaymentPage onBackToHome={() => navigateTo('/')} />;
      case '/download':
        return <DownloadPage onBackToHome={() => navigateTo('/')} onBackToPayment={() => navigateTo('/payment')} />;
      case '/':
      default:
        return (
          <div className="homepage-container">
            {/* Background Elements */}
            <div className="bg-gradient"></div>
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>

            {/* Main Content */}
            <div className="content-wrapper">
              <Header />
              <main className="main-content">
                <HeroSection onPaymentClick={handlePaymentClick} />
                <MetricsBubble />
                <FeaturesSection />
                <AboutSection />
                <TestimonialsSection />
                <FAQSection />
              </main>
              <Footer />
            </div>

            {/* Floating Action Button */}
            <div className="floating-action-button">
              <div className="fab-pricing">
                <div className="fab-discount">95% OFF</div>
                <div className="fab-price">₹99</div>
                <div className="fab-original">₹1,980</div>
              </div>
              <button
                className="fab-cta"
                onClick={handlePaymentClick}
                aria-label="Get E-Book Now"
              >
                Get E-Book Now
              </button>
              <button
                className="fab-scroll-top"
                onClick={() => window.scrollTo({ top: 0, behavior: UI.ANIMATIONS.SCROLL_BEHAVIOR })}
                aria-label="Scroll to top"
              >
                ↑
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app">
      <main className="app-main">
        {renderRouteContent()}
      </main>
    </div>
  );
}

// Wrap the app with providers
export default function AppWithProviders(props: AppProps) {
  return (
    <LanguageProvider>
      <App {...props} />
      <Toaster />
    </LanguageProvider>
  );
}
