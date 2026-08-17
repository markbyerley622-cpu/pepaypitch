'use client'

/**
 * The hero's live payment.
 *
 * The brief this site is built against asks the page to demonstrate the product
 * rather than describe it, so the hero carries a working checkout rather than a
 * screenshot of one. It runs the same stages the real lifecycle does — request,
 * detect, route, settle — against the tokens and chains that actually carry
 * volume in the ledger.
 *
 * It is a simulation and it says so, once, in the caption. Presenting an
 * animation as a live feed would be the exact kind of fake dashboard the brief
 * rules out.
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { EASE } from '@/components/ui/motion'
import { cn } from '@/lib/utils'

type Stage = 'awaiting' | 'detected' | 'routing' | 'settled'

const STAGES: { key: Stage; label: string; hold: number }[] = [
  { key: 'awaiting', label: 'Awaiting payment', hold: 2200 },
  { key: 'detected', label: 'Payment detected', hold: 1500 },
  { key: 'routing', label: 'Routing', hold: 1700 },
  { key: 'settled', label: 'Settled', hold: 3400 },
]

/** The token the payer happens to hold, rotated per cycle. */
const PAYERS = [
  { symbol: 'BNB', icon: '/brand/token/bnblogo.png', chain: 'BNB Chain', amount: '0.0731' },
  { symbol: 'USDT', icon: '/brand/token/usdt.png', chain: 'BNB Chain', amount: '49.00' },
  { symbol: 'USDC', icon: '/brand/token/usdc.png', chain: 'Base', amount: '49.00' },
  { symbol: 'USD1', icon: '/brand/token/USD1.png', chain: 'BNB Chain', amount: '49.00' },
] as const

const STEP_INDEX: Record<Stage, number> = {
  awaiting: 0,
  detected: 1,
  routing: 2,
  settled: 3,
}

export function PaymentDemo({ className }: { className?: string }) {
  const [stage, setStage] = useState<Stage>('awaiting')
  const [cycle, setCycle] = useState(0)
  const still = useReducedMotion()
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const payer = PAYERS[cycle % PAYERS.length]
  const idx = STEP_INDEX[stage]

  useEffect(() => {
    // Reduced motion gets the finished state, not a stuck one — the settled
    // card is the informative frame, so that is the one to hold.
    if (still) {
      setStage('settled')
      return
    }

    const current = STAGES.findIndex((s) => s.key === stage)
    timer.current = setTimeout(() => {
      if (current === STAGES.length - 1) {
        setCycle((c) => c + 1)
        setStage('awaiting')
      } else {
        setStage(STAGES[current + 1].key)
      }
    }, STAGES[current].hold)

    return () => clearTimeout(timer.current)
  }, [stage, still])

  return (
    <div className={cn('relative', className)}>
      <div className="pep-card-3 relative overflow-hidden rounded-2xl">
        {/* header */}
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-3.5">
          <span className="pep-mono text-[0.7rem] text-ink-4">INV-1048</span>
          <StageChip stage={stage} />
        </div>

        {/* amount */}
        <div className="px-5 pb-1 pt-6">
          <span className="pep-eyebrow text-ink-4">Amount due</span>
          <div className="pep-num pep-text-fade mt-2 text-[2.6rem] font-bold leading-none">
            $49.00
          </div>
          <p className="mt-2 text-[0.8rem] text-ink-3">
            Priced in dollars · settles as <span className="font-medium text-ink-2">USDC</span>
          </p>
        </div>

        {/* the payer's token */}
        <div className="px-5 pt-5">
          <span className="pep-eyebrow text-ink-4">Paid with</span>
          <motion.div
            key={payer.symbol}
            initial={still ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-2.5 flex items-center gap-3 rounded-xl border border-hairline bg-surface-2 px-3.5 py-3"
          >
            <img
              src={payer.icon}
              alt=""
              aria-hidden
              className="h-7 w-7 shrink-0 rounded-full object-contain"
            />
            <div className="min-w-0">
              <div className="pep-num text-[0.95rem] font-semibold text-ink">
                {payer.amount} {payer.symbol}
              </div>
              <div className="text-[0.73rem] text-ink-4">{payer.chain}</div>
            </div>
            <span className="pep-mono ml-auto shrink-0 text-[0.7rem] text-ink-4">0x7a3f…4e21</span>
          </motion.div>
        </div>

        {/* the rail */}
        <div className="px-5 pb-5 pt-6">
          <Rail idx={idx} still={!!still} />
        </div>

        {/* settlement */}
        <div className="border-t border-hairline bg-surface-2/60 px-5 py-4">
          <motion.div
            animate={{ opacity: stage === 'settled' ? 1 : 0.35 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  'grid h-6 w-6 place-items-center rounded-full transition-colors duration-500',
                  stage === 'settled' ? 'bg-live text-white' : 'bg-surface text-ink-4'
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="text-[0.82rem] font-medium text-ink-2">Merchant received</span>
            </div>
            <span className="pep-num text-[1.05rem] font-bold text-ink">
              {stage === 'settled' ? '+$49.00 USDC' : '—'}
            </span>
          </motion.div>
        </div>
      </div>

      <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-ink-4">
        An illustration of the payment lifecycle, not a live feed.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ pieces */

function StageChip({ stage }: { stage: Stage }) {
  const live = stage === 'settled'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'text-[10px] font-semibold uppercase leading-none tracking-[0.13em] transition-colors duration-500',
        live
          ? 'border-live/35 bg-live/10 text-live'
          : 'border-pep-500/30 bg-pep-500/10 text-pep-600 dark:text-pep-300'
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          aria-hidden
          className={cn('absolute inset-0 rounded-full', live ? 'bg-live' : 'bg-pep-500')}
          style={{ animation: 'pep-pulse-ring 2.2s ease-out infinite' }}
        />
        <span className={cn('relative h-1.5 w-1.5 rounded-full', live ? 'bg-live' : 'bg-pep-500')} />
      </span>
      {STAGES.find((s) => s.key === stage)?.label}
    </span>
  )
}

/**
 * Four nodes with a filling connector between them.
 *
 * The progress bar is one scaleX transform rather than a width animation, so
 * the whole rail stays on the compositor while it fills.
 */
function Rail({ idx, still }: { idx: number; still: boolean }) {
  const nodes = ['Request', 'Detect', 'Route', 'Settle']

  return (
    <div>
      <div className="relative flex items-center justify-between">
        <div aria-hidden className="absolute inset-x-2 top-[7px] h-px bg-hairline-2" />
        <motion.div
          aria-hidden
          className="absolute left-2 right-2 top-[7px] h-px origin-left bg-accent2"
          animate={{ scaleX: idx / (nodes.length - 1) }}
          transition={{ duration: still ? 0 : 0.7, ease: EASE }}
        />

        {nodes.map((n, i) => (
          <span
            key={n}
            className={cn(
              'relative z-10 h-[15px] w-[15px] rounded-full border-2 bg-canvas transition-colors duration-500',
              i <= idx ? 'border-accent2' : 'border-hairline-2'
            )}
          >
            {i <= idx ? (
              <span className="block h-full w-full scale-[0.45] rounded-full bg-accent2" />
            ) : null}
          </span>
        ))}
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        {nodes.map((n, i) => (
          <span
            key={n}
            className={cn(
              'text-[0.68rem] font-medium transition-colors duration-500',
              i <= idx ? 'text-ink-2' : 'text-ink-4'
            )}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}
