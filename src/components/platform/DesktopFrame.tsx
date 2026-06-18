import type { ReactNode } from 'react'

interface DesktopFrameProps {
  children: ReactNode
}

/** 桌面端 1280×900 预览视口 */
export function DesktopFrame({ children }: DesktopFrameProps) {
  return (
    <div className="relative flex h-[min(900px,90vh)] w-[min(1280px,95vw)] shrink-0 flex-col overflow-hidden rounded-xl bg-base shadow-lg ring-1 ring-border-subtle">
      {children}
    </div>
  )
}
