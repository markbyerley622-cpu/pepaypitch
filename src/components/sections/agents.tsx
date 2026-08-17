import { AGENT_POINTS, AGENT_STEPS } from '@/content/site'
import { Item, Reveal, Section, SectionHead, Stagger, Status } from '@/components/ui'
import { Aurora } from '@/components/ui/atmosphere'
import { cn } from '@/lib/utils'

/**
 * Payments for software.
 *
 * The temptation here is to write "autonomous financial primitives for
 * machine-to-machine value transfer", which tells a reader nothing they can
 * act on. The concrete version is better and it is also the accurate one: an
 * agent can already decide what to buy; what it cannot do is hold a card or
 * pass a KYC check. That is a payments problem.
 *
 * The five steps are laid out as a transcript rather than a diagram, because
 * the thing worth showing is the exchange itself — a 402 answered with a price
 * and retried with a receipt.
 */
export function Agents() {
  return (
    <Section
      id="agents"
      tone="raised"
      space="default"
      backdrop={<Aurora tone="violet" size="md" className="opacity-60" />}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <SectionHead
          eyebrow="Agents"
          title="AI can decide what to buy. Pepay lets it pay."
          support="An agent has no wallet it can open, no card it can hold and no legal entity it can onboard as. What it does have is an endpoint that can quote a price and a rail that can settle it."
        />
        <Reveal delay={0.15}>
          <div className="flex items-center gap-2 lg:pb-2">
            <Status kind="soon" />
            <span className="text-[0.78rem] text-ink-4">MCP bridge · x402 Flex</span>
          </div>
        </Reveal>
      </div>

      {/* ── the exchange ────────────────────────────────────────────────── */}
      <Reveal delay={0.1} duration={1}>
        <div className="pep-card-3 mt-14 overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-hairline px-5 py-3">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-4/25" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-4/25" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-4/25" />
            <span className="pep-mono ml-2 text-[0.72rem] text-ink-4">agent → service</span>
          </div>

          <ol className="divide-y divide-hairline">
            {AGENT_STEPS.map((s, i) => (
              <li
                key={s.key}
                className="grid gap-3 px-5 py-5 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-6 sm:px-7"
              >
                <div className="flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-1.5">
                  <span className="pep-mono text-[0.7rem] text-accent2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'rounded-md border px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em]',
                      s.actor === 'Pepay'
                        ? 'border-pep-500/30 bg-pep-500/10 text-pep-600 dark:text-pep-300'
                        : 'border-hairline bg-surface-2 text-ink-3'
                    )}
                  >
                    {s.actor}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-[1rem] font-semibold text-ink">{s.title}</h3>
                  <p className="pep-mono mt-1.5 break-words text-[0.85rem] text-accent2">
                    {s.line}
                  </p>
                  <p className="pep-pretty mt-2 text-[0.85rem] leading-relaxed text-ink-3">
                    {s.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* ── why it has to work this way ─────────────────────────────────── */}
      <Stagger className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2" gap={0.08}>
        {AGENT_POINTS.map((p) => (
          <Item key={p.title}>
            <div className="border-t border-hairline pt-5">
              <h3 className="text-[0.98rem] font-semibold text-ink">{p.title}</h3>
              <p className="pep-pretty mt-2 text-[0.88rem] leading-relaxed text-ink-3">
                {p.detail}
              </p>
            </div>
          </Item>
        ))}
      </Stagger>
    </Section>
  )
}
