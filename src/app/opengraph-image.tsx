import { ImageResponse } from 'next/og'
import { TPV } from '@/content/metrics'
import { count, usdCompact } from '@/lib/format'

// Deliberately not `runtime = 'edge'`: the edge runtime opts this route out of
// static generation and, in this app, tripped the RSC client manifest during
// prerender. The card is generated once at build time on Node instead.
export const alt = 'Pepay — any token in, one stablecoin out'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The link preview.
 *
 * Composed rather than screenshotted, and built from the same ledger module the
 * page uses — so the figures in a Telegram or Slack unfurl cannot drift away
 * from the figures on the site. Only claims that appear on the page appear
 * here, and the date window comes with them for the same reason it does
 * everywhere else.
 *
 * Deliberately dark: this is what a link to Pepay should look like sitting in a
 * chat window, and the dark composition holds its own against the surrounding
 * message list far better than a light card does.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#06090f',
          padding: '68px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* one soft light, top-right, matching the site's single-aurora rule */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: 'radial-gradient(circle, rgba(59,130,246,0.30) 0%, rgba(59,130,246,0) 70%)',
            display: 'flex',
          }}
        />

        {/* wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            P
          </div>
          <div style={{ color: '#f0f5fb', fontSize: 30, fontWeight: 700, letterSpacing: -0.6 }}>
            Pepay
          </div>
        </div>

        {/* the statement */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#f0f5fb',
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -3.4,
              lineHeight: 1.02,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Any token in.</span>
            <span style={{ color: '#60a5fa' }}>One stablecoin out.</span>
          </div>
          <div style={{ color: '#7c8ca1', fontSize: 26, marginTop: 22, letterSpacing: -0.3 }}>
            Payment infrastructure for the on-chain economy
          </div>
        </div>

        {/* the evidence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 56 }}>
            <Figure value={usdCompact(TPV.totals.volumeUsd)} label="Settled volume" />
            <Figure value={count(TPV.totals.transactions)} label="Transactions" />
            <Figure value={count(TPV.totals.uniqueWallets)} label="Paying wallets" />
            <Figure value={TPV.chains.map((c) => c.name).join(' · ')} label="Chains" small />
          </div>
          {/* One expression, not text-plus-interpolation: satori counts each
              JSX child separately and rejects a <div> with more than one
              unless it declares display explicitly. */}
          <div style={{ color: '#566478', fontSize: 17 }}>
            {`Settled ledger · ${TPV.range.first} to ${TPV.range.last} · non-custodial`}
          </div>
        </div>
      </div>
    ),
    size
  )
}

function Figure({ value, label, small }: { value: string; label: string; small?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          color: '#f0f5fb',
          fontSize: small ? 26 : 44,
          fontWeight: 700,
          letterSpacing: -1.2,
          display: 'flex',
          alignItems: 'flex-end',
          height: 48,
        }}
      >
        {value}
      </div>
      <div style={{ color: '#7c8ca1', fontSize: 18, marginTop: 6 }}>{label}</div>
    </div>
  )
}
