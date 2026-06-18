import type { ReactNode } from 'react'

interface H5FrameProps {
  children: ReactNode
}

/** 移动端 H5 / Telegram Mini App 全屏视口 */
export function H5Frame({ children }: H5FrameProps) {
  return (
    <div className="relative flex h-[min(812px,90dvh)] w-[390px] shrink-0 flex-col overflow-hidden bg-base shadow-md ring-1 ring-border-subtle">
      <div className="shrink-0 border-b border-white/10 bg-[#17212b] px-3 pb-2 pt-[max(10px,env(safe-area-inset-top,0px))]">
        <div className="flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2aabee]" aria-hidden />
          <span className="text-[10px] font-medium tracking-wide text-white/70">
            Telegram Mini App
          </span>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-[env(safe-area-inset-bottom,0px)]">
        {children}
      </div>
    </div>
  )
}
