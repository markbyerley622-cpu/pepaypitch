'use client'

/**
 * What happens after the four lines.
 *
 * The code sample already answers "how much work is this". The question it does
 * not answer is "and then what" — which is the one a developer actually has to
 * plan around. This shows the rest of the loop: the call returns a payment URL,
 * the payer settles, a signed webhook arrives, and your own code runs.
 *
 * Four stages, advancing on a timer, holding at the end. The webhook payload is
 * the real event name and the real signature headers, not a plausible-looking
 * invention.
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { EASE } from '@/components/ui/motion'
import { cn } from '@/lib/utils'

const STAGES = [
  {
    key: 'create',
    label: 'You call the API',
    body: 'pepay.invoices.create({ amount_usd: 49.00 })',
    note: 'One request. Priced in dollars.',
  },
  {
    key: 'link',
    label: 'Pepay returns a payment URL',
    body: 'https://pay.pepay.io/inv_8f21c4',
    note: 'Hosted checkout, or drop it in your own UI.',
  },
  {
    key: 'settle',
    label: 'The payer settles in any token',
    body: '49.00 USDT · BNB Chain → routed → USDC',
    note: 'They pay with what they hold. You get what you chose.',
  },
  {
    key: 'hook',
    label: 'A signed webhook arrives',
    body: 'POST /webhooks/pepay  →  invoice.paid',
    note: 'HMAC SHA-256 over x-pepay-timestamp + body.',
  },
] as const

const STEP_MS = 1500

export function IntegrationFlow({ className }: { className?: string }) {
  const [active, setActive] = useState(0)
  const host = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()

  useEffect(() => {
    const el = host.current
    if (!el) return

    if (still) {
      setActive(STAGES.length - 1)
      return
    }

    let timer: ReturnType<typeof setInterval>
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        timer = setInterval(() => {
          setActive((n) => {
            if (n >= STAGES.length - 1) {
              clearInterval(timer)
              return n
            }
            return n + 1
          })
        }, STEP_MS)
      },
      { threshold: 0.3 }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(timer)
    }
  }, [still])

  return (
    <div ref={host} className={cn('flex flex-col gap-2', className)}>
      {STAGES.map((s, i) => {
        const done = i < active
        const now = i === active
        const reached = done || now

        return (
          <motion.div
            key={s.key}
            animate={{ opacity: reached ? 1 : 0.32 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={cn(
              'relative rounded-xl border px-4 py-3.5 transition-colors duration-500',
              now
                ? 'border-pep-500/35 bg-pep-500/[0.06]'
                : 'border-hairline bg-surface'
            )}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  'grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.6rem] font-bold transition-colors duration-500',
                  done
                    ? 'bg-live text-white'
                    : now
                      ? 'bg-accent2 text-accent2-ink'
                      : 'bg-surface-2 text-ink-4'
                )}
              >
                {done ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
              </span>
              <span className="text-[0.85rem] font-semibold text-ink">{s.label}</span>
            </div>

            <code className="pep-mono mt-2.5 block break-all pl-[1.9rem] text-[0.76rem] leading-relaxed text-accent2">
              {s.body}
            </code>
            <p className="mt-1 pl-[1.9rem] text-[0.73rem] text-ink-4">{s.note}</p>
          </motion.div>
        )
      })}

      <p className="mt-1 text-[0.73rem] leading-relaxed text-ink-4">
        Then your code runs. Fulfilment, entitlements and refunds are yours to script.
      </p>
    </div>
  )
}
