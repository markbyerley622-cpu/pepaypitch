import { ENTERPRISE, LIMITS } from '@/content/site'
import { Item, Reveal, Section, SectionHead, Stagger } from '@/components/ui'

/**
 * Enterprise, and the limits that come with it.
 *
 * Two halves, deliberately adjacent. The first is what a company gets; the
 * second is what Pepay does not have. Putting them in the same band rather than
 * burying the caveats in a footer is the whole design of this section — a buyer
 * doing diligence will find these facts anyway, and finding them stated is a
 * very different experience from finding them omitted.
 *
 * There are no compliance, licensing or certification claims here, because
 * Pepay holds none.
 */
export function Enterprise() {
  return (
    <Section id="enterprise" tone="raised" space="default">
      <SectionHead
        eyebrow="Enterprise"
        title="Controls, reconciliation and an audit trail"
        support="Everything below maps to a shipped endpoint and a route in the dashboard. If it is not built, it is in the roadmap section instead."
      />

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2" gap={0.08}>
        {ENTERPRISE.map((e) => (
          <Item key={e.title} className="h-full">
            <div className="pep-card-2 flex h-full flex-col rounded-2xl p-6 sm:p-7">
              <h3 className="text-[1.1rem] font-semibold text-ink">{e.title}</h3>
              <p className="pep-pretty mt-2.5 text-[0.88rem] leading-relaxed text-ink-3">
                {e.detail}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {e.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-md border border-hairline bg-surface-2 px-2 py-1 text-[0.7rem] font-medium text-ink-3"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Item>
        ))}
      </Stagger>

      {/* ── what Pepay does not have ────────────────────────────────────── */}
      <Reveal delay={0.15}>
        <div className="mt-16 rounded-2xl border border-hairline bg-surface/50 p-7 sm:p-9">
          <h3 className="text-[1.15rem] font-semibold text-ink">
            What Pepay does not have yet
          </h3>
          <p className="pep-pretty mt-2 max-w-[62ch] text-[0.88rem] leading-relaxed text-ink-3">
            Stated here rather than discovered in diligence. Anything below is the reason to take
            the rest of this page seriously.
          </p>

          <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {LIMITS.map((l) => (
              <div key={l.claim} className="border-t border-hairline pt-4">
                <dt className="text-[0.9rem] font-semibold text-ink-2">{l.claim}</dt>
                <dd className="pep-pretty mt-1.5 text-[0.85rem] leading-relaxed text-ink-4">
                  {l.reality}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  )
}
