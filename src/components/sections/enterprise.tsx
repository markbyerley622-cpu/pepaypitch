import { ENTERPRISE } from '@/content/site'
import { Item, Reveal, Section, SectionHead, Stagger } from '@/components/ui'

/**
 * Enterprise, framed as control.
 *
 * A company evaluating a payment rail is not asking "what features are there".
 * It is asking five questions about authority: who can spend, what will be
 * accepted, where money lands, what happened, and who did it. The section is
 * built around those questions, with the shipped capability as the answer —
 * which is a stronger frame than a fourth grid of four cards.
 *
 * The limits that used to sit here now live in the security band, next to the
 * posture they qualify.
 */

const QUESTIONS = [
  'Who can spend',
  'What can be accepted',
  'Where money settles',
  'What happened',
  'Who did it',
] as const

export function Enterprise() {
  return (
    <Section id="enterprise" tone="raised" space="default">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="min-w-0">
          <SectionHead
            eyebrow="Enterprise"
            title="Five questions, answered in the product"
            support="Everything below maps to a shipped endpoint and a route in the dashboard. There are no compliance, licensing or certification claims here, because Pepay holds none."
          />

          {/* The questions, set large. They are the section's argument — the
              capability list opposite is only the answer sheet. */}
          <Stagger className="mt-12 flex flex-col" gap={0.08}>
            {QUESTIONS.map((q, i) => (
              <Item key={q}>
                <div className="flex items-baseline gap-4 border-t border-hairline py-4">
                  <span className="pep-mono shrink-0 text-[0.72rem] text-accent2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pep-display text-[clamp(1.15rem,2vw,1.5rem)] text-ink">
                    {q}
                  </span>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.15} className="min-w-0">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
            {ENTERPRISE.map((e) => (
              <div key={e.title} className="flex flex-col bg-surface p-6">
                <h3 className="text-[1.02rem] font-semibold text-ink">{e.title}</h3>
                <p className="pep-pretty mt-2 flex-1 text-[0.85rem] leading-relaxed text-ink-3">
                  {e.detail}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {e.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-md border border-hairline bg-surface-2 px-2 py-0.5 text-[0.68rem] font-medium text-ink-4"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
