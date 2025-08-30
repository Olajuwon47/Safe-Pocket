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
}


export function NavUser({ user }: NavUserProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <div className="flex items-center gap-3 p-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
