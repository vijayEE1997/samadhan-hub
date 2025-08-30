declare module '@cashfreepayments/cashfree-js' {
  export function load(config: { mode: 'sandbox' | 'production' }): Promise<{
    checkout: (options: {
      paymentSessionId: string;
      returnUrl: string;
      onSuccess?: (data: any) => void;
      onFailure?: (data: any) => void;
      onClose?: () => void;
    }) => Promise<any>;
  }>;
}
