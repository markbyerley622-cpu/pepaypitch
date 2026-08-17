'use client'

/**
 * One agent payment, unfolding.
 *
 * The previous version listed the five steps as static blocks, which read as
 * documentation: the reader had to assemble the sequence themselves. Here the
 * exchange plays out line by line, the way it would in a terminal, so the
 * causality is carried by the animation instead of by numbering.
 *
 * It starts when it scrolls into view and holds on the completed transcript
 * rather than looping forever — a sequence that restarts under the reader's eye
 * is a distraction once they have understood it.
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Ban, KeyRound } from 'lucide-react'
import { AGENT_STEPS } from '@/content/site'
import { EASE } from '@/components/ui/motion'
import { cn } from '@/lib/utils'

const STEP_MS = 900

export function AgentSequence({ className }: { className?: string }) {
  const [shown, setShown] = useState(0)
  const host = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()

  useEffect(() => {
    const el = host.current
    if (!el) return

    if (still) {
      setShown(AGENT_STEPS.length)
      return
    }

    let timer: ReturnType<typeof setInterval>
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        timer = setInterval(() => {
          setShown((n) => {
            if (n >= AGENT_STEPS.length) {
              clearInterval(timer)
              return n
            }
            return n + 1
          })
        }, STEP_MS)
      },
      { threshold: 0.25 }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(timer)
    }
  }, [still])

  return (
    <div ref={host} className={cn('pep-card-3 overflow-hidden rounded-2xl', className)}>
      <div className="flex items-center gap-2 border-b border-hairline px-5 py-3">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-4/25" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-4/25" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-4/25" />
        <span className="pep-mono ml-2 text-[0.72rem] text-ink-4">agent → service</span>
        <span className="pep-mono ml-auto text-[0.72rem] text-ink-4">
          {Math.min(shown, AGENT_STEPS.length)} / {AGENT_STEPS.length}
        </span>
      </div>

      <ol className="divide-y divide-hairline">
        {AGENT_STEPS.map((s, i) => {
          const visible = i < shown
          return (
            <motion.li
              key={s.key}
              initial={still ? false : { opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0.18 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid gap-2 px-5 py-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-6 sm:px-7"
            >
              <span
                className={cn(
                  'h-fit w-fit rounded-md border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em]',
                  s.actor === 'Pepay'
                    ? 'border-pep-500/30 bg-pep-500/10 text-pep-600 dark:text-pep-300'
                    : 'border-hairline bg-surface-2 text-ink-3'
                )}
              >
                {s.actor}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[0.98rem] font-semibold text-ink">{s.title}</h3>
                  <motion.code
                    initial={still ? false : { opacity: 0, x: -4 }}
                    animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -4 }}
                    transition={{ duration: 0.4, ease: EASE, delay: visible ? 0.12 : 0 }}
                    className="pep-mono break-all text-[0.82rem] text-accent2"
                  >
                    {s.line}
                  </motion.code>
                </div>
                <p className="pep-pretty mt-1.5 text-[0.83rem] leading-relaxed text-ink-3">
                  {s.detail}
                </p>
              </div>
            </motion.li>
          )
        })}
      </ol>

      {/* The architectural point, stated where it lands hardest: at the end of
          a transaction the reader has just watched complete without a key ever
          reaching the model. */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline bg-surface-2/50 px-5 py-4 sm:px-7">
        <span className="inline-flex items-center gap-2 text-[0.8rem] text-ink-3">
          <KeyRound className="h-3.5 w-3.5 text-ink-4" aria-hidden />
          Private key in the model
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline-2 bg-surface px-2.5 py-1 text-[0.72rem] font-semibold text-ink-2">
          <Ban className="h-3 w-3 text-ink-4" aria-hidden />
          Never
        </span>
        <span className="text-[0.78rem] text-ink-4">
          The bridge exposes payment actions as tools. Signing stays outside the agent.
        </span>
      </div>
    </div>
  )
}
