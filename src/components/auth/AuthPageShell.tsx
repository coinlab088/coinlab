import type { ReactNode } from 'react'
import { PcAuthAside } from '../pc/PcAuthAside'
import { PcTopBar } from '../pc/PcTopBar'
import { usePrototype } from '../../context/PrototypeContext'
import { useFigmaPcDocument } from '../../hooks/useFigmaPcDocument'
import { AuthLayout } from './AuthLayout'

interface AuthPageShellProps {
  title: string
  onBack: () => void
  children: ReactNode
  footer?: ReactNode
}

function PcAuthTitle({ title }: { title: string }) {
  if (title === '注册' || title === '登录') {
    return (
      <h1 className="mb-8 text-[32px] font-semibold leading-tight text-primary">
        {title}{' '}
        <span className="text-brand">
          Coin<span className="text-primary">Nova</span>
        </span>
      </h1>
    )
  }

  return (
    <h1 className="mb-8 text-[32px] font-semibold leading-tight text-primary">
      {title}
    </h1>
  )
}

export function AuthPageShell({
  title,
  onBack,
  children,
  footer,
}: AuthPageShellProps) {
  const { previewPlatform } = usePrototype()
  const pcDocument = useFigmaPcDocument()

  if (previewPlatform === 'pc') {
    if (pcDocument) {
      return (
        <div className="flex min-h-[900px] flex-col bg-base">
          <PcTopBar />
          <div className="flex flex-1">
            <PcAuthAside />
            <div className="flex min-w-0 flex-1 flex-col bg-elevated">
              <div className="flex flex-col items-center px-12 py-10">
                <div className="w-full max-w-md">
                  <PcAuthTitle title={title} />
                  {children}
                </div>
              </div>
              {footer && <div className="shrink-0 px-12 pb-8">{footer}</div>}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex h-full min-h-0 flex-col bg-base">
        <PcTopBar />
        <div className="flex min-h-0 flex-1">
          <PcAuthAside />
          <div className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-elevated">
            <div className="flex flex-1 flex-col items-center justify-center px-12 py-10">
              <div className="w-full max-w-md">
                <PcAuthTitle title={title} />
                {children}
              </div>
            </div>
            {footer && <div className="shrink-0 px-12 pb-8">{footer}</div>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <AuthLayout title={title} onBack={onBack} footer={footer}>
      {children}
    </AuthLayout>
  )
}
