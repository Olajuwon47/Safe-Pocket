"use client"

import * as React from "react"
import { AppSidebar } from "../../components/app-sidebar"
import { ChartAreaInteractive } from "../../components/chart-area-interactive.tsx"
import type { BreakdownData } from "../../components/chart-area-interactive.tsx"
import { SectionCards } from "../../components/section-cards.tsx"
import { SiteHeader } from "../../components/site-header"
import { GoalsProgress } from "../../components/Progress"
import WithdrawModal from "../../components/withdraw-modal"
import { AddTransaction } from "../../components/add-transaction.tsx"
import type { TransactionInput } from "../../components/add-transaction.tsx"
import { TransactionsView } from "../../components/transactions-view"
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../../components/ui/drawer"
import { Button } from "../../components/ui/button"

import type { Goal, Transaction, User } from "../../types"

const nowIso = () => new Date().toISOString()

const defaultUser: User = {
  email: "user@example.com",
  walletBalance: 1200,
  savings: 800,
  breakdown: {
    daily: [{ date: new Date().toISOString(), amount: 120 }],
    weekly: [{ week: "W1", amount: 500 }],
    monthly: [{ month: "Jan", amount: 2000 }],
  },
  goals: [],
  transactions: [],
}

export default function Page() {
  const [selectedView, setSelectedView] = React.useState<"dashboard" | "analytics" | "goals" | "wallet" | "breakdown" | "savings" | "transactions">("dashboard")
  const [isDepositOpen, setIsDepositOpen] = React.useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = React.useState(false)
  const [user, setUser] = React.useState<User>(defaultUser)

  const handleAddGoal = React.useCallback((title: string, target: number) => {
    const newGoal: Goal = {
      id: Math.floor(Math.random() * 100000),
      title,
      target,
      progress: 0,
    }
    setUser(prev => ({ ...prev, goals: [...prev.goals, newGoal] }))
  }, [])

  const handleAddTransaction = React.useCallback((data: TransactionInput) => {
    const tx: Transaction = {
      id: Math.floor(Math.random() * 100000),
      type: data.type,
      amount: data.amount,
      description: data.description,
      date: nowIso(),
    }
    setUser(prev => {
      const newBalance = data.type === "deposit" ? prev.walletBalance + data.amount : prev.walletBalance - data.amount
      const newSavings = data.type === "deposit" ? prev.savings + data.amount * 0.2 : prev.savings // example: 20% to savings on deposit
      return {
        ...prev,
        walletBalance: newBalance,
        savings: newSavings,
        transactions: [...prev.transactions, tx],
      }
    })
  }, [])

  const handleWithdraw = React.useCallback(async (amount: number, description?: string) => {
    setUser(prev => {
      const newBalance = prev.walletBalance - amount
      const tx: Transaction = {
        id: Math.floor(Math.random() * 100000),
        type: "withdrawal",
        amount,
        description: description ?? "Withdraw",
        date: nowIso(),
      }
      return {
        ...prev,
        walletBalance: newBalance,
        transactions: [...prev.transactions, tx],
      }
    })
    setIsWithdrawOpen(false)
  }, [])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards
                walletBalance={user.walletBalance}
                savings={user.savings}
                onDeposit={() => setIsDepositOpen(true)}
                onWithdraw={() => setIsWithdrawOpen(true)}
              />

              <GoalsProgress goals={user.goals} onAddGoal={handleAddGoal} />

              <div className="px-2 max-sm:px-1 md:px-6">
                <React.Suspense fallback={<div>Loading chart...</div>}>
                  <ChartAreaInteractive breakdown={user.breakdown} />
                </React.Suspense>
              </div>

              <div className="grid gap-4 px-2 max-sm:gap-2 max-sm:px-1 md:px-6">
                <AddTransaction onAddTransaction={handleAddTransaction} />
                <TransactionsView data={user.transactions} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Deposit Drawer */}
      <Drawer open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Make a Deposit</DrawerTitle>
            <DrawerDescription>Enter the details for your deposit.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <AddTransaction onAddTransaction={handleAddTransaction} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Withdraw Drawer (uses WithdrawModal as content) */}
      <Drawer open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Withdraw</DrawerTitle>
            <DrawerDescription>Confirm withdrawal details</DrawerDescription>
          </DrawerHeader>

          <div className="px-4">
            <WithdrawModal onWithdraw={handleWithdraw} />
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SidebarProvider>
  )
}
