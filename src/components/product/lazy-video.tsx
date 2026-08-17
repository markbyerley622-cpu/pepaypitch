'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * A video that costs nothing until it is nearly on screen.
 *
 * The page carries several product reels. Letting all of them start fetching on
 * load would spend most of the byte budget on media the reader may never scroll
 * to, so the <source> is withheld until an observer says the element is close,
 * and the poster carries the frame until then.
 *
 * `srcSm` is used below 640px where one exists — a phone should not spend a
 * desktop encode's bytes to watch a decorative loop.
 */
export function LazyVideo({
  src,
  srcSm,
  poster,
  label,
  className,
  rootMargin = '300px',
}: {
  src: string
  srcSm?: string
  poster: string
  /** Describes the recording for anyone who cannot see it. */
  label: string
  className?: string
  rootMargin?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoad(true)
          io.disconnect()
        }
      },
      { rootMargin }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  // Chosen once on mount rather than through a media query on <source>, because
  // Safari caches the first matched source and never re-evaluates it.
  const chosen =
    srcSm && typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches
      ? srcSm
      : src

  return (
    <video
      ref={ref}
      poster={poster}
      src={load ? chosen : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={cn('h-full w-full object-cover', className)}
    />
  )
}
