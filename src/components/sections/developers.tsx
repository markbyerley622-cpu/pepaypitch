'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  API_FACTS,
  CODE_CREATE,
  CODE_CURL,
  CODE_WEBHOOK,
  CTA,
  DEVELOPER_POINTS,
  WEBHOOK_EVENTS,
} from '@/content/site'
import { Button, Item, Reveal, Section, SectionHead, Stagger } from '@/components/ui'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'sdk', label: 'SDK', lang: 'TypeScript', code: CODE_CREATE },
  { id: 'curl', label: 'HTTP', lang: 'cURL', code: CODE_CURL },
  { id: 'webhook', label: 'Webhook', lang: 'Node', code: CODE_WEBHOOK },
] as const

/**
 * The developer section.
 *
 * A developer is checking two things: how much code it takes, and whether the
 * boring parts are handled. So the snippet is short enough to read in one pass,
 * and the facts beside it are the ones that decide an integration — auth,
 * idempotency, rate limits, signature scheme. All of them are quoted from
 * Pepay's own published API reference rather than rounded into marketing.
 *
 * The webhook tab shows verification rather than the happy path on purpose:
 * anyone who has shipped a payment integration knows that is where it goes
 * wrong, and showing it is a stronger signal than claiming it.
 */
export function Developers() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('sdk')
  const active = TABS.find((t) => t.id === tab)!

  return (
    <Section id="developers" tone="canvas" space="default">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ── argument ─────────────────────────────────────────────────── */}
        <div className="min-w-0">
          <SectionHead
            eyebrow="Developers"
            title="An invoice in four lines"
            support="Price in dollars, take any token, receive one. The API handles the routing, the confirmations and the receipt, and tells you about it over a signed webhook."
          />

          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-hairline pt-7">
              {API_FACTS.map((f) => (
                <div key={f.label}>
                  <dt className="pep-eyebrow text-ink-4">{f.label}</dt>
                  <dd
                    className={cn(
                      'mt-1.5 text-[0.88rem] font-medium text-ink',
                      f.mono && 'pep-mono text-[0.82rem]'
                    )}
                  >
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={CTA.docs.href} external>
                {CTA.docs.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-pep group-hover/btn:translate-x-0.5" />
              </Button>
              <Button href="https://github.com/pepaylabs" external variant="secondary">
                GitHub
              </Button>
            </div>
          </Reveal>
        </div>

        {/* ── the code ─────────────────────────────────────────────────── */}
        {/* min-w-0 keeps the long curl lines inside the <pre>'s own scroller
            rather than letting them widen the whole page. */}
        <Reveal delay={0.12} duration={1} className="min-w-0">
          <div className="pep-card-3 overflow-hidden rounded-2xl">
            <div
              className="flex items-center gap-1 border-b border-hairline px-3 py-2.5"
              role="tablist"
              aria-label="Integration examples"
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={t.id === tab}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-[0.8rem] font-medium',
                    'transition-colors duration-300 ease-pep',
                    t.id === tab
                      ? 'bg-surface-2 text-ink'
                      : 'text-ink-3 hover:bg-surface-2/60 hover:text-ink-2'
                  )}
                >
                  {t.label}
                </button>
              ))}
              <span className="pep-mono ml-auto pr-2 text-[0.7rem] text-ink-4">{active.lang}</span>
            </div>

            {/* Horizontal scroll is contained here rather than allowed to push
                the page wide — long lines are the norm in a curl example. */}
            <div className="overflow-x-auto">
              <pre className="pep-mono min-w-max px-5 py-5 text-[0.78rem] leading-[1.75] text-ink-2">
                <code>{active.code}</code>
              </pre>
            </div>

            <div className="border-t border-hairline bg-surface-2/50 px-5 py-4">
              <span className="pep-eyebrow text-ink-4">Webhook events</span>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {WEBHOOK_EVENTS.map((e) => (
                  <li key={e.name} className="flex items-baseline gap-2">
                    <code className="pep-mono shrink-0 text-[0.75rem] text-accent2">{e.name}</code>
                    <span className="text-[0.75rem] text-ink-4">{e.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── what is handled for you ─────────────────────────────────────── */}
      <Stagger className="mt-14 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
        {DEVELOPER_POINTS.map((p) => (
          <Item key={p.title}>
            <div className="border-t border-hairline pt-5">
              <h3 className="text-[0.95rem] font-semibold text-ink">{p.title}</h3>
              <p className="pep-pretty mt-2 text-[0.85rem] leading-relaxed text-ink-3">
                {p.detail}
              </p>
            </div>
          </Item>
        ))}
      </Stagger>
    </Section>
  )
}
