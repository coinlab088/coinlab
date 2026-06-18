import { useEffect, useState } from 'react'
import type { BannerSlide } from '../data/mock'

interface BannerCarouselProps {
  slides: BannerSlide[]
}

export function BannerCarousel({ slides }: BannerCarouselProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  const slide = slides[active]

  return (
    <section aria-label="公告轮播" className="relative overflow-hidden rounded-lg border border-border-brand bg-elevated">
      <div className="relative px-4 py-4">
        <div className="absolute left-0 top-0 h-full w-1 bg-brand" aria-hidden />

        {slide.tag && (
          <span className="mb-2 inline-block rounded-sm bg-brand px-1.5 py-0.5 text-caption font-semibold text-brand-dark">
            {slide.tag}
          </span>
        )}
        <h2 className="text-h3 text-primary">{slide.title}</h2>
        <p className="mt-1 text-body-sm text-secondary">{slide.subtitle}</p>
      </div>

      {slides.length > 1 && (
        <div className="flex justify-center gap-1.5 pb-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`第 ${i + 1} 条公告`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === active ? 'w-4 bg-brand' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
