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
  const [user] = React.useState(data[0])
  const [selectedView, setSelectedView] = React.useState("dashboard")

  const handleSelectView = (view: string) => {
    setSelectedView(view)
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
      <AppSidebar variant="inset" onSelectView={handleSelectView} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {selectedView === "dashboard" && (
                <>
                  <SectionCards walletBalance={user.walletBalance} savings={user.savings} />
                  <GoalsProgress goals={user.goals} />
                  <div className="px-4 lg:px-6">
                    <ChartAreaInteractive breakdown={user.breakdown} />
                  </div>
                </>
              )}
              {selectedView === "goals" && <GoalsProgress goals={user.goals} />}
              {selectedView === "progress" && <GoalsProgress goals={user.goals} />}
              {selectedView === "wallet" && <SectionCards walletBalance={user.walletBalance} savings={user.savings} />}
              {selectedView === "breakdown" && (
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive breakdown={user.breakdown} />
                </div>
              )}
              {selectedView === "savings" && <SectionCards walletBalance={user.walletBalance} savings={user.savings} />}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
