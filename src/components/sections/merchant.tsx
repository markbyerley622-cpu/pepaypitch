import { ArrowRight } from 'lucide-react'
import { CTA } from '@/content/site'
import { TPV } from '@/content/metrics'
import { Button, Item, Reveal, Section, SectionHead, Stagger, Status } from '@/components/ui'
import { LazyVideo } from '@/components/product/lazy-video'
import { usd } from '@/lib/format'

/**
 * The merchant surface.
 *
 * Shows the real dashboard reel rather than a mocked-up one. The brief this
 * site is built against is explicit that fabricating dashboard numbers is out —
 * and it would be a strange thing to do here anyway, when the actual product
 * has been recorded and the ledger behind it is on the page already.
 *
 * The four capabilities below map one-to-one onto routes that exist in the
 * shipped dashboard. None of them is aspirational.
 */

const CAPABILITIES = [
  {
    title: 'Accept',
    detail:
      'Dollar-precise checkout, invoices and subscriptions. Any token in, no custodial risk, refunds and success callbacks programmable.',
    items: ['Checkout', 'Invoices', 'Subscriptions', 'Catalog'],
  },
  {
    title: 'Settle',
    detail:
      'Routing picks the on-chain or cross-chain path per payment and credits you in the stablecoin you asked for.',
    items: ['Settlement preference', 'Token policy', 'Cross-chain'],
  },
  {
    title: 'Reconcile',
    detail:
      'One place for multi-chain orders, balances and status — built for a finance team rather than for a block explorer.',
    items: ['Orders', 'Balances', 'Event log', 'Export'],
  },
  {
    title: 'Operate',
    detail:
      'Scoped API keys, staff accounts, wallet management, and webhooks with delivery history and replay.',
    items: ['API keys', 'Staff', 'Wallets', 'Webhooks'],
  },
] as const

export function Merchant() {
  return (
    <Section id="merchants" tone="canvas" space="default">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        {/* ── the product ──────────────────────────────────────────────── */}
        <Reveal duration={1} className="min-w-0">
          <div className="pep-card-3 overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-3">
              <span className="pep-mono text-[0.72rem] text-ink-4">Pepay Merchants</span>
              <Status kind="live" />
            </div>
            <div className="relative aspect-[16/10] w-full bg-canvas-2">
              <LazyVideo
                src="/images/reel-product.mp4"
                srcSm="/images/reel-product-sm.mp4"
                poster="/images/reel-product-cover.jpg"
                // Described as what it is. This asset is Pepay's product reel,
                // which opens on a title card before showing the surface — not
                // an unbroken screen capture of the dashboard, and the label
                // should not imply otherwise.
                label="Pepay product reel: the merchant surface, settlement and multi-chain payments."
                className="absolute inset-0 object-contain"
              />
            </div>
          </div>
        </Reveal>

        {/* ── the argument ─────────────────────────────────────────────── */}
        <div className="min-w-0">
          <SectionHead
            eyebrow="Merchants"
            title="The dashboard merchants run against today"
            support={`Not a concept. ${usd(TPV.totals.volumeUsd)} of settled volume has passed through this surface, and every figure in the proof section came out of it.`}
          />

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={CTA.dashboard.href} external>
                Open the dashboard
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-pep group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((c, i) => (
          <Item key={c.title} className="bg-surface p-6">
            <span className="pep-mono text-[0.7rem] text-accent2">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-[1.05rem] font-semibold text-ink">{c.title}</h3>
            <p className="pep-pretty mt-2 text-[0.85rem] leading-relaxed text-ink-3">{c.detail}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {c.items.map((it) => (
                <li
                  key={it}
                  className="rounded-md border border-hairline bg-surface-2 px-2 py-0.5 text-[0.68rem] font-medium text-ink-4"
                >
                  {it}
                </li>
              ))}
            </ul>
          </Item>
        ))}
      </Stagger>
    </Section>
  )
}
