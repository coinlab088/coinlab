import type { ReactNode } from 'react'
import { Header } from './Header'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-base">
      <Header />
      <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {children}
      </main>
    </div>
  )
}
