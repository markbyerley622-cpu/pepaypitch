/**
 * Layout, surface and atom primitives.
 *
 * These are the building blocks every section composes from. Nothing in a
 * section file may hardcode a colour, a radius or a page gutter — if a value
 * needs to exist in two places it belongs here.
 */
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal, WordReveal } from './motion'

/* ------------------------------------------------------------------ layout */

/**
 * The page gutter. Every full-width band renders its own <Shell> so background
 * treatments can bleed to the viewport edge while content stays aligned to one
 * measure across the entire page.
 */
export function Shell({
  children,
  className,
  wide = false,
}: {
  children: ReactNode
  className?: string
  wide?: boolean
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-12',
        wide ? 'max-w-[1560px]' : 'max-w-shell',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * A narrative band. Vertical rhythm is fixed here rather than per section, so
 * the page cannot drift out of tune one section at a time.
 */
export function Section({
  id,
  children,
  className,
  backdrop,
  tone = 'canvas',
  space = 'default',
  wide = false,
}: {
  id?: string
  children: ReactNode
  className?: string
  /** Rendered behind the content, full bleed. */
  backdrop?: ReactNode
  tone?: 'canvas' | 'raised' | 'none'
  space?: 'tight' | 'default' | 'wide' | 'none'
  wide?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        // scroll-mt clears the fixed header, so an anchor jump lands on the
        // section's heading rather than tucking it behind the nav.
        'relative w-full scroll-mt-24',
        tone === 'canvas' && 'bg-canvas',
        tone === 'raised' && 'bg-canvas-2',
        space === 'tight' && 'py-14 sm:py-16 lg:py-20',
        space === 'default' && 'py-20 sm:py-24 lg:py-32',
        space === 'wide' && 'py-24 sm:py-32 lg:py-44',
        className
      )}
    >
      {backdrop}
      <Shell wide={wide} className="relative z-10">
        {children}
      </Shell>
    </section>
  )
}

/**
 * Section heading.
 *
 * Deliberately rigid: an eyebrow, one headline, one support line, and an
 * optional slot beneath. There is no third text block, because the brief that
 * matters most here is "reduce text".
 */
export function SectionHead({
  eyebrow,
  title,
  support,
  align = 'left',
  size = 'section',
  className,
  children,
}: {
  eyebrow?: ReactNode
  /** A string gets the word-by-word reveal; a node is revealed as one block. */
  title: ReactNode
  support?: ReactNode
  align?: 'left' | 'center'
  size?: 'section' | 'sub'
  className?: string
  children?: ReactNode
}) {
  const centered = align === 'center'
  const headingClass = cn(
    'pep-display text-ink',
    size === 'section'
      ? 'text-[clamp(2rem,4.2vw,3.4rem)]'
      : 'text-[clamp(1.5rem,2.6vw,2.1rem)]',
    centered ? 'max-w-[22ch]' : 'max-w-[20ch]'
  )

  return (
    <div className={cn(centered && 'flex flex-col items-center text-center', className)}>
      {eyebrow ? (
        <Reveal>
          <Eyebrow className={cn('mb-5', centered && 'justify-center')}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      {/* Headlines assemble word by word; everything else on the page fades or
          rises. Giving the heading its own gesture is what stops each section
          from arriving in exactly the same way as the last. */}
      {typeof title === 'string' ? (
        <h2 className={headingClass}>
          <WordReveal text={title} delay={0.04} />
        </h2>
      ) : (
        <Reveal delay={0.05} duration={0.9} y={24} blur={7}>
          <h2 className={headingClass}>{title}</h2>
        </Reveal>
      )}

      {support ? (
        <Reveal delay={0.16} duration={0.85}>
          <p
            className={cn(
              'pep-pretty mt-5 text-[clamp(0.98rem,1.15vw,1.15rem)] leading-relaxed text-ink-3',
              'max-w-[56ch]'
            )}
          >
            {support}
          </p>
        </Reveal>
      ) : null}

      {children ? (
        <Reveal delay={0.26} duration={0.8}>
          <div className="mt-8">{children}</div>
        </Reveal>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------- atoms */

export function Eyebrow({
  children,
  className,
  tone = 'accent',
}: {
  children: ReactNode
  className?: string
  tone?: 'accent' | 'mute'
}) {
  return (
    <div className={cn('pep-eyebrow flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className={cn('h-px w-6 shrink-0', tone === 'accent' ? 'bg-accent2' : 'bg-ink-4')}
      />
      <span className={tone === 'accent' ? 'text-accent2' : 'text-ink-3'}>{children}</span>
    </div>
  )
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'live' | 'bnb' | 'outline'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1',
        'text-[11px] font-medium leading-none tracking-wide',
        tone === 'neutral' && 'border-hairline bg-surface-2 text-ink-2',
        tone === 'outline' && 'border-hairline-2 bg-transparent text-ink-3',
        tone === 'accent' && 'border-pep-500/30 bg-pep-500/10 text-pep-600 dark:text-pep-300',
        tone === 'live' && 'border-live/30 bg-live/10 text-live',
        tone === 'bnb' && 'border-bnb/35 bg-bnb/10 text-[#a8810a] dark:text-bnb',
        className
      )}
    >
      {children}
    </span>
  )
}

/**
 * Shipped state. Three claims and only three, so they get a component instead
 * of ad-hoc copy — and only `live` gets a moving dot, because the thing that
 * actually exists is the only thing allowed to look active.
 */
export type StatusKind = 'live' | 'soon' | 'vision'

const STATUS_LABEL: Record<StatusKind, string> = {
  live: 'Live',
  soon: 'Coming',
  vision: 'Vision',
}

export function Status({
  kind,
  label,
  className,
}: {
  kind: StatusKind
  label?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'text-[10px] font-semibold uppercase leading-none tracking-[0.13em]',
        kind === 'live' && 'border-live/35 bg-live/10 text-live',
        kind === 'soon' && 'border-pep-500/30 bg-pep-500/10 text-pep-600 dark:text-pep-300',
        kind === 'vision' && 'border-hairline-2 bg-surface-2 text-ink-3',
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {kind === 'live' ? (
          <>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-live"
              style={{ animation: 'pep-pulse-ring 2.6s ease-out infinite' }}
            />
            <span className="relative h-1.5 w-1.5 rounded-full bg-live" />
          </>
        ) : (
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full border',
              kind === 'soon' ? 'border-pep-500 dark:border-pep-300' : 'border-ink-4'
            )}
          />
        )}
      </span>
      {label ?? STATUS_LABEL[kind]}
    </span>
  )
}

/** A token, with its mark when we ship one. */
export function TokenPill({
  symbol,
  icon,
  className,
}: {
  symbol: string
  icon?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface',
        'py-1 pl-1 pr-2.5 text-[11px] font-medium text-ink-2 shadow-e1',
        className
      )}
    >
      {icon ? (
        <img src={icon} alt="" aria-hidden className="h-4 w-4 rounded-full object-contain" />
      ) : (
        <span
          aria-hidden
          className="grid h-4 w-4 place-items-center rounded-full bg-pep-500/12 text-[8px] font-bold text-pep-600 dark:text-pep-300"
        >
          {symbol.slice(0, 1)}
        </span>
      )}
      {symbol}
    </span>
  )
}

/** A truncated on-chain address. */
export function WalletChip({ address, className }: { address: string; className?: string }) {
  const short = address.length > 13 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address
  return (
    <span
      className={cn(
        'pep-mono inline-flex items-center gap-1.5 rounded-md border border-hairline',
        'bg-surface-2 px-2 py-1 text-[11px] leading-none text-ink-3',
        className
      )}
      title={address}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-pep-500/60" />
      {short}
    </span>
  )
}

/* ---------------------------------------------------------------- surfaces */

type CardProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
  /** Elevation step. Three only. */
  elevation?: 1 | 2 | 3
  /** Lifts and deepens the shadow on hover. */
  interactive?: boolean
  inset?: boolean
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Card<T extends ElementType = 'div'>({
  as,
  children,
  className,
  elevation = 1,
  interactive = false,
  inset = false,
  ...rest
}: CardProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn(
        'relative rounded-2xl',
        elevation === 1 && 'pep-card',
        elevation === 2 && 'pep-card-2',
        elevation === 3 && 'pep-card-3',
        inset && 'p-6 sm:p-7',
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-500 ease-pep ' +
            'hover:-translate-y-1 hover:border-pep-500/25 hover:shadow-e3',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Frosted panel with a specular top edge. Used for anything that floats. */
export function GlassCard({
  children,
  className,
  sheen = true,
}: {
  children: ReactNode
  className?: string
  sheen?: boolean
}) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl pep-glass', sheen && 'pep-sheen', className)}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/** Full-bleed helper for visuals that must touch the viewport edge. */
export function Bleed({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative left-1/2 w-screen -translate-x-1/2', className)}>{children}</div>
  )
}

/** Hairline divider that fades at both ends. */
export function Rule({ className }: { className?: string }) {
  return <div aria-hidden className={cn('pep-rule h-px w-full', className)} />
}

/* ---------------------------------------------------------------- controls */

/**
 * The site's only two button weights.
 *
 * Rendered as an <a> because every call to action on a marketing page is
 * navigation — there is no form here, and a <button> that navigates loses
 * middle-click, open-in-new-tab and the link's own context menu.
 */
export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  ...rest
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  className?: string
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'children' | 'className'>) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium',
        'transition-[transform,box-shadow,background-color,border-color] duration-300 ease-pep',
        'active:translate-y-px',
        size === 'sm' && 'px-4 py-2 text-[0.82rem]',
        size === 'md' && 'px-5 py-2.5 text-[0.9rem]',
        size === 'lg' && 'px-7 py-3.5 text-[0.98rem]',
        variant === 'primary' &&
          'bg-accent2 text-accent2-ink shadow-accent hover:-translate-y-0.5 hover:brightness-110',
        variant === 'secondary' &&
          'border border-hairline-2 bg-surface text-ink shadow-e1 hover:-translate-y-0.5 hover:border-pep-500/30 hover:shadow-e2',
        variant === 'ghost' && 'text-ink-2 hover:text-ink',
        className
      )}
      {...rest}
    >
      {children}
    </a>
  )
}
