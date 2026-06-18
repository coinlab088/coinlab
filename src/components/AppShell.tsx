import type { ReactNode } from 'react'
import { usePrototype } from '../context/PrototypeContext'
import { BottomTabBar } from './BottomTabBar'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const {
    authScreen,
    accountScreen,
    walletScreen,
    supportScreen,
    recordsScreen,
    chartScreen,
    previewPlatform,
  } = usePrototype()

  const isMobileShell = previewPlatform === 'app' || previewPlatform === 'h5'

  const showTabBar =
    isMobileShell &&
    !authScreen &&
    !chartScreen &&
    !accountScreen &&
    !walletScreen &&
    !supportScreen &&
    !recordsScreen

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      {showTabBar && <BottomTabBar />}
    </div>
  )
}
