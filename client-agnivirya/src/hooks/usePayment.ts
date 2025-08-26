import { useState } from 'react';

export const usePayment = () => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyPayment = async (orderId: string): Promise<boolean> => {
    if (isVerifying) return false;

    console.log('🔍 Starting payment verification...', { orderId });
    
    setIsVerifying(true);
    try {
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
  };

  return {
    verifyPayment,
    isPaymentVerified,
    isVerifying,
  };
};
