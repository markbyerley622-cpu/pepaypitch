/**
 * The closing convergence.
 *
 * The page has by now shown six surfaces — checkout, invoices, subscriptions,
 * streams, agents, commerce — and the risk is that they read as six products
 * that happen to share a logo. This puts them back on one line and funnels them
 * into a single settlement, which is the argument the whole site is making.
 *
 * Pure CSS and SVG, no JavaScript: it is the last thing on the page and does
 * not deserve a runtime.
 */
import { cn } from '@/lib/utils'

const SURFACES = ['Checkout', 'Invoices', 'Subscriptions', 'Streams', 'Agents', 'Commerce'] as const

export function Converge({ className }: { className?: string }) {
  return (
    <div className={cn('w-full', className)} aria-hidden>
      {/* the six surfaces */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {SURFACES.map((s) => (
          <span
            key={s}
            className="rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-[0.78rem] font-medium text-ink-2 shadow-e1"
          >
            {s}
          </span>
        ))}
      </div>

      {/* the funnel */}
      <svg
        viewBox="0 0 600 90"
        className="mx-auto mt-3 h-[90px] w-full max-w-[600px]"
        preserveAspectRatio="none"
      >
        {[60, 156, 252, 348, 444, 540].map((x, i) => (
          <path
            key={x}
            d={`M ${x} 0 C ${x} 45, 300 45, 300 90`}
            fill="none"
            stroke="rgb(var(--pep-accent))"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            style={{ animation: `pep-flow ${2.2 + i * 0.2}s linear infinite` }}
          />
        ))}
      </svg>

      {/* the rail */}
      <div className="flex justify-center">
        <div className="rounded-2xl border border-pep-500/40 bg-surface px-10 py-5 text-center shadow-accent">
          <div className="text-[1.5rem] font-bold tracking-[-0.03em] text-ink">PEPAY</div>
          <div className="mt-1 text-[0.76rem] text-ink-3">one rail · one ledger</div>
        </div>
      </div>
    </div>
  )
}
