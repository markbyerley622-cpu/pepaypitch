/**
 * Shipped state.
 *
 * Lives in `lib` rather than beside the <Status> component because the content
 * layer needs it too, and content must not import from the component barrel —
 * that edge closes a cycle (content → ui/index → primitives → motion → …) which
 * runs straight through a `'use client'` boundary and corrupts the RSC client
 * manifest at prerender.
 *
 * Three states and only three:
 *   live    runs in production today and shows up in the ledger
 *   soon    built and demonstrable, but not launched
 *   vision  a direction, never presented as a product
 */
export type StatusKind = 'live' | 'soon' | 'vision'

export const STATUS_LABEL: Record<StatusKind, string> = {
  live: 'Live',
  soon: 'Coming',
  vision: 'Vision',
}
