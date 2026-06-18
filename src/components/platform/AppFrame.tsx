import type { ReactNode } from 'react'
import { usePrototype } from '../../context/PrototypeContext'

interface AppFrameProps {
  children: ReactNode
}

/** 固定 390×812 手机视口（iPhone 14 逻辑分辨率） */
export function AppFrame({ children }: AppFrameProps) {
  const { appTheme } = usePrototype()

  return (
    <div
      data-app-theme={appTheme}
      className="relative flex h-[812px] w-[390px] shrink-0 flex-col overflow-hidden rounded-2xl bg-base text-primary shadow-md ring-1 ring-border-subtle"
    >
      {children}
    </div>
  )
}
