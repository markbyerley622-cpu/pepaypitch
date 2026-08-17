'use client'

/**
 * The Streams chapter player.
 *
 * Split out of the section so the section itself can stay a server component.
 * Only the tab state and the crossfade need to run in the browser; the heading,
 * the copy and the disclosures do not, and shipping them to the client was
 * paying for interactivity that nothing there uses.
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STREAM_CHAPTERS } from '@/content/site'
import { EASE } from '@/components/ui/motion'
import { cn } from '@/lib/utils'

export function StreamPlayer({ className }: { className?: string }) {
  const [active, setActive] = useState(0)
  const chapter = STREAM_CHAPTERS[active]

  return (
    <div className={cn('grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-10', className)}>
      <div className="min-w-0">
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
                // contain, not cover: these are screen recordings of a real
                // interface, and cropping them to fill a 16:10 box cuts the
                // navigation and left column off the product being shown.
                className="absolute inset-0 h-full w-full object-contain"
              />
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-hairline px-5 py-4">
            <div className="min-w-0">
              <div className="text-[0.95rem] font-semibold text-ink">{chapter.label}</div>
              <p className="truncate text-[0.8rem] text-ink-3">{chapter.caption}</p>
            </div>
            <span className="pep-mono shrink-0 text-[0.72rem] text-ink-4">
              {String(active + 1).padStart(2, '0')} /{' '}
              {String(STREAM_CHAPTERS.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="min-w-0">
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
                'transition-[background-color,border-color] duration-400 ease-pep',
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
      </div>
    </div>
  )
}
