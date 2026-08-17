import { TPV, TX_GROWTH, WEEKLY_VOLUME, RUN_RATE } from '@/content/metrics'
import {
  AreaChart,
  Card,
  Counter,
  Delta,
  Item,
  Reveal,
  Section,
  SectionHead,
  ShareBar,
  Stagger,
} from '@/components/ui'
import { Gridlines } from '@/components/ui/atmosphere'
import { count, countCompact, shortDate, splitCompact, usd, usdCompact } from '@/lib/format'

/**
 * Proof.
 *
 * Restructured from four equal metric tiles into one headline figure with the
 * rest as support. Four cards of the same weight make the reader do the ranking;
 * $19.9M set at display size does it for them, and the composition underneath
 * is what turns a number into an argument.
 *
 * Nothing here is typed by hand — every figure resolves from the settled
 * transaction ledger. The window is stated three times (label, badge, footnote)
 * because a volume figure without a date range is not a claim anyone can check.
 *
 * The counter animates on entry but the label says SETTLED VOLUME · HISTORICAL
 * SNAPSHOT. It must never read as a live ticker: the data is a fixed export, and
 * a number that appears to be climbing in real time would be a lie told by
 * motion rather than by copy.
 */
export function Proof() {
  const vol = splitCompact(TPV.totals.volumeUsd)
  const avgWeek = WEEKLY_VOLUME.reduce((a, b) => a + b, 0) / Math.max(1, WEEKLY_VOLUME.length)

  return (
    <Section id="proof" tone="raised" space="wide" backdrop={<Gridlines fade="radial" />}>
      <SectionHead
        eyebrow="Proof"
        title="Money has already moved through this"
        support="Not a projection, not a pilot. Every figure below is derived from the settled transaction ledger."
        align="center"
        className="mx-auto"
      />

      {/* ── the headline figure ─────────────────────────────────────────── */}
      <Reveal delay={0.1} duration={1}>
        <div className="mt-16 text-center">
          <div className="pep-num pep-text-fade text-[clamp(4rem,15vw,11rem)] font-bold leading-[0.85] tracking-[-0.05em]">
            <Counter
              to={vol.value}
              decimals={vol.digits}
              prefix={vol.prefix}
              suffix={vol.suffix}
              duration={2000}
            />
          </div>

          <div className="mt-7 flex flex-col items-center gap-2">
            <span className="pep-eyebrow text-accent2">Settled volume · historical snapshot</span>
            <span className="pep-mono text-[0.78rem] text-ink-4">
              {shortDate(TPV.range.first)} — {shortDate(TPV.range.last)} · {usd(TPV.totals.volumeUsd)} exact
            </span>
          </div>
        </div>
      </Reveal>

      {/* ── the supporting three ────────────────────────────────────────── */}
      <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
        <Item className="bg-surface p-7">
          <span className="pep-eyebrow text-ink-4">Transactions</span>
          <div className="pep-num mt-3 text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-none text-ink">
            <Counter to={TPV.totals.transactions} />
          </div>
          <p className="mt-2 text-[0.78rem] text-ink-4">
            {usd(TPV.totals.avgTicketUsd, 2)} average ticket
          </p>
        </Item>

        <Item className="bg-surface p-7">
          <span className="pep-eyebrow text-ink-4">Paying wallets</span>
          <div className="pep-num mt-3 text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-none text-ink">
            <Counter to={TPV.totals.uniqueWallets} />
          </div>
          <p className="mt-2 text-[0.78rem] text-ink-4">across {TPV.range.days} days</p>
        </Item>

        <Item className="bg-surface p-7">
          <span className="pep-eyebrow text-ink-4">Protocol revenue</span>
          <div className="pep-num mt-3 text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-none text-ink">
            <Counter to={TPV.totals.revenueUsd} decimals={0} prefix="$" />
          </div>
          <p className="mt-2 text-[0.78rem] text-ink-4">
            {(TPV.totals.takeRateBps / 100).toFixed(2)}% effective take rate
          </p>
        </Item>
      </Stagger>

      {/* ── composition ────────────────────────────────────────────────── */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Reveal className="min-w-0 lg:col-span-2" delay={0.08}>
          <Card elevation={2} className="flex h-full flex-col overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-4 p-6 pb-0">
              <div>
                <span className="pep-eyebrow text-ink-3">Weekly settled volume</span>
                <div className="pep-num mt-2.5 text-[1.6rem] font-semibold leading-none text-ink">
                  {usdCompact(avgWeek)}
                  <span className="ml-2 text-[0.8rem] font-medium text-ink-4">average week</span>
                </div>
              </div>

              {/* The page's one growth claim. Transaction count across whole
                  calendar months — volume has held a flat run-rate, so a volume
                  delta would be noise dressed up as a trend. */}
              {TX_GROWTH ? (
                <div className="text-right">
                  <span className="pep-eyebrow text-ink-3">Transactions / month</span>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="pep-num text-[1.6rem] font-semibold leading-none text-ink">
                      {countCompact(RUN_RATE.transactions)}
                    </span>
                    <Delta {...TX_GROWTH} />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-6 min-h-[188px] flex-1 px-2 pb-2">
              <AreaChart data={WEEKLY_VOLUME} height={188} strokeWidth={2} fill />
            </div>

            <div className="flex items-center justify-between border-t border-hairline px-6 py-3.5 text-[0.73rem] text-ink-4">
              <span>{WEEKLY_VOLUME.length} weeks</span>
              <span className="pep-mono">
                {shortDate(TPV.range.first)} → {shortDate(TPV.range.last)}
              </span>
            </div>
          </Card>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal delay={0.14}>
            <Card elevation={2} inset>
              <span className="pep-eyebrow text-ink-3">Settlement rail</span>
              <ShareBar
                className="mt-5"
                rows={TPV.rails.map((r) => ({
                  name: r.name,
                  share: r.share,
                  detail: `${countCompact(r.transactions)} tx`,
                }))}
              />
              <p className="mt-5 text-[0.8rem] leading-relaxed text-ink-3">
                Routing picks the cheapest settled path per payment. The merchant receives the
                same stablecoin either way.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.2}>
            <Card elevation={2} inset className="flex-1">
              <span className="pep-eyebrow text-ink-3">Origin chain</span>
              <ShareBar
                className="mt-5"
                rows={TPV.chains.map((c) => ({
                  name: c.name,
                  share: c.share,
                  detail: usdCompact(c.volumeUsd),
                }))}
              />
              <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-hairline pt-4">
                <span className="text-[0.8rem] text-ink-3">Settled into</span>
                <span className="pep-num text-[0.85rem] font-semibold text-ink">
                  {TPV.settlement.map((s) => s.name).join(' · ')}
                </span>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-8 max-w-[72ch] text-center text-[0.75rem] leading-relaxed text-ink-4">
          {count(TPV.totals.transactions)} settled transactions across {TPV.chains.length} chains,{' '}
          {shortDate(TPV.range.first)} to {shortDate(TPV.range.last)}. Regenerated from the
          transaction export each week — a periodic snapshot, not a live feed.
        </p>
      </Reveal>
    </Section>
  )
}
