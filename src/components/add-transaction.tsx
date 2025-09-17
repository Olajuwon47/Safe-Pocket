"use client"

/*import * as React from "react"
import { z, type ZodIssue } from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { toast } from "sonner"

export const transactionSchema = z.object({
  type: z.enum(["deposit", "withdrawal"]),
  amount: z.coerce.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
})

export type TransactionInput = z.infer<typeof transactionSchema>

interface AddTransactionProps {
  onAddTransaction: (data: TransactionInput) => void
}

export function AddTransaction({ onAddTransaction }: AddTransactionProps) {
  const [type, setType] = React.useState<"deposit" | "withdrawal">("deposit")
  const [amount, setAmount] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = transactionSchema.safeParse({
      type,
      amount: Number(amount),
      description,
    })

    if (result.success) {
      onAddTransaction(result.data)
      toast.success("Transaction added successfully")
      setType("deposit")
      setAmount("")
      setDescription("")
    } else {
      result.error.issues.forEach((error: ZodIssue) => {
        toast.error(error.message)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="type">Type</Label>
          <Select
            onValueChange={(value) => setType(value as "deposit" | "withdrawal")}
            defaultValue={type}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="flex justify-center items-center w-full">
        <Button type="submit" className="min-w-[130px] h-10">
          Add Transaction
        </Button>
      </div>
    </form>
  )
}*/

"use client"

import * as React from "react"
import { z, type ZodIssue } from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { toast } from "sonner"
import usePaystack from "../hooks/usePaystack";

const transactionSchema = z.object({
  type: z.enum(["deposit", "withdrawal"]),
  amount: z.coerce.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
})

export type TransactionInput = z.infer<typeof transactionSchema>;

interface AddTransactionProps {
  onAddTransaction: (data: z.infer<typeof transactionSchema>) => void;
  email: string;
}

export function AddTransaction({ onAddTransaction, email }: AddTransactionProps) {
  const [type, setType] = React.useState<"deposit" | "withdrawal">("deposit")
  const [amount, setAmount] = React.useState("")
  const [description, setDescription] = React.useState("")

  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const handleSuccess = (reference: any) => {
    console.log("Payment successful", reference);
    onAddTransaction({
      type: "deposit",
      amount: Number(amount),
      description: `Deposit via Paystack - ${reference.reference}`,
    });
    // Reset form
    setType("deposit");
    setAmount("");
    setDescription("");
  };

  const handleClose = () => {
    console.log("Payment closed");
  };

  const initializePayment = usePaystack({
    publicKey: paystackPublicKey,
    email,
    amount: Number(amount) * 100, // Paystack expects kobo
    onSuccess: handleSuccess,
    onClose: handleClose,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type === 'deposit') {
      if (Number(amount) > 0) {
        initializePayment();
      } else {
        toast.error("Amount must be positive");
      }
      return;
    }

    const result = transactionSchema.safeParse({
      type,
      amount: Number(amount),
      description,
    })

    if (result.success) {
      onAddTransaction(result.data)
      toast.success("Transaction added successfully")
      // Reset form
      setType("deposit")
      setAmount("")
      setDescription("")
    } else {
      result.error.issues.forEach((error: ZodIssue) => {
        toast.error(error.message)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="type">Type</Label>
          <Select onValueChange={(value) => setType(value as "deposit" | "withdrawal")} defaultValue={type}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
          <div className="flex justify-center items-center w-full">
        <Button
          type="submit"
          className="min-w-[130px] h-10 
                    text-white font-bold 
                    px-2.5 py-1.5 
                    relative inline-block 
                    rounded-md border-none outline-none 
                    cursor-pointer transition-all duration-300 ease-in-out 
                    bg-[#80ed99] shadow-[0_5px_0_#57cc99]
                    hover:shadow-[0_3px_0_#57cc99] hover:top-[1px]
                    active:shadow-[0_0px_0_#57cc99] active:top-[5px]"
        >
          Add Transaction
        </Button>
      </div>

    </form>
  )
}
