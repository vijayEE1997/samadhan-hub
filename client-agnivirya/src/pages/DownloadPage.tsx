import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download as DownloadIcon, CheckCircle, Star, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { usePayment } from "@/hooks/usePayment";


interface DownloadPageProps {
  onBackToHome?: () => void;
  onBackToPayment?: () => void;
}

const DownloadPage = ({ onBackToHome, onBackToPayment }: DownloadPageProps) => {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [pdfFileName, setPdfFileName] = useState('agnivirya-complete-wellness-guide-2025.pdf');
  const [productName, setProductName] = useState('AgniVirya - Complete Ancient Modern Wellness Guide');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const { toast } = useToast();
  const { verifyPayment, isVerifying } = usePayment();

  useEffect(() => {
    let pollInterval: ReturnType<typeof setInterval>;

    const checkPaymentStatus = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment_status');
        const storedOrder = localStorage.getItem('agnivirya-order');

        if (storedOrder) {
          try {
            const orderData = JSON.parse(storedOrder);
            setOrderDetails(orderData);
          } catch (e) {
            console.error('Failed to parse stored order:', e);
          }
        }

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

        startPaymentStatusChecking(storedOrder, paymentStatus);

      } catch (error) {
        console.error('Payment check error:', error);
        setVerificationStatus('pending');
      }
    };

    checkPaymentStatus();

    const startPaymentStatusChecking = async (storedOrder: string | null, paymentStatus: string | null) => {
      try {
        let ordersToTry: string[] = [];

        if (storedOrder) {
          try {
            const orderData = JSON.parse(storedOrder);
            ordersToTry = [orderData.orderId, orderData.cfOrderId].filter(Boolean);
          } catch (e) {
            console.error('Failed to parse stored order:', e);
          }
        }

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

                   const storedOrder = localStorage.getItem('agnivirya-order');
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
              } catch (error) {
                console.error('Payment verification error:', error);
              }
            }
          }, 5000);

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
      } catch (error) {
        console.error('Payment status checking error:', error);
        setVerificationStatus('failed');
      }
    };

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [verifyPayment]);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setDownloadError(null);
    
    try {
      const response = await fetch(`/agnivirya/${pdfFileName}`);
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

        setRetryCount(0);
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
      setRetryCount(prev => prev + 1);
      
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

    return (
    <div className="download-page">
      <div className="download-container">
        <div className="download-content">
          {/* Header */}
          <div className="download-header">
            <h1>Thank You!</h1>
            <p>Your payment was successful. Your AgniVirya Wellness Guide is ready for download.</p>
          </div>

          <div className="download-body">
            {/* Success Message */}
            <div className="download-section">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-500/30 to-orange-600/30 rounded-full flex items-center justify-center relative z-10">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {verificationStatus === 'pending' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                    <span className="text-sm text-yellow-600">
                      {isVerifying ? 'Verifying payment...' : 'Waiting to verify...'}
                    </span>
                  </>
                )}
                {verificationStatus === 'success' && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Payment confirmed! Download available</span>
                  </>
                )}
                {verificationStatus === 'failed' && (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600">Payment verification failed</span>
                  </>
                )}
              </div>

              {orderDetails && (
                <div className="text-sm text-gray-600 space-y-1 text-center">
                  <p>Order ID: {orderDetails.orderId}</p>
                  <p>Customer: {orderDetails.customerData?.customerName}</p>
                  <p>Email: {orderDetails.customerData?.customerEmail}</p>
                </div>
              )}
            </div>

                      {/* Download Card */}
            <div className="download-section">
              <h2>
                <DownloadIcon className="w-5 h-5" />
                Download Your Wellness Guide
              </h2>
              
              <Button
                className="w-full relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300 text-base sm:text-lg py-4 sm:py-6 text-white border-0 group disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDownload}
                disabled={verificationStatus !== 'success' || isDownloading}
              >
                <span className="relative z-10">
                  {isDownloading ? (
                    <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 inline animate-spin" />
                  ) : (
                    <DownloadIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 inline" />
                  )}
                  {isDownloading ? 'Downloading...' :
                    verificationStatus === 'success' ? 'Download Your Wellness Guide Now' :
                    verificationStatus === 'pending' ? 'Verifying Payment...' : 'Payment Failed'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>

              {/* Status Messages */}
              {verificationStatus === 'pending' && (
                <div className="text-center p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-yellow-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">Payment verification in progress...</span>
                  </div>
                  <p className="text-sm text-yellow-600 mt-2">
                    This usually takes 1 minute. You'll be notified when ready.
                  </p>
                </div>
              )}

              {verificationStatus === 'failed' && (
                <div className="text-center p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Payment verification failed</span>
                  </div>
                  <p className="text-sm text-red-600 mt-2">
                    We couldn't verify your payment. Please contact support or try again.
                  </p>
                  <Button
                    onClick={handleBackToPayment}
                    variant="outline"
                    size="sm"
                    className="mt-3 border-red-500/40 text-red-600 hover:bg-red-500/20 hover:text-white hover:border-red-400"
                  >
                    Try Payment Again
                  </Button>
                </div>
              )}

              {verificationStatus === 'success' && (
                <div className="text-center p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Payment verified successfully!</span>
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    Your payment has been confirmed. You can now download your wellness guide.
                  </p>
                </div>
              )}

                              <div className="text-sm text-gray-600 space-y-2 mt-4">
                  <p>• The PDF will be downloaded to your device</p>
                  <p>• You have lifetime access to this guide</p>
                  <p>• Check your email for additional bonus content</p>
                </div>

                {/* Download Progress Indicator */}
                {isDownloading && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-orange-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm font-medium">Preparing your download...</span>
                    </div>
                    <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                )}

                {/* Download Error and Retry */}
                {downloadError && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Download failed</span>
                    </div>
                    <p className="text-xs text-red-600 text-center mb-3">{downloadError}</p>
                    <div className="flex justify-center">
                      <Button
                        onClick={handleRetryDownload}
                        variant="outline"
                        size="sm"
                        className="border-red-500/40 text-red-600 hover:bg-red-500/20 hover:text-white hover:border-red-400"
                        disabled={isDownloading}
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Retrying...
                          </>
                        ) : (
                          <>
                            <DownloadIcon className="w-3 h-3 mr-1" />
                            Retry Download
                          </>
                        )}
                      </Button>
                    </div>
                    {retryCount > 0 && (
                      <p className="text-xs text-red-500 text-center mt-2">
                        Attempt {retryCount} of 3
                      </p>
                    )}
                  </div>
                )}

                {/* Download Completion Indicator */}
                {downloadCompleted && !downloadError && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Download completed successfully!</span>
                    </div>
                    <p className="text-xs text-green-600 text-center">
                      Your wellness guide has been downloaded. Check your downloads folder.
                    </p>
                  </div>
                )}
            </div>

            {/* Product Info */}
            <div className="download-section">
              <h2>
                <img
                  src="/assets/agnivirya-logo.png"
                  alt="AgniVirya Logo"
                  className="w-5 h-5 inline mr-2"
                />
                {productName}
              </h2>
              <p className="text-gray-600">Complete PDF Guide • 200+ Pages</p>
            </div>

            {/* Bonus Content */}
            <div className="download-section">
              <h2>
                <Star className="w-5 h-5" />
                Bonus Content Available
              </h2>
              <p className="text-gray-600 mb-4">Additional wellness resources sent to your email</p>
              
              <div className="bonus-content">
                {bonusContent.map((item, index) => (
                  <div key={index} className="bonus-item">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="support-section">
              <h3>Need Help?</h3>
              <p>
                If you have any questions or issues with your download,
                please contact our support team at{" "}
                <a href="mailto:support@agnivirya.com">
                  support@agnivirya.com
                </a>
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                onClick={handleBackToPayment}
                variant="outline"
                className="back-button"
                disabled={isDownloading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Payment
              </Button>
              <Button
                onClick={handleBackToHome}
                variant="outline"
                className="back-button"
                disabled={isDownloading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const bonusContent = [
  "100+ Ayurvedic Remedy Recipes (PDF)",
  "Daily Wellness Routine Checklist",
  "Meditation & Breathing Techniques Guide",
  "Seasonal Health Tips Calendar",
  "Future Updates & New Practices (Free)"
];

export default DownloadPage;
