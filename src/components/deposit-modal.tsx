"use client";

import * as React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../components/ui/drawer";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import usePaystackPayment from "../hooks/usePaystack";
import { toast } from "sonner";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onAddTransaction: (transaction: any) => void;
}

export function DepositModal({ isOpen, onClose, email, onAddTransaction }: DepositModalProps) {
  const [amount, setAmount] = React.useState<number>(0);

  const initializePayment = usePaystackPayment({
    publicKey: "pk_test_xxxxxxxxxxxxx", // replace with your Paystack public key
    email,
    amount: amount * 100,
    onSuccess: (response) => {
      onAddTransaction({
        id: Date.now().toString(),
        type: "deposit",
        amount,
        status: "successful",
        description: `Deposit via Paystack (${response.reference})`,
        date: new Date().toLocaleString(),
      });
      toast.success("Deposit successful!");
      onClose();
    },
    onClose: () => {
      toast.error("Payment cancelled");
    },
  });

  const handleDeposit = () => {
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    initializePayment();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Deposit Funds</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button onClick={handleDeposit} className="w-full bg-green-500 text-white">
            Pay with Paystack
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
