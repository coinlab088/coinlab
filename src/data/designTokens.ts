/** 与 design-system/figma/tokens.json 同步，供演示页引用 */
export const designTokens = {
  version: '1.0.0',
  typography: {
    fontFamily: { sans: 'IBM Plex Sans', mono: 'IBM Plex Mono' },
  },
  layout: {
    phoneWidth: 390,
    phoneHeight: 812,
    headerHeight: 48,
    tabBarHeight: 56,
    minTouchTarget: 44,
    screenPaddingX: 16,
    contentPaddingTop: 16,
    sectionPaddingY: 16,
    sectionPaddingYSm: 12,
    stackGap: 12,
    stackGapSm: 8,
    sectionGapLg: 20,
  },
  radius: { sm: 6, md: 10, lg: 12, xl: 16, phone: 16 },
  overlay: {
    bottomSheet: { radiusTop: 16 },
  },
  themes: {
    'yellow-black': {
      base: '#000000',
      elevated: '#121212',
      brand: '#FFCC00',
      primary: '#FFFFFF',
      secondary: '#A3A3A3',
      success: '#22C55E',
      danger: '#EF4444',
    },
    'green-white': {
      base: '#FFFFFF',
      elevated: '#F4F4F5',
      brand: '#7BEA0C',
      primary: '#0A0A0A',
      secondary: '#52525B',
      success: '#16A34A',
      danger: '#DC2626',
    },
    'green-black': {
      base: '#000000',
      elevated: '#141414',
      brand: '#7BEA0C',
      primary: '#FFFFFF',
      secondary: '#A3A3A3',
      success: '#7BEA0C',
      danger: '#EF4444',
    },
  },
} as const

export type DesignThemeId = keyof typeof designTokens.themes
