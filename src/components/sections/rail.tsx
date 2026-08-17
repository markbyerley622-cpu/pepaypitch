import { PAYMENT_FLOW } from '@/content/site'
import { TPV } from '@/content/metrics'
import { Item, Reveal, Section, SectionHead, Stagger } from '@/components/ui'
import { Gridlines } from '@/components/ui/atmosphere'
import { RailDiagram } from '@/components/product/rail-diagram'
import { pct } from '@/lib/format'

/**
 * One payment rail.
 *
 * The strongest single visual on the page, and the one that has to carry the
 * architecture: many tokens across several chains converge on one router and
 * leave as one settlement asset. The shares beneath it are real — this is the
 * same routing the ledger in the proof section was produced by.
 */
export function Rail() {
  return (
    <Section
      id="rail"
      tone="canvas"
      space="wide"
      backdrop={<Gridlines fade="radial" />}
    >
      <SectionHead
        eyebrow="The rail"
        title="Many tokens in. One settlement asset out."
        support="The payer uses whatever they already hold. Routing picks the on-chain or cross-chain path per payment, and the merchant is credited in the stablecoin they chose. The chain stops being a decision anyone has to make."
        align="center"
        className="mx-auto"
      />

      <Reveal delay={0.15} duration={1}>
        <RailDiagram className="mt-16" />
      </Reveal>

      {/* ── the lifecycle, in the ledger's own words ─────────────────────── */}
      <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
        {PAYMENT_FLOW.map((s, i) => (
          <Item key={s.key} className="bg-surface p-6">
            <span className="pep-mono text-[0.7rem] text-accent2">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-[1rem] font-semibold text-ink">{s.title}</h3>
            <p className="pep-pretty mt-2 text-[0.85rem] leading-relaxed text-ink-3">
              {s.detail}
            </p>
          </Item>
        ))}
      </Stagger>

      {/* Rail split, stated rather than implied — cross-chain is nearly half
          the volume, which is the fact that makes the diagram above a claim
          about production rather than about architecture. */}
      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.82rem] text-ink-3">
          {TPV.rails.map((r) => (
            <span key={r.name} className="inline-flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent2/70" />
              <span className="font-medium text-ink-2">{r.name}</span>
              <span className="pep-num text-ink-4">{pct(r.share)}</span>
            </span>
          ))}
          <span className="text-ink-4">of settled volume to date</span>
        </div>
      </Reveal>
    </Section>
  )
}
