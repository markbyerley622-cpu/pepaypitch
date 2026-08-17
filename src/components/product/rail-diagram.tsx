import { TPV, tokenIcon } from '@/content/metrics'
import { cn } from '@/lib/utils'
import { pct } from '@/lib/format'

/**
 * The routing diagram.
 *
 * Drawn as one SVG with a fixed viewBox rather than as positioned DOM with an
 * overlaid connector layer. A three-column grid with absolutely-placed lines
 * has to be re-measured at every breakpoint and drifts the moment a label
 * wraps; a viewBox scales exactly and is correct at any width by construction.
 *
 * Motion is CSS only — `pep-flow` animates stroke-dashoffset on the connectors.
 * That keeps this a server component with no JavaScript cost, and it stops
 * automatically under `prefers-reduced-motion` via the global rule.
 */

const W = 1000
const H = 430
const ROUTER_X = 500
const ROUTER_Y = H / 2

/** Top accepted tokens that ship a mark, plus a count for the rest. */
const LEFT = TPV.accepted.filter((a) => tokenIcon(a.name)).slice(0, 5)
const REMAINDER = TPV.accepted.length - LEFT.length

function curve(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
}

export function RailDiagram({ className }: { className?: string }) {
  const leftX = 132
  const rightX = 868
  const leftGap = 74
  const leftTop = ROUTER_Y - ((LEFT.length - 1) * leftGap) / 2

  const settle = TPV.settlement
  const rightGap = 108
  const rightTop = ROUTER_Y - ((settle.length - 1) * rightGap) / 2

  return (
    <div className={cn('w-full', className)}>
      {/* Below `md` the wide diagram is replaced rather than scaled. A
          1000-unit viewBox squeezed into a phone renders its labels at about
          five pixels, which is not a smaller version of the diagram — it is an
          unreadable one. The stacked variant carries the same three stages. */}
      <RailStacked className="md:hidden" />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="hidden w-full md:block"
        role="img"
        aria-label={`Payments in ${TPV.accepted.length} tokens across ${TPV.chains
          .map((c) => c.name)
          .join(', ')} route through Pepay and settle into ${settle
          .map((s) => s.name)
          .join(' or ')}.`}
      >
        <defs>
          <linearGradient id="rail-in" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--pep-accent))" stopOpacity="0.12" />
            <stop offset="100%" stopColor="rgb(var(--pep-accent))" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="rail-out" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--pep-accent))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="rail-halo">
            <stop offset="0%" stopColor="rgb(var(--pep-accent))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(var(--pep-accent))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* inbound connectors */}
        {LEFT.map((t, i) => {
          const y = leftTop + i * leftGap
          return (
            <path
              key={`in-${t.name}`}
              d={curve(leftX + 30, y, ROUTER_X - 78, ROUTER_Y)}
              fill="none"
              stroke="url(#rail-in)"
              strokeWidth="1.5"
              strokeDasharray="5 7"
              style={{ animation: `pep-flow ${2.4 + i * 0.25}s linear infinite` }}
            />
          )
        })}

        {/* outbound connectors */}
        {settle.map((s, i) => {
          const y = rightTop + i * rightGap
          return (
            <path
              key={`out-${s.name}`}
              d={curve(ROUTER_X + 78, ROUTER_Y, rightX - 42, y)}
              fill="none"
              stroke="url(#rail-out)"
              strokeWidth="2"
              strokeDasharray="5 7"
              style={{ animation: `pep-flow ${2.1 + i * 0.3}s linear infinite` }}
            />
          )
        })}

        {/* inbound token nodes */}
        {LEFT.map((t, i) => {
          const y = leftTop + i * leftGap
          const icon = tokenIcon(t.name)
          return (
            <g key={t.name}>
              <circle cx={leftX} cy={y} r="25" className="fill-surface" stroke="var(--pep-line)" />
              {icon ? <image href={icon} x={leftX - 15} y={y - 15} width="30" height="30" /> : null}
              <text
                x={leftX - 40}
                y={y + 5}
                textAnchor="end"
                className="fill-ink-2 text-[15px] font-medium"
              >
                {t.name}
              </text>
            </g>
          )
        })}

        {REMAINDER > 0 ? (
          <text
            x={leftX}
            y={leftTop + LEFT.length * leftGap - 6}
            textAnchor="middle"
            className="fill-ink-4 text-[13px]"
          >
            +{REMAINDER} more
          </text>
        ) : null}

        {/* the router */}
        <circle cx={ROUTER_X} cy={ROUTER_Y} r="130" fill="url(#rail-halo)" />
        <rect
          x={ROUTER_X - 78}
          y={ROUTER_Y - 40}
          width="156"
          height="80"
          rx="20"
          className="fill-surface"
          stroke="rgb(var(--pep-accent))"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <text
          x={ROUTER_X}
          y={ROUTER_Y - 6}
          textAnchor="middle"
          className="fill-ink text-[20px] font-bold tracking-[-0.02em]"
        >
          PEPAY
        </text>
        <text x={ROUTER_X} y={ROUTER_Y + 16} textAnchor="middle" className="fill-ink-3 text-[12px]">
          route · settle · record
        </text>

        {/* settlement nodes */}
        {settle.map((s, i) => {
          const y = rightTop + i * rightGap
          const icon = tokenIcon(s.name)
          return (
            <g key={s.name}>
              <rect
                x={rightX - 42}
                y={y - 33}
                width="128"
                height="66"
                rx="16"
                className="fill-surface"
                stroke="var(--pep-line)"
              />
              {icon ? <image href={icon} x={rightX - 26} y={y - 14} width="28" height="28" /> : null}
              <text x={rightX + 12} y={y - 1} className="fill-ink text-[16px] font-semibold">
                {s.name}
              </text>
              <text x={rightX + 12} y={y + 17} className="fill-ink-4 text-[12px]">
                {pct(s.share)} of volume
              </text>
            </g>
          )
        })}

        {/* labels */}
        <text
          x={leftX}
          y="34"
          textAnchor="middle"
          className="fill-ink-4 text-[11px] font-bold tracking-[0.16em]"
        >
          ACCEPTED
        </text>
        <text
          x={ROUTER_X}
          y="34"
          textAnchor="middle"
          className="fill-ink-4 text-[11px] font-bold tracking-[0.16em]"
        >
          NON-CUSTODIAL
        </text>
        <text
          x={rightX + 22}
          y="34"
          textAnchor="middle"
          className="fill-ink-4 text-[11px] font-bold tracking-[0.16em]"
        >
          SETTLED
        </text>
      </svg>

      {/* Origin chains, as a caption rather than a fourth column in the
          diagram — three more nodes would crowd the router without adding
          anything the reader cannot be told in one line. */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.82rem]">
        <span className="text-ink-4">Origin chains</span>
        {TPV.chains.map((c) => (
          <span key={c.name} className="inline-flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent2/60" />
            <span className="font-medium text-ink-2">{c.name}</span>
            <span className="pep-num text-ink-4">{pct(c.share)}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * The phone layout: the same three stages, read top to bottom.
 *
 * Accepted tokens collapse into a wrapped row of pills rather than five
 * labelled nodes — at this width the individual marks are the information, and
 * their vertical arrangement was only ever there to fan the connectors out.
 */
function RailStacked({ className }: { className?: string }) {
  const settle = TPV.settlement

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <span className="pep-eyebrow text-ink-4">Accepted</span>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {LEFT.map((t) => {
          const icon = tokenIcon(t.name)
          return (
            <span
              key={t.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface py-1 pl-1 pr-3 text-[0.78rem] font-medium text-ink-2 shadow-e1"
            >
              {icon ? <img src={icon} alt="" aria-hidden className="h-5 w-5 rounded-full" /> : null}
              {t.name}
            </span>
          )
        })}
        {REMAINDER > 0 ? (
          <span className="inline-flex items-center rounded-full border border-hairline bg-surface-2 px-3 py-1 text-[0.78rem] font-medium text-ink-4">
            +{REMAINDER} more
          </span>
        ) : null}
      </div>

      <Connector />

      <div className="rounded-2xl border border-pep-500/40 bg-surface px-8 py-4 text-center shadow-accent">
        <div className="text-[1.15rem] font-bold tracking-[-0.02em] text-ink">PEPAY</div>
        <div className="mt-0.5 text-[0.75rem] text-ink-3">route · settle · record</div>
      </div>

      <Connector />

      <span className="pep-eyebrow text-ink-4">Settled</span>
      <div className="mt-4 flex w-full flex-col gap-2.5">
        {settle.map((s) => {
          const icon = tokenIcon(s.name)
          return (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3 shadow-e1"
            >
              {icon ? <img src={icon} alt="" aria-hidden className="h-7 w-7 rounded-full" /> : null}
              <span className="text-[0.95rem] font-semibold text-ink">{s.name}</span>
              <span className="pep-num ml-auto text-[0.8rem] text-ink-4">
                {pct(s.share)} of volume
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * A short dashed run between stages, flowing in the same direction as the wide
 * diagram's connectors so both variants read as one idea.
 */
function Connector() {
  return (
    <svg width="2" height="44" viewBox="0 0 2 44" className="my-4" aria-hidden>
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="44"
        stroke="rgb(var(--pep-accent))"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="5 7"
        style={{ animation: 'pep-flow 2.4s linear infinite' }}
      />
    </svg>
  )
}
