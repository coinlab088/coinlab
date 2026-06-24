import type { ReactNode } from 'react'
import { useFigmaPcDocument } from '../../hooks/useFigmaPcDocument'
import { PcTopBar } from './PcTopBar'

interface PcAppLayoutProps {
  children: ReactNode
  /** 交易页等全屏分栏布局使用 hidden，内容页使用 auto */
  scroll?: 'hidden' | 'auto'
}

export function PcAppLayout({ children, scroll = 'auto' }: PcAppLayoutProps) {
  const pcDocument = useFigmaPcDocument()

  if (pcDocument) {
    return (
      <div className="flex min-h-[900px] flex-col bg-base">
        <PcTopBar />
        <main>{children}</main>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-base">
      <PcTopBar />
      <main
        className={`min-h-0 flex-1 ${
          scroll === 'hidden' ? 'overflow-hidden' : 'overflow-y-auto overscroll-contain'
        }`}
      >
        {children}
      </main>
    </div>
  )
}
