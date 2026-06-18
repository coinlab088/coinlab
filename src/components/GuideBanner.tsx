import { Fragment } from 'react'
import { buyCryptoGuide } from '../data/guide'

export function GuideBanner() {
  const { steps } = buyCryptoGuide

  return (
    <section
      aria-label={buyCryptoGuide.title}
      className="mx-4 rounded-lg border border-border-subtle bg-elevated px-4 py-3"
    >
      <p className="text-body-sm font-medium text-primary">{buyCryptoGuide.title}</p>

      <div className="mt-3 grid grid-cols-[1fr_14px_1fr_14px_1fr_14px_1fr] items-start">
        {steps.map((item, index) => (
          <Fragment key={item.step}>
            <div className="flex flex-col items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-semibold leading-none text-brand-dark">
                {item.step}
              </span>
              <span className="text-center text-[10px] leading-tight text-secondary">
                {item.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span
                className="flex h-5 items-center justify-center text-[11px] text-secondary/50"
                aria-hidden
              >
                ›
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
