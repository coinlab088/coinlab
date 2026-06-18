import type { ReactNode } from 'react'
import { Copy } from 'lucide-react'
import { useInspect } from '../../context/InspectContext'

export function SliceDetailPanel() {
  const { inspectMode, showSlicePanel, selectedAnnotation, selectAnnotation } =
    useInspect()

  if (!inspectMode || !showSlicePanel || !selectedAnnotation) return null

  const { slice, requirement, logic, label } = selectedAnnotation

  function copyText(text: string) {
    void navigator.clipboard.writeText(text)
  }

  return (
    <aside className="fixed right-4 top-24 z-[60] w-72 max-h-[calc(100vh-120px)] overflow-y-auto rounded-lg border border-border-subtle bg-elevated p-4 shadow-lg">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-caption text-brand">切图规格 #{selectedAnnotation.index}</p>
          <h3 className="text-body-sm font-semibold text-primary">{label}</h3>
        </div>
        <button
          type="button"
          onClick={() => selectAnnotation(null)}
          className="text-caption text-secondary hover:text-primary"
        >
          关闭
        </button>
      </div>

      <Section title="产品需求">
        <p>{requirement}</p>
      </Section>

      <Section title="交互逻辑">
        <p>{logic}</p>
      </Section>

      <Section title="尺寸">
        <SpecRow label="宽" value={slice.width} />
        {slice.height && <SpecRow label="高" value={slice.height} />}
        {slice.minHeight && <SpecRow label="最小高" value={slice.minHeight} />}
        {slice.padding && <SpecRow label="内边距" value={slice.padding} />}
        {slice.gap && <SpecRow label="间距" value={slice.gap} />}
        {slice.radius && <SpecRow label="圆角" value={slice.radius} />}
      </Section>

      <Section title="色值">
        <div className="flex flex-wrap gap-1.5">
          {slice.colors.map((color) => (
            <span
              key={color}
              className="inline-flex items-center gap-1 rounded border border-border-subtle px-1.5 py-0.5 text-[10px] text-secondary"
            >
              <span
                className="h-3 w-3 rounded-sm border border-border"
                style={{ backgroundColor: color }}
              />
              {color}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Tailwind">
        <CopyBlock text={slice.tailwind} onCopy={() => copyText(slice.tailwind)} />
      </Section>

      <Section title="CSS">
        <CopyBlock text={slice.css} onCopy={() => copyText(slice.css)} />
      </Section>
    </aside>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="mb-3 border-b border-border-subtle pb-3 last:border-0">
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
        {title}
      </p>
      <div className="text-caption leading-relaxed text-primary">{children}</div>
    </div>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 py-0.5">
      <span className="text-secondary">{label}</span>
      <span className="font-mono text-primary">{value}</span>
    </div>
  )
}

function CopyBlock({ text, onCopy }: { text: string; onCopy: () => void }) {
  return (
    <div className="relative rounded-md bg-sunken p-2 pr-8">
      <code className="block break-all font-mono text-[10px] text-primary">{text}</code>
      <button
        type="button"
        aria-label="复制"
        onClick={onCopy}
        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center text-secondary hover:text-brand"
      >
        <Copy className="h-3 w-3" />
      </button>
    </div>
  )
}
