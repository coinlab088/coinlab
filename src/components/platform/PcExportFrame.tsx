import type { ReactNode } from 'react'
import { usePrototype } from '../../context/PrototypeContext'
import { useFigmaPcDocument } from '../../hooks/useFigmaPcDocument'

interface PcExportFrameProps {
  children: ReactNode
}

/** 桌面端 Figma 导出视口：长页文档高度，交易台固定 1440×900 */
export function PcExportFrame({ children }: PcExportFrameProps) {
  const { appTheme } = usePrototype()
  const pcDocument = useFigmaPcDocument()

  return (
    <div
      data-app-theme={appTheme}
      className={
        pcDocument
          ? 'relative flex min-h-[900px] w-[1440px] shrink-0 flex-col overflow-visible bg-base text-primary'
          : 'relative flex h-[900px] w-[1440px] shrink-0 flex-col overflow-hidden bg-base text-primary'
      }
    >
      {children}
    </div>
  )
}
