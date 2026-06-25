import { usePrototype } from './context/PrototypeContext'
import { AuthEntryPage } from './pages/auth/AuthEntryPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { SecurityVerifyPage } from './pages/auth/SecurityVerifyPage'
import { SetPasswordPage } from './pages/auth/SetPasswordPage'
import { TgConnectPage, TgLinkPage } from './pages/auth/TgAuthPages'
import { VerifyCodePage } from './pages/auth/VerifyCodePage'

export function AuthRouter() {
  const { authScreen } = usePrototype()

  if (!authScreen) return null

  switch (authScreen.screen) {
    case 'entry':
      return <AuthEntryPage />
    case 'tg-connect':
      return <TgConnectPage />
    case 'tg-link':
      return <TgLinkPage />
    case 'login':
      return <LoginPage />
    case 'login-verify':
      return (
        <VerifyCodePage
          email={authScreen.email ?? ''}
          purpose="login"
          loginMethod={authScreen.loginMethod}
        />
      )
    case 'register':
      return <RegisterPage />
    case 'register-verify':
      return (
        <VerifyCodePage
          email={authScreen.email ?? ''}
          purpose="register"
          inviteCode={authScreen.inviteCode}
        />
      )
    case 'register-password':
      return (
        <SetPasswordPage
          email={authScreen.email ?? ''}
          inviteCode={authScreen.inviteCode}
        />
      )
    case 'security-verify':
      return (
        <SecurityVerifyPage
          email={authScreen.email ?? ''}
          flow={authScreen.flow ?? 'login'}
        />
      )
    default:
      return null
  }
}
