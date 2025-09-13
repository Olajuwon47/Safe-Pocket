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
    PaystackPop: {
      setup: (props: any) => {
        openIframe: () => void;
      };
    };
  }
}

const usePaystackPayment = (options: PaystackProps) => {
  const initializePayment = () => {
    const handler = window.PaystackPop.setup({
      key: options.publicKey,
      email: options.email,
      amount: options.amount,
      callback: (response: any) => {
        options.onSuccess(response);
      },
      onClose: () => {
        options.onClose();
      },
    });
    handler.openIframe();
  };

  return initializePayment;
};

export default usePaystackPayment;
