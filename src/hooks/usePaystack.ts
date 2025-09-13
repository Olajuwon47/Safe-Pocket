import { } from 'react';

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
