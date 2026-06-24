import type { ReactNode } from 'react'
import { usePrototype } from '../../context/PrototypeContext'

interface H5ExportFrameProps {
  children: ReactNode
}

/** 固定 390×856 视口（812 内容区 + Telegram 顶栏，Figma 导出用） */
export function H5ExportFrame({ children }: H5ExportFrameProps) {
  const { appTheme } = usePrototype()

  return (
    <div
      data-app-theme={appTheme}
      className="relative flex h-[856px] w-[390px] shrink-0 flex-col overflow-hidden bg-base text-primary"
    >
      <div className="shrink-0 border-b border-white/10 bg-[#17212b] px-3 pb-2 pt-3">
        <div className="flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2aabee]" aria-hidden />
          <span className="text-[10px] font-medium tracking-wide text-white/70">
            Telegram Mini App
          </span>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  )
}
