"use client"

import type { Transaction } from "../types"

interface TransactionsViewProps {
  transactions: Transaction[]
}

export default function TransactionsView({ transactions }: TransactionsViewProps) {
  if (transactions.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Transactions</h2>
        <p className="text-gray-500 text-center py-8">No transactions yet.</p>
      </div>
    )
  }
  

  // Sort transactions by date (most recent first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount)
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>
      <ul className="space-y-3">
        {sortedTransactions.map((tx) => (
          <li
            key={tx.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">
                    {tx.type.toUpperCase()} - {formatCurrency(tx.amount)}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-1">{tx.description}</p>
                <p className="text-xs text-gray-400">
                  {new Date(tx.date).toLocaleDateString('en-NG', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                  tx.status === "successful"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : tx.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {tx.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}