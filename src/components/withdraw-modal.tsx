"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { toast } from "sonner"

interface WithdrawModalProps {
  onWithdraw: (amount: number, description?: string) => Promise<void> | void
}

export default function WithdrawModal({ onWithdraw }: WithdrawModalProps) {
  const [amount, setAmount] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async () => {
    const n = parseFloat(amount)
    if (isNaN(n) || n <= 0) {
      toast.error("Please enter a valid amount.")
      return
    }

    try {
      setLoading(true)
      await onWithdraw(n, description)
      toast.success("Withdrawal processed.")
      setAmount("")
      setDescription("")
    } catch (err: any) {
      toast.error(err?.message ?? "Withdrawal failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="withdraw-amount">Amount</Label>
        <Input
          id="withdraw-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 50.00"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="withdraw-desc">Description (optional)</Label>
        <Input
          id="withdraw-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Reason or note"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => { setAmount(""); setDescription(""); }}>
          Clear
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Confirm Withdraw"}
        </Button>
      </div>
    </div>
  )
}
