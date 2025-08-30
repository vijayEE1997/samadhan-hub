// @// React Hooks
import { useState, useEffect } from 'react'

// @// Contexts & Providers
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'

// @// UI Components
import { Toaster } from '@/components/ui/toaster'

// @// Constants
import { UI } from '@/constants'

// @// Styles
import './App.css'

// Import all Agnivirya components
import Header from './components/Header'
import HeroSection from './components/sections/HeroSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import FAQSection from './components/sections/FAQSection'
import Footer from './components/Footer'
import PaymentPage from './pages/PaymentPage'
import DownloadPage from './pages/DownloadPage'
import ProblemStatementSection from './components/sections/ProblemStatementSection'
import SolutionOverviewSection from './components/sections/SolutionOverviewSection'
import RecipePreviewSection from './components/sections/RecipePreviewSection'
import ScientificValidationSection from './components/sections/ScientificValidationSection'
import TrustIndicatorsSection from './components/sections/TrustIndicatorsSection'
import MobileHomepage from './components/MobileHomepage'
import { useMobileDetect } from './hooks/useMobileDetect'

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
  const { t } = useLanguage()
  const [currentRoute, setCurrentRoute] = useState(initialState?.currentUrl || '/')
  const { isMobile } = useMobileDetect();


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
      // Cleanup body classes on unmount
      document.body.classList.remove('payment-page-active', 'download-page-active');
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.maxHeight = '';
    };
  }, [initialState?.currentUrl]);

  // Additional effect to handle URL changes
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== currentRoute) {
      setCurrentRoute(currentPath);
    }
  }, [currentRoute]);

  // Cleanup body classes when route changes
  useEffect(() => {
    // Remove any payment/download page body classes when not on those routes
    if (currentRoute !== '/payment' && currentRoute !== '/download') {
      document.body.classList.remove('payment-page-active', 'download-page-active');
      // Reset body styles to normal
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.maxHeight = '';
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
              <main className="main-homepage-content">
                <HeroSection onPaymentClick={handlePaymentClick} />
                <div className="problem-solution-container">
                  <ProblemStatementSection />
                  <SolutionOverviewSection />
                </div>
                <RecipePreviewSection />
                <ScientificValidationSection />
                <TrustIndicatorsSection />
                <TestimonialsSection />
                <FAQSection />
              </main>
              <Footer />
            </div>

            {/* Floating Action Button */}
            <div className="floating-action-button">
              <div className="fab-pricing">
                <div className="fab-discount">{t('fab.discount')}</div>
                <div className="fab-price">{t('fab.price')}</div>
                <div className="fab-original">{t('fab.original')}</div>
              </div>
              <button
                className="fab-cta"
                onClick={handlePaymentClick}
                aria-label={t('fab.cta')}
              >
                {t('fab.cta')}
              </button>
              <button
                className="fab-scroll-top"
                onClick={() => window.scrollTo({ top: 0, behavior: UI.ANIMATIONS.SCROLL_BEHAVIOR })}
                aria-label={t('fab.scrollTop')}
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
        {isMobile ? (
          <MobileHomepage onPaymentClick={handlePaymentClick} />
        ) : (
          renderRouteContent()
        )}
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
