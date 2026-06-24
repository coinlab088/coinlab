/** html.to.design 无法稳定抓取 Lucide 图标，用纯 DOM 模拟二维码块 */
export function FigmaQrPlaceholder({ size = 64 }: { size?: number }) {
  const cells = 7
  const pattern = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1],
  ]

  return (
    <div
      className="grid shrink-0 gap-0.5 rounded-md bg-white p-1.5"
      style={{
        width: size,
        height: size,
        gridTemplateColumns: `repeat(${cells}, minmax(0, 1fr))`,
      }}
      aria-hidden
    >
      {pattern.flatMap((row, y) =>
        row.map((filled, x) => (
          <div
            key={`${x}-${y}`}
            className={filled ? 'bg-black' : 'bg-white'}
            style={{ aspectRatio: '1' }}
          />
        )),
      )}
    </div>
  )
}
