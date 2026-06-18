import { annotations } from '../../data/annotations'
import { useInspect } from '../../context/InspectContext'

export function AnnotationListPanel() {
  const { inspectMode, selectedAnnotationId, selectAnnotation } = useInspect()

  if (!inspectMode) return null

  return (
    <aside className="fixed left-4 top-24 z-[60] w-64 max-h-[calc(100vh-120px)] overflow-y-auto rounded-lg border border-border-subtle bg-elevated p-3 shadow-lg">
      <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-brand">
        需求批注
      </p>
      <ul className="space-y-1">
        {annotations.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => selectAnnotation(item.id)}
              className={`w-full rounded-md px-2 py-2 text-left ${
                selectedAnnotationId === item.id
                  ? 'bg-brand-muted'
                  : 'hover:bg-sunken'
              }`}
            >
              <span className="mr-1.5 text-caption font-bold text-brand">
                {item.index}
              </span>
              <span className="text-caption font-medium text-primary">
                {item.label}
              </span>
              <p className="mt-0.5 pl-5 text-[10px] text-secondary">
                {item.page}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
