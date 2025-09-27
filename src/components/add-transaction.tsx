"use client"

import React, { useState } from "react"

export interface TransactionInput {
  type: "deposit" | "withdrawal"
  amount: number
  description: string
}

interface AddTransactionProps {
  email: string
  onAddTransaction: (transaction: TransactionInput) => void
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState<number>(0)
  const [description, setDescription] = useState<string>("")
  const [type, setType] = useState<"deposit" | "withdrawal">("deposit")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const tx: TransactionInput = {
      type,
      amount,
      description,
    }

    onAddTransaction(tx)

    // reset form
    setAmount(0)
    setDescription("")
    setType("deposit")
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg space-y-4">
      <h2 className="text-lg font-semibold text-center">Add Transaction</h2>

      <div>
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "deposit" | "withdrawal")}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-lime-200 ms-8 text-white flex items-center px-2 py-2 rounded hover:bg-black"
      >
        Add Transaction
      </button>
    </form>
  )
}

export default AddTransaction
