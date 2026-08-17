import { Reveal, Section, SectionHead, Status } from '@/components/ui'
import { StreamDuration } from '@/components/product/stream-duration'
import { StreamPlayer } from '@/components/product/stream-player'

/**
 * Pepay Streams.
 *
 * Leads with the idea, not the footage. The distinction the section has to land
 * — a payment is an event, a stream is a relationship with a length — is
 * carried by the duration diagram, and the recordings then prove it was built.
 * Doing it the other way round asks the reader to infer the concept from a
 * screen capture, which is the wrong job for a video.
 *
 * A server component: only the duration diagram and the chapter player need the
 * browser, and both are their own client islands.
 *
 * Marked Coming and never Live. The contracts are deployed and demonstrable on
 * BSC testnet, which is a real thing to show and a different claim from
 * shipped — the section says which, twice.
 */
export function Streams() {
  return (
    <Section id="streams" tone="canvas" space="default">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <SectionHead
          eyebrow="Streams"
          title="A payment is a moment. A salary is a relationship."
          support="Payroll, vesting, locks and rewards all have a duration. Streams makes duration something the rail can express — money moving per second, with no invoice in the loop."
        />
        <Reveal delay={0.15}>
          <div className="flex items-center gap-2 lg:pb-2">
            <Status kind="soon" />
            <span className="text-[0.78rem] text-ink-4">Contracts live on BSC testnet</span>
          </div>
        </Reveal>
      </div>

      {/* ── the idea ─────────────────────────────────────────────────────── */}
      <Reveal delay={0.1} duration={1}>
        <StreamDuration className="mt-14" />
      </Reveal>

      {/* ── the evidence ─────────────────────────────────────────────────── */}
      <Reveal delay={0.1} duration={1}>
        <StreamPlayer className="mt-16" />
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-8 max-w-[64ch] text-[0.8rem] leading-relaxed text-ink-4">
          Recordings of the built product on testnet. Streams is not launched, and nothing in this
          section is counted in the settled volume shown elsewhere on this page.
        </p>
      </Reveal>
    </Section>
  )
}
