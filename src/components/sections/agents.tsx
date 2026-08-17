import { AGENT_POINTS } from '@/content/site'
import { Item, Reveal, Section, SectionHead, Stagger, Status } from '@/components/ui'
import { Aurora } from '@/components/ui/atmosphere'
import { AgentSequence } from '@/components/product/agent-sequence'

/**
 * Payments for software.
 *
 * The temptation here is "autonomous financial primitives for machine-to-machine
 * value transfer", which tells a reader nothing they can act on. The concrete
 * version is both better and more accurate: an agent can already decide what to
 * buy; what it cannot do is hold a card or pass a KYC check. That is a payments
 * problem, and it is the shape Pepay already is.
 *
 * The transaction plays itself rather than sitting in five numbered blocks, so
 * the reader watches the causality instead of reconstructing it.
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
          support="An agent has no wallet it can open, no card it can hold and no legal entity to onboard as. What it has is an endpoint that can quote a price — and a rail that can settle it."
        />
        <Reveal delay={0.15}>
          <div className="flex items-center gap-2 lg:pb-2">
            <Status kind="soon" />
            <span className="text-[0.78rem] text-ink-4">MCP bridge · x402 Flex</span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} duration={1}>
        <AgentSequence className="mt-14" />
      </Reveal>

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
