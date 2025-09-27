"use client"
import React, { useState, useCallback } from "react"
import { AppSidebar } from "../../components/app-sidebar"
import { ChartAreaInteractive } from "../../components/chart-area-interactive"
import { SectionCards } from "../../components/section-cards"
import { SiteHeader } from "../../components/site-header"
import { GoalsProgress } from "../../components/Progress"
import WithdrawModal from "../../components/withdraw-modal"
import AddTransaction, { type TransactionInput } from "../../components/add-transaction"
import TransactionsView from "../../components/transactions-view"
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
import { SpendingBreakdownChart } from "../../components/spending-breakdown-chart" // ✅ removed `.tsx`
import { Button } from "../../components/ui/button"
import type { Goal, Transaction, User } from "../../types"
import data from "./data.json"
import { toast } from "sonner"

export default function Page() {
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedView, setSelectedView] = useState("dashboard")

  React.useEffect(() => {
    // ✅ Ensure IDs are strings
    const fixedData = (data as any[]).map((user) => ({
      ...user,
      id: String(user.id),
      transactions: user.transactions.map((tx: any) => ({
        ...tx,
        id: String(tx.id),
      })),
    })) as User[]

    setUsers(fixedData)
    if (fixedData.length > 0) {
      setSelectedUser(fixedData[0])
    }
  }, [])

  const nowIso = () => new Date().toISOString()

  const handleAddGoal = useCallback(
    (title: string, target: number) => {
      if (!selectedUser) return
      const newGoal: Goal = {
        id: Math.random().toString(36).substring(7),
        title,
        target,
        progress: 0,
      }
      setSelectedUser((prev) =>
        prev ? { ...prev, goals: [...prev.goals, newGoal] } : prev
      )
      toast.success(`New goal "${title}" has been added.`, {
        description: `Your target is $${target.toLocaleString()}.`,
      })
    },
    [selectedUser]
  )

  const handleAddTransaction = useCallback(
    (data: TransactionInput) => {
      if (!selectedUser) return
      const tx: Transaction = {
        id: Math.random().toString(36).substring(7),
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: nowIso(),
        status: "completed",
      }

      setSelectedUser((prev) => {
        if (!prev) return prev
        const newBalance =
          data.type === "deposit"
            ? prev.walletBalance + data.amount
            : prev.walletBalance - data.amount

        const newSavings =
          data.type === "deposit" ? prev.savings + data.amount * 0.2 : prev.savings

        return {
          ...prev,
          walletBalance: newBalance,
          savings: newSavings,
          transactions: [...prev.transactions, tx],
        }
      })
      toast.success(
        `$${data.amount.toLocaleString()} ${
          data.type === "deposit" ? "deposit" : "expense"
        } recorded.`,
        {
          description: `Description: ${data.description}`,
        }
      )
    },
    [selectedUser]
  )

  const handleWithdraw = useCallback(
    async (amount: number, description?: string) => {
      if (!selectedUser) return
      setSelectedUser((prev) => {
        if (!prev) return prev
        const newBalance = prev.walletBalance - amount
        const tx: Transaction = {
          id: Math.random().toString(36).substring(7),
          type: "withdrawal",
          amount,
          description: description ?? "Withdraw",
          date: nowIso(),
          status: "completed",
        }
        return {
          ...prev,
          walletBalance: newBalance,
          transactions: [...prev.transactions, tx],
        }
      })
      toast.success(`$${amount.toLocaleString()} has been withdrawn.`, {
        description: `Description: ${description}`,
      })
      setIsWithdrawOpen(false)
    },
    [selectedUser]
  )

  const handleSelectView = (view: string) => {
    setSelectedView(view)
  }

  const handleUserChange = (user: User) => {
    setSelectedUser(user)
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        users={users}
        selectedUser={selectedUser}
        onSelectView={handleSelectView}
        onUserChange={handleUserChange}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {selectedUser && (
                <>
                  {selectedView === "dashboard" && (
                    <>
                      <SectionCards
                        walletBalance={selectedUser.walletBalance}
                        savings={selectedUser.savings}
                        onDeposit={() => setIsDepositOpen(true)}
                        onWithdraw={() => setIsWithdrawOpen(true)}
                      />
                      <GoalsProgress
                        goals={selectedUser.goals}
                        onAddGoal={handleAddGoal}
                      />
                      <div className="px-2 max-sm:px-1 md:px-6">
                        <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                        <SpendingBreakdownChart
                          transactions={selectedUser.transactions}
                          savings={selectedUser.savings}
                          goals={selectedUser.goals}
                          breakdown={selectedUser.breakdown}
                        />
                      </div>
                      <div className="grid gap-4 px-2 max-sm:gap-2 max-sm:px-1 md:px-6">
                        <AddTransaction
                          onAddTransaction={handleAddTransaction}
                          email={selectedUser.email}
                        />
                        <TransactionsView transactions={selectedUser.transactions} />
                      </div>
                    </>
                  )}

                  {(selectedView === "goals" || selectedView === "progress") && (
                    <GoalsProgress
                      goals={selectedUser.goals}
                      onAddGoal={handleAddGoal}
                    />
                  )}

                  {(selectedView === "wallet" || selectedView === "savings") && (
                    <SectionCards
                      walletBalance={selectedUser.walletBalance}
                      savings={selectedUser.savings}
                      onDeposit={() => setIsDepositOpen(true)}
                      onWithdraw={() => setIsWithdrawOpen(true)}
                    />
                  )}

                  {selectedView === "breakdown" && (
                    <div className="grid gap-4 px-2 max-sm:gap-2 max-sm:px-1 md:px-6">
                      <AddTransaction
                        onAddTransaction={handleAddTransaction}
                        email={selectedUser.email}
                      />
                      <TransactionsView transactions={selectedUser.transactions} />
                      <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                    </div>
                  )}
                </>
              )}
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
            {selectedUser && (
              <AddTransaction
                onAddTransaction={handleAddTransaction}
                email={selectedUser.email}
              />
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Withdraw Drawer */}
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
