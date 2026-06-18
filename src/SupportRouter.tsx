import { usePrototype } from './context/PrototypeContext'
import { HelpArticlePage } from './pages/support/HelpArticlePage'
import { HelpCenterPage } from './pages/support/HelpCenterPage'
import { SupportCenterPage } from './pages/support/SupportCenterPage'
import { SupportChatPage } from './pages/support/SupportChatPage'

export function SupportRouter() {
  const { supportScreen } = usePrototype()

  if (!supportScreen) return null

  switch (supportScreen.screen) {
    case 'help':
      return <HelpCenterPage />
    case 'help-article':
      return <HelpArticlePage />
    case 'support':
      return <SupportCenterPage />
    case 'support-chat':
      return <SupportChatPage />
    default:
      return null
  }
}
