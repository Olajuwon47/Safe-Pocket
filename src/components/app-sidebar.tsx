/*import * as React from "react"
import {
  IconDashboard,
  IconChartBar,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"


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
import type { User } from "../types"

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

  

  const navUser = {
    name: selectedUser.name,
    email: selectedUser.email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}`,
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
     //className="w-[--sidebar-width] max-sm:w-[--sidebar-width-sm] md:w-[--sidebar-width-md]"
     className="w-[--sidebar-width] max-sm:w-[--sidebar-width-sm] md:w-[--sidebar-width-md]"
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
}*/

import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

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

// ✅ define User type
type User = {
  id: number | string
  name: string
  email: string
  avatar: string
}

const data = {
  navMain: [
    { title: "Dashboard", url: "/", icon: IconDashboard },
    { title: "Savings", url: "/savings", icon: IconUsers },
    { title: "Wallet balance", url: "/wallet", icon: IconListDetails },
    { title: "Transactions", url: "/transactions", icon: IconListDetails },
    { title: "Progress tracker", url: "/progress", icon: IconFolder },
    { title: "Analytics", url: "/analytics", icon: IconChartBar },
    { title: "Team", url: "/team", icon: IconUsers },
  ],
  navSecondary: [
    { title: "Settings", url: "/settings", icon: IconSettings },
    { title: "Get Help", url: "/help", icon: IconHelp },
    { title: "Search", url: "/search", icon: IconSearch },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [users, setUsers] = React.useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)

  // ✅ Fetch users
  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/data.json")
        const data = await res.json()
        const cleaned: User[] = Array.isArray(data) ? data : data.articles || []
        setUsers(cleaned)

        // ✅ check if user already stored in localStorage
        const storedId = localStorage.getItem("selectedUserId")

        if (storedId && cleaned.find((u) => u.id.toString() === storedId)) {
          setSelectedUserId(storedId)
        } else if (cleaned.length > 0) {
          setSelectedUserId(cleaned[0].id.toString())
        }
      } catch (err) {
        console.error("Failed to fetch users:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // ✅ Persist selected user
  React.useEffect(() => {
    if (selectedUserId) {
      localStorage.setItem("selectedUserId", selectedUserId)
    }
  }, [selectedUserId])

  // ✅ Find currently selected user or fallback
  const selectedUser =
    users.find((u) => u.id.toString() === selectedUserId) || {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  SafePocket Inc.
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* ✅ User Switcher */}
      <SidebarFooter>
        {!loading && (
          <div className="flex flex-col gap-2">
            <NavUser user={selectedUser} />

            {/* Dropdown to switch users */}
            {users.length > 1 && (
              <select
                className="mt-2 rounded-md border p-1 text-sm"
                value={selectedUserId ?? ""}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
