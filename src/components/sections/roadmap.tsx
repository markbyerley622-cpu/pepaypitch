import Image from 'next/image'
import { PARTNERS, ROADMAP } from '@/content/site'
import { Item, Reveal, Section, SectionHead, Stagger, Status } from '@/components/ui'
import { cn } from '@/lib/utils'

/**
 * Roadmap.
 *
 * The site's forward-looking claims, gathered in one place and each carrying a
 * status. Keeping them together rather than sprinkling "coming soon" through
 * the product copy is what lets the rest of the page state things plainly — a
 * reader who wants to know what is real has one section to read.
 *
 * `vision` items get no item chips on purpose. A list of sub-features under a
 * direction reads as a plan, and it is not one.
 */
export function Roadmap() {
  return (
    <Section id="roadmap" tone="raised" space="default">
      <SectionHead
        eyebrow="Roadmap"
        title="What is shipped, what is next, and what is only a direction"
        support="Three states and no others. Live means it runs in production and shows up in the ledger. Coming means built and demonstrable but not launched. Vision means direction, and is never sold as a product."
      />

      <Stagger className="mt-14 grid gap-4 lg:grid-cols-5" gap={0.07}>
        {ROADMAP.map((s) => (
          <Item key={s.title} className="h-full">
            <div
              className={cn(
                'flex h-full flex-col rounded-2xl border p-6',
                s.status === 'vision'
                  ? 'border-dashed border-hairline-2 bg-transparent'
                  : 'pep-card-2 border-hairline'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="pep-eyebrow text-ink-4">{s.period}</span>
                <Status kind={s.status} />
              </div>

              <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug text-ink">{s.title}</h3>
              <p className="pep-pretty mt-2.5 flex-1 text-[0.85rem] leading-relaxed text-ink-3">
                {s.detail}
              </p>

              {s.items ? (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-md border border-hairline bg-surface-2 px-2 py-0.5 text-[0.68rem] font-medium text-ink-4"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Item>
        ))}
      </Stagger>

      {/* ── backing ─────────────────────────────────────────────────────── */}
      <Reveal delay={0.2}>
        <div className="mt-20 border-t border-hairline pt-10">
          <p className="pep-eyebrow text-center text-ink-4">Backed and accelerated by</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
            {PARTNERS.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2.5">
                <div className="flex h-9 items-center">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={140}
                    height={36}
                    style={{ transform: `scale(${p.scale})` }}
                    className={cn(
                      'max-h-9 w-auto object-contain opacity-75 transition-opacity duration-500 ease-pep hover:opacity-100',
                      p.invertOnDark && 'dark:invert'
                    )}
                  />
                </div>
                <span className="text-[0.72rem] text-ink-4">{p.description}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
