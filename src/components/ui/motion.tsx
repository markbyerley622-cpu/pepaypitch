'use client'

/**
 * Motion primitives.
 *
 * One easing curve and one viewport trigger across the entire site.
 * Consistency is what makes motion read as a property of the product rather
 * than as a pile of separate animations.
 *
 * Carried over from the merchant dashboard's marketing surface unchanged apart
 * from the `'use client'` boundary — these all read layout or pointer state, so
 * none of them can render on the server.
 */
import { useEffect, useRef, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

/** Matches `ease-pep` in tailwind.config.js. Keep the two in step. */
export const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Fires slightly before the element is centred, so content has settled by the
 * time the reader's eye arrives. Triggering at dead centre reads as laggy.
 */
export const VIEWPORT = { once: true, margin: '-10% 0px -15% 0px' } as const

const rise = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/** One-off scroll reveal. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 20,
  blur = 5,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  blur?: number
  as?: 'div' | 'span' | 'li'
}) {
  const still = useReducedMotion()
  const M = motion[as]

  if (still) return <M className={className}>{children}</M>

  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VIEWPORT}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </M>
  )
}

/**
 * Headline reveal, word by word.
 *
 * Headlines assemble instead of fading, which is the difference between a page
 * that loads and a page that presents. Words are the unit, not characters:
 * per-character staggering on a display headline reads as a novelty typewriter,
 * and it fires dozens of animations where six will do.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const still = useReducedMotion()
  const words = text.split(' ')

  if (still) return <span className={className}>{text}</span>

  return (
    <motion.span
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        // Each word rides in its own overflow-hidden box, so it rises from
        // behind its own baseline rather than fading in place.
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/**
 * Clip-path wipe. Used on visuals rather than copy — an image that uncovers
 * itself has more presence than one that fades, and unlike opacity it does not
 * spend the first 300ms looking like a loading state.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  from = 'bottom',
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  from?: 'bottom' | 'left'
}) {
  const still = useReducedMotion()
  if (still) return <div className={className}>{children}</div>

  const hidden = from === 'bottom' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'

  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden, opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay, opacity: { duration: 0.4, delay } }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Button that leans toward the cursor and springs back on exit.
 *
 * Travel is capped at a few pixels. The effect only works while it stays below
 * conscious notice — a control that visibly chases the pointer stops feeling
 * responsive and starts feeling evasive.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  max = 7,
}: {
  children: ReactNode
  className?: string
  strength?: number
  max?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const still = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 })

  useEffect(() => {
    const el = ref.current
    if (!el || still) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const clamp = (v: number) => Math.max(-max, Math.min(max, v))

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mx.set(clamp((e.clientX - (r.left + r.width / 2)) * strength))
      my.set(clamp((e.clientY - (r.top + r.height / 2)) * strength))
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [mx, my, strength, max, still])

  if (still) return <span className={className}>{children}</span>

  return (
    <motion.span ref={ref} style={{ x, y }} className={cn('inline-block', className)}>
      {children}
    </motion.span>
  )
}

/** Reveals children on a ladder. Pair with <Item>. */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.07,
}: {
  children: ReactNode
  className?: string
  delay?: number
  gap?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function Item({
  children,
  className,
  duration = 0.75,
}: {
  children: ReactNode
  className?: string
  duration?: number
}) {
  return (
    <motion.div className={className} variants={rise} transition={{ duration, ease: EASE }}>
      {children}
    </motion.div>
  )
}

/**
 * Soft pointer parallax. Depth is in pixels of maximum travel — keep it under
 * ~10 or it stops reading as depth and starts reading as a gimmick.
 *
 * The listener is attached to the element rather than the window so idle
 * sections cost nothing.
 */
export function Parallax({
  children,
  depth = 6,
  className,
}: {
  children: ReactNode
  depth?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 110, damping: 20, mass: 0.4 })
  const y = useSpring(my, { stiffness: 110, damping: 20, mass: 0.4 })

  useEffect(() => {
    const el = ref.current
    if (!el || still) return

    // Coarse pointers have no hover position to track, and firing this on touch
    // scroll would fight the scroll itself.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mx.set(((e.clientX - r.left) / r.width - 0.5) * depth * 2)
      my.set(((e.clientY - r.top) / r.height - 0.5) * depth * 2)
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [depth, mx, my, still])

  if (still) return <div className={className}>{children}</div>

  return (
    <motion.div ref={ref} style={{ x, y }} className={cn('pep-gpu', className)}>
      {children}
    </motion.div>
  )
}

/**
 * Card that tilts toward the pointer. Used only on the hero cluster —
 * everywhere else it would be noise.
 */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 150, damping: 18, mass: 0.3 })
  const sy = useSpring(py, { stiffness: 150, damping: 18, mass: 0.3 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])

  useEffect(() => {
    const el = ref.current
    if (!el || still) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      px.set((e.clientX - r.left) / r.width - 0.5)
      py.set((e.clientY - r.top) / r.height - 0.5)
    }
    const onLeave = () => {
      px.set(0)
      py.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [px, py, still])

  if (still) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={cn('pep-gpu', className)}
    >
      {children}
    </motion.div>
  )
}

/**
 * Vertical drift tied to page scroll. `range` is the travel in pixels across
 * the element's full pass through the viewport.
 */
export function Drift({
  children,
  range = 40,
  className,
}: {
  children: ReactNode
  range?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [range, -range])

  if (still) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="pep-gpu">
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Counts to a number when it scrolls into view.
 *
 * Driven by rAF against a duration rather than by a spring, because the proof
 * figures need to land on their exact value — a spring that settles at
 * 19,903,878 undermines the section it is there to support.
 */
export function Counter({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1600,
  className,
}: {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const still = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const settle = () => {
      el.textContent = `${prefix}${to.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`
    }

    if (still) {
      settle()
      return
    }

    let raf = 0
    let start = 0
    let done = false

    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / duration)
      // Same curve as EASE, expressed as an ease-out so the count decelerates
      // into its final value instead of stopping dead.
      const eased = 1 - Math.pow(1 - p, 3)
      const v = to * eased
      el.textContent = `${prefix}${v.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`
      if (p < 1) raf = requestAnimationFrame(step)
      else settle()
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !done) {
          done = true
          raf = requestAnimationFrame(step)
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, decimals, prefix, suffix, duration, still])

  // Server render carries the final value, so the figure is in the HTML for
  // search engines and for anyone who never runs the script.
  return (
    <span ref={ref} className={cn('pep-num', className)}>
      {prefix}
      {to.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}
