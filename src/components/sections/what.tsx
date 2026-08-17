import { ArrowRight } from 'lucide-react'
import { CONTRASTS } from '@/content/site'
import { Item, Reveal, Section, SectionHead, Stagger } from '@/components/ui'

/**
 * What Pepay is, told as what changes.
 *
 * This section exists because "programmable payment infrastructure" means
 * nothing to a reader who does not already work in payments. A before/after
 * pair does the job a paragraph of positioning cannot: it shows the reader the
 * problem they already have, then the version of it that is solved.
 *
 * Four pairs, no icons, no cards. The restraint is the point — the section
 * either lands in ten seconds of reading or it has failed.
 */
export function What() {
  return (
    <Section id="what" tone="raised" space="default">
      <SectionHead
        eyebrow="What Pepay is"
        title="One rail underneath every way money moves"
        support="Buy, sell, bill, subscribe, get paid, settle. Pepay is the layer beneath those verbs — so accepting a payment stops being a chain problem and goes back to being a business one."
      />

      <Stagger className="mt-14 grid gap-x-12 gap-y-8 sm:grid-cols-2" gap={0.09}>
        {CONTRASTS.map((c) => (
          <Item key={c.after}>
            <div className="flex flex-col gap-3 border-t border-hairline pt-6">
              <p className="text-[0.95rem] leading-relaxed text-ink-4 line-through decoration-ink-4/40">
                {c.before}
              </p>
              <div className="flex items-start gap-2.5">
                <ArrowRight
                  className="mt-1 h-4 w-4 shrink-0 text-accent2"
                  aria-hidden
                />
                <p className="pep-pretty text-[1.05rem] font-medium leading-snug text-ink">
                  {c.after}
                </p>
              </div>
            </div>
          </Item>
        ))}
      </Stagger>

      <Reveal delay={0.2}>
        <p className="mt-12 max-w-[62ch] text-[0.85rem] leading-relaxed text-ink-4">
          Non-custodial throughout: no Pepay contract holds your funds. The router settles and
          the registry records, which is also what makes reconciliation deterministic rather than
          reconstructed from block explorers.
        </p>
      </Reveal>
    </Section>
  )
}
