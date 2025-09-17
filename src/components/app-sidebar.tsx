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
    { title: "Dashboard", url: "#", icon: IconDashboard },
    { title: "Lifecycle", url: "#", icon: IconListDetails },
    { title: "Analytics", url: "#", icon: IconChartBar },
    { title: "Projects", url: "#", icon: IconFolder },
    { title: "Team", url: "#", icon: IconUsers },
  ],
  navSecondary: [
    { title: "Settings", url: "/Setting", icon: IconSettings },
    { title: "Get Help", url: "#", icon: IconHelp },
    { title: "Search", url: "#", icon: IconSearch },
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
