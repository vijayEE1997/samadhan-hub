import { useEffect, useState, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download as DownloadIcon, CheckCircle, Star, AlertCircle, Loader2, ArrowLeft, Gift, RefreshCw, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { usePayment } from "@/hooks/usePayment";
import { getImagePath, getPdfPath } from "@/utils/assetUtils";

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
                        title: "Payment Verified!",
                        description: "Your payment has been confirmed successfully.",
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
        } else if (isMounted) {
          setVerificationState({
            status: 'failed',
            message: 'No order information found',
            attempts: 0,
            lastAttempt: null,
            error: 'Please complete a payment first'
          });
        }

      } catch (error) {
        console.error('Payment verification initialization error:', error);
        if (isMounted) {
          setVerificationState({
            status: 'failed',
            message: 'Failed to initialize payment verification',
            attempts: 0,
            lastAttempt: null,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
          });
        }
      }
    };

    // Start payment verification
    startPaymentVerification();

    // Cleanup function
    return () => {
      console.log('🧹 Payment verification useEffect cleanup');
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
          title: "Download Started!",
          description: "Your AgniVirya Wellness Guide is being downloaded.",
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
        title: "Download Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRetryDownload = () => {
    setDownloadError(null);
    handleDownload();
  };

  const handleBackToPayment = () => {
    if (onBackToPayment) {
      onBackToPayment();
    } else {
      window.history.pushState({}, '', '/payment');
      window.location.reload();
    }
  };

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.history.pushState({}, '', '/');
      window.location.reload();
    }
  };

  // Render different content based on verification status
  const renderMainContent = () => {
    if (verificationState.status === 'failed') {
      return (
        <div className="failed-payment-container">
          <AlertCircle className="w-20 h-20 text-red-500" />
          <h1 className="failed-title">Payment Verification Failed</h1>
          <p className="failed-description">
            {verificationState.message}
          </p>
          <div className="failed-actions">
            <button
              onClick={handleRetryVerification}
              className="back-button-improved retry-payment-button"
              disabled={isVerifying}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Verification
            </button>
            <button
              onClick={handleBackToPayment}
              className="back-button-improved"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try Payment Again
            </button>
            <button
              onClick={handleBackToHome}
              className="back-button-improved"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          {orderDetails && (
            <div className="order-details-failed">
              <h3>Order Details</h3>
              <div className="order-info">
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>Customer:</strong> {orderDetails.customerData?.customerName}</p>
                <p><strong>Email:</strong> {orderDetails.customerData?.customerEmail}</p>
                <p><strong>Verification Attempts:</strong> {verificationState.attempts}</p>
                {verificationState.lastAttempt && (
                  <p><strong>Last Attempt:</strong> {verificationState.lastAttempt.toLocaleString()}</p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (verificationState.status === 'pending') {
      return (
        <div className="pending-verification-container">
          <div className="verification-status-card">
            <div className="verification-icon">
              <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
            </div>
            <h2 className="verification-title">Initializing Payment Verification</h2>
            <p className="verification-description">
              {verificationState.message}
            </p>

            <div className="verification-progress">
              <div className="progress-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
              <p className="verification-status-text">
                Setting up verification process...
              </p>
            </div>

            {orderDetails && (
              <div className="order-preview">
                <h3>Order Preview</h3>
                <div className="order-summary">
                  <p><strong>Product:</strong> {productName}</p>
                  <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                  <p><strong>Customer:</strong> {orderDetails.customerData?.customerName}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (verificationState.status === 'verifying') {
      return (
        <div className="verifying-payment-container">
          <div className="verification-status-card">
            <div className="verification-icon">
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            </div>
            <h2 className="verification-title">Verifying Your Payment</h2>
            <p className="verification-description">
              {verificationState.message}
            </p>

            <div className="verification-progress">
              <div className="progress-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
              </div>
                             <p className="verification-status-text">
                 Actively checking payment status every 2 seconds...
               </p>

              {/* Polling Status Indicator */}
              <div className="polling-status">
                <div className="polling-indicator">
                  <div className="pulse-dot"></div>
                  <span>Verification in progress...</span>
                </div>
                <div className="polling-details">
                  <small>Attempt {verificationState.attempts} • Last check: {verificationState.lastAttempt ? verificationState.lastAttempt.toLocaleTimeString() : 'N/A'}</small>
                </div>
              </div>
            </div>

            {orderDetails && (
              <div className="order-preview">
                <h3>Order Details</h3>
                <div className="order-summary">
                  <p><strong>Product:</strong> {productName}</p>
                  <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                  <p><strong>Customer:</strong> {orderDetails.customerData?.customerName}</p>
                  <p><strong>Email:</strong> {orderDetails.customerData?.customerEmail}</p>
                </div>
              </div>
            )}

            {/* Manual retry option */}
            <div className="manual-retry-section">
              <button
                onClick={handleRetryVerification}
                className="retry-button-improved"
                disabled={isVerifying}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Manual Retry
              </button>
              <p className="retry-note">
                If verification seems stuck, you can manually retry
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (verificationState.status === 'timeout') {
      return (
        <div className="timeout-verification-container">
          <XCircle className="w-20 h-20 text-red-500" />
          <h1 className="timeout-title">Payment Verification Timed Out</h1>
          <p className="timeout-description">
            We couldn't verify your payment within the expected time. Please try again or contact support.
          </p>

          <div className="timeout-actions">
            <button
              onClick={handleRetryVerification}
              className="back-button-improved retry-payment-button"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Verification
            </button>
            <button
              onClick={handleBackToHome}
              className="back-button-improved"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          {orderDetails && (
            <div className="order-details-failed">
              <h3>Order Details</h3>
              <div className="order-info">
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>Customer:</strong> {orderDetails.customerData?.customerName}</p>
                <p><strong>Email:</strong> {orderDetails.customerData?.customerEmail}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Success state
    return (
      <div className="success-download-container">
        <div className="download-layout-improved">
          {/* Left Column - Success Summary */}
          <div className="success-summary-improved">
            <div className="success-header">
              <div className="success-icon-large">
                <CheckCircle className="w-20 h-20 text-green-500" />
              </div>
              <h1 className="success-title-improved">Payment Successful!</h1>
              <p className="success-subtitle">Your wellness guide is ready for download</p>
            </div>

            <div className="product-details-improved">
              <div className="product-card">
                <div className="product-icon">
                  <Gift className="w-8 h-8 text-orange-500" />
                </div>
                <div className="product-info">
                  <h3>{productName}</h3>
                  <p>Complete PDF Guide • 200+ Pages</p>
                  <div className="product-badge">Ready to Download</div>
                </div>
              </div>
            </div>

            {orderDetails && (
              <div className="order-details-improved">
                <h4>Order Information</h4>
                <div className="order-grid">
                  <div className="order-item">
                    <span className="label">Order ID:</span>
                    <span className="value">{orderDetails.orderId}</span>
                  </div>
                  <div className="order-item">
                    <span className="label">Customer:</span>
                    <span className="value">{orderDetails.customerData?.customerName}</span>
                  </div>
                  <div className="order-item">
                    <span className="label">Email:</span>
                    <span className="value">{orderDetails.customerData?.customerEmail}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Download Actions */}
          <div className="download-actions-improved">
            <div className="download-card">
              <div className="download-header">
                <DownloadIcon className="w-8 h-8 text-blue-500" />
                <h2>Download Your Guide</h2>
              </div>

              {/* Language Selection */}
              <div className="language-selector">
                <label className="language-label">Choose Language:</label>
                <div className="language-options">
                  <button
                    type="button"
                    className={`language-option ${selectedLanguage === 'english' ? 'active' : ''}`}
                    onClick={() => setSelectedLanguage('english')}
                    disabled={isDownloading}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    type="button"
                    className={`language-option ${selectedLanguage === 'hindi' ? 'active' : ''}`}
                    onClick={() => setSelectedLanguage('hindi')}
                    disabled={isDownloading}
                  >
                    🇮🇳 Hindi
                  </button>
                </div>
              </div>

              <Button
                className="download-button-improved"
                onClick={handleDownload}
                disabled={isDownloading}
                size="lg"
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <DownloadIcon className="w-5 h-5 mr-2" />
                )}
                {isDownloading ? 'Downloading...' : 'Download Now'}
              </Button>

              {/* Download Progress */}
              {isDownloading && (
                <div className="download-progress-improved">
                  <div className="progress-bar-improved">
                    <div className="progress-fill-improved"></div>
                  </div>
                  <span className="progress-text">Preparing your download...</span>
                </div>
              )}

              {/* Download Error */}
              {downloadError && (
                <div className="download-error-improved">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span>{downloadError}</span>
                  <Button
                    onClick={handleRetryDownload}
                    variant="outline"
                    size="sm"
                    className="retry-button"
                    disabled={isDownloading}
                  >
                    Retry Download
                  </Button>
                </div>
              )}

              {/* Download Completion */}
              {downloadCompleted && !downloadError && (
                <div className="download-completion-improved">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Download completed successfully!</span>
                </div>
              )}
            </div>

            {/* Bonus Content */}
            <div className="bonus-content-improved">
              <div className="bonus-header">
                <Star className="w-6 h-6 text-yellow-500" />
                <h3>Bonus Content Included</h3>
              </div>
              <div className="bonus-items-improved">
                <div className="bonus-item">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100+ Ayurvedic Remedy Recipes</span>
                </div>
                <div className="bonus-item">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Daily Wellness Routine Checklist</span>
                </div>
                <div className="bonus-item">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Meditation & Breathing Techniques</span>
                </div>
                <div className="bonus-item">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Seasonal Health Tips Calendar</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="navigation-improved">
              <button
                onClick={handleBackToHome}
                className="back-button-improved"
                disabled={isDownloading}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="download-page-improved">
      <div className="download-container-improved">
        {/* Header */}
        <div className="download-header-improved">
          <button onClick={onBackToHome} className="back-button-improved">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
                     <div className="header-logo-improved">
             <img src={getImagePath('agnivirya-logo.png')} alt="AgniVirya" className="logo-image-improved" />
           </div>
        </div>

        {/* Main Content */}
        <div className="main-content-improved">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
