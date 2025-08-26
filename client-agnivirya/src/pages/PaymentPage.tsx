import { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Shield,
  Lock,
  Loader2
} from 'lucide-react';

// Import constants
import { API_ENDPOINTS } from '@/constants';

interface PaymentPageProps {
  onBackToHome: () => void;
}

const PaymentPage = ({ onBackToHome }: PaymentPageProps) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    customerName: '',
    email: ''
  });

  const [touched, setTouched] = useState({
    customerName: false,
    email: false
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'customerName') {
      if (!value.trim()) {
        error = 'Customer name is required';
      } else if (value.trim().length < 2) {
        error = 'Customer name must be at least 2 characters';
      }
    } else if (name === 'email') {
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
      customerName: validateField('customerName', formData.customerName),
      email: validateField('email', formData.email)
    };

    setErrors(newErrors);
    setTouched({
      customerName: true,
      email: true
    });

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment order with Cashfree
      const response = await fetch(API_ENDPOINTS.PAYMENT.INITIATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerEmail: formData.email,
          customerPhone: '8305940684',
          amount: 99,
          currency: 'INR'
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.status}`);
      }

      const result = await response.json();
      
                   if (result.success) {
        // Redirect to Cashfree payment page
        if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
        } else {
          throw new Error('Payment URL not received from server');
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
                 <p>Enter your details to proceed to secure Cashfree payment gateway</p>
               </div>

                             <form className="payment-form" onSubmit={handleSubmit}>
                 <div className="form-group">
                   <label htmlFor="customerName" className={`form-label ${touched.customerName && errors.customerName ? 'error' : ''}`}>
                     Full Name *
                   </label>
                   <div className="input-wrapper">
                     <input
                       type="text"
                       id="customerName"
                       name="customerName"
                       value={formData.customerName}
                       onChange={handleInputChange}
                       onBlur={handleInputBlur}
                       className={`form-input ${touched.customerName && errors.customerName ? 'error' : ''} ${touched.customerName && !errors.customerName ? 'success' : ''}`}
                       placeholder="Enter your full name"
                       required
                     />
                     {touched.customerName && !errors.customerName && (
                       <div className="input-icon success">
                         <Check className="icon" />
                       </div>
                     )}
                   </div>
                   <div className="message-container">
                     {touched.customerName && errors.customerName && (
                       <div className="error-message">
                         <Shield className="icon" />
                         <span>{errors.customerName}</span>
                       </div>
                     )}
                   </div>
                 </div>

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
                  disabled={isProcessing}
                >
                                     {isProcessing ? (
                     <>
                       <Loader2 className="icon animate-spin" />
                       <span>Creating Order...</span>
                     </>
                   ) : (
                     <>
                       <Lock className="icon" />
                       <span>Proceed to Payment</span>
                       <div className="discount-badge">95% OFF</div>
                     </>
                   )}
                </button>
              </form>

              {/* Security Badge */}
              <div className="security-badge">
                <Lock className="icon" />
                <span>Powered by Cashfree - 100% Secure & Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
