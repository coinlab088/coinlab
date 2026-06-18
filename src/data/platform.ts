export type PreviewPlatform = 'app' | 'h5' | 'pc'

export const previewPlatforms: {
  id: PreviewPlatform
  label: string
  hint: string
}[] = [
  { id: 'app', label: 'APP', hint: '原生 App 390×812' },
  { id: 'h5', label: 'H5', hint: '移动网页 / TG 小程序' },
  { id: 'pc', label: 'PC', hint: '桌面端 1280+' },
]
