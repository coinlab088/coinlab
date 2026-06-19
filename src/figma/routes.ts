import { getFigmaScreen } from './screens'
import type { FigmaScreenEntry } from './types'

export type FigmaRoute =
  | { type: 'index' }
  | { type: 'screen'; screen: FigmaScreenEntry }

/** 去掉 Vite base（dev `/`，Pages `/coinlab/`） */
export function stripBasePath(pathname: string): string {
  const base = import.meta.env.BASE_URL
  if (base === '/') return pathname
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  if (pathname === prefix || pathname === `${prefix}/`) return '/'
  if (pathname.startsWith(`${prefix}/`)) {
    return pathname.slice(prefix.length)
  }
  return pathname
}

export function resolveFigmaRoute(appPath: string): FigmaRoute | null {
  const normalized = appPath.replace(/\/+$/, '') || '/'

  if (normalized === '/figma') {
    return { type: 'index' }
  }

  if (!normalized.startsWith('/figma/')) {
    return null
  }

  const screenPath = normalized.slice('/figma/'.length)
  const screen = getFigmaScreen(screenPath)
  if (!screen) return null

  return { type: 'screen', screen }
}

export function figmaPageUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  const slug = path.replace(/^\/+/, '')
  const joined = `${base}figma/${slug}`.replace(/\/{2,}/g, '/')
  return `${window.location.origin}${joined.startsWith('/') ? joined : `/${joined}`}`
}
