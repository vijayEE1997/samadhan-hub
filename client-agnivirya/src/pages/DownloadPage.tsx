import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download as DownloadIcon, CheckCircle, Star, AlertCircle, Loader2, Menu, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


const DownloadPage = () => {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [pdfFileName, setPdfFileName] = useState('agnivirya-complete-wellness-guide-2025.pdf');
  const [productName, setProductName] = useState('AgniVirya - Complete Ancient Modern Wellness Guide');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
                // Call backend API to verify payment
                const response = await fetch(`${window.location.origin}/api/payments/verify`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ orderId }),
                });

                if (response.ok) {
                  const result = await response.json();
                  if (result.success && result.isPaymentCompleted) {
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
  }, []);

  const handleDownload = async () => {
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

        toast({
          title: "Download Started!",
          description: "Your AgniVirya Wellness Guide is being downloaded.",
          variant: "default"
        });
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Error",
        description: "Failed to download the guide. Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const handleBackToPayment = () => {
    navigate('/payment');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white py-8 sm:py-12 lg:py-20 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <header className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src="/assets/agnivirya-logo.png" 
                    alt="AgniVirya Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AgniVirya
                </span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden sm:flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={handleBackToHome}
                  className="text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/40 hover:border-purple-400 transition-all duration-300"
                >
                  Back to Home
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="sm:hidden text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/40 hover:border-purple-400 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="sm:hidden mt-4 py-4 border-t border-purple-500/20">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    handleBackToHome();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/40 hover:border-purple-400 transition-all duration-300"
                >
                  Back to Home
                </Button>
              </div>
            )}
          </header>

          <div className="text-center space-y-8 sm:space-y-12">
            {/* Success Message */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full flex items-center justify-center relative z-10">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Thank You!</h1>
                <p className="text-lg sm:text-xl text-slate-300">
                  Your payment was successful. Your AgniVirya Wellness Guide is ready for download.
                </p>

                {/* Verification Status */}
                <div className="flex items-center justify-center gap-2">
                  {verificationStatus === 'pending' && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                      <span className="text-sm text-yellow-400">Verifying payment...</span>
                    </>
                  )}
                  {verificationStatus === 'success' && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Payment confirmed! Download available</span>
                    </>
                  )}
                  {verificationStatus === 'failed' && (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-400">Payment verification failed</span>
                    </>
                  )}
                </div>

                {orderDetails && (
                  <div className="text-sm text-slate-400 space-y-1">
                    <p>Order ID: {orderDetails.orderId}</p>
                    <p>Customer: {orderDetails.customerData?.customerName}</p>
                    <p>Email: {orderDetails.customerData?.customerEmail}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Download Card */}
            <Card className="shadow-2xl border-purple-500/30 bg-gradient-to-br from-slate-800/80 to-purple-900/40 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center relative z-10">
                <CardTitle className="flex items-center justify-center gap-3 text-white">
                  <div className="relative">
                    <img
                      src="/assets/agnivirya-logo.png"
                      alt="AgniVirya Logo"
                      className="w-6 h-6 object-contain relative z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-50"></div>
                  </div>
                  {productName}
                </CardTitle>
                <CardDescription className="text-slate-300">Complete PDF Guide • 200+ Pages</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
                <Button
                  className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 text-base sm:text-lg py-4 sm:py-6 text-white border-0 group disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleDownload}
                  disabled={verificationStatus !== 'success'}
                >
                  <span className="relative z-10">
                    <DownloadIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 inline" />
                    {verificationStatus === 'success' ? 'Download Your Wellness Guide Now' :
                      verificationStatus === 'pending' ? 'Verifying Payment...' : 'Payment Failed'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>

                {/* Status Messages */}
                {verificationStatus === 'pending' && (
                  <div className="text-center p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-yellow-300">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="font-medium">Payment verification in progress...</span>
                    </div>
                    <p className="text-sm text-yellow-400 mt-2">
                      This usually takes 1 minute. You'll be notified when ready.
                    </p>
                  </div>
                )}

                {verificationStatus === 'failed' && (
                  <div className="text-center p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-red-300">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Payment verification failed</span>
                    </div>
                    <p className="text-sm text-red-400 mt-2">
                      We couldn't verify your payment. Please contact support or try again.
                    </p>
                    <Button
                      onClick={handleBackToPayment}
                      variant="outline"
                      size="sm"
                      className="mt-3 border-red-500/40 text-red-300 hover:bg-red-500/20 hover:text-white hover:border-red-400"
                    >
                      Try Payment Again
                    </Button>
                  </div>
                )}

                {verificationStatus === 'success' && (
                  <div className="text-center p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-green-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Payment verified successfully!</span>
                    </div>
                    <p className="text-sm text-green-400 mt-2">
                      Your payment has been confirmed. You can now download your wellness guide.
                    </p>
                  </div>
                )}

                <div className="text-sm text-slate-400 space-y-2">
                  <p>• The PDF will be downloaded to your device</p>
                  <p>• You have lifetime access to this guide</p>
                  <p>• Check your email for additional bonus content</p>
                </div>
              </CardContent>
            </Card>

            {/* Bonus Content */}
            <Card className="border-purple-500/30 bg-gradient-to-br from-slate-800/60 to-purple-900/30 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center relative z-10">
                <CardTitle className="flex items-center justify-center gap-2 text-white">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Bonus Content Available
                </CardTitle>
                <CardDescription className="text-slate-300">Additional wellness resources sent to your email</CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="grid gap-4">
                  {bonusContent.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-700/50 to-purple-800/30 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center p-1 group-hover/item:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <div className="space-y-4 pt-8 border-t border-purple-500/20">
              <h3 className="text-lg font-semibold text-white">Need Help?</h3>
              <p className="text-slate-300">
                If you have any questions or issues with your download,
                please contact our support team at{" "}
                <a href="mailto:support@agnivirya.com" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors duration-300">
                  support@agnivirya.com
                </a>
              </p>
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
