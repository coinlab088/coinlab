export type AppTheme = 'yellow-black' | 'green-white' | 'green-black'

export const APP_THEME_KEY = 'coinlab-app-theme'

export const appThemes: {
  id: AppTheme
  label: string
}[] = [{ id: 'yellow-black', label: '黄黑' }]

export function loadAppTheme(): AppTheme {
  return 'yellow-black'
}

export function saveAppTheme(_theme: AppTheme) {
  try {
    localStorage.setItem(APP_THEME_KEY, 'yellow-black')
  } catch {
    // ignore
  }
}

export function isGreenAppTheme(_theme: AppTheme) {
  return false
}
