import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { APPS } from '@/content/site'
import { Item, Section, SectionHead, Stagger, Status } from '@/components/ui'
import { LazyVideo } from '@/components/product/lazy-video'
import { cn } from '@/lib/utils'

/**
 * Applications built on the rail.
 *
 * The argument this section makes is not "look how many products we have" — it
 * is that the same infrastructure carries a merchant dashboard, a developer
 * API, a retail checkout and a creator tip jar without any of them being a
 * special case. That is the case for calling it infrastructure at all.
 *
 * Cards with a recording play it; the rest show their mark. Nothing is given a
 * fake screenshot to fill the slot.
 */
export function Apps() {
  return (
    <Section id="apps" tone="canvas" space="default">
      <SectionHead
        eyebrow="Built on Pepay"
        title="One rail, four very different products"
        support="Pepay Labs runs these on its own infrastructure. Same settlement, same ledger, same webhooks."
      />

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
        {APPS.map((a) => {
          const Tag = a.href ? 'a' : 'div'
          return (
            <Item key={a.id} className="h-full">
              <Tag
                {...(a.href
                  ? {
                      href: a.href,
                      ...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                    }
                  : {})}
                className={cn(
                  'pep-card-2 group flex h-full flex-col overflow-hidden rounded-2xl',
                  a.href &&
                    'transition-[transform,box-shadow,border-color] duration-500 ease-pep hover:-translate-y-1 hover:border-pep-500/25 hover:shadow-e3'
                )}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas-2">
                  <div
                    aria-hidden
                    className={cn(
                      'absolute inset-0 z-10 bg-gradient-to-br opacity-60 dark:opacity-35',
                      a.tint
                    )}
                  />
                  {a.video ? (
                    <LazyVideo
                      src={a.video}
                      poster="/images/reel-protocol-cover.jpg"
                      label={`${a.name}: ${a.description}`}
                      className="absolute inset-0"
                    />
                  ) : (
                    <Image
                      src={a.icon}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute right-3 top-3 z-20 rounded-full bg-canvas/85 backdrop-blur-sm">
                    <Status kind={a.status} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[1.05rem] font-semibold leading-snug text-ink">{a.name}</h3>
                    {a.href ? (
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-4 transition-[transform,color] duration-300 ease-pep group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent2" />
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-[0.8rem] font-medium text-accent2">{a.subtitle}</p>
                  <p className="pep-pretty mt-3 text-[0.86rem] leading-relaxed text-ink-3">
                    {a.description}
                  </p>
                </div>
              </Tag>
            </Item>
          )
        })}
      </Stagger>
    </Section>
  )
}
