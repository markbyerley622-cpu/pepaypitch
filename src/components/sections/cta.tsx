import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { AUDIENCES, CTA as ACTIONS } from '@/content/site'
import { Button, Item, Reveal, Section, Stagger, WordReveal } from '@/components/ui'
import { Aurora, Gridlines } from '@/components/ui/atmosphere'
import { Converge } from '@/components/product/converge'

/**
 * The close.
 *
 * Operational rather than rousing. "Ready to revolutionise payments?" asks the
 * reader to feel something; a row of four routes asks them to do something, and
 * by this point in the page they know which of the four they are.
 */
export function Cta() {
  return (
    <Section
      tone="canvas"
      space="wide"
      backdrop={
        <>
          <Gridlines fade="radial" />
          <Aurora />
        </>
      }
    >
      {/* Everything the page has shown, put back on one rail before the ask. */}
      <Reveal duration={1}>
        <Converge className="mx-auto mb-16 max-w-2xl" />
      </Reveal>

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="pep-display text-[clamp(2.2rem,5vw,3.6rem)] text-ink">
          <WordReveal text="Build with Pepay." />
        </h2>
        <Reveal delay={0.2}>
          <p className="pep-pretty mx-auto mt-5 max-w-[52ch] text-[clamp(1rem,1.25vw,1.15rem)] leading-relaxed text-ink-2">
            Take payment in any token, settle in the one you asked for, and reconcile it from a
            single ledger. Non-custodial from checkout through to settlement.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={ACTIONS.primary.href} external size="lg">
              {ACTIONS.primary.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-pep group-hover/btn:translate-x-0.5" />
            </Button>
            <Button href={ACTIONS.secondary.href} variant="secondary" size="lg">
              {ACTIONS.secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>

      {/* ── routes by audience ──────────────────────────────────────────── */}
      <Stagger className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {AUDIENCES.map((a) => (
          <Item key={a.who}>
            <a
              href={a.href}
              {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex h-full flex-col bg-surface p-7 transition-colors duration-400 ease-pep hover:bg-surface-2"
            >
              <span className="pep-eyebrow text-accent2">{a.who}</span>
              <p className="pep-pretty mt-3 flex-1 text-[0.98rem] font-medium leading-snug text-ink">
                {a.line}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-ink-3 transition-colors duration-300 group-hover:text-accent2">
                {a.cta}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-pep group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Item>
        ))}
      </Stagger>
    </Section>
  )
}
