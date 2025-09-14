import { useEffect } from 'react';

interface PaystackProps {
  publicKey: string;
  email: string;
  amount: number;
  onSuccess: (reference: any) => void;
  onClose: () => void;
}

declare global {
  interface Window {
    PaystackPop: new () => {
      newTransaction: (options: any) => void;
    };
  }
}

const usePaystackPayment = (options: PaystackProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePayment = () => {
    const paystack = new (window as any).PaystackPop();
    paystack.newTransaction({
      key: options.publicKey,
      email: options.email,
      amount: options.amount,
      onSuccess: (response: any) => {
        options.onSuccess(response);
      },
      onCancel: () => {
        options.onClose();
      },
    });
  };

  return initializePayment;
};

export default usePaystackPayment;
