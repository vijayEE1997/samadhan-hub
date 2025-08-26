import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download as DownloadIcon, CheckCircle, Star, AlertCircle, Loader2, ArrowLeft, Gift } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { usePayment } from "@/hooks/usePayment";
import { getImagePath, getPdfPath } from "@/utils/assetUtils";

interface DownloadPageProps {
  onBackToHome?: () => void;
  onBackToPayment?: () => void;
}

const DownloadPage = ({ onBackToHome, onBackToPayment }: DownloadPageProps) => {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [pdfFileName, setPdfFileName] = useState('agnivirya-complete-wellness-guide-2025.pdf');
  const [productName, setProductName] = useState('AgniVirya - Complete Ancient Modern Wellness Guide');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  const { toast } = useToast();
  const { verifyPayment, isVerifying } = usePayment();

  useEffect(() => {
    // Fetch product config once
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
  }, [])

  useEffect(() => {
    let pollInterval: ReturnType<typeof setInterval>;

    const initializePage = async () => {
      try {
        // Get URL parameters and stored order once
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment_status');
        const storedOrder = localStorage.getItem('agnivirya-order');

        // Set order details if available
        if (storedOrder) {
          try {
            const orderData = JSON.parse(storedOrder);
            setOrderDetails(orderData);
          } catch (e) {
            console.error('Failed to parse stored order:', e);
          }
        }

        // Handle payment status
        if (paymentStatus === 'SUCCESS' || paymentStatus === 'success') {
          setVerificationStatus('success');
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
        if (storedOrder) {
          try {
            const orderData = JSON.parse(storedOrder);
            const ordersToTry = [orderData.orderId, orderData.cfOrderId].filter(Boolean);
            
            if (ordersToTry.length > 0) {
              pollInterval = setInterval(async () => {
                for (const orderId of ordersToTry) {
                  try {
                    const verified = await verifyPayment(orderId);
                    if (verified) {
                      clearInterval(pollInterval);
                      setVerificationStatus('success');
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
                      return;
                    }
                  } catch (error) {
                    console.error('Payment verification error:', error);
                  }
                }
              }, 3000);

              // Stop polling after 5 minutes
              setTimeout(() => {
                if (pollInterval) {
                  clearInterval(pollInterval);
                  setVerificationStatus('failed');
                }
              }, 300000);
            } else {
              setVerificationStatus('failed');
            }
          } catch (e) {
            console.error('Failed to parse stored order for polling:', e);
            setVerificationStatus('failed');
          }
        } else {
          setVerificationStatus('failed');
        }

      } catch (error) {
        console.error('Page initialization error:', error);
        setVerificationStatus('failed');
      }
    };

    // Initialize page once
    initializePage();

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [verifyPayment]);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setDownloadError(null);
    
    try {
      const response = await fetch(getPdfPath(pdfFileName));
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = pdfFileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloadCompleted(true);
        toast({
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
      
      toast({
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
    if (verificationStatus === 'failed') {
      return (
        <div className="failed-payment-container">
          <div className="failed-icon">
            <AlertCircle className="w-20 h-20 text-red-500" />
          </div>
          <h1 className="failed-title">Payment Verification Failed</h1>
          <p className="failed-description">
            We couldn't verify your payment. Please try again or contact support if the issue persists.
          </p>
          
          <div className="failed-actions">
            <button
              onClick={handleBackToPayment}
              className="back-button-improved retry-payment-button"
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
              </div>
            </div>
          )}
        </div>
      );
    }

    if (verificationStatus === 'pending') {
      return (
        <div className="pending-verification-container">
          <div className="verification-status-card">
            <div className="verification-icon">
              <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
            </div>
            <h2 className="verification-title">Verifying Your Payment</h2>
            <p className="verification-description">
              Please wait while we verify your payment. This usually takes a few moments.
            </p>
            
            <div className="verification-progress">
              <div className="progress-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
              <p className="verification-status-text">
                {isVerifying ? 'Checking payment status...' : 'Waiting to verify...'}
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
