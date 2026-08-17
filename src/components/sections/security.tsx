import { ShieldCheck } from 'lucide-react'
import { AUDIT, AUDIT_DELIVERED, LIMITS, SECURITY } from '@/content/site'
import { Item, Reveal, Section, SectionHead, Stagger, Status } from '@/components/ui'
import { cn } from '@/lib/utils'

/**
 * Security, and the things we will not claim.
 *
 * Two halves in one band, deliberately adjacent. The first is what is actually
 * true about the posture; the second is what Pepay does not have. Putting them
 * side by side rather than burying the caveats in a footer is the whole design
 * of this section — a buyer doing diligence finds these facts either way, and
 * finding them volunteered is a completely different experience from finding
 * them omitted.
 *
 * The audit line is generated from `AUDIT` in the content layer. While no
 * report is signed off it reads as engaged-and-queued; the moment a report URL
 * is set it becomes a linked "Audited by" badge everywhere. There is no copy to
 * hand-edit, which is the point — it cannot drift out of step with the truth.
 */
export function Security() {
  return (
    <Section id="security" tone="canvas" space="default">
      <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        {/* ── what is true ─────────────────────────────────────────────── */}
        <div className="min-w-0">
          <SectionHead
            eyebrow="Security"
            title="Nothing to lose, because nothing is held"
            support="Pepay never takes custody. The router settles and the registry records, which removes the single largest category of risk a payment processor normally carries."
          />

          <Stagger className="mt-12 flex flex-col gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            {SECURITY.map((s) => (
              <Item key={s.title} className="bg-surface p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[1rem] font-semibold text-ink">{s.title}</h3>
                  <Status kind={s.status} />
                </div>
                <p className="pep-pretty mt-2 text-[0.87rem] leading-relaxed text-ink-3">
                  {s.detail}
                </p>
              </Item>
            ))}
          </Stagger>

          {/* The badge only becomes a link when there is something to link to. */}
          {AUDIT_DELIVERED ? (
            <Reveal delay={0.15}>
              <a
                href={AUDIT.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-live/35 bg-live/10 px-4 py-2.5 text-[0.85rem] font-semibold text-live transition-colors duration-300 hover:bg-live/15"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Audited by {AUDIT.firm} — read the report
              </a>
            </Reveal>
          ) : null}
        </div>

        {/* ── what we will not claim ───────────────────────────────────── */}
        <Reveal delay={0.15} className="min-w-0">
          <div className="rounded-2xl border border-dashed border-hairline-2 p-7 sm:p-8">
            <h2 className="pep-display text-[clamp(1.4rem,2.4vw,1.9rem)] text-ink">
              What we won&apos;t pretend
            </h2>
            <p className="pep-pretty mt-3 text-[0.88rem] leading-relaxed text-ink-3">
              Stated here rather than discovered in diligence. This list is the reason to trust
              the rest of the page.
            </p>

            <dl className="mt-8 flex flex-col">
              {LIMITS.map((l, i) => (
                <div
                  key={l.claim}
                  className={cn(
                    'flex flex-col gap-1.5 py-4',
                    i > 0 && 'border-t border-hairline'
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[0.92rem] font-semibold text-ink-2">{l.claim}</dt>
                    <span className="pep-mono shrink-0 rounded-md border border-hairline bg-surface-2 px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-wider text-ink-4">
                      {l.short}
                    </span>
                  </div>
                  <dd className="pep-pretty text-[0.83rem] leading-relaxed text-ink-4">
                    {l.reality}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
