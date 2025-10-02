import * as React from "react"
import {
  //IconChartBar,
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

// ✅ Import User type from your types
import type { User } from "../types.ts"

// ✅ Define props interface
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  users: User[]
  selectedUser: User | null
  onSelectView: (view: string) => void
  onUserChange: (user: User) => void
}

const data = {
  navMain: [
    { 
      title: "Dashboard", 
      href: "/", 
      icon: IconDashboard,
      view: "dashboard"
    },
    { 
      title: "Savings", 
      href: "/savings", 
      icon: IconUsers,
      view: "savings"
    },
    { 
      title: "Wallet balance", 
      href: "/wallet", 
      icon: IconListDetails,
      view: "wallet"
    },
    { 
      title: "Transactions", 
      href: "/transactions-view", 
      icon: IconListDetails,
      view: "transactions"
    },
    { 
      title: "Progress", 
      href: "/Progress", 
      icon: IconFolder,
      view: "progress"
    },
  ],
  navSecondary: [
      { 
      title: "Transactions", 
      href: "/transactions-view", 
      icon: IconListDetails,
      view: "transactions"
    },
    { 
      title: "Setting", 
      href: "/Setting", 
      icon: IconSettings,
      view: "setting"
    },
    { 
      title: "Get Help", 
      href: "/help", 
      icon: IconHelp,
      view: "help"
    },
    { 
      title: "Search", 
      href: "/search", 
      icon: IconSearch,
      view: "search"
    },
  ],
}

export function AppSidebar({ 
  users, 
  selectedUser, 
  onSelectView, 
  onUserChange, 
  ...props 
}: AppSidebarProps) {

  const handleSelectView = (view: string) => {
    onSelectView(view)
  }

  // ✅ Handle user change
  const handleUserChange = (userId: string) => {
    const user = users.find(u => u.id.toString() === userId)
    if (user) {
      onUserChange(user)
    }
  }

  // ✅ Handle nav item click
  const handleNavClick = (item: any, event: React.MouseEvent) => {
    event.preventDefault() 
    handleSelectView(item.view || item.title.toLowerCase())
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
              <a href="#" onClick={(e) => {
                e.preventDefault()
                handleSelectView('dashboard')
              }}>
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
        {/* ✅ Updated NavMain with click handlers */}
        <NavMain 
          items={data.navMain} 
          onItemClick={handleNavClick}
        />

        <NavSecondary 
          items={data.navSecondary} 
          //onItemClick={handleNavClick}
          className="mt-auto" 
        />
      </SidebarContent>

      {/* ✅ User Switcher */}
      <SidebarFooter>
        {selectedUser && (
          <div className="flex flex-col gap-2">
            {/* ✅ Provide fallback avatar */}
            <NavUser user={{
              ...selectedUser,
              avatar: (selectedUser as any).avatar || "/avatars/default-avatar.png"
            }} />

            {/* Dropdown to switch users */}
            {users.length > 1 && (
              <select
                className="mt-2 rounded-md border p-1 text-sm"
                value={selectedUser?.id?.toString() ?? ""}
                onChange={(e) => handleUserChange(e.target.value)}
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