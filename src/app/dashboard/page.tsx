"use client"
import { AppSidebar } from "../../components/app-sidebar"
import { ChartAreaInteractive } from "../../components/chart-area-interactive"
import { GoalsProgress } from "../../components/Progress"
import { SectionCards } from "../../components/section-cards"
import { SiteHeader } from "../../components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar"
import * as React from "react"
import data from "./data.json"

export default function Page() {
  const [users, setUsers] = React.useState<any[]>([])
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null)
  const [selectedView, setSelectedView] = React.useState("dashboard")

  React.useEffect(() => {
    setUsers(data)
    if (data.length > 0) {
      setSelectedUser(data[0])
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
                  <GoalsProgress goals={selectedUser.goals} />
                  <div className="px-4 lg:px-6">
                    <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                  </div>
                </>
              )}
              {selectedView === "goals" && <GoalsProgress goals={selectedUser.goals} />}
              {selectedView === "progress" && <GoalsProgress goals={selectedUser.goals} />}
              {selectedView === "wallet" && <SectionCards walletBalance={selectedUser.walletBalance} savings={selectedUser.savings} />}
              {selectedView === "breakdown" && (
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive breakdown={selectedUser.breakdown} />
                </div>
              )}
              {selectedView === "savings" && <SectionCards walletBalance={selectedUser.walletBalance} savings={selectedUser.savings} />}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
