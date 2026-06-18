import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getAnnotation, type Annotation } from '../data/annotations'

interface InspectContextValue {
  inspectMode: boolean
  toggleInspectMode: () => void
  setInspectMode: (value: boolean) => void
  selectedAnnotationId: string | null
  selectAnnotation: (id: string | null) => void
  selectedAnnotation: Annotation | null
  showSlicePanel: boolean
  toggleSlicePanel: () => void
}

const InspectContext = createContext<InspectContextValue | null>(null)

export function InspectProvider({ children }: { children: ReactNode }) {
  const [inspectMode, setInspectMode] = useState(false)
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(
    null,
  )
  const [showSlicePanel, setShowSlicePanel] = useState(true)

  const toggleInspectMode = useCallback(() => {
    setInspectMode((v) => !v)
  }, [])

  const selectAnnotation = useCallback((id: string | null) => {
    setSelectedAnnotationId(id)
  }, [])

  const toggleSlicePanel = useCallback(() => {
    setShowSlicePanel((v) => !v)
  }, [])

  const selectedAnnotation = selectedAnnotationId
    ? getAnnotation(selectedAnnotationId) ?? null
    : null

  const value = useMemo(
    () => ({
      inspectMode,
      toggleInspectMode,
      setInspectMode,
      selectedAnnotationId,
      selectAnnotation,
      selectedAnnotation,
      showSlicePanel,
      toggleSlicePanel,
    }),
    [
      inspectMode,
      toggleInspectMode,
      selectedAnnotationId,
      selectAnnotation,
      selectedAnnotation,
      showSlicePanel,
      toggleSlicePanel,
    ],
  )

  return (
    <InspectContext.Provider value={value}>{children}</InspectContext.Provider>
  )
}

export function useInspect() {
  const ctx = useContext(InspectContext)
  if (!ctx) throw new Error('useInspect must be used within InspectProvider')
  return ctx
}
