/**
 * Number and date formatting.
 *
 * Every figure the site renders passes through here. The proof section states
 * real ledger numbers, so how they are rounded is part of the claim — a
 * "$19.9M" that rounds from $19,903,879.95 is honest, one that rounds from
 * $19.4M is not. Compact forms therefore always ship the exact value alongside
 * them somewhere on the page.
 */

/** Full dollars, grouped. `decimals` for tickets and averages. */
export function usd(value: number, decimals = 0): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** $19.9M / $3.06M / $482K. One decimal below 100, none above. */
export function usdCompact(value: number): string {
  const { prefix, value: n, suffix, digits } = splitCompact(value)
  return `${prefix}${n.toFixed(digits)}${suffix}`
}

/**
 * Compact currency broken into its parts, so a <Counter> can animate the
 * numeral while the prefix and suffix stay put. Animating "$19.9M" as one
 * string makes the M jump around as the digits tick.
 */
export function splitCompact(value: number): {
  prefix: string
  value: number
  suffix: string
  digits: number
} {
  const abs = Math.abs(value)
  if (abs >= 1_000_000_000)
    return { prefix: '$', value: value / 1_000_000_000, suffix: 'B', digits: 2 }
  if (abs >= 1_000_000)
    return { prefix: '$', value: value / 1_000_000, suffix: 'M', digits: abs >= 100_000_000 ? 0 : 1 }
  if (abs >= 1_000) return { prefix: '$', value: value / 1_000, suffix: 'K', digits: 0 }
  return { prefix: '$', value, suffix: '', digits: 0 }
}

/** Grouped integer. */
export function count(value: number): string {
  return Math.round(value).toLocaleString('en-US')
}

/** 75.9K / 1.2M. Used where the exact count is stated elsewhere. */
export function countCompact(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (abs >= 10_000) return `${(value / 1_000).toFixed(1)}K`
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return count(value)
}

/** 0.885 → "88.5%" */
export function pct(share: number, decimals = 1): string {
  return `${(share * 100).toFixed(decimals)}%`
}

/**
 * "1 Nov 2025". Parsed as UTC rather than local — the ledger dates are plain
 * `YYYY-MM-DD`, and letting the runtime apply a timezone shifts them a day
 * backwards for anyone west of Greenwich.
 */
export function shortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** "Nov 2025" — for the monthly axis. */
export function monthLabel(iso: string): string {
  const [y, m] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, (m ?? 1) - 1, 1)).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
