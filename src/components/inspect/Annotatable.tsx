import type { ReactNode } from 'react'
import { getAnnotation } from '../../data/annotations'
import { useInspect } from '../../context/InspectContext'

interface AnnotatableProps {
  id: string
  children: ReactNode
  className?: string
}

export function Annotatable({ id, children, className = '' }: AnnotatableProps) {
  const { inspectMode, selectedAnnotationId, selectAnnotation } = useInspect()
  const annotation = getAnnotation(id)
  const selected = selectedAnnotationId === id

  return (
    <div
      data-annotate-id={id}
      data-slice-id={id}
      className={`relative ${className} ${
        inspectMode
          ? `cursor-pointer rounded-sm outline outline-1 outline-dashed outline-brand/40 ${
              selected ? 'outline-2 outline-brand' : ''
            }`
          : ''
      }`}
      onClick={
        inspectMode
          ? (e) => {
              e.stopPropagation()
              selectAnnotation(id)
            }
          : undefined
      }
      onKeyDown={undefined}
    >
      {inspectMode && annotation && (
        <span className="absolute -left-1 -top-1 z-30 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-dark shadow-sm">
          {annotation.index}
        </span>
      )}
      {children}
    </div>
  )
}
