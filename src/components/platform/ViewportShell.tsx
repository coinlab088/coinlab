import type { ReactNode } from 'react'
import { usePrototype } from '../../context/PrototypeContext'
import { AppFrame } from './AppFrame'
import { DesktopFrame } from './DesktopFrame'
import { H5Frame } from './H5Frame'

interface ViewportShellProps {
  children: ReactNode
}

export function ViewportShell({ children }: ViewportShellProps) {
  const { previewPlatform } = usePrototype()

  switch (previewPlatform) {
    case 'h5':
      return <H5Frame>{children}</H5Frame>
    case 'pc':
      return <DesktopFrame>{children}</DesktopFrame>
    case 'app':
    default:
      return <AppFrame>{children}</AppFrame>
  }
}
