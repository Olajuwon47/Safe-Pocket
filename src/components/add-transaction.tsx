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
}
