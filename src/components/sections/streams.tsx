'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STREAM_CHAPTERS } from '@/content/site'
import { EASE, Reveal, Section, SectionHead, Status } from '@/components/ui'
import { cn } from '@/lib/utils'

/**
 * Pepay Streams.
 *
 * The videos are real captures of the built product, so this section shows them
 * rather than describing what they contain. Six chapters, one player: a gallery
 * of six simultaneous autoplaying videos would cost several megabytes and
 * deliver less, because nobody watches six things at once.
 *
 * Marked Coming and never Live. The contracts are deployed and demonstrable on
 * BSC testnet — that is a real thing to show and a different claim from
 * shipped, and the section says which.
 */
export function Streams() {
  const [active, setActive] = useState(0)
  const chapter = STREAM_CHAPTERS[active]

  return (
    <Section id="streams" tone="canvas" space="default">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <SectionHead
          eyebrow="Streams"
          title="Money that moves per second, not per invoice"
          support="A payment is one moment. A salary, a vesting schedule, a staking reward and an unlock are relationships — they have a duration. Streams makes duration a thing the rail can express."
        />
        <Reveal delay={0.15}>
          <div className="flex items-center gap-2 lg:pb-2">
            <Status kind="soon" />
            <span className="text-[0.78rem] text-ink-4">Contracts live on BSC testnet</span>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-10">
        {/* ── player ───────────────────────────────────────────────────── */}
        {/* min-w-0 on every grid child: a grid item defaults to min-width:auto,
            which lets the video's intrinsic width push the column past the
            viewport instead of shrinking to it. */}
        <Reveal duration={1} className="min-w-0">
          <div className="pep-card-3 relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/10] w-full bg-canvas-2">
              <AnimatePresence mode="wait">
                <motion.video
                  key={chapter.id}
                  src={chapter.video}
                  poster={chapter.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${chapter.label}: ${chapter.caption}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-hairline px-5 py-4">
              <div className="min-w-0">
                <div className="text-[0.95rem] font-semibold text-ink">{chapter.label}</div>
                <p className="truncate text-[0.8rem] text-ink-3">{chapter.caption}</p>
              </div>
              <span className="pep-mono shrink-0 text-[0.72rem] text-ink-4">
                {String(active + 1).padStart(2, '0')} / {String(STREAM_CHAPTERS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── chapters ─────────────────────────────────────────────────── */}
        <Reveal delay={0.15} className="min-w-0">
          <div
            className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Streams chapters"
          >
            {STREAM_CHAPTERS.map((c, i) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  'group relative shrink-0 rounded-xl border px-4 py-3.5 text-left',
                  'transition-[background-color,border-color,transform] duration-400 ease-pep',
                  'lg:w-full lg:shrink',
                  i === active
                    ? 'border-pep-500/35 bg-pep-500/[0.07]'
                    : 'border-hairline bg-surface hover:border-hairline-2 hover:bg-surface-2'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className={cn(
                      'h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-400',
                      i === active ? 'bg-accent2' : 'bg-ink-4/40'
                    )}
                  />
                  <span
                    className={cn(
                      'whitespace-nowrap text-[0.9rem] font-semibold transition-colors duration-400',
                      i === active ? 'text-ink' : 'text-ink-2'
                    )}
                  >
                    {c.label}
                  </span>
                </div>
                <p className="mt-1 hidden text-[0.76rem] leading-snug text-ink-4 lg:block">
                  {c.caption}
                </p>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <p className="mt-8 max-w-[64ch] text-[0.8rem] leading-relaxed text-ink-4">
          Recordings of the built product on testnet. Streams is not launched, and nothing in this
          section is counted in the settled volume shown further down the page.
        </p>
      </Reveal>
    </Section>
  )
}
