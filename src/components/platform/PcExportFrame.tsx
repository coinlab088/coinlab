import type { ReactNode } from 'react'
import { usePrototype } from '../../context/PrototypeContext'

interface PcExportFrameProps {
  children: ReactNode
}

/** 固定 1440×900 桌面视口（Figma 导出用） */
export function PcExportFrame({ children }: PcExportFrameProps) {
  const { appTheme } = usePrototype()

  return (
    <div
      data-app-theme={appTheme}
      className="relative flex h-[900px] w-[1440px] shrink-0 flex-col overflow-hidden bg-base text-primary"
    >
      {children}
    </div>
  )
}
