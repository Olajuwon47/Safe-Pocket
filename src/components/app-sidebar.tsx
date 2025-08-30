import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onSelectView: (view: string) => void
}

export function AppSidebar({ onSelectView, ...props }: AppSidebarProps) {
  const [users, setUsers] = React.useState<any[]>([])
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null)

  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/data.json")
        const data = await res.json()
        const cleaned = Array.isArray(data) ? data : []

        setUsers(cleaned)

        // default to first user
        if (cleaned.length > 0) {
          setSelectedUser({
            name: cleaned[0].name,
            email: cleaned[0].email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              cleaned[0].name
            )}`,
          })
        }
      } catch (err) {
        console.error("Failed to fetch users:", err)
      }
    }
    fetchUsers()
  }, [])

  const handleUserChange = (id: string) => {
    const user = users.find((u) => u.id.toString() === id)
    if (user) {
      setSelectedUser({
        name: user.name,
        email: user.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}`,
      })
    }
  }

  // Sidebar navigation data
  const navMain = [
    { title: "Dashboard", url: "#", icon: IconDashboard, action: () => onSelectView("dashboard") },
    { title: "Savings", url: "#", icon: IconUsers, action: () => onSelectView("savings") },
    { title: "Wallet balance", url: "#", icon: IconListDetails, action: () => onSelectView("wallet") },
    { title: "Goals", url: "#", icon: IconChartBar, action: () => onSelectView("progress") },
    { title: "Progress tracker", url: "#", icon: IconFolder, action: () => onSelectView("breakdown") },
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
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
        <NavDocuments items={documents} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-3">
        {/* Dropdown to switch users */}
        {users.length > 0 && (
          <select
            onChange={(e) => handleUserChange(e.target.value)}
            className="w-full rounded-md border p-2 text-sm"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        )}

        {/* Display selected user */}
        {selectedUser && <NavUser user={selectedUser} onSelectView={onSelectView} />}
      </SidebarFooter>
    </Sidebar>
  )
}
