'use client'

/**
 * Duration, made visible.
 *
 * The whole Streams argument is one distinction: a payment is an event, a
 * stream is a relationship that has a length. That is very hard to say in a
 * sentence and very easy to show — so this draws a single balance draining
 * along a timeline while the recipient's side fills, and lets the copy stay
 * short.
 *
 * The two totals always sum to the same figure, because the point being made is
 * that nothing is held in the middle. It is a diagram of the mechanism, not a
 * reading from a live contract, and the caption says so.
 */
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { STREAM_USES } from '@/content/site'
import { cn } from '@/lib/utils'

const TOTAL = 10_000
/** One pass of the animation, in ms. */
const PERIOD = 9000

export function StreamDuration({ className }: { className?: string }) {
  const [t, setT] = useState(0)
  const still = useReducedMotion()
  const raf = useRef(0)
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    // Reduced motion gets the mid-point, which is the frame that actually shows
    // the idea: some streamed, some remaining, both sides non-zero.
    if (still) {
      setT(0.55)
      return
    }

    let start = 0
    let running = false

    const step = (now: number) => {
      if (!start) start = now
      setT(((now - start) % PERIOD) / PERIOD)
      raf.current = requestAnimationFrame(step)
    }

    // Only run while on screen — an off-screen rAF loop is pure battery cost.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          raf.current = requestAnimationFrame(step)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf.current)
          start = 0
        }
      },
      { threshold: 0.15 }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf.current)
    }
  }, [still])

  const streamed = TOTAL * t
  const remaining = TOTAL - streamed
  const money = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 })

  return (
    <div ref={host} className={cn('pep-card-3 overflow-hidden rounded-2xl', className)}>
      {/* ── the two sides ─────────────────────────────────────────────── */}
      <div className="grid gap-px bg-hairline sm:grid-cols-2">
        <div className="bg-surface p-6 sm:p-7">
          <span className="pep-eyebrow text-ink-4">Locked in the stream</span>
          <div className="pep-num mt-3 text-[clamp(1.6rem,3.4vw,2.2rem)] font-bold leading-none text-ink">
            {money(remaining)}
          </div>
        </div>
        <div className="bg-surface p-6 sm:p-7">
          <span className="pep-eyebrow text-accent2">Received so far</span>
          <div className="pep-num mt-3 text-[clamp(1.6rem,3.4vw,2.2rem)] font-bold leading-none text-accent2">
            {money(streamed)}
          </div>
        </div>
      </div>

      {/* ── the timeline ──────────────────────────────────────────────── */}
      <div className="border-t border-hairline px-6 pb-7 pt-8 sm:px-7">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-accent2"
            style={{ width: `${t * 100}%` }}
          />
        </div>

        {/* Discrete ticks under the bar. They are what makes this read as
            "continuously, in small amounts" rather than as a loading bar —
            each one lights as the stream passes it. */}
        <div className="mt-3 flex items-end justify-between gap-[2px]" aria-hidden>
          {Array.from({ length: 44 }).map((_, i) => {
            const passed = i / 44 <= t
            return (
              <span
                key={i}
                className={cn(
                  'w-full rounded-sm transition-colors duration-300',
                  passed ? 'h-3 bg-accent2/55' : 'h-1.5 bg-ink-4/20'
                )}
              />
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-[0.72rem] text-ink-4">
          <span>Stream opens</span>
          <span className="pep-num">per second, no invoice</span>
          <span>Closes</span>
        </div>
      </div>

      {/* ── what runs on it ───────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5 border-t border-hairline bg-surface-2/50 px-6 py-4 sm:px-7">
        {STREAM_USES.map((u) => (
          <span
            key={u}
            className="rounded-md border border-hairline bg-surface px-2.5 py-1 text-[0.72rem] font-medium text-ink-3"
          >
            {u}
          </span>
        ))}
      </div>
    </div>
  )
}
