import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'

interface SubPageLayoutProps {
  title: string
  onBack?: () => void
  hideBack?: boolean
  headerRight?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

export function SubPageLayout({
  title,
  onBack,
  hideBack = false,
  headerRight,
  children,
  footer,
}: SubPageLayoutProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-base">
      <header className="z-20 flex h-12 shrink-0 items-center bg-base/95 px-2 backdrop-blur-sm">
        {!hideBack ? (
          <button
            type="button"
            aria-label="返回"
            onClick={onBack}
            className="flex h-11 w-11 items-center justify-center text-primary active:opacity-70"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
        ) : (
          <span className="h-11 w-11" />
        )}
        <h1 className="flex-1 truncate text-center text-h3 text-primary">
          {title}
        </h1>
        {headerRight ? (
          <div className="flex h-11 shrink-0 items-center justify-end">{headerRight}</div>
        ) : (
          <span className="h-11 w-11" />
        )}
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
