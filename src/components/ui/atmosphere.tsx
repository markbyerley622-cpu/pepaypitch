import { cn } from '@/lib/utils'

/**
 * Section backdrops.
 *
 * Three treatments and no more. The brief this design language was written
 * against is explicit that the page must not become gradient soup, so depth
 * comes from a graph-paper grid and at most one soft light — never from a
 * full-bleed mesh behind every band.
 *
 * All of these are pure CSS on the compositor (transform and opacity only), so
 * a backdrop costs one layer rather than a repaint per frame.
 */

/** Engineering graph paper, faded out at the edges. Reads as precision. */
export function Gridlines({
  className,
  fade = 'radial',
}: {
  className?: string
  fade?: 'radial' | 'bottom' | 'none'
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 pep-gridlines',
        fade === 'radial' && 'pep-mask-radial',
        fade === 'bottom' && 'pep-mask-b',
        className
      )}
    />
  )
}

/**
 * One drifting light. Deliberately singular — the moment a section carries two
 * of these it stops reading as a lit room and starts reading as a lava lamp.
 */
export function Aurora({
  className,
  tone = 'accent',
  size = 'lg',
}: {
  className?: string
  tone?: 'accent' | 'violet'
  size?: 'md' | 'lg'
}) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className={cn(
          'absolute rounded-full blur-[110px] pep-gpu',
          size === 'lg' ? 'h-[46rem] w-[46rem]' : 'h-[30rem] w-[30rem]',
          tone === 'accent' ? 'bg-pep-500/18 dark:bg-pep-500/22' : 'bg-violet-500/12 dark:bg-violet-500/18',
          '-top-1/3 left-1/2 -translate-x-1/2'
        )}
        style={{ animation: 'pep-aurora-1 26s ease-in-out infinite' }}
      />
    </div>
  )
}

/** A hairline that glows at the top edge of a dark band. */
export function EdgeGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 h-px',
        'bg-gradient-to-r from-transparent via-pep-500/40 to-transparent',
        className
      )}
    />
  )
}

/** Vignette that seats a full-bleed visual into the page rather than on it. */
export function Vignette({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0',
        'bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(var(--pep-canvas))_100%)]',
        className
      )}
    />
  )
}
