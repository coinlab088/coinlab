export function PcAuthAside() {
  return (
    <aside className="relative flex w-[38%] shrink-0 items-center justify-center overflow-hidden bg-sunken">
      <div className="relative" aria-hidden>
        <div className="h-48 w-56 rounded-2xl bg-elevated shadow-lg ring-1 ring-border-subtle">
          <div className="absolute -top-3 left-1/2 h-8 w-20 -translate-x-1/2 rounded-t-lg bg-elevated ring-1 ring-border-subtle" />
          <div className="flex h-full flex-col items-center justify-center gap-3 pt-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-[32px] font-bold text-brand-dark shadow-md">
              $
            </div>
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-secondary/40" />
              <span className="h-3 w-3 rounded-full bg-brand/60" />
              <span className="h-3 w-3 rounded-full bg-secondary/40" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 left-1/2 h-16 w-24 -translate-x-1/2 rounded-full bg-brand/10 blur-xl" />
      </div>
    </aside>
  )
}
