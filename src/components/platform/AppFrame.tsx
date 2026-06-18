import type { ReactNode } from 'react'

interface AppFrameProps {
  children: ReactNode
}

/** 固定 390×812 手机视口（iPhone 14 逻辑分辨率） */
export function AppFrame({ children }: AppFrameProps) {
  return (
    <div className="relative h-[812px] w-[390px] shrink-0 overflow-hidden rounded-2xl bg-base shadow-md ring-1 ring-border-subtle">
      {children}
    </div>
  )
}
