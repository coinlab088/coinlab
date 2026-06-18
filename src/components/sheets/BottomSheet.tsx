import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { usePrototype } from '../../context/PrototypeContext'

interface BottomSheetProps {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function BottomSheet({ title, open, onClose, children }: BottomSheetProps) {
  const { previewPlatform } = usePrototype()
  const isPc = previewPlatform === 'pc'

  if (!open) return null

  return (
    <div
      className={`absolute inset-0 z-40 flex justify-center ${
        isPc ? 'items-center p-6' : 'items-end'
      }`}
    >
      <button
        type="button"
        aria-label="关闭"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative z-10 w-full border border-border-subtle bg-elevated px-4 pb-8 pt-3 ${
          isPc
            ? 'max-w-md rounded-xl'
            : 'max-w-[390px] rounded-t-xl'
        }`}
      >
        {!isPc && <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-h3 text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="flex h-9 w-9 items-center justify-center text-secondary active:opacity-70"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

interface SheetOptionProps {
  label: string
  hint?: string
  selected?: boolean
  onClick: () => void
}

export function SheetOption({ label, hint, selected, onClick }: SheetOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left active:opacity-80 ${
        selected
          ? 'border-brand bg-brand-muted'
          : 'border-border-subtle bg-sunken'
      }`}
    >
      <div>
        <p className={`text-body-sm ${selected ? 'text-brand' : 'text-primary'}`}>
          {label}
        </p>
        {hint && <p className="mt-0.5 text-caption text-secondary">{hint}</p>}
      </div>
      {selected && (
        <span className="text-caption font-semibold text-brand">当前</span>
      )}
    </button>
  )
}
