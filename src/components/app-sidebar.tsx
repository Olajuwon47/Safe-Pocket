import * as React from "react"
import type { User } from "../types"

interface AppSidebarProps {
  users: User[]
  selectedUser: User | null
  onSelectView: (view: string) => void
  onUserChange: (user: User) => void
}

const data = {
  navMain: [
    { title: "Dashboard", href: "/", view: "dashboard" },
    { title: "Savings", href: "/savings", view: "savings" },
    { title: "Wallet balance", href: "/wallet", view: "wallet" },
    { title: "Transactions", href: "/transactions-view", view: "transactions" },
    { title: "Progress", href: "/Progress", view: "progress" },
  ],
  navSecondary: [
    { title: "Setting", href: "/Setting", view: "setting" },
    { title: "Get Help", href: "/help", view: "help" },
    { title: "Search", href: "/search", view: "search" },
  ],
}

export function AppSidebar({
  users,
  selectedUser,
  onSelectView,
  onUserChange,
}: AppSidebarProps) {
  const handleNavClick = (view: string, event: React.MouseEvent) => {
    event.preventDefault()
    onSelectView(view)
  }

  return (
    <aside className="flex w-full max-w-xs flex-col gap-6 border-r border-black/10 bg-lime-50 p-4 text-slate-900 max-lg:max-w-none max-lg:border-r-0 max-lg:border-b">
      <a
        href="#"
        onClick={(e) => handleNavClick("dashboard", e)}
        className="flex items-center gap-3 rounded-lg px-2 py-1 font-semibold text-slate-900"
      >
        <img src="/image.png" alt="SafePocket logo" className="h-10 w-10 rounded-full object-cover" />
        <span>SafePocket Inc.</span>
      </a>

      <nav className="grid gap-1">
        <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Main
        </p>
        {data.navMain.map((item) => (
          <a
            key={item.title}
            href={item.href}
            onClick={(e) => handleNavClick(item.view ?? "dashboard", e)}
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-lime-100"
          >
            {item.title}
          </a>
        ))}
      </nav>

      <nav className="grid gap-1">
          <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          More
        </p>
        {data.navSecondary.map((item) => (
          <a
            key={item.title}
            href={item.href}
            onClick={(e) => handleNavClick(item.view ?? "dashboard", e)}
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-lime-100"
          >
            {item.title}
          </a>
        ))}
      </nav>

      {selectedUser && (
        <div className="mt-auto rounded-xl bg-white p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={(selectedUser as any).avatar || "/avatars/default-avatar.png"}
              alt={selectedUser.name}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{selectedUser.name}</p>
              <p className="truncate text-xs text-slate-500">{selectedUser.email}</p>
            </div>
          </div>

          {users.length > 1 && (
            <select
              className="mt-3 w-full rounded-md border border-black/10 bg-white p-2 text-sm"
              value={selectedUser.id?.toString() ?? ""}
              onChange={(e) => {
                const user = users.find((u) => u.id.toString() === e.target.value)
                if (user) onUserChange(user)
              }}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </aside>
  )
}

export default AppSidebar
