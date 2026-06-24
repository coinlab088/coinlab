import { figmaScreens } from '../figma/screens'

export type DesignSystemDocEntry = {
  slug: string
  title: string
  description: string
  file: string
}

export type DesignSystemVisualEntry = {
  path: string
  title: string
  description?: string
}

/** 设计规范 Markdown 文档目录 */
export const designSystemDocs: DesignSystemDocEntry[] = [
  {
    slug: 'master',
    title: 'MASTER.md',
    description: '全局设计规范 · 色彩 / 字体 / 组件 / 验收标准',
    file: 'design-system/MASTER.md',
  },
  {
    slug: 'feedback-overlays',
    title: 'feedback-overlays.md',
    description: 'Toast · Bottom Sheet · Alert Dialog 专题规范',
    file: 'design-system/pages/feedback-overlays.md',
  },
  {
    slug: 'screen-inventory',
    title: 'screen-inventory.md',
    description: 'Figma 导出页清单与 html.to.design 导入说明',
    file: 'design-system/figma/screen-inventory.md',
  },
  {
    slug: 'readme',
    title: 'README.md',
    description: '设计系统目录结构与使用方式',
    file: 'design-system/README.md',
  },
]

const docBySlug = new Map(designSystemDocs.map((d) => [d.slug, d]))

export function getDesignSystemDoc(slug: string): DesignSystemDocEntry | undefined {
  return docBySlug.get(slug)
}

/** 反馈层图示演示（390×812 可导入 Figma） */
export const designSystemVisualDemos: DesignSystemVisualEntry[] = figmaScreens
  .filter((s) => s.group === 'app-overlay')
  .map((s) => ({
    path: s.path,
    title: s.label,
    description: s.description,
  }))
