import { useEffect, useState, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download as DownloadIcon, CheckCircle, Star, AlertCircle, Loader2, ArrowLeft, Gift, RefreshCw, XCircle, Home } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { usePayment } from "@/hooks/usePayment";
import { getImagePath, getPdfPath } from "@/utils/assetUtils";

// Import DownloadPage styles
import './DownloadPage.css';

interface DownloadPageProps {
  onBackToHome?: () => void;
  onBackToPayment?: () => void;
}

interface PaymentVerificationState {
  status: 'pending' | 'verifying' | 'success' | 'failed' | 'timeout';
  message: string;
  attempts: number;
  lastAttempt: Date | null;
  error: string | null;
}

const DownloadPage = ({ onBackToHome, onBackToPayment }: DownloadPageProps) => {
  console.log('🔄 DownloadPage component rendering');

  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [pdfFileName, setPdfFileName] = useState('agnivirya-complete-wellness-guide-2025.pdf');
  const [productName, setProductName] = useState('AgniVirya - Complete Ancient Modern Wellness Guide');
  const [verificationState, setVerificationState] = useState<PaymentVerificationState>({
    status: 'pending',
    message: 'Initializing payment verification...',
    attempts: 0,
    lastAttempt: null,
    error: null
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi'>('english');

  const { toast } = useToast();
  const { verifyPayment, isVerifying } = usePayment();

  // Use refs to track attempts and avoid re-render loops
  const attemptsRef = useRef(0);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastRef = useRef(toast);

  // Update toast ref when toast function changes
  useEffect(() => {
    console.log('🔄 Toast ref updated');
    toastRef.current = toast;
  }, [toast]);

  // Fetch product configuration
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/payments/config`);
        if (response.ok) {
          const config = await response.json();
          if (config.product?.pdfFileName) setPdfFileName(config.product.pdfFileName);
          if (config.product?.name) setProductName(config.product.name);
        }
      } catch (error) {
        console.log('Using default product values');
      }
    };

    fetchConfig();
  }, []);

  // Manage body class for padding override
  useEffect(() => {
    document.body.classList.add('download-page-active');

    return () => {
      document.body.classList.remove('download-page-active');
    };
  }, []);

  // Payment verification logic
  const verifyPaymentStatus = useCallback(async (orderId: string): Promise<boolean> => {
    try {
      console.log(`🔍 Verifying payment for order: ${orderId}`);
      const verified = await verifyPayment(orderId);
      return verified;
    } catch (error) {
      console.error(`❌ Payment verification error for ${orderId}:`, error);
      return false;
    }
  }, [verifyPayment]);

  // Initialize payment verification
  useEffect(() => {
    console.log('🔄 Payment verification useEffect triggered');

    // Only run once when component mounts
    let isMounted = true;

    const startPaymentVerification = async () => {
      if (!isMounted) return;

      try {
        // Get URL parameters and stored order
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment_status');
        const storedOrder = localStorage.getItem('agnivirya-order');

        // Set order details if available
        if (storedOrder && isMounted) {
          try {
            const orderData = JSON.parse(storedOrder);
            setOrderDetails(orderData);
          } catch (e) {
            console.error('Failed to parse stored order:', e);
            if (isMounted) {
              setVerificationState(prev => ({
                ...prev,
                status: 'failed',
                message: 'Invalid order data found',
                error: 'Order data is corrupted or invalid'
              }));
            }
            return;
          }
        }

        // Handle immediate success from URL parameters
        if (paymentStatus === 'SUCCESS' || paymentStatus === 'success') {
          console.log('✅ Payment success detected from URL parameters');
          if (isMounted) {
            setVerificationState({
              status: 'success',
              message: 'Payment verified successfully!',
              attempts: 1,
              lastAttempt: new Date(),
              error: null
            });
          }

          // Update localStorage
          localStorage.setItem('agnivirya-payment-status', 'paid');
          localStorage.setItem('agnivirya-payment-verified', 'true');

          if (storedOrder) {
            try {
              const orderData = JSON.parse(storedOrder);
              orderData.paymentVerified = true;
              orderData.paymentStatus = 'paid';
              localStorage.setItem('agnivirya-order', JSON.stringify(orderData));
            } catch (e) {
              console.error('Failed to update stored order:', e);
            }
          }
          return;
        }

        // Start polling if we have order IDs to check
        if (storedOrder && isMounted) {
          try {
            const orderData = JSON.parse(storedOrder);
            const ordersToTry = [orderData.orderId, orderData.cfOrderId].filter(Boolean);

            if (ordersToTry.length === 0) {
              if (isMounted) {
                setVerificationState({
                  status: 'failed',
                  message: 'No valid order IDs found',
                  attempts: 0,
                  lastAttempt: null,
                  error: 'Order information is incomplete'
                });
              }
              return;
            }

            console.log('🔄 Starting payment verification polling for orders:', ordersToTry);
            if (isMounted) {
              setVerificationState(prev => ({
                ...prev,
                status: 'verifying',
                message: 'Verifying payment status...',
                attempts: 0
              }));
            }

            // Reset attempts counter
            attemptsRef.current = 0;

            // Start polling every 2 seconds
            pollIntervalRef.current = setInterval(async () => {
              if (!isMounted) return;

              attemptsRef.current += 1;

              if (isMounted) {
                setVerificationState(prev => ({
                  ...prev,
                  attempts: attemptsRef.current,
                  lastAttempt: new Date(),
                  message: `Verification attempt ${attemptsRef.current}...`
                }));
              }

              console.log(`🔄 Polling attempt ${attemptsRef.current} for orders:`, ordersToTry);

              // Try to verify each order
              for (const orderId of ordersToTry) {
                try {
                  const verified = await verifyPaymentStatus(orderId);
                  if (verified && isMounted) {
                    console.log('✅ Payment verified successfully!', { orderId });

                    // Clear intervals and timeouts
                    if (pollIntervalRef.current) {
                      clearInterval(pollIntervalRef.current);
                      pollIntervalRef.current = null;
                    }
                    if (timeoutIdRef.current) {
                      clearTimeout(timeoutIdRef.current);
                      timeoutIdRef.current = null;
                    }

                    // Update verification state
                    setVerificationState({
                      status: 'success',
                      message: 'Payment verified successfully!',
                      attempts: attemptsRef.current,
                      lastAttempt: new Date(),
                      error: null
                    });

                    // Update localStorage
                    localStorage.setItem('agnivirya-payment-status', 'paid');
                    localStorage.setItem('agnivirya-payment-verified', 'true');

                    // Update stored order
                    const currentStoredOrder = localStorage.getItem('agnivirya-order');
                    if (currentStoredOrder) {
                      try {
                        const currentOrderData = JSON.parse(currentStoredOrder);
                        currentOrderData.paymentVerified = true;
                        currentOrderData.paymentStatus = 'paid';
                        localStorage.setItem('agnivirya-order', JSON.stringify(currentOrderData));
                      } catch (e) {
                        console.error('Failed to update stored order:', e);
                      }
                    }

                                         if (isMounted) {
                       toastRef.current({
                         title: "🎉 Payment Confirmed!",
                         description: "Your wellness guide is now ready for download.",
                         variant: "default"
                       });
                     }

                    return;
                  }
                } catch (error) {
                  console.error(`❌ Error verifying order ${orderId}:`, error);
                }
              }

              // Log polling status every 5 attempts
              if (attemptsRef.current % 5 === 0) {
                console.log(`📊 Polling status: ${attemptsRef.current} attempts completed, still verifying...`);
              }
            }, 2000); // Poll every 2 seconds

            // Set timeout to stop polling after 1 minute
            timeoutIdRef.current = setTimeout(() => {
              if (pollIntervalRef.current && isMounted) {
                console.log('⏰ Polling timeout reached (1 minute), stopping verification');
                clearInterval(pollIntervalRef.current);
                pollIntervalRef.current = null;

                setVerificationState({
                  status: 'timeout',
                  message: 'Payment verification timed out',
                  attempts: attemptsRef.current,
                  lastAttempt: new Date(),
                  error: 'Verification process took too long. Please contact support.'
                });
              }
            }, 60000);

          } catch (e) {
            console.error('Failed to parse stored order for polling:', e);
            if (isMounted) {
              setVerificationState({
                status: 'failed',
                message: 'Failed to process order information',
                attempts: 0,
                lastAttempt: null,
                error: 'Order data could not be processed'
              });
            }
          }
        } else {
          // No stored order found
          if (isMounted) {
            setVerificationState({
              status: 'failed',
              message: 'No order information found',
              attempts: 0,
              lastAttempt: null,
              error: 'Please return to the payment page to complete your purchase'
            });
          }
        }
      } catch (error) {
        console.error('❌ Error in payment verification:', error);
        if (isMounted) {
          setVerificationState({
            status: 'failed',
            message: 'Unexpected error occurred',
            attempts: 0,
            lastAttempt: null,
            error: 'An unexpected error occurred during verification'
          });
        }
      }
    };

    startPaymentVerification();

    return () => {
      isMounted = false;
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Manual retry function
  const handleRetryVerification = useCallback(async () => {
    if (verificationState.status === 'verifying') return;

    console.log('🔄 Manual retry initiated');

    // Clear any existing intervals/timeouts
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    setVerificationState(prev => ({
      ...prev,
      status: 'verifying',
      message: 'Retrying payment verification...',
      attempts: 0,
      error: null
    }));

    // Reset attempts counter
    attemptsRef.current = 0;

    // Reset and restart verification
    const storedOrder = localStorage.getItem('agnivirya-order');
    if (storedOrder) {
      try {
        const orderData = JSON.parse(storedOrder);
        const ordersToTry = [orderData.orderId, orderData.cfOrderId].filter(Boolean);

        if (ordersToTry.length > 0) {
          const verified = await verifyPaymentStatus(orderData.orderId);
          if (verified) {
            setVerificationState({
              status: 'success',
              message: 'Payment verified successfully on retry!',
              attempts: 1,
              lastAttempt: new Date(),
              error: null
            });

            localStorage.setItem('agnivirya-payment-status', 'paid');
            localStorage.setItem('agnivirya-payment-verified', 'true');
            return;
          }
        }

        // If retry failed
        setVerificationState({
          status: 'failed',
          message: 'Payment verification failed on retry',
          attempts: 1,
          lastAttempt: new Date(),
          error: 'Payment could not be verified after retry'
        });
      } catch (e) {
        console.error('Retry verification error:', e);
        setVerificationState({
          status: 'failed',
          message: 'Retry verification failed',
          attempts: 1,
          lastAttempt: new Date(),
          error: 'Failed to process retry request'
        });
      }
    }
  }, [verificationState.status, verifyPaymentStatus]);

  // Handle download
  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadError(null);

    try {
      // Use the new download API with language parameter
      const response = await fetch(getPdfPath(selectedLanguage));
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${pdfFileName}-${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloadCompleted(true);
                 toastRef.current({
           title: "🚀 Download Started!",
           description: "Your personalized wellness guide is on its way!",
           variant: "default"
         });
      } else {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Download error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Download failed';
      setDownloadError(errorMessage);

             toastRef.current({
         title: "⚠️ Download Issue",
         description: errorMessage,
         variant: "destructive"
       });
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle retry download
  const handleRetryDownload = () => {
    setDownloadError(null);
    handleDownload();
  };

  // Handle back to home
  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Handle retry payment
  const handleRetryPayment = () => {
    if (onBackToPayment) {
      onBackToPayment();
    } else {
      window.history.pushState({}, '', '/payment');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Render verifying/pending state
  const renderVerifyingState = () => (
    <div className="state-card verifying">
      <div className="state-icon">
        <Loader2 className="icon animate-spin" />
      </div>
      <h1 className="state-title">Securing Your Access...</h1>
      <p className="state-message">We're confirming your payment to unlock your wellness guide</p>
      <div className="verification-progress">
        <div className="progress-ring">
          <div className="progress-fill"></div>
        </div>
        <span className="progress-text">Verifying payment security...</span>
      </div>
      
      {/* Manual retry option */}
      <div className="manual-retry-section">
        <button
          onClick={handleRetryVerification}
          className="retry-button"
          disabled={isVerifying}
        >
          <RefreshCw className="icon" />
          Retry Verification
        </button>
        <p className="retry-note">
          If verification takes longer than expected, click here to retry
        </p>
      </div>
    </div>
  );

  // Render success state
  const renderSuccessState = () => (
    <div className="state-card success">
      <div className="state-icon">
        <CheckCircle className="icon" />
      </div>
      <h1 className="state-title">🎉 Access Granted!</h1>
      <p className="state-message">Your AgniVirya Wellness Guide is ready to transform your life</p>
      
      {/* Language Selection */}
      <div className="language-selector">
        <label className="language-label">Select Your Language:</label>
        <div className="language-options">
                     <button
             type="button"
             className={`language-option ${selectedLanguage === 'english' ? 'active' : ''}`}
             onClick={() => setSelectedLanguage('english')}
             disabled={isDownloading}
           >
             <span className="text">English</span>
           </button>
           <button
             type="button"
             className={`language-option ${selectedLanguage === 'hindi' ? 'active' : ''}`}
             onClick={() => setSelectedLanguage('hindi')}
             disabled={isDownloading}
           >
             <span className="text">हिंदी (Hindi)</span>
           </button>
        </div>
        <p className="language-note">Choose your preferred language to start your wellness journey</p>
      </div>

      {/* Primary Download Button */}
      <button
        className="download-button"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="icon animate-spin" />
        ) : (
          <DownloadIcon className="icon" />
        )}
        {isDownloading ? 'Preparing Your Guide...' : 'Get Your Wellness Guide Now'}
      </button>

      {/* Download Progress */}
      {isDownloading && (
        <div className="download-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <span className="progress-text">Creating your personalized wellness guide...</span>
        </div>
      )}

      {/* Download Error */}
      {downloadError && (
        <div className="download-error">
          <AlertCircle className="icon" />
          <span>{downloadError}</span>
          <button
            onClick={handleRetryDownload}
            className="retry-button"
            disabled={isDownloading}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Download Completion */}
      {downloadCompleted && !downloadError && (
        <div className="download-completion">
          <CheckCircle className="icon" />
          <span>🎯 Your wellness guide is ready!</span>
        </div>
      )}

      {/* Order Summary */}
      {orderDetails && (
        <div className="order-summary">
          <div className="order-item">
            <span className="label">Order ID:</span>
            <span className="value">{orderDetails.orderId}</span>
          </div>
          <div className="order-item">
            <span className="label">Email:</span>
            <span className="value">{orderDetails.customerData?.customerEmail || 'N/A'}</span>
          </div>
        </div>
      )}

      {/* Bonus Content */}
      <div className="bonus-content">
        <span className="bonus-text">✨ Bonus: Exclusive Wellness Tips & Recipes Included</span>
      </div>
    </div>
  );

  // Render failed/timeout state
  const renderFailedState = () => (
    <div className="state-card failed">
      <div className="state-icon">
        <XCircle className="icon" />
      </div>
      <h1 className="state-title">
        {verificationState.status === 'timeout' ? 'Verification Timeout' : 'Payment Issue Detected'}
      </h1>
      <p className="state-message">
        {verificationState.error || 'We encountered a temporary issue with payment verification. This is usually resolved quickly.'}
      </p>
      
      <div className="action-buttons">
        <button
          className="primary-action"
          onClick={handleRetryPayment}
        >
          <RefreshCw className="icon" />
          Retry Payment
        </button>
        <button
          className="secondary-action"
          onClick={handleBackToHome}
        >
          <Home className="icon" />
          Return to Home
        </button>
      </div>
    </div>
  );

  // Render main content based on state
  const renderMainContent = () => {
    switch (verificationState.status) {
      case 'verifying':
      case 'pending':
        return renderVerifyingState();
      case 'success':
        return renderSuccessState();
      case 'failed':
      case 'timeout':
        return renderFailedState();
      default:
        return renderVerifyingState();
    }
  };

  return (
    <div className="download-page">
      {/* Page Header - Outside Container */}
      <div className="download-header">
        <div className="header-content">
                     <button onClick={handleBackToHome} className="back-button">
             <ArrowLeft className="icon" />
             <span>Back to Home</span>
           </button>
          <div className="header-logo">
            <img src={getImagePath('agnivirya-logo.png')} alt="AgniVirya" className="logo-image" />
          </div>
        </div>
      </div>

      {/* Main Content Container - Centered */}
      <div className="main-content">
        <div className="download-container">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
