import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Lock,
  BookOpen,
  Zap,
  Heart,
  Award,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Check,
  XCircle
} from 'lucide-react';

// Import constants
import { API_ENDPOINTS } from '@/constants';
import { getImagePath } from '@/utils/assetUtils';

// Import PaymentPage styles
import './PaymentPage.css';

// Declare Cashfree global type
declare global {
  interface Window {
    Cashfree: any;
  }
}

interface PaymentPageProps {
  onBackToHome: () => void;
}

const PaymentPage = ({ onBackToHome }: PaymentPageProps) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const [errors, setErrors] = useState({
    email: ''
  });

  const [touched, setTouched] = useState({
    email: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<any>(null);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [configError, setConfigError] = useState<string>('');
  const [cashfreeSDKReady, setCashfreeSDKReady] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Manage body class for padding override and auto-focus email field
  useEffect(() => {
    document.body.classList.add('payment-page-active');

    // Auto-focus on email field when component mounts
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }

    return () => {
      document.body.classList.remove('payment-page-active');
    };
  }, []);

  // Load Cashfree SDK and payment configuration on component mount
  useEffect(() => {
    const loadCashfreeSDK = () => {
      if (!document.getElementById('cashfree-sdk')) {
        const script = document.createElement('script');
        script.id = 'cashfree-sdk';
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.async = true;
        script.onload = () => {
          console.log('✅ Cashfree SDK loaded successfully');
          setCashfreeSDKReady(true);
        };
        script.onerror = () => {
          console.error('❌ Failed to load Cashfree SDK');
          setCashfreeSDKReady(false);
        };
        document.head.appendChild(script);
      } else {
        setCashfreeSDKReady(true);
      }
    };

    const loadPaymentConfig = async () => {
      try {
        setIsLoadingConfig(true);
        const response = await fetch(API_ENDPOINTS.CONFIG);
        if (response.ok) {
          const config = await response.json();
          setPaymentConfig(config);
          console.log('✅ Payment config loaded successfully');
        } else {
          throw new Error(`Failed to load config: ${response.status}`);
        }
      } catch (error) {
        console.error('❌ Error loading payment config:', error);
        setConfigError('Failed to load payment configuration');
      } finally {
        setIsLoadingConfig(false);
      }
    };

    loadCashfreeSDK();
    loadPaymentConfig();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle input blur for validation
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    validateField(name, formData[name as keyof typeof formData]);
  };

  // Validate individual field
  const validateField = (name: string, value: string) => {
    let error = '';
    
    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isEmailValid = validateField('email', formData.email);
    
    if (!isEmailValid) {
      return;
    }

    try {
      setIsProcessing(true);
      
      // Create order
      const orderResponse = await fetch(API_ENDPOINTS.PAYMENT.INITIATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          amount: 99,
          currency: 'INR'
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Initialize Cashfree payment
      if (window.Cashfree && cashfreeSDKReady) {
        setIsRedirecting(true);
        
        const cashfree = new window.Cashfree({
          mode: paymentConfig.mode || 'sandbox'
        });

        const paymentOptions = {
          sessionId: orderData.paymentSessionId,
          returnUrl: `${window.location.origin}/payment-success`,
          onSuccess: (data: any) => {
            console.log('Payment successful:', data);
            // Handle success - redirect to success page
            window.location.href = '/payment-success';
          },
          onFailure: (data: any) => {
            console.log('Payment failed:', data);
            setIsRedirecting(false);
            // Handle failure - show error message
            alert('Payment failed. Please try again.');
          },
          onClose: () => {
            console.log('Payment window closed');
            setIsRedirecting(false);
          }
        };

        cashfree.init(paymentOptions);
      } else {
        throw new Error('Cashfree SDK not ready');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Payment initialization failed. Please try again.');
    }
  };

  // Simplified content data
  const keyBenefits = [
    {
      icon: BookOpen,
      title: "200+ Pages of Wisdom",
      description: "Comprehensive guide with practical solutions"
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "Get your guide immediately after payment"
    },
    {
      icon: Heart,
      title: "Proven Results",
      description: "See improvements in 3-4 weeks"
    },
    {
      icon: Award,
      title: "Pure & Safe",
      description: "Natural ingredients, no side effects"
    }
  ];

  const trustFeatures = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "256-bit SSL encryption"
    },
    {
      icon: Lock,
      title: "Trusted by 10,000+",
      description: "Satisfied customers worldwide"
    },
    {
      icon: Award,
      title: "Scientifically Proven",
      description: "Research-backed methods"
    }
  ];

  return (
    <div className="payment-page">
      {/* Background Elements */}
      <div className="bg-gradient"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <div className="header-container">
          <button className="back-button" onClick={onBackToHome}>
            <ArrowLeft className="icon" />
            <span>Back to Home</span>
          </button>
          <div className="header-logo">
            <img src={getImagePath('agnivirya-logo.png')} alt="AgniVirya" className="logo-image" />
          </div>
        </div>
      </div>

      {/* Main Content - Single Column Layout */}
      <div className="payment-main-section">
        <div className="payment-container">
          
          {/* Purchase Summary - Main Focal Point */}
          <div className="purchase-summary">
            <div className="summary-header">
              <h1>Complete Your Purchase</h1>
              <p>Get instant access to your complete wellness guide</p>
            </div>

            {isLoadingConfig && (
              <div className="config-loading">
                <div className="loading-spinner">
                  <Loader2 className="icon animate-spin" />
                </div>
                <p>Loading payment configuration...</p>
              </div>
            )}

            {configError && (
              <div className="config-error">
                <div className="error-header">
                  <AlertTriangle className="icon" />
                  <span>Configuration Error</span>
                </div>
                <p>Please try again later or contact support.</p>
              </div>
            )}

            {!isLoadingConfig && !configError && (
              <>
                {/* Product Summary */}
                <div className="product-summary">
                  <div className="product-info">
                    <div className="product-icon">
                      <BookOpen className="icon" />
                    </div>
                    <div className="product-details">
                      <h2>Complete Wellness Guide</h2>
                      <p>Comprehensive eBook with practical solutions for modern wellness</p>
                    </div>
                  </div>
                  
                  {/* Pricing */}
                  <div className="pricing-section">
                    <div className="price-display">
                      <div className="current-price">₹99</div>
                      <div className="original-price">₹1980</div>
                      <div className="discount-badge">95% OFF</div>
                    </div>
                    <div className="savings-text">You save ₹1881</div>
                  </div>
                </div>

                {/* Payment Form */}
                <form className="payment-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className={`form-label ${errors.email ? 'error' : ''}`}>
                      Email Address
                    </label>
                    <div className="input-wrapper">
                      <input
                        ref={emailInputRef}
                        type="email"
                        name="email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                      />
                      {touched.email && !errors.email && (
                        <div className="input-icon success">
                          <Check className="icon" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <div className="error-message">
                        <XCircle className="icon" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                    <div className="form-help">
                      We'll send your guide to this email address
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isProcessing || isRedirecting}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="icon animate-spin" />
                        <span>Creating Order...</span>
                      </>
                    ) : isRedirecting ? (
                      <>
                        <Loader2 className="icon animate-spin" />
                        <span>Opening Payment Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="icon" />
                        <span>Get My Guide - ₹99</span>
                      </>
                    )}
                  </button>

                  {/* Trust & Security Badge */}
                  <div className="security-badge">
                    <Lock className="icon" />
                    <span>256-bit SSL Encrypted • Secure Payment</span>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Bottom Row - Compact Cards Side by Side */}
          <div className="bottom-row">
            {/* Key Benefits Section */}
            <div className="benefits-section">
              <h3>What You'll Get</h3>
              <div className="benefits-grid">
                {keyBenefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-icon">
                      <benefit.icon className="icon" />
                    </div>
                    <div className="benefit-content">
                      <h4>{benefit.title}</h4>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust & Security Section */}
            <div className="trust-section">
              <h3>Trust & Security</h3>
              <div className="trust-grid">
                {trustFeatures.map((feature, index) => (
                  <div key={index} className="trust-item">
                    <div className="trust-icon">
                      <feature.icon className="icon" />
                    </div>
                    <div className="trust-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Consent Section */}
          <div className="consent-section">
            <p className="consent-text">
              By proceeding, you agree to our{' '}
              <a href="#" className="privacy-link">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="#" className="privacy-link">
                Terms of Service
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
