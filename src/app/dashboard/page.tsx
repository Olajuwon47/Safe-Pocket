"use client"
import { AppSidebar } from "../../components/app-sidebar"
import { ChartAreaInteractive } from "../../components/chart-area-interactive"
import { GoalsProgress } from "../../components/Progress"
import { SectionCards } from "../../components/section-cards"
import { SiteHeader } from "../../components/site-header"
import { AddTransaction } from "../../components/add-transaction"
import { TransactionsView } from "../../components/transactions-view"
import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar"
import * as React from "react"
import data from "./data.json"

interface User {
  id: number;
  name: string;
  email: string;
  walletBalance: number;
  goals: {
    title: string;
    target: number;
    progress: number;
  }[];
  transactions: {
    id: number;
    date: string;
    type: "deposit" | "withdrawal";
    amount: number;
    description: string;
  }[];
  breakdown: {
    daily: { date: string; amount: number }[];
    weekly: { week: string; amount: number }[];
    monthly: { month: string; amount: number }[];
  };
  savings: number;
}

export default function Page() {
  const [users, setUsers] = React.useState<User[]>([])
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [selectedView, setSelectedView] = React.useState("dashboard")

  React.useEffect(() => {
    setUsers(data as User[])
    if (data.length > 0) {
      setSelectedUser(data[0] as User)
    }
  }, [])

  const handleUserChange = (id: string) => {
    const user = users.find((u) => u.id.toString() === id)
    if (user) {
      setSelectedUser(user)
    }
  }

  const handleSelectView = (view: string) => {
    setSelectedView(view)
  }

  const handleAddGoal = (title: string, target: number) => {
    if (selectedUser) {
      const newGoal = { title, target, progress: 0 }
      const updatedUser = {
        ...selectedUser,
        goals: [...selectedUser.goals, newGoal],
      }
      setSelectedUser(updatedUser)
      setUsers(
        users.map((u) => (u.id === selectedUser.id ? updatedUser : u))
      )
    }
  }

   const handleAddTransaction = (transaction: { type: "deposit" | "withdrawal"; amount: number; description: string }) => {
    if (selectedUser) {
      const newTransaction = {
        id: selectedUser.transactions.length + 1,
        date: new Date().toISOString().split("T")[0],
        ...transaction,
      }
      const updatedUser = {
        ...selectedUser,
        transactions: [...selectedUser.transactions, newTransaction],
        walletBalance:
          transaction.type === "deposit"
            ? selectedUser.walletBalance + transaction.amount
            : selectedUser.walletBalance - transaction.amount,
      }
      setSelectedUser(updatedUser)
      setUsers(
        users.map((u) => (u.id === selectedUser.id ? updatedUser : u))
      )
    }
  }


  if (!selectedUser) {
    return <div>Loading...</div>
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
              {selectedView === "dashboard" && (
                <>
                  <SectionCards walletBalance={selectedUser.walletBalance} savings={selectedUser.savings} />
                  <GoalsProgress goals={selectedUser.goals} onAddGoal={handleAddGoal} />
                  <div className="px-4 lg:px-6">
                    <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                  </div>
                </>
              )}
              {selectedView === "goals" && <GoalsProgress goals={selectedUser.goals} onAddGoal={handleAddGoal} />}
              {selectedView === "progress" && <GoalsProgress goals={selectedUser.goals} onAddGoal={handleAddGoal} />}
              {selectedView === "wallet" && <SectionCards walletBalance={selectedUser.walletBalance} savings={selectedUser.savings} />}
              {selectedView === "breakdown" && (
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                </div>
              )}
              {selectedView === "savings" && <SectionCards walletBalance={selectedUser.walletBalance} savings={selectedUser.savings} />}
               {selectedView === "transactions" && (
                <div className="grid gap-4 px-4 lg:px-6">
                  <AddTransaction onAddTransaction={handleAddTransaction} />
                  <TransactionsView data={selectedUser.transactions} />
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}