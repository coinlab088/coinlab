import type { AccountScreenState } from '../../data/account'

export type PcGoogleAuthScreen =
  | 'security-google'
  | 'security-google-setup'
  | 'security-google-verify'

export type PcSecuritySettingsScreen =
  | 'security-email'
  | 'security-login-password'
  | 'security-payment-password'

export type PcAccountModalScreen = PcGoogleAuthScreen | PcSecuritySettingsScreen

const pcAccountModalScreens = new Set<AccountScreenState['screen']>([
  'security-google',
  'security-google-setup',
  'security-google-verify',
  'security-email',
  'security-login-password',
  'security-payment-password',
])

export function isPcAccountModalScreen(
  previewPlatform: string,
  accountScreen: AccountScreenState | null,
): accountScreen is AccountScreenState & { screen: PcAccountModalScreen } {
  return (
    previewPlatform === 'pc' &&
    !!accountScreen &&
    pcAccountModalScreens.has(accountScreen.screen)
  )
}

export function isPcGoogleAuthScreen(
  previewPlatform: string,
  accountScreen: AccountScreenState | null,
): accountScreen is AccountScreenState & { screen: PcGoogleAuthScreen } {
  return (
    previewPlatform === 'pc' &&
    !!accountScreen &&
    (accountScreen.screen === 'security-google' ||
      accountScreen.screen === 'security-google-setup' ||
      accountScreen.screen === 'security-google-verify')
  )
}

export function isPcSecuritySettingsScreen(
  previewPlatform: string,
  accountScreen: AccountScreenState | null,
): accountScreen is AccountScreenState & { screen: PcSecuritySettingsScreen } {
  return (
    previewPlatform === 'pc' &&
    !!accountScreen &&
    (accountScreen.screen === 'security-email' ||
      accountScreen.screen === 'security-login-password' ||
      accountScreen.screen === 'security-payment-password')
  )
}
