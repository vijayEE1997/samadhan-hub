import { useState, useCallback } from 'react';

export const usePayment = () => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyPayment = useCallback(async (orderId: string): Promise<boolean> => {
    if (isVerifying) return false;

    console.log('🔍 Starting payment verification...', { orderId });
    
    setIsVerifying(true);
    try {
      // Updated to use GET request with orderId as URL parameter
      const response = await fetch(`${window.location.origin}/api/payments/verify/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Removed body since GET requests don't have a body
      });

      if (response.ok) {
        const result = await response.json();
        // Updated to check the correct success property from server response
        if (result.success && result.status === 'PAID') {
          setIsPaymentVerified(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Payment verification error:', error);
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [isVerifying]);

  return {
    verifyPayment,
    isPaymentVerified,
    isVerifying,
  };
};
