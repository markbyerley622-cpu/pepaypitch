'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { BRAND, CTA, NAV } from '@/content/site'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

/**
 * Fixed header.
 *
 * Transparent over the hero and frosted once the page has moved, so the hero
 * reads full-bleed but the nav never sits illegibly on top of a product
 * screenshot further down.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A fixed-position sheet over a scrollable body scrolls the page behind it,
  // so the body is locked for as long as the sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-pep',
          scrolled
            ? 'border-b border-hairline bg-canvas/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-shell items-center gap-6 px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Pepay home">
            <Image
              src={BRAND.logoRounded}
              alt=""
              width={30}
              height={30}
              className="rounded-lg"
              priority
            />
            <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-ink">
              {BRAND.name}
            </span>
          </a>

          <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.title}
                href={n.href}
                className="rounded-full px-3.5 py-2 text-[0.875rem] font-medium text-ink-2 transition-colors duration-300 ease-pep hover:bg-surface-2 hover:text-ink"
              >
                {n.title}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
            <ThemeToggle />
            <Button
              href={CTA.docs.href}
              external
              variant="secondary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Docs
            </Button>
            <Button href={CTA.primary.href} external size="sm" className="hidden sm:inline-flex">
              {CTA.primary.label}
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-hairline bg-surface text-ink-2 shadow-e1 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet. Full height rather than a dropdown — a five-item menu in
          a 200px panel leaves the CTAs cramped against the fold. */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          'transition-[opacity,visibility] duration-400 ease-pep',
          open ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div
          className="absolute inset-0 bg-canvas/95 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <nav
          className="relative flex h-full flex-col justify-center gap-1 px-8 pb-24"
          aria-label="Mobile"
        >
          {NAV.map((n, i) => (
            <a
              key={n.title}
              href={n.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
              className={cn(
                'pep-display border-b border-hairline py-4 text-[1.9rem] text-ink',
                'transition-[opacity,transform] duration-500 ease-pep',
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              )}
            >
              {n.title}
            </a>
          ))}

          <div className="mt-8 flex flex-col gap-3">
            <Button href={CTA.primary.href} external size="lg">
              {CTA.primary.label}
            </Button>
            <Button href={CTA.secondary.href} variant="secondary" size="lg">
              {CTA.secondary.label}
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}
