"use client"

import * as React from "react"
import { Button } from "./ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { supabase } from "../lib/Supabase"
import { toast } from "sonner"

interface WithdrawModalProps {
  // Props if any, e.g., onWithdrawSuccess: () => void
}

export function WithdrawModal({}: WithdrawModalProps) {
  const [amount, setAmount] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleWithdraw = async () => {
    setLoading(true)
    const amountNumber = parseFloat(amount)
    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast.error("Please enter a valid amount.")
      setLoading(false)
      return
    }

    // Use a type guard to ensure we have the real Supabase client.
    if ('functions' in supabase) {
      const { error } = await supabase.functions.invoke('withdraw', {
        body: { amount: amountNumber },
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Withdrawal successful!")
        // Optionally call a success prop and close the drawer
      }
    } else {
      toast.error("Cannot perform withdrawal: Supabase is not configured.")
    }

    setLoading(false)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Make a Withdrawal</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Withdraw Funds</DrawerTitle>
          <DrawerDescription>Enter the amount you wish to withdraw.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 50.00"
            />
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleWithdraw} disabled={loading}>
            {loading ? "Withdrawing..." : "Confirm Withdrawal"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
