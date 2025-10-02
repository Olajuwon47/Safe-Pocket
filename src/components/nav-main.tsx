import { type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"

interface NavItem {
  title: string
  href: string
  icon: Icon
  view?: string
}

export function NavMain({
  items,
  onItemClick,
  ...props
}: {
  items: NavItem[]
  onItemClick?: (item: NavItem, event: React.MouseEvent) => void
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  
  const handleClick = (item: NavItem, event: React.MouseEvent) => {
    if (onItemClick) {
      onItemClick(item, event)
    }
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a 
                  href={item.href} 
                  onClick={(e) => handleClick(item, e)}
                  className="cursor-pointer"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}