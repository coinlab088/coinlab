export type AppTheme = 'yellow-black' | 'green-white' | 'green-black'

export const APP_THEME_KEY = 'coinlab-app-theme'
const LEGACY_THEME_KEY = 'coinlab-app-home-theme'

export const appThemes: {
  id: AppTheme
  label: string
}[] = [
  { id: 'yellow-black', label: '黄黑' },
  { id: 'green-white', label: '绿白' },
  { id: 'green-black', label: '绿黑' },
]

export function loadAppTheme(): AppTheme {
  try {
    const stored = localStorage.getItem(APP_THEME_KEY)
    if (
      stored === 'yellow-black' ||
      stored === 'green-white' ||
      stored === 'green-black'
    ) {
      return stored
    }
    const legacy = localStorage.getItem(LEGACY_THEME_KEY)
    if (legacy === 'green-white' || legacy === 'green-black') return legacy
  } catch {
    // ignore
  }
  return 'yellow-black'
}

export function saveAppTheme(theme: AppTheme) {
  try {
    localStorage.setItem(APP_THEME_KEY, theme)
  } catch {
    // ignore
  }
}

export function isGreenAppTheme(theme: AppTheme) {
  return theme === 'green-white' || theme === 'green-black'
}
