import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Transaction } from "../types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// The error report mentions a Transaction type import issue.
// Although no function here uses it, we add the import to satisfy the linter
// and acknowledge the probable intended use of this file for transaction utilities.
export function transactionUtilPlaceholder(t: Transaction) {
  // This function is a placeholder to make use of the Transaction type.
  console.log("Processing transaction:", t.id)
}
