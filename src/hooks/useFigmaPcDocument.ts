import { usePrototype } from '../context/PrototypeContext'

/** Figma 导出：PC 长页面使用文档流高度，避免 html.to.design 只能抓到首屏 */
export function useFigmaPcDocument(): boolean {
  const { figmaExport, previewPlatform, figmaPcViewport } = usePrototype()
  return figmaExport && previewPlatform === 'pc' && figmaPcViewport !== 'fixed'
}
