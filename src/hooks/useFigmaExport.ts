import { usePrototype } from '../context/PrototypeContext'

export function useFigmaExport(): boolean {
  const { figmaExport } = usePrototype()
  return figmaExport
}
