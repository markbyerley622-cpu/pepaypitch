import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { BRAND, CTA } from '@/content/site'
import { CHAINS, MARKED_TOKENS, TPV, tokenIcon } from '@/content/metrics'
import { Button, Reveal, Shell, Status, WordReveal } from '@/components/ui'
import { Aurora, Gridlines } from '@/components/ui/atmosphere'
import { PaymentDemo } from '@/components/product/payment-demo'
import { count, usdCompact } from '@/lib/format'
import { Rotator } from './rotator'

/**
 * The hero.
 *
 * Two jobs and no others: say what Pepay is in one line a stranger can hold,
 * and show the mechanism working. Everything else — products, proof, the
 * developer story — is further down the page and does not belong here.
 *
 * The headline is set from a two-line string rather than a single sentence
 * because the break carries the idea: any token in, one stablecoin out.
 */
export function Hero() {
  const [line1, line2] = BRAND.headline.split('\n')

  return (
    <section id="top" className="relative overflow-hidden bg-canvas pt-[68px]">
      <Gridlines />
      <Aurora />

      <Shell className="relative z-10">
        <div className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
          {/* ── the statement ──────────────────────────────────────────── */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Status kind="live" label={`Live on ${CHAINS.length} chains`} />
                <span className="text-[0.78rem] text-ink-4">
                  {CHAINS.join(' · ')}
                </span>
              </div>
            </Reveal>

            <h1 className="pep-display mt-6 text-[clamp(2.6rem,6.4vw,4.6rem)] text-ink">
              <WordReveal text={line1} />
              <span className="block text-accent2">
                <WordReveal text={line2} delay={0.18} />
              </span>
            </h1>

            <Reveal delay={0.3}>
              <p className="pep-pretty mt-6 max-w-[54ch] text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-ink-2">
                {BRAND.support}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-7 flex items-center gap-2 text-[0.9rem] text-ink-3">
                <span>Payments</span>
                <Rotator />
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={CTA.primary.href} external size="lg">
                  {CTA.primary.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-pep group-hover/btn:translate-x-0.5" />
                </Button>
                <Button href="#products" variant="secondary" size="lg">
                  Explore Pepay
                </Button>
              </div>
            </Reveal>

            {/* Ledger figures, stated small. The proof section does the
                argument; the hero only establishes that there is one. */}
            <Reveal delay={0.6}>
              <dl className="mt-11 grid max-w-lg grid-cols-3 gap-6 border-t border-hairline pt-7">
                <Stat value={usdCompact(TPV.totals.volumeUsd)} label="Settled volume" />
                <Stat value={count(TPV.totals.transactions)} label="Transactions" />
                <Stat value={count(TPV.totals.uniqueWallets)} label="Paying wallets" />
              </dl>
            </Reveal>

            <Reveal delay={0.68}>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {MARKED_TOKENS.slice(0, 5).map((t) => {
                    const icon = tokenIcon(t)
                    return icon ? (
                      <Image
                        key={t}
                        src={icon}
                        alt={t}
                        width={26}
                        height={26}
                        className="rounded-full ring-2 ring-canvas"
                      />
                    ) : null
                  })}
                </div>
                <span className="text-[0.78rem] text-ink-4">
                  {TPV.accepted.length} tokens accepted · settled into{' '}
                  {TPV.settlement.map((s) => s.name).join(' and ')}
                </span>
              </div>
            </Reveal>
          </div>

          {/* ── the mechanism ──────────────────────────────────────────── */}
          <Reveal delay={0.25} duration={1} y={28}>
            <PaymentDemo className="mx-auto w-full max-w-[26rem] lg:max-w-none" />
          </Reveal>
        </div>
      </Shell>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="pep-num text-[1.5rem] font-bold leading-none text-ink">{value}</dd>
      <p className="mt-1.5 text-[0.75rem] leading-snug text-ink-4">{label}</p>
    </div>
  )
}
