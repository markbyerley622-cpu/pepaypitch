import { Activity, Layers, Receipt, Wallet } from 'lucide-react'
import {
  RUN_RATE,
  TPV,
  TX_GROWTH,
  WEEKLY_REVENUE,
  WEEKLY_TRANSACTIONS,
  WEEKLY_VOLUME,
} from '@/content/metrics'
import {
  AreaChart,
  Badge,
  Card,
  Counter,
  Delta,
  Item,
  Metric,
  Reveal,
  Section,
  SectionHead,
  ShareBar,
  Stagger,
} from '@/components/ui'
import { count, countCompact, shortDate, splitCompact, usd, usdCompact } from '@/lib/format'

/**
 * Proof.
 *
 * Everything here is computed from the settled transaction ledger. No figure is
 * typed by hand, which is the point — the section is an argument that the
 * numbers are real, so it shows the composition behind them rather than four
 * round headline stats.
 *
 * The window is stated twice, in the badge and in the footnote, because a
 * volume figure without a date range is not a claim anyone can check.
 */
export function Proof() {
  const vol = splitCompact(TPV.totals.volumeUsd)
  const avgWeek = WEEKLY_VOLUME.reduce((a, b) => a + b, 0) / Math.max(1, WEEKLY_VOLUME.length)

  return (
    <Section id="proof" tone="raised" space="default">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <SectionHead
          eyebrow="Proof"
          title="Volume that has already cleared"
          support="Every number below is derived from the settled transaction ledger and regenerated when the export refreshes. Nothing here is a projection."
        />
        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center gap-2 lg:pb-2">
            <Badge tone="live">Updated {TPV.updateCadence}</Badge>
            <Badge tone="outline">
              {shortDate(TPV.range.first)} → {shortDate(TPV.range.last)}
            </Badge>
          </div>
        </Reveal>
      </div>

      {/* ── headline metrics ───────────────────────────────────────────── */}
      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Item className="h-full">
          <Metric
            className="h-full"
            label="Total payment volume"
            icon={<Layers className="h-3.5 w-3.5" />}
            value={
              <Counter to={vol.value} decimals={vol.digits} prefix={vol.prefix} suffix={vol.suffix} />
            }
            sub={`${usd(TPV.totals.volumeUsd)} exact`}
            chart={WEEKLY_VOLUME}
          />
        </Item>

        <Item className="h-full">
          <Metric
            className="h-full"
            label="Transactions"
            icon={<Activity className="h-3.5 w-3.5" />}
            value={<Counter to={TPV.totals.transactions} />}
            sub={`${usd(TPV.totals.avgTicketUsd, 2)} average ticket`}
            chart={WEEKLY_TRANSACTIONS}
          />
        </Item>

        <Item className="h-full">
          <Metric
            className="h-full"
            label="Protocol revenue"
            icon={<Receipt className="h-3.5 w-3.5" />}
            value={<Counter to={TPV.totals.revenueUsd} decimals={0} prefix="$" />}
            sub={`${(TPV.totals.takeRateBps / 100).toFixed(2)}% effective take rate`}
            chart={WEEKLY_REVENUE}
          />
        </Item>

        <Item className="h-full">
          <Metric
            className="h-full"
            label="Paying wallets"
            icon={<Wallet className="h-3.5 w-3.5" />}
            value={<Counter to={TPV.totals.uniqueWallets} />}
            sub={`across ${TPV.range.days} days`}
          />
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
                  calendar months — volume has held a flat run-rate, so a
                  volume delta would be noise dressed up as a trend. */}
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

            {/* flex-1 so the chart absorbs whatever extra height the taller
                right-hand column forces on this card, instead of leaving a
                block of empty surface beneath it. */}
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
        <p className="mt-6 max-w-[70ch] text-[0.75rem] leading-relaxed text-ink-4">
          {count(TPV.totals.transactions)} settled transactions across {TPV.chains.length} chains,{' '}
          {shortDate(TPV.range.first)} to {shortDate(TPV.range.last)}. Regenerated from the
          transaction export each week — these figures are a periodic snapshot, not a live feed.
        </p>
      </Reveal>
    </Section>
  )
}
