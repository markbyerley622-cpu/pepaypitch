'use client'

/**
 * Data display.
 *
 * The proof section argues that the numbers are real, so these components show
 * composition rather than four round headline stats. Charts are hand-rolled
 * SVG rather than a charting library: the site draws exactly three shapes, and
 * none of them justifies shipping a runtime for it.
 */
import type { ReactNode } from 'react'
import { useId } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from './primitives'

/* ──────────────────────────────────────────────────────────── sparkline ─── */

/**
 * Builds a smoothed path through a series normalised to the viewbox.
 *
 * Uses a monotone-ish cubic (control points held on the horizontal) rather than
 * a Catmull-Rom spline. A general spline overshoots on spiky series, which on a
 * volume chart draws a peak that never happened.
 */
function buildPath(data: number[], w: number, h: number, pad: number) {
  if (data.length === 0) return { line: '', area: '' }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const innerH = h - pad * 2

  const pts = data.map((v, i) => ({
    x: data.length === 1 ? w / 2 : (i / (data.length - 1)) * w,
    y: pad + innerH - ((v - min) / span) * innerH,
  }))

  let line = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1]
    const c = pts[i]
    const mx = (p.x + c.x) / 2
    line += ` C ${mx.toFixed(2)} ${p.y.toFixed(2)}, ${mx.toFixed(2)} ${c.y.toFixed(2)}, ${c.x.toFixed(2)} ${c.y.toFixed(2)}`
  }

  const area = `${line} L ${pts[pts.length - 1].x.toFixed(2)} ${h} L ${pts[0].x.toFixed(2)} ${h} Z`
  return { line, area }
}

/** Filled area chart. Decorative-but-truthful: real series, no axis. */
export function AreaChart({
  data,
  height = 160,
  strokeWidth = 2,
  fill = false,
  className,
}: {
  data: number[]
  height?: number
  strokeWidth?: number
  /**
   * Stretch to the height of the parent instead of `height`.
   *
   * `height` still drives the path maths — it is the viewBox's coordinate
   * space — but `preserveAspectRatio="none"` means the drawn result scales to
   * whatever CSS height it ends up with. Used where the card is stretched by a
   * taller neighbour in the same grid row, so the chart takes up the slack
   * rather than leaving a block of dead space under it.
   */
  fill?: boolean
  className?: string
}) {
  const id = useId()
  const W = 600
  const { line, area } = buildPath(data, W, height, strokeWidth + 2)

  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      preserveAspectRatio="none"
      className={cn('w-full', fill && 'h-full', className)}
      style={fill ? undefined : { height }}
      role="img"
      aria-label={`${data.length} data points, trending from ${Math.round(data[0] ?? 0)} to ${Math.round(data[data.length - 1] ?? 0)}`}
    >
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--pep-accent))" stopOpacity="0.26" />
          <stop offset="100%" stopColor="rgb(var(--pep-accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#fill-${id})`} />
      <path
        d={line}
        fill="none"
        stroke="rgb(var(--pep-accent))"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** Line-only variant for the small chart inside a metric tile. */
export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const W = 200
  const H = 44
  const { line } = buildPath(data, W, H, 3)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={cn('w-full', className)}
      style={{ height: H }}
      aria-hidden
    >
      <path
        d={line}
        fill="none"
        stroke="rgb(var(--pep-accent))"
        strokeOpacity="0.55"
        strokeWidth={1.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────── metric ─── */

export function Metric({
  label,
  value,
  sub,
  icon,
  chart,
  className,
}: {
  label: string
  value: ReactNode
  sub?: ReactNode
  icon?: ReactNode
  chart?: number[]
  className?: string
}) {
  return (
    <Card elevation={2} className={cn('flex flex-col overflow-hidden', className)}>
      <div className="flex flex-1 flex-col p-6 pb-4">
        <div className="flex items-center gap-2 text-ink-3">
          {icon}
          <span className="pep-eyebrow">{label}</span>
        </div>

        <div className="pep-num pep-text-fade mt-4 text-[clamp(1.75rem,3vw,2.3rem)] font-bold leading-none">
          {value}
        </div>

        {sub ? <div className="mt-auto pt-3 text-[0.78rem] text-ink-4">{sub}</div> : null}
      </div>

      {chart && chart.length > 1 ? (
        <div className="pep-mask-x -mt-1 px-1 pb-1">
          <Sparkline data={chart} />
        </div>
      ) : null}
    </Card>
  )
}

/** Period-over-period change. Flat is its own state, not a rounded zero. */
export function Delta({
  value,
  direction,
  className,
}: {
  value: string
  direction: 'up' | 'down' | 'flat'
  className?: string
}) {
  const Icon = direction === 'up' ? ArrowUpRight : direction === 'down' ? ArrowDownRight : ArrowRight

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5',
        'pep-num text-[0.72rem] font-semibold leading-none',
        direction === 'up' && 'border-live/30 bg-live/10 text-live',
        direction === 'down' && 'border-hairline-2 bg-surface-2 text-ink-3',
        direction === 'flat' && 'border-hairline-2 bg-surface-2 text-ink-3',
        className
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {value}
    </span>
  )
}

/* ──────────────────────────────────────────────────────────── share bar ─── */

/**
 * Composition as stacked proportion bars.
 *
 * Bars rather than a pie: the reader is comparing two or three shares against
 * each other, and length is far easier to compare than angle.
 */
export function ShareBar({
  rows,
  className,
}: {
  rows: { name: string; share: number; detail?: string }[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {rows.map((r) => (
        <div key={r.name}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[0.85rem] font-medium text-ink-2">{r.name}</span>
            <span className="pep-num text-[0.8rem] font-semibold text-ink">
              {(r.share * 100).toFixed(1)}%
            </span>
          </div>

          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-accent2/70 transition-[width] duration-1000 ease-pep"
              style={{ width: `${Math.max(2, r.share * 100)}%` }}
            />
          </div>

          {r.detail ? <div className="mt-1.5 text-[0.72rem] text-ink-4">{r.detail}</div> : null}
        </div>
      ))}
    </div>
  )
}
