import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"
import { SidebarInset, SidebarProvider } from "./ui/sidebar"
import * as React from "react"
import type { User } from "../types.ts"


interface DashboardLayoutProps {
  children: React.ReactNode
  users: User[]
  selectedUser: User
  onSelectView: (view: string) => void
  onUserChange: (id: string) => void
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
      className="mt-10"
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
        <div className="flex flex-1 flex-col max-sm:px-2 md:px-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
