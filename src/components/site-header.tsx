//import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { SidebarTrigger } from "../components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="bg-lime-200 flex h-[--header-height] shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height] max-sm:px-2 md:px-6">
      <div className="flex w-full items-center gap-1 max-sm:gap-0.5 md:gap-2">
        <SidebarTrigger className="-ml-1 max-sm:-ml-0.5" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4  max-sm:mx-1"
        />
        <h1 className="text-base font-medium max-sm:text-sm">Savings</h1>
        {/*<div className="ml-auto flex items-center gap-2">
         <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>*/}
      </div>
    </header>
  )
}
