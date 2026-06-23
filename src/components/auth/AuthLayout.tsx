import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  title: string
  onBack: () => void
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, onBack, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-base">
      <header className="flex h-12 shrink-0 items-center px-2">
        <button
          type="button"
          aria-label="返回"
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center text-primary active:opacity-70"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 pr-11 text-center text-h3 text-primary">{title}</h1>
      </header>

      <main className="layout-screen-x layout-content-top min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {children}
      </main>

      {footer && (
        <div className="shrink-0 px-4 pb-6 pt-4">{footer}</div>
      )}
    </div>
  )
}
