"use client"
/*import { SiteHeader } from "../../components/site-header"
import { AppSidebar } from "../../components/app-sidebar"
import { GoalsProgress } from "../../components/Progress"
import { SectionCards } from "../../components/section-cards"
import { AddTransaction } from "../../components/add-transaction"
import { TransactionsView } from "../../components/transactions-view"
import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar"
import * as React from "react"
const ChartAreaInteractive = React.lazy(() => import("../../components/chart-area-interactive").then(module => ({ default: module.ChartAreaInteractive })))
const SpendingBreakdownChart = React.lazy(() => import("../../components/spending-breakdown-chart").then(module => ({ default: module.SpendingBreakdownChart })))
import { isSupabaseClient, supabase } from "../../lib/Supabase"
import type { User } from "../../types"
import { WithdrawModal } from "../../components/withdraw-modal"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../components/ui/drawer"
import { Button } from "../../components/ui/button"
import { toast } from "sonner"

export default function Page() {
  const [users, setUsers] = React.useState<User[]>([])
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [selectedView, setSelectedView] = React.useState("dashboard")
  const [isDepositOpen, setIsDepositOpen] = React.useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = React.useState(false)

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (isSupabaseClient(supabase)) {
        const { data: usersData, error } = await supabase.from('profiles').select('*')
        if (error) {
          console.error("Error fetching profiles:", error)
        } else {
          setUsers(usersData as User[])
          if (usersData && usersData.length > 0) {
            setSelectedUser(usersData[0])
          }
        }
      } else {
        console.warn("Supabase not configured, cannot fetch profiles.")
      }
    }
    fetchUsers()
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

  const handleAddTransaction = async (transaction: { type: "deposit" | "withdrawal"; amount: number; description: string }) => {
    if (selectedUser) {
      const newTransaction = {
        id: selectedUser.transactions.length + 1,
        date: new Date().toISOString().split("T")[0],
        ...transaction,
      };
      const updatedUser = {
        ...selectedUser,
        transactions: [...selectedUser.transactions, newTransaction],
        walletBalance:
          transaction.type === "deposit"
            ? selectedUser.walletBalance + transaction.amount
            : selectedUser.walletBalance - transaction.amount,
      };

      let error;
      if (isSupabaseClient(supabase)) {
        const result = await supabase
          .from('profiles')
          .update({
            walletBalance: updatedUser.walletBalance,
            transactions: updatedUser.transactions,
          })
          .eq('id', selectedUser.id);
        error = result.error;
      } else {
        console.warn("Supabase not configured, cannot update profile.");
        error = { message: "Supabase not configured" };
      }

      if (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to add transaction.");
      } else {
        setSelectedUser(updatedUser);
        setUsers(
          users.map((u) => (u.id === selectedUser.id ? updatedUser : u))
        );
        toast.success("Transaction added successfully");
      }
      // Close the modal after transaction
      if (transaction.type === 'deposit') setIsDepositOpen(false);
    }
  };

  if (!selectedUser) {
    return <div>Loading...</div>
  }

  return (
    <SidebarProvider
      className="flex h-dvh w-full overflow-hidden group/sidebar-provider"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--sidebar-width-sm": "calc(var(--spacing) * 56)",
          "--sidebar-width-md": "calc(var(--spacing) * 60)",
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
        <div className="max-h-[calc(h-dvh-var(--header-height))] flex flex-1 flex-col overflow-y-auto max-sm:px-2 md:px-4">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 max-sm:gap-3 max-sm:py-3 md:gap-6 md:py-6">
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
                    <React.Suspense fallback={<div>Loading chart...</div>}>
                      <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                    </React.Suspense>
                  </div>
                </>
              )}
              {selectedView === "analytics" && (
                <div className="grid gap-4 px-4 lg:px-6">
                  <React.Suspense fallback={<div>Loading chart...</div>}>
                    <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                    <SpendingBreakdownChart
                      transactions={selectedUser.transactions}
                      savings={selectedUser.savings}
                    />
                  </React.Suspense>
                  <GoalsProgress
                    goals={selectedUser.goals}
                    onAddGoal={handleAddGoal}
                  />
                </div>
              )}
              {selectedView === "goals" && (
                <GoalsProgress
                  goals={selectedUser.goals}
                  onAddGoal={handleAddGoal}
                />
              )}
              {selectedView === "progress" && (
                <GoalsProgress
                  goals={selectedUser.goals}
                  onAddGoal={handleAddGoal}
                />
              )}
              {selectedView === "wallet" && (
                <SectionCards
                  walletBalance={selectedUser.walletBalance}
                  savings={selectedUser.savings}
                  onDeposit={() => setIsDepositOpen(true)}
                  onWithdraw={() => setIsWithdrawOpen(true)}
                />
              )}
              {selectedView === "breakdown" && (
                <div className="px-2 max-sm:px-1 md:px-6">
                  <React.Suspense fallback={<div>Loading chart...</div>}>
                    <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                  </React.Suspense>
                </div>
              )}
              {selectedView === "savings" && (
                <SectionCards
                  walletBalance={selectedUser.walletBalance}
                  savings={selectedUser.savings}
                  onDeposit={() => setIsDepositOpen(true)}
                  onWithdraw={() => setIsWithdrawOpen(true)}
                />
              )}
              {selectedView === "transactions" && (
                <div className="grid gap-4 px-2 max-sm:gap-2 max-sm:px-1 md:px-6">
                  <AddTransaction onAddTransaction={handleAddTransaction} email={selectedUser.email} />
                  <TransactionsView data={selectedUser.transactions} />
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
      
     
      <Drawer open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Make a Deposit</DrawerTitle>
            <DrawerDescription>Enter the details for your deposit.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <AddTransaction onAddTransaction={handleAddTransaction} email={selectedUser.email} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

     
      <Drawer open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <WithdrawModal />
      </Drawer>

    </SidebarProvider>
  )
}*/


"use client"
import { SiteHeader } from "../../components/site-header"
import { AppSidebar } from "../../components/app-sidebar"
import { GoalsProgress } from "../../components/Progress"
import { SectionCards } from "../../components/section-cards"
import { AddTransaction } from "../../components/add-transaction"
import { TransactionsView } from "../../components/transactions-view"
import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar"
import * as React from "react"
const ChartAreaInteractive = React.lazy(() => import("../../components/chart-area-interactive").then(module => ({ default: module.ChartAreaInteractive })))
const SpendingBreakdownChart = React.lazy(() => import("../../components/spending-breakdown-chart").then(module => ({ default: module.SpendingBreakdownChart })))
import { isSupabaseClient, supabase } from "../../lib/Supabase"
import type { User } from "../../types"
import { WithdrawModal } from "../../components/withdraw-modal"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../components/ui/drawer"
import { Button } from "../../components/ui/button"
import { toast } from "sonner"

export default function Page() {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [selectedView, setSelectedView] = React.useState("dashboard")
  const [isDepositOpen, setIsDepositOpen] = React.useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = async () => {
      if (isSupabaseClient(supabase)) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
          } else {
            setSelectedUser(profile);
          }
        }
      } else {
        console.warn("Supabase not configured, cannot fetch profiles.")
      }
    };
    fetchUser();
  }, []);

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
    }
  }

  const handleAddTransaction = async (transaction: { type: "deposit" | "withdrawal"; amount: number; description: string }) => {
    if (selectedUser) {
      const newTransaction = {
        id: selectedUser.transactions.length + 1,
        date: new Date().toISOString().split("T")[0],
        ...transaction,
      };
      const updatedUser = {
        ...selectedUser,
        transactions: [...selectedUser.transactions, newTransaction],
        walletBalance:
          transaction.type === "deposit"
            ? selectedUser.walletBalance + transaction.amount
            : selectedUser.walletBalance - transaction.amount,
      };

      let error;
      if (isSupabaseClient(supabase)) {
        const result = await supabase
          .from('profiles')
          .update({
            walletBalance: updatedUser.walletBalance,
            transactions: updatedUser.transactions,
          })
          .eq('id', selectedUser.id);
        error = result.error;
      } else {
        console.warn("Supabase not configured, cannot update profile.");
        error = { message: "Supabase not configured" };
      }

      if (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to add transaction.");
      } else {
        setSelectedUser(updatedUser);
        toast.success("Transaction added successfully");
      }
      // Close the modal after transaction
      if (transaction.type === 'deposit') setIsDepositOpen(false);
    }
  };

  if (!selectedUser) {
    return <div>Loading...</div>
  }

  return (
    <SidebarProvider
      className="flex h-dvh w-full overflow-hidden group/sidebar-provider"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--sidebar-width-sm": "calc(var(--spacing) * 56)",
          "--sidebar-width-md": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        selectedUser={selectedUser}
        onSelectView={handleSelectView}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="max-h-[calc(h-dvh-var(--header-height))] flex flex-1 flex-col overflow-y-auto max-sm:px-2 md:px-4">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 max-sm:gap-3 max-sm:py-3 md:gap-6 md:py-6">
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
                    <React.Suspense fallback={<div>Loading chart...</div>}>
                      <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                    </React.Suspense>
                  </div>
                </>
              )}
              {selectedView === "analytics" && (
                <div className="grid gap-4 px-4 lg:px-6">
                  <React.Suspense fallback={<div>Loading chart...</div>}>
                    <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                    <SpendingBreakdownChart
                      transactions={selectedUser.transactions}
                      savings={selectedUser.savings}
                    />
                  </React.Suspense>
                  <GoalsProgress
                    goals={selectedUser.goals}
                    onAddGoal={handleAddGoal}
                  />
                </div>
              )}
              {selectedView === "goals" && (
                <GoalsProgress
                  goals={selectedUser.goals}
                  onAddGoal={handleAddGoal}
                />
              )}
              {selectedView === "progress" && (
                <GoalsProgress
                  goals={selectedUser.goals}
                  onAddGoal={handleAddGoal}
                />
              )}
              {selectedView === "wallet" && (
                <SectionCards
                  walletBalance={selectedUser.walletBalance}
                  savings={selectedUser.savings}
                  onDeposit={() => setIsDepositOpen(true)}
                  onWithdraw={() => setIsWithdrawOpen(true)}
                />
              )}
              {selectedView === "breakdown" && (
                <div className="px-2 max-sm:px-1 md:px-6">
                  <React.Suspense fallback={<div>Loading chart...</div>}>
                    <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                  </React.Suspense>
                </div>
              )}
              {selectedView === "savings" && (
                <SectionCards
                  walletBalance={selectedUser.walletBalance}
                  savings={selectedUser.savings}
                  onDeposit={() => setIsDepositOpen(true)}
                  onWithdraw={() => setIsWithdrawOpen(true)}
                />
              )}
              {selectedView === "transactions" && (
                <div className="grid gap-4 px-2 max-sm:gap-2 max-sm:px-1 md:px-6">
                  <AddTransaction onAddTransaction={handleAddTransaction} email={selectedUser.email} />
                  <TransactionsView data={selectedUser.transactions} />
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
      
      {/* Deposit Modal */}
      <Drawer open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Make a Deposit</DrawerTitle>
            <DrawerDescription>Enter the details for your deposit.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <AddTransaction onAddTransaction={handleAddTransaction} email={selectedUser.email} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Withdraw Modal */}
      <Drawer open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <WithdrawModal />
      </Drawer>

    </SidebarProvider>
  )
}

