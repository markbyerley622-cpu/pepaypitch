/**
 * The proof numbers.
 *
 * Thin adapter over `src/data/tpv.json`, which the merchant dashboard
 * regenerates from the raw transaction export. Sections import from here rather
 * than from the JSON directly, so the shape the page depends on is declared in
 * one place and a change to the export cannot quietly reshape the UI.
 *
 * Nothing in this file is written by hand. If a number on the site is not
 * reachable from this module or from a cited external source, it does not go on
 * the site.
 */
import raw from '@/data/tpv.json'

type Bucket = {
  name: string
  volumeUsd: number
  revenueUsd: number
  transactions: number
  share: number
}

export type TpvData = {
  generatedAt: string
  updateCadence: string
  source: string
  totals: {
    volumeUsd: number
    revenueUsd: number
    netUsd: number
    transactions: number
    uniqueWallets: number
    avgTicketUsd: number
    takeRateBps: number
  }
  range: { first: string; last: string; days: number }
  growth: {
    last30dVolumeUsd: number
    prev30dVolumeUsd: number
    pct: number | null
    last30dTransactions: number
    prev30dTransactions: number
    transactionsPct: number | null
  }
  runRate: {
    volumeUsd: number
    transactions: number
    months: number
    transactionsGrowthPct: number | null
  }
  weekly: { week: string; volumeUsd: number; revenueUsd: number; transactions: number }[]
  monthly: { month: string; volumeUsd: number; revenueUsd: number; transactions: number }[]
  rails: Bucket[]
  chains: Bucket[]
  settlement: Bucket[]
  accepted: Bucket[]
}

export const TPV = raw as TpvData

/** Weekly volume, for the hero and proof charts. */
export const WEEKLY_VOLUME = TPV.weekly.map((w) => w.volumeUsd)

export const WEEKLY_TRANSACTIONS = TPV.weekly.map((w) => w.transactions)
export const WEEKLY_REVENUE = TPV.weekly.map((w) => w.revenueUsd)

/** Chains we have actually settled volume on, largest first. */
export const CHAINS = TPV.chains.map((c) => c.name)

/** Stablecoins merchants settle into today. */
export const SETTLEMENT_TOKENS = TPV.settlement.map((s) => s.name)

/** Token marks we ship, keyed by the symbol the export uses. */
const TOKEN_ICON: Record<string, string> = {
  USDC: '/brand/token/usdc.png',
  USDT: '/brand/token/usdt.png',
  USD1: '/brand/token/USD1.png',
  BNB: '/brand/token/bnblogo.png',
  WBNB: '/brand/token/bnblogo.png',
}

export const tokenIcon = (symbol: string): string | undefined => TOKEN_ICON[symbol]

/**
 * The accepted tokens we actually ship a mark for, largest first.
 *
 * Surfaces that show tokens as a row of coins use this rather than the raw
 * top-N. A lettered fallback circle sitting next to three real token marks
 * reads as a missing asset, not as a design choice, and one broken-looking coin
 * undoes the credibility the whole row is there to build. The full list still
 * appears as a count.
 */
export const MARKED_TOKENS = (() => {
  // Deduplicated by mark, not by symbol. BNB and WBNB are different tokens in
  // the ledger but ship the same logo, so an overlapping coin row rendered the
  // identical circle twice — which reads as a duplication bug rather than as
  // two assets. The count beside the row still reflects every accepted token.
  const seen = new Set<string>()
  return TPV.accepted
    .filter((a) => {
      const icon = TOKEN_ICON[a.name]
      if (!icon || seen.has(icon)) return false
      seen.add(icon)
      return true
    })
    .map((a) => a.name)
})()

/** Distinct tokens accepted, for the "accept anything" claim. */
export const ACCEPTED_TOKENS = TPV.accepted.map((a) => ({
  symbol: a.name,
  icon: tokenIcon(a.name),
  share: a.share,
}))

/**
 * Transaction growth across whole calendar months, ready for a <Delta>.
 *
 * This is the one growth figure the site states, and it is deliberately the
 * count rather than the volume. Volume has held a flat ~$3M monthly run-rate,
 * so a 30-day volume delta is just noise around a stable number — whereas
 * transaction count has genuinely climbed. Partial first and last months are
 * excluded upstream so the comparison is like-for-like.
 *
 * Null when there are not two whole months to compare, in which case the caller
 * renders nothing rather than inventing a trend.
 */
const growthPct = TPV.runRate.transactionsGrowthPct

export const TX_GROWTH =
  growthPct === null
    ? null
    : {
        value: `${growthPct > 0 ? '+' : ''}${growthPct.toFixed(0)}%`,
        direction:
          growthPct > 1 ? ('up' as const) : growthPct < -1 ? ('down' as const) : ('flat' as const),
      }

/** The steady-state monthly figure the hero leads with. */
export const RUN_RATE = TPV.runRate
