import Image from 'next/image'
import { PRODUCTS } from '@/content/site'
import { Card, Item, Section, SectionHead, Stagger, Status } from '@/components/ui'
import { cn } from '@/lib/utils'

/**
 * The product surface.
 *
 * Every card carries its shipped state, and the grid is ordered so the live
 * ones come first. That ordering is doing real work: a reader who scans only
 * the top row sees what exists today, and a reader who reaches the bottom finds
 * what is coming clearly labelled as such rather than mixed in.
 *
 * The first card spans two columns on wide viewports so the row has a lead
 * rather than reading as eight identical tiles.
 */
export function Products() {
  return (
    <Section id="products" tone="raised" space="default">
      <SectionHead
        eyebrow="Products"
        title="Everything you need to take money and keep the books"
        support="Each of these is a surface on the same rail — the same tokens, the same settlement preference, the same ledger and the same webhook stream."
      />

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
        {PRODUCTS.map((p, i) => (
          <Item key={p.id} className={cn('h-full', i === 0 && 'lg:col-span-2')}>
            <Card
              elevation={2}
              interactive
              className={cn(
                'group flex h-full overflow-hidden',
                i === 0 ? 'flex-col sm:flex-row' : 'flex-col'
              )}
            >
              {p.image ? (
                <div
                  className={cn(
                    'relative shrink-0 overflow-hidden',
                    i === 0
                      ? 'aspect-[16/10] w-full border-b border-hairline sm:aspect-auto sm:w-[46%] sm:border-b-0 sm:border-r'
                      : 'aspect-[16/9] w-full border-b border-hairline'
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      'absolute inset-0 z-10 bg-gradient-to-br opacity-70',
                      'mix-blend-multiply dark:opacity-40 dark:mix-blend-screen',
                      p.tint
                    )}
                  />
                  <Image
                    src={p.image}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="scale-110 object-cover transition-transform ease-pep [transition-duration:900ms] group-hover:scale-[1.16] motion-safe:animate-pep-kenburns"
                    style={{ animationDelay: `${(i % 5) * -3.4}s` }}
                  />
                  {/* The badge tones are translucent by design, which reads
                      fine on a surface and not at all on the brighter product
                      art. An opaque backing restores the contrast without
                      giving this one badge a different shape to every other. */}
                  <div className="absolute right-3 top-3 z-20 rounded-full bg-canvas/85 backdrop-blur-sm">
                    <Status kind={p.status} />
                  </div>
                </div>
              ) : null}

              <div className={cn('flex flex-1 flex-col p-6', i === 0 && 'justify-center sm:p-8')}>
                <h3
                  className={cn(
                    'font-semibold leading-snug tracking-[-0.015em] text-ink',
                    i === 0 ? 'text-[1.4rem]' : 'text-[1.0625rem]'
                  )}
                >
                  {p.name}
                </h3>
                <p className="mt-1 text-[0.82rem] font-medium text-accent2">{p.summary}</p>
                <p className="pep-pretty mt-3 text-[0.88rem] leading-relaxed text-ink-3">
                  {p.detail}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-md border border-hairline bg-surface-2 px-2 py-1 text-[0.7rem] font-medium text-ink-3"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Item>
        ))}
      </Stagger>
    </Section>
  )
}
