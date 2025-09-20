import { useEffect } from "react";

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
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}

const usePaystackPayment = (options: PaystackProps) => {
  useEffect(() => {
    if (!document.querySelector(`script[src="https://js.paystack.co/v1/inline.js"]`)) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const initializePayment = () => {
    if (!window.PaystackPop) {
      console.error("Paystack script not loaded yet");
      return;
    }

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
