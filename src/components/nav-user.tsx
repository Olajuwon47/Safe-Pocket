import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "../components/ui/sidebar"

type NavUserProps = {
  user: {
    name: string
    email: string
    avatar: string
  }
  onSelectView: (view: string) => void
}

export function NavUser({ user, onSelectView }: NavUserProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 p-3 cursor-pointer">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => onSelectView("goals")}>
                Goals
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onSelectView("progress")}>
                Progress
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onSelectView("wallet")}>
                Wallet Balance
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onSelectView("breakdown")}>
                Breakdown
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onSelectView("savings")}>
                Savings
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
