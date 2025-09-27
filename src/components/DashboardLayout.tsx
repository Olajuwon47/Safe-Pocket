import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"
import { SidebarInset, SidebarProvider } from "./ui/sidebar"
import * as React from "react"
import type { User } from "../types"

interface DashboardLayoutProps {
  children: React.ReactNode
  users: User[]
  selectedUser: User | null
  onSelectView: (view: string) => void
  onUserChange: (user: User) => void
}

export function DashboardLayout({
  children,
  users,
  selectedUser,
  onSelectView,
  onUserChange,
}: DashboardLayoutProps) {
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
        onSelectView={onSelectView}
        onUserChange={onUserChange}
      />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col bg-lime-400 p-4 max-sm:p-2">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}