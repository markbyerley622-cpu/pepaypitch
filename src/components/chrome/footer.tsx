import Image from 'next/image'
import { BRAND, NAV, RESOURCES, SOCIAL } from '@/content/site'
import { TPV } from '@/content/metrics'
import { Shell } from '@/components/ui'
import { shortDate } from '@/lib/format'

/**
 * Footer.
 *
 * Carries the one disclosure that belongs at the bottom of the page rather than
 * inside a section: what the figures on it are, and when they were measured.
 * Every other caveat lives next to the claim it qualifies.
 */
export function Footer() {
  const year = new Date(TPV.generatedAt).getUTCFullYear()

  return (
    <footer className="border-t border-hairline bg-canvas-2">
      <Shell className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          {/* ── identity ─────────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image src={BRAND.logoRounded} alt="" width={30} height={30} className="rounded-lg" />
              <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-ink">
                {BRAND.name}
              </span>
            </div>
            <p className="pep-pretty mt-4 max-w-[38ch] text-[0.88rem] leading-relaxed text-ink-3">
              Open payment infrastructure for the agentic economy. Accept any token, settle in one,
              non-custodial throughout.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-[0.78rem] font-medium text-ink-2 transition-colors duration-300 ease-pep hover:border-pep-500/30 hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── navigation ───────────────────────────────────────────── */}
          <nav aria-label="Sections">
            <h2 className="pep-eyebrow text-ink-4">On this page</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV.map((n) => (
                <li key={n.title}>
                  <a
                    href={n.href}
                    className="text-[0.88rem] text-ink-3 transition-colors duration-300 hover:text-ink"
                  >
                    {n.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── resources ────────────────────────────────────────────── */}
          <nav aria-label="Resources">
            <h2 className="pep-eyebrow text-ink-4">Resources</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {RESOURCES.map((r) => (
                <li key={r.title}>
                  <a
                    href={r.href}
                    {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-[0.88rem] text-ink-3 transition-colors duration-300 hover:text-ink"
                  >
                    {r.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-[0.88rem] text-ink-3 transition-colors duration-300 hover:text-ink"
                >
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* ── disclosure ─────────────────────────────────────────────── */}
        <div className="mt-14 border-t border-hairline pt-8">
          <p className="max-w-[86ch] text-[0.73rem] leading-relaxed text-ink-4">
            Volume, transaction and wallet figures on this page are derived from Pepay&apos;s
            settled transaction ledger for the period {shortDate(TPV.range.first)} to{' '}
            {shortDate(TPV.range.last)}, regenerated {TPV.updateCadence}. They are a periodic
            snapshot rather than a live feed. Pepay Labs is not a bank, holds no banking licence
            and operates no fiat rails; on- and off-ramps are stated on this page as direction, not
            product. Smart contracts are MIT licensed and queued for audit with CertiK — no
            completed audit report is published yet.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[0.78rem] text-ink-4">
              © {year} {BRAND.legalName}
            </span>
            <span className="pep-mono text-[0.72rem] text-ink-4">MIT licensed</span>
          </div>
        </div>
      </Shell>
    </footer>
  )
}
