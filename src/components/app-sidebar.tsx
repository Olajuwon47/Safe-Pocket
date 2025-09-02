import * as React from "react"
import {
  IconDashboard,
  IconChartBar,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "../components/nav-documents"
import { NavMain } from "../components/nav-main"
import { NavSecondary } from "../components/nav-secondary"
import { NavUser } from "../components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"

interface User {
  id: number
  name: string
  email: string
  walletBalance: number
  goals: {
    title: string
    target: number
    progress: number
  }[]
  transactions: {
    id: number
    date: string
    type: "deposit" | "withdrawal"
    amount: number
    description: string
  }[]
  breakdown: {
    daily: { date: string; amount: number }[]
    weekly: { week: string; amount: number }[]
    monthly: { month: string; amount: number }[]
  }
  savings: number
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  users: User[]
  selectedUser: User
  onSelectView: (view: string) => void
  onUserChange: (id: string) => void
}

export function AppSidebar({
  users,
  selectedUser,
  onSelectView,
  onUserChange,
  ...props
}: AppSidebarProps) {
  const navMain = [
    { title: "Dashboard", url: "#", icon: IconDashboard, action: () => onSelectView("dashboard") },
    { title: "Savings", url: "#", icon: IconUsers, action: () => onSelectView("savings") },
    { title: "Wallet balance", url: "#", icon: IconListDetails, action: () => onSelectView("wallet") },
    { title: "Transactions", url: "#", icon: IconListDetails, action: () => onSelectView("transactions") },
    { title: "Progress tracker", url: "#", icon: IconFolder, action: () => onSelectView("breakdown") },
     { title: "Analytics", url: "#", icon: IconChartBar, action: () => onSelectView("analytics") },
    { title: "Team", url: "#", icon: IconUsers },
  ]

  const navSecondary = [
    { title: "Settings", url: "#", icon: IconSettings },
    { title: "Get Help", url: "#", icon: IconHelp },
    { title: "Search", url: "#", icon: IconSearch },
  ]

  const documents = [
    { name: "Data Library", url: "#", icon: IconDatabase },
    { name: "Reports", url: "#", icon: IconReport },
    { name: "Word Assistant", url: "#", icon: IconFileWord },
  ]

  const navUser = {
    name: selectedUser.name,
    email: selectedUser.email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}`,
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
     // className="w-[--sidebar-width] max-sm:w-[--sidebar-width-sm] md:w-[--sidebar-width-md]"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="p-2 data-[slot=sidebar-menu-button]:!p-1.5 max-sm:p-1 max-sm:data-[slot=sidebar-menu-button]:!p-1"
            >
              <a>
                <IconInnerShadowTop className="!size-5 max-sm:!size-4" />
                <span className="text-base font-semibold max-sm:text-sm">
                  SafePocket Inc.
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-lime-200">
        <NavMain items={navMain} />
        <NavDocuments items={documents} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-3 max-sm:gap-2">
        {users.length > 0 && (
          <select
            value={selectedUser.id}
            onChange={(e) => onUserChange(e.target.value)}
            className="w-full rounded-md border p-2 text-sm max-sm:p-1.5 max-sm:text-xs"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        )}

        {selectedUser && (
          <NavUser
            user={navUser}
            onSelectView={onSelectView}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
