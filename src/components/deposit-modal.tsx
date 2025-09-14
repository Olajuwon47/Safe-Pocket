/*import * as React from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import usePaystack from "../hooks/usePaystack.ts";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onAddTransaction: (transaction: { type: "deposit"; amount: number; description: string }) => void;
}

export function DepositModal({ isOpen, onClose, email, onAddTransaction }: DepositModalProps) {
  const [amount, setAmount] = React.useState(0);

  const paystackPublicKey = "pk_test_b9fd5b142498f66c41fa89f5084529af7f9ae448";

  const handleSuccess = (reference: any) => {
    console.log("Payment successful", reference);
    onAddTransaction({
      type: "deposit",
      amount,
      description: `Deposit via Paystack - ${reference.reference}`,
    });
    onClose();
  };

  const handleClose = () => {
    console.log("Payment closed");
    onClose();
  };

  const initializePayment = usePaystack({
    publicKey: paystackPublicKey,
    email,
    amount: amount * 100, // Paystack expects kobo
    onSuccess: handleSuccess,
    onClose: handleClose,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      initializePayment();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Make a Deposit</DrawerTitle>
          <DrawerDescription>
            Enter the amount you want to deposit into your wallet.
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>
          <DrawerFooter>
            <Button type="submit">Continue</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}*/

import * as React from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import usePaystack from "../hooks/usePaystack.ts";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onAddTransaction: (transaction: { type: "deposit"; amount: number; description: string }) => void;
}

export function DepositModal({ isOpen, onClose, email, onAddTransaction }: DepositModalProps) {
  const [amount, setAmount] = React.useState(0);

  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const handleSuccess = (reference: any) => {
    console.log("Payment successful", reference);
    onAddTransaction({
      type: "deposit",
      amount,
      description: `Deposit via Paystack - ${reference.reference}`,
    });
    onClose();
  };

  const handleClose = () => {
    console.log("Payment closed");
    onClose();
  };

  const initializePayment = usePaystack({
    publicKey: paystackPublicKey,
    email,
    amount: amount * 100, // Paystack expects kobo
    onSuccess: handleSuccess,
    onClose: handleClose,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      initializePayment();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Make a Deposit</DrawerTitle>
          <DrawerDescription>
            Enter the amount you want to deposit into your wallet.
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>
          <DrawerFooter>
            <Button type="submit">Continue</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

