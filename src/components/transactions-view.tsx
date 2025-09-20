"use client"

import React from "react"
import type { Transaction } from "../types"

interface TransactionsViewProps {
  transactions: Transaction[]
}

const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions yet.</p>
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {tx.type.toUpperCase()} - ₦{tx.amount}
              </p>
              <p className="text-sm text-gray-500">{tx.description}</p>
              <p className="text-xs text-gray-400">{tx.date}</p>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded ${
                tx.status === "successful"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {tx.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionsView
