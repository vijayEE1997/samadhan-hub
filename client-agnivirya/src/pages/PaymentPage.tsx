import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Check,
  Shield,
  Lock,
  Loader2,
  AlertTriangle,
  CreditCard
} from 'lucide-react';

// Import constants
import { API_ENDPOINTS } from '@/constants';

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
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);
  const [cashfreeSDKReady, setCashfreeSDKReady] = useState(false);

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
          setConfigError('');
        } else {
          throw new Error('Failed to load payment configuration');
        }
      } catch (error) {
        console.error('Failed to load payment config:', error);
        setConfigError('Unable to load payment configuration. Please refresh the page.');
      } finally {
        setIsLoadingConfig(false);
      }
    };

    loadCashfreeSDK();
    loadPaymentConfig();
  }, []);

  // Open Cashfree checkout using the SDK with fallback
  const openCashfreeCheckout = useCallback(async (sessionId: string) => {
    try {
      console.log('🔄 Opening Cashfree checkout...');

      // Wait for SDK to be ready
      if (!cashfreeSDKReady) {
        console.log('⏳ Waiting for SDK...');
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!cashfreeSDKReady) {
          throw new Error('Cashfree SDK not ready. Please refresh and try again.');
        }
      }

      // Try to use Cashfree SDK first
      if (window.Cashfree) {
        const cashfree = window.Cashfree({
          mode: paymentConfig?.mode || 'production'
        });

        const checkoutOptions = {
          paymentSessionId: sessionId,
          redirectTarget: '_self',
        };

        await cashfree.checkout(checkoutOptions);
        console.log('✅ Checkout opened successfully with SDK');
      } else {
        throw new Error('Cashfree SDK not available');
      }

    } catch (error) {
      console.error('❌ SDK checkout failed, using fallback:', error);

      // Fallback: redirect to Cashfree hosted checkout
      const checkoutUrl = paymentConfig?.mode === 'production'
        ? `https://checkout.cashfree.com/pg/view/sessions/${sessionId}`
        : `https://sandbox.cashfree.com/pg/view/sessions/${sessionId}`;

      console.log('🔄 Redirecting to:', checkoutUrl);
      window.location.href = checkoutUrl;
    }
  }, [cashfreeSDKReady, paymentConfig]);

  console.log(orderId);
  console.log(paymentSessionId);

  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
    }

    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      email: validateField('email', formData.email)
    };

    setErrors(newErrors);
    setTouched({
      email: true
    });

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setIsProcessing(true);

    try {
      // Extract customer name from email prefix
      const customerName = formData.email.split('@')[0];

      // Create payment order with Cashfree
      const response = await fetch(API_ENDPOINTS.PAYMENT.INITIATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: customerName,
          customerEmail: formData.email,
          customerPhone: '8305940684',
          amount: 99,
          currency: 'INR',
          returnUrl: `${window.location.origin}/download`
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Show success message and prepare for redirect
        setErrors(prev => ({ ...prev, email: '' }));
        setIsRedirecting(true);

        if (result.sessionId) {
          // Store order details in localStorage for tracking
          localStorage.setItem('agnivirya-order', JSON.stringify({
            orderId: result.orderId,
            cfOrderId: result.cfOrderId,
            sessionId: result.sessionId,
            customerData: {
              customerName: customerName,
              customerEmail: formData.email
            },
            timestamp: Date.now(),
            config: {
              mode: result.mode,
              product: result.product?.name || 'AgniVirya Complete Guide',
              price: result.product?.price || '99.00',
              currency: result.product?.currency || 'INR',
            },
            amount: 99,
            paymentVerified: false,
            paymentStatus: 'pending'
          }));

          // Set order details in state
          setOrderId(result.orderId);
          setPaymentSessionId(result.sessionId);

          // Add a small delay to show success message
          setTimeout(async () => {
            console.log('🔄 Opening Cashfree checkout...');
            console.log('🔗 Session ID:', result.sessionId);

            try {
              // Try to open Cashfree checkout
              await openCashfreeCheckout(result.sessionId);
            } catch (error) {
              console.error('❌ Failed to open checkout:', error);
              // Fallback to direct redirect if available
              if (result.paymentUrl) {
                window.location.href = result.paymentUrl;
              }
            }
          }, 1500);
        } else {
          throw new Error('Payment session ID not received from server');
        }
      } else {
        throw new Error(result.message || 'Failed to create payment order');
      }

    } catch (error) {
      console.error('❌ Payment error:', error);
      setErrors(prev => ({ ...prev, email: error instanceof Error ? error.message : 'Payment failed' }));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="content-wrapper">
        {/* Page Header - Wondershare Style */}
        <div className="page-header">
          <div className="header-top">
            <div className="header-left">
              <button onClick={onBackToHome} className="back-button">
                <ArrowLeft className="icon" />
                <span>Back to Home</span>
              </button>
            </div>
            <div className="header-right">
              <div className="header-logo">
                <img src="/assets/agnivirya-logo.png" alt="AgniVirya" className="logo-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout - Inspired by Wondershare */}
        <div className="payment-layout">
          {/* Left Column - Order Summary */}
          <div className="order-summary-column">
            <div className="summary-card">
              <div className="summary-header">
                <h2>Order Summary</h2>
                <div className="currency-selector">
                  <span>INR</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="product-details">
                <div className="product-item">
                  <div className="product-info">
                    <h3>AgniVirya Complete Guide</h3>
                    <p>200+ pages PDF • Lifetime Access • 30-Day Guarantee</p>
                    <div className="product-price">₹99.00</div>
                  </div>
                </div>

                <div className="product-item bonus">
                  <div className="product-info">
                    <h3>Bonus: Creative Assets & Templates</h3>
                    <p>Additional resources and templates for enhanced learning</p>
                    <div className="product-price">₹0.00</div>
                    <div className="bonus-badge">Free Bonus</div>
                  </div>
                </div>
              </div>



              {/* Cashfree Trust Section */}
              <div className="cashfree-trust">
                <div className="trust-header">
                  <Lock className="icon" />
                  <span>Secure Payment Gateway</span>
                </div>
                <div className="trust-badges">
                  <div className="trust-badge">
                    <Shield className="icon" />
                    <span>PCI DSS Compliant</span>
                  </div>
                  <div className="trust-badge">
                    <Check className="icon" />
                    <span>256-bit SSL</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹99.00</span>
                </div>
                <div className="price-row discount">
                  <span>95% Discount Applied</span>
                  <span>-₹1,881.00</span>
                </div>
                <div className="price-row">
                  <span>GST (18%)</span>
                  <span>₹0.00</span>
                </div>
                <div className="total-row">
                  <span>Total</span>
                  <span className="total-amount">₹99.00</span>
                </div>
                <div className="savings-info">
                  You save ₹1,881.00 (95% OFF!)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="payment-form-column">
            <div className="form-container">
              <div className="form-header">
                <h2>Complete Your Purchase</h2>
                <p>Enter your email address to proceed to secure Cashfree payment gateway</p>
              </div>

              {/* Configuration Loading/Error States */}
              {isLoadingConfig && (
                <div className="config-loading">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-center text-gray-600">Loading payment configuration...</p>
                </div>
              )}

              {configError && (
                <div className="config-error bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">Configuration Error</span>
                  </div>
                  <p className="text-red-600 text-sm">{configError}</p>
                </div>
              )}

              {/* Success Message when Redirecting */}
              {isRedirecting && (
                <div className="success-message bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Payment Order Created Successfully!</span>
                  </div>
                  <p className="text-green-600 text-sm">Opening secure Cashfree payment gateway...</p>
                </div>
              )}

              {/* Cashfree SDK Status */}
              <div className="cashfree-status bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-blue-600 text-sm">
                  {!cashfreeSDKReady && (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                  )}
                </div>
              </div>

              <form className={`payment-form ${isLoadingConfig || configError ? 'opacity-50 pointer-events-none' : ''}`} onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="email" className={`form-label ${touched.email && errors.email ? 'error' : ''}`}>
                    Email Address *
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className={`form-input ${touched.email && errors.email ? 'error' : ''} ${touched.email && !errors.email ? 'success' : ''}`}
                      placeholder="Enter your email address"
                      required
                    />
                    {touched.email && !errors.email && (
                      <div className="input-icon success">
                        <Check className="icon" />
                      </div>
                    )}
                  </div>
                  <div className="message-container">
                    {touched.email && errors.email && (
                      <div className="error-message">
                        <Shield className="icon" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                  <small className="form-help">We'll create an account if you're new, or ask you to sign in.</small>
                </div>



                {/* Consent Section */}
                <div className="consent-section">
                  <p className="consent-text">
                    By clicking "Proceed to Payment", I agree that AgniVirya can keep me informed by sending personalized emails about products and services. See our <a href="#" className="privacy-link">Privacy Policy</a> for details.
                  </p>
                </div>

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
                      <CreditCard className="icon" />
                      <span>Pay with Cashfree</span>
                      <div className="discount-badge">95% OFF</div>
                    </>
                  )}
                </button>
              </form>

              {/* Security Badge */}
              <div className="security-badge">
                <CreditCard className="icon" />
                <span>Powered by Cashfree - 100% Secure & Encrypted</span>
                <div className="text-xs text-gray-500 mt-1">
                  {cashfreeSDKReady ? 'SDK Ready' : 'SDK Loading...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
