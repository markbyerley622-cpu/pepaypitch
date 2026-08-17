'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ROTATING } from '@/content/site'
import { EASE } from '@/components/ui/motion'

/**
 * The rotating audience line.
 *
 * One phrase swapping in place rather than a typewriter: a caret that types out
 * six words costs three seconds of the reader's attention to deliver two, and
 * the hero has better things to spend that on.
 *
 * The box is sized to the longest phrase so the line beside it never reflows as
 * the text changes.
 */
export function Rotator() {
  const [i, setI] = useState(0)
  const still = useReducedMotion()

  useEffect(() => {
    if (still) return
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2600)
    return () => clearInterval(t)
  }, [still])

  return (
    <span className="relative inline-grid">
      {/* Reserves the widest phrase's width without rendering it visibly. */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap font-medium">
        {ROTATING.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>

      <span className="col-start-1 row-start-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={ROTATING[i]}
            initial={still ? false : { y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={still ? undefined : { y: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="block whitespace-nowrap font-medium text-accent2"
          >
            {ROTATING[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
