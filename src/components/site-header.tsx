export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-white/80 px-4 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">SafePocket Dashboard</p>
          <p className="text-xs text-slate-500">Overview and account controls</p>
        </div>
      </div>
    </header>
  )
}
