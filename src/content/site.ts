/**
 * Every string the site renders.
 *
 * Sections stay pure presentation so copy can change without touching a
 * component. Three rules govern what may be written here:
 *
 *  1. No number is typed by hand. Figures come from `content/metrics.ts`,
 *     which reads the settled transaction ledger. The only exceptions are
 *     limits published in Pepay's own API docs, and they are cited inline.
 *  2. Every forward-looking claim carries a `status`. `live` means it runs in
 *     production today and shows up in the ledger; `soon` means built and
 *     demonstrable but not launched; `vision` means direction, and is never
 *     presented as a product.
 *  3. Pepay does not claim banking. There are no regulated banking partners,
 *     no bank accounts and no live fiat rails — fiat connectivity appears once,
 *     as `vision`, and says so in writing.
 *
 * Sources for the non-ledger facts:
 *   docs.pepay.io/developers/pepay-api  — auth, limits, webhook events
 *   pepay.io                            — positioning
 *   merchant dashboard openapi.json     — the shipped API surface
 */
import type { StatusKind } from '@/components/ui'

/* ──────────────────────────────────────────────────────────────── brand ─── */

export const BRAND = {
  name: 'Pepay',
  legalName: 'Pepay Labs',
  /**
   * The hero headline.
   *
   * Concrete over abstract. "Open payment infrastructure for the agentic
   * economy" is the meta description and the search-result line, but as a
   * headline it asks the reader to already know what that means. The mechanism
   * is the more arresting statement and it is the thing the ledger proves:
   * every payment arrives in whatever the payer held and leaves as the
   * stablecoin the merchant asked for.
   */
  headline: 'Any token in.\nOne stablecoin out.',
  /** Two lines, not five — the audience list is split off the headline. */
  support:
    'Payment infrastructure for people, businesses and AI agents. Accept any token across EVM and Solana, settle in the stablecoin you asked for, and reconcile it all from one ledger.',
  /** Used for <title>, OG and the meta description. */
  metaTitle: 'Pepay — Open payment infrastructure for the agentic economy',
  metaDescription:
    'Accept any token across EVM and Solana and settle in the stablecoin you asked for. Invoices, subscriptions, checkout and webhooks — non-custodial, end to end.',
  mark: '/brand/pepay-mark.png',
  logoRounded: '/images/pepay-labs-rounded.png',
  wordmark: '/images/logo-written-no-art.png',
  email: 'contact@pepay.io',
} as const

/**
 * Rotating phrases under the headline.
 *
 * Carried over from the product's typewriter. The trailing emoji the original
 * shipped are gone: emoji render from whatever font the reader's OS supplies,
 * so the same line looked like a different product on every machine and none of
 * those glyphs matched the rest of the type.
 */
export const ROTATING = [
  'for AI agents',
  'with MCP',
  'in games',
  'for ecommerce',
  'for creators',
  'for marketplaces',
] as const

export const NAV = [
  { title: 'Products', href: '#products' },
  { title: 'Developers', href: '#developers' },
  { title: 'Streams', href: '#streams' },
  { title: 'Agents', href: '#agents' },
  { title: 'Proof', href: '#proof' },
] as const

export const CTA = {
  primary: { label: 'Start building', href: 'https://docs.pepay.io', external: true },
  secondary: { label: 'Talk to Pepay', href: 'mailto:contact@pepay.io', external: false },
  docs: { label: 'Read the docs', href: 'https://docs.pepay.io', external: true },
  dashboard: { label: 'Merchant dashboard', href: 'https://pepay-merchant-dashboard.vercel.app/', external: true },
} as const

export const SOCIAL = [
  { label: 'X', href: 'https://twitter.com/pepaylabs' },
  { label: 'GitHub', href: 'https://github.com/pepaylabs' },
  { label: 'Telegram', href: 'https://t.me/pepay' },
] as const

/* ────────────────────────────────────────────────────────────── the rail ─── */

/**
 * The payment lifecycle, described in the terms the transaction export uses.
 * Nothing here is aspirational — every step is a stage that shows up in the
 * data behind the proof section.
 */
export const PAYMENT_FLOW = [
  {
    key: 'request',
    title: 'Request',
    detail: 'A merchant or an agent creates an invoice denominated in dollars.',
  },
  {
    key: 'pay',
    title: 'Pay in any token',
    detail: 'The payer sends BNB, USDT, USDC, WETH — whatever they already hold.',
  },
  {
    key: 'route',
    title: 'Route',
    detail: 'Pepay picks the on-chain or cross-chain path per payment.',
  },
  {
    key: 'settle',
    title: 'Settle',
    detail: 'The merchant receives USDC or USD1. Non-custodial the whole way through.',
  },
  {
    key: 'reconcile',
    title: 'Reconcile',
    detail: 'Orders, balances and status land in one ledger a finance team can read.',
  },
] as const

/**
 * The contrast the rest of the page rests on. Each pair restates a claim the
 * product already makes elsewhere as a before/after, so the reader can see what
 * changes rather than being told.
 */
export const CONTRASTS = [
  {
    before: 'Hold whatever token the customer sent',
    after: 'Settle in the stablecoin you asked for',
  },
  {
    before: 'A different integration for every chain',
    after: 'One payment interface across all of them',
  },
  {
    before: 'Custody someone else’s funds to take a payment',
    after: 'Non-custodial from checkout through to settlement',
  },
  {
    before: 'Reconcile from block explorers and spreadsheets',
    after: 'One ledger your finance team can actually read',
  },
] as const

/* ─────────────────────────────────────────────────────────────── products ── */

export type Product = {
  id: string
  name: string
  summary: string
  detail: string
  status: StatusKind
  items: string[]
  image?: string
  tint: string
}

/**
 * The product surface, taken from the shipped API and dashboard rather than
 * from a marketing wish list. Everything marked `live` has endpoints behind it
 * in `openapi.json` and a route in the merchant dashboard.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'checkout',
    name: 'Checkout',
    summary: 'Dollar-precise payment pages',
    detail:
      'Hosted checkout and payment links priced in dollars. The payer picks any accepted token; you are quoted and settled in the stablecoin you chose.',
    status: 'live',
    items: ['Payment links', 'Hosted pages', 'Quotes', 'Tips'],
    image: '/images/image-pro-1.webp',
    tint: 'from-pep-500/25 to-transparent',
  },
  {
    id: 'invoices',
    name: 'Invoices',
    summary: 'Programmatic billing with receipts',
    detail:
      'Create, adjust and cancel invoices over the API. Line items, adjustments, per-customer history and totals, with verification against the chain.',
    status: 'live',
    items: ['Line items', 'Adjustments', 'Totals', 'Verify'],
    image: '/images/image-pro-2.webp',
    tint: 'from-emerald-500/20 to-transparent',
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    summary: 'Recurring revenue on-chain',
    detail:
      'Plans, checkout links and self-serve management links. Customers authorise once; charges, cancellations and revocations run against the same ledger.',
    status: 'live',
    items: ['Plans', 'Checkout links', 'Management links', 'Charges'],
    image: '/images/card-prod-3.PNG',
    tint: 'from-sky-500/20 to-transparent',
  },
  {
    id: 'commerce',
    name: 'Commerce',
    summary: 'Catalog, cart and orders',
    detail:
      'A full storefront surface — categories, items, variants and modifier groups, with carts, address capture, order status and bulk payment lookups.',
    status: 'live',
    items: ['Catalog', 'Carts', 'Orders', 'Search'],
    image: '/images/card-prod-5.PNG',
    tint: 'from-indigo-500/20 to-transparent',
  },
  {
    id: 'api',
    name: 'API & SDK',
    summary: 'The integration layer',
    detail:
      'A REST API with scoped keys, idempotent writes, signed webhooks and websocket event streams. Drop-in kits for ecommerce, gaming and agent frameworks.',
    status: 'live',
    items: ['REST', 'Webhooks', 'Websockets', 'API keys'],
    image: '/images/image-pro-4.webp',
    tint: 'from-amber-500/20 to-transparent',
  },
  {
    id: 'agents',
    name: 'Agent payments',
    summary: 'MCP and HTTP 402',
    detail:
      'An MCP bridge so an agent can create and check payments as tools without holding keys, and x402 Flex envelopes so a paywalled endpoint can be paid inline.',
    status: 'soon',
    items: ['MCP server', 'x402 Flex', 'Policy limits'],
    image: '/images/card-prod-4.PNG',
    tint: 'from-violet-500/20 to-transparent',
  },
  {
    id: 'streams',
    name: 'Streams',
    summary: 'Money that moves per second',
    detail:
      'Payroll, vesting, locks, staking and airdrops as continuous flows rather than one-off transfers. Contracts are deployed and demonstrable on BSC testnet.',
    status: 'soon',
    items: ['Payouts', 'Vesting', 'Locks', 'Staking', 'Airdrops'],
    image: '/images/card-prod-6.PNG',
    tint: 'from-fuchsia-500/20 to-transparent',
  },
  {
    id: 'treasury',
    name: 'Treasury & TEE',
    summary: 'Policy wallets in secure enclaves',
    detail:
      'Keys anchored in trusted execution environments with spending policy attached, and treasury routing on top. Verify permissions, not promises.',
    status: 'soon',
    items: ['Policy wallets', 'TEE', 'Treasury routing'],
    image: '/images/image-pro-5-TEE.webp',
    tint: 'from-teal-500/20 to-transparent',
  },
]

/* ─────────────────────────────────────────────────────────────────── apps ── */

export type App = {
  id: string
  name: string
  subtitle: string
  description: string
  icon: string
  video?: string
  href?: string
  external?: boolean
  status: StatusKind
  tint: string
}

/** Applications Pepay Labs runs on its own rails. */
export const APPS: App[] = [
  {
    id: 'merchants',
    name: 'Pepay Merchants',
    subtitle: 'Business dashboard',
    description:
      'Payments, invoices, subscriptions, catalog, wallets, keys and webhooks — the surface merchants run against today.',
    icon: '/images/app-logo-pepay-merchants.png',
    href: 'https://pepay-merchant-dashboard.vercel.app/',
    external: true,
    status: 'live',
    tint: 'from-sky-400/30 to-cyan-400/20',
  },
  {
    id: 'api',
    name: 'Pepay API',
    subtitle: 'Developer platform',
    description: 'REST endpoints, signed webhooks and SDKs for integrating Pepay into anything.',
    icon: '/images/app-logo-pepay-api.png',
    href: 'https://docs.pepay.io/developers/pepay-api',
    external: true,
    status: 'live',
    tint: 'from-emerald-400/30 to-teal-400/20',
  },
  {
    id: 'commerce',
    name: 'Pepay Commerce',
    subtitle: 'Buy real products with crypto',
    description: 'Retail checkout augmented by AI, settling over the same rail as everything else.',
    icon: '/images/app-logo-pepay-commerce1.png',
    video: '/images/app-video-commerce.mp4',
    status: 'soon',
    tint: 'from-indigo-400/30 to-violet-500/20',
  },
  {
    id: 'commerce5',
    name: 'Pepay Commerce 5',
    subtitle: 'Shop with AI, pay with crypto',
    description: 'Chat to find products and check out with crypto, in one flow.',
    icon: '/images/app-logo-pepay-commerce-5.png',
    video: '/images/app-video-commerce-5.mp4',
    status: 'soon',
    tint: 'from-teal-400/30 to-rose-400/20',
  },
  {
    id: 'slice',
    name: 'Grab Me a Slice',
    subtitle: 'A tip jar for the internet',
    description: 'One link that lets anyone support a creator in whatever token they hold.',
    icon: '/images/app-logo-pepay-grab.png',
    video: '/images/app-video-gmas.mp4',
    status: 'soon',
    tint: 'from-fuchsia-400/30 to-rose-500/20',
  },
]

/* ──────────────────────────────────────────────────────────────── streams ── */

/**
 * Real recordings of the built Streams product, carried over from the Streams
 * UI build. Streams is demonstrable but not launched, which is why the section
 * is marked Coming and never Live.
 */
export const STREAM_CHAPTERS = [
  {
    id: 'payouts',
    label: 'Payouts',
    caption: 'Recurring payroll, streamed per second',
    video: '/streams/payouts.mp4',
    poster: '/streams/poster/payouts.jpg',
  },
  {
    id: 'vesting',
    label: 'Vesting',
    caption: 'Cliffs and schedules enforced on-chain',
    video: '/streams/vesting-detail.mp4',
    poster: '/streams/poster/vesting-detail.jpg',
  },
  {
    id: 'locks',
    label: 'Locks',
    caption: 'Time-locked treasury positions',
    video: '/streams/locks.mp4',
    poster: '/streams/poster/locks.jpg',
  },
  {
    id: 'staking',
    label: 'Staking',
    caption: 'Rewards distributed continuously',
    video: '/streams/staking.mp4',
    poster: '/streams/poster/staking.jpg',
  },
  {
    id: 'airdrop',
    label: 'Airdrops',
    caption: 'Bulk distribution in one transaction',
    video: '/streams/airdrop-create.mp4',
    poster: '/streams/poster/airdrop-create.jpg',
  },
  {
    id: 'claim',
    label: 'Claim',
    caption: 'Recipients claim without a support ticket',
    video: '/streams/airdrop-done.mp4',
    poster: '/streams/poster/airdrop-done.jpg',
  },
] as const

/* ───────────────────────────────────────────────────────────────── agents ── */

/**
 * The agent argument, in the order it has to land.
 *
 * Deliberately not "autonomous financial primitives for machine-to-machine
 * transactions". An agent can already decide what to buy; what it cannot do is
 * hold a card, sign up for an account or pass a KYC check. That is a payments
 * problem, and it is the one Pepay is shaped like.
 */
export const AGENT_STEPS = [
  {
    key: 'intent',
    actor: 'Agent',
    title: 'Intent',
    line: '“Buy 5,000 API credits.”',
    detail: 'The agent decides it needs something and asks for a price.',
  },
  {
    key: 'quote',
    actor: 'Service',
    title: '402 Payment Required',
    line: 'accepts: USDC · opBNB · $12.50',
    detail: 'The endpoint answers with what it accepts instead of an error page.',
  },
  {
    key: 'policy',
    actor: 'Pepay',
    title: 'Policy check',
    line: 'within budget · allowed token · under cap',
    detail: 'Spending rules are evaluated before anything is signed.',
  },
  {
    key: 'settle',
    actor: 'Pepay',
    title: 'Settle',
    line: 'routed · confirmed · receipt issued',
    detail: 'The payment clears on the cheapest path and emits a receipt event.',
  },
  {
    key: 'deliver',
    actor: 'Service',
    title: 'Deliver',
    line: '200 OK · credits granted',
    detail: 'The original request is retried and succeeds. No human in the loop.',
  },
] as const

export const AGENT_POINTS = [
  {
    title: 'No keys in the model',
    detail: 'The MCP bridge exposes payment actions as tools. The agent never holds a private key.',
  },
  {
    title: 'Spending policy, enforced',
    detail: 'Per-token allowlists, caps and budgets are checked before a payment is authorised.',
  },
  {
    title: 'An agent is not a legal entity',
    detail:
      'It cannot open a merchant account or pass KYC. Non-custodial on-chain settlement is the route that does not require one.',
  },
  {
    title: 'Micropayment economics',
    detail:
      'Per-call billing only works where gas is a fraction of a cent, which is why opBNB is the metering lane and BNB Chain the settlement lane.',
  },
] as const

/* ────────────────────────────────────────────────────────────── developers ── */

/**
 * The integration snippet. Deliberately short — the claim is that a quickstart
 * fits in an afternoon, and a thirty-line sample argues against it.
 */
export const CODE_CREATE = `import { Pepay } from '@pepay/sdk'

const pepay = new Pepay({ apiKey: process.env.PEPAY_KEY })

// Priced in dollars. The payer sends any token; you receive USDC.
const invoice = await pepay.invoices.create({
  amount_usd: 49.0,
  settle_in: 'USDC',
  customer_id: 'cus_8f21',
})

console.log(invoice.payment_url)`

/** The same call without the SDK, so the API is legible on its own terms. */
export const CODE_CURL = `curl https://api.pepay.io/api/v1/invoices \\
  -H "x-api-key: $PEPAY_KEY" \\
  -H "Idempotency-Key: order_12345" \\
  -H "Content-Type: application/json" \\
  -d '{ "amount_usd": 49.00, "customer_id": "cus_8f21" }'`

export const CODE_WEBHOOK = `// Verify before you trust. HMAC SHA-256 over timestamp + body.
import { createHmac, timingSafeEqual } from 'node:crypto'

app.post('/webhooks/pepay', (req, res) => {
  const sig = req.header('x-pepay-signature')
  const ts = req.header('x-pepay-timestamp')

  const expected = createHmac('sha256', process.env.PEPAY_WEBHOOK_SECRET)
    .update(\`\${ts}.\${req.rawBody}\`)
    .digest('hex')

  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return res.sendStatus(401)
  }

  if (req.body.event === 'invoice.paid') fulfil(req.body.data.invoice_id)
  res.sendStatus(200)
})`

/**
 * Facts published in Pepay's own API reference. Stated rather than rounded,
 * because a developer will check them.
 * @see https://docs.pepay.io/developers/pepay-api
 */
export const API_FACTS: { label: string; value: string; mono?: boolean }[] = [
  { label: 'Base URL', value: 'api.pepay.io', mono: true },
  { label: 'Auth', value: 'x-api-key header', mono: true },
  { label: 'Invoice range', value: '$0.01 – $1,000,000' },
  { label: 'Rate limit', value: '100 req / min per key' },
  { label: 'Idempotency', value: 'Idempotency-Key header', mono: true },
  { label: 'Webhook retries', value: '3, exponential backoff' },
]

/** The four events a webhook endpoint receives. */
export const WEBHOOK_EVENTS = [
  { name: 'invoice.paid', detail: 'Full payment received' },
  { name: 'invoice.partial_payment', detail: 'Some of the amount arrived' },
  { name: 'invoice.overpaid', detail: 'Payment exceeded the invoice' },
  { name: 'invoice.expired', detail: 'Window closed unpaid' },
] as const

export const DEVELOPER_POINTS = [
  {
    title: 'Idempotent by default',
    detail: 'Every write takes an Idempotency-Key, so a retried request cannot double-charge.',
  },
  {
    title: 'Signed webhooks',
    detail: 'HMAC SHA-256 with a timestamp, a rotatable secret, and delivery replay from the dashboard.',
  },
  {
    title: 'Chain abstraction',
    detail: 'Add a chain without changing a line of your integration.',
  },
  {
    title: 'Non-custodial',
    detail: 'No Pepay contract custodies your funds. The router settles and the registry records.',
  },
] as const

/* ────────────────────────────────────────────────────────────── enterprise ── */

/**
 * What an enterprise buyer actually needs to see. Every line maps to a shipped
 * endpoint or dashboard route — there are no compliance, licensing or
 * certification claims here, because Pepay holds none of those.
 */
export const ENTERPRISE = [
  {
    title: 'Settlement control',
    detail:
      'Choose the stablecoin you settle into and the tokens you are willing to accept. Block anything you do not want on your books.',
    items: ['Settlement preference', 'Token acceptance policy', 'Per-token blocks'],
  },
  {
    title: 'Reconciliation',
    detail:
      'One ledger across chains and rails, with balance transactions, an event log and exportable order history.',
    items: ['Balance transactions', 'Event log', 'Order export'],
  },
  {
    title: 'Access control',
    detail:
      'Staff accounts with invites and memberships, scoped API keys that can be revoked, and MFA on the account itself.',
    items: ['Staff & roles', 'Scoped keys', 'MFA'],
  },
  {
    title: 'Operability',
    detail:
      'Signed webhooks with delivery history and replay, websocket event streams, and settlement retry for anything that fails.',
    items: ['Webhook replay', 'Websockets', 'Settlement retry'],
  },
] as const

/**
 * The limits, stated by us rather than discovered by a buyer's diligence.
 * Volunteering these is what makes the rest of the page credible.
 */
export const LIMITS = [
  {
    claim: 'Security audit',
    reality: 'Core contracts are queued with CertiK. No completed audit report is published yet.',
  },
  {
    claim: 'Streams contracts',
    reality: 'Deployed and demonstrable on BSC testnet. Not on mainnet.',
  },
  {
    claim: 'Fiat and banking',
    reality:
      'Pepay holds no banking licence, no bank accounts and no live fiat rails. On- and off-ramps are direction, not product.',
  },
  {
    claim: 'Ledger window',
    reality:
      'The proof figures cover a fixed export window and are regenerated weekly, not streamed live.',
  },
] as const

/* ───────────────────────────────────────────────────────────────── roadmap ── */

export type Stage = {
  period: string
  title: string
  detail: string
  status: StatusKind
  items?: string[]
}

export const ROADMAP: Stage[] = [
  {
    period: 'Shipped',
    title: 'Payments & settlement',
    detail:
      'Dollar-precise checkout, invoices and subscriptions. On-chain and cross-chain routing, settling into USDC and USD1.',
    status: 'live',
    items: ['Checkout', 'Invoices', 'Subscriptions', 'Orders', 'Catalog'],
  },
  {
    period: 'Shipped',
    title: 'Merchant platform',
    detail:
      'The dashboard, API keys, wallets, webhooks and network configuration merchants run against today.',
    status: 'live',
    items: ['Dashboard', 'API keys', 'Wallets', 'Webhooks', 'Storefront'],
  },
  {
    period: 'Next',
    title: 'Pepay Streams',
    detail:
      'Continuous payments — payroll, vesting, locks, staking and airdrops. Built and demonstrable; contracts are on BSC testnet.',
    status: 'soon',
    items: ['Payouts', 'Vesting', 'Locks', 'Staking', 'Airdrops'],
  },
  {
    period: 'Next',
    title: 'Agent rails',
    detail:
      'The MCP bridge and x402 Flex envelopes, so a paywalled endpoint can be paid inline by software.',
    status: 'soon',
    items: ['MCP server', 'x402 Flex', 'Policy wallets'],
  },
  {
    period: 'Direction',
    title: 'Financial connectivity',
    detail: 'Banking rails and off-ramps so value reaches the real economy. Direction, not product.',
    status: 'vision',
  },
]

/* ──────────────────────────────────────────────────────────────── partners ── */

/**
 * `scale` is optical, not decorative. The three source files carry very
 * different amounts of internal whitespace, so matching their box heights makes
 * the marks look mismatched — CoinMarketCap in particular renders about a third
 * smaller than the other two at the same height.
 */
export const PARTNERS = [
  {
    name: 'YZi Labs',
    description: 'Innovation partner',
    image: '/images/accelerated-yzilabs1.webp',
    scale: 1,
    invertOnDark: false,
  },
  {
    name: 'CoinMarketCap',
    description: 'Market intelligence',
    image: '/images/accelerated-cmc1.png',
    scale: 1.9,
    invertOnDark: true,
  },
  {
    name: 'BNB Chain',
    description: 'Blockchain infrastructure',
    image: '/images/accelerate-bnb1.png',
    scale: 1.15,
    invertOnDark: false,
  },
] as const

/* ─────────────────────────────────────────────────────────────── resources ── */

export const RESOURCES = [
  {
    title: 'Read the docs',
    description: 'API reference, webhook events, SDK quickstarts and integration guides.',
    href: 'https://docs.pepay.io',
    external: true,
  },
  {
    title: 'Open the dashboard',
    description: 'The merchant surface — payments, invoices, subscriptions, keys and webhooks.',
    href: 'https://pepay-merchant-dashboard.vercel.app/',
    external: true,
  },
  {
    title: 'Partner with us',
    description: 'Exchanges, protocols, marketplaces and agent platforms building on the rail.',
    href: 'mailto:contact@pepay.io',
    external: false,
  },
  {
    title: 'Source & specs',
    description: 'Contracts, SDK and the x402 Flex specification. MIT licensed.',
    href: 'https://github.com/pepaylabs',
    external: true,
  },
] as const

/* ──────────────────────────────────────────────────────── audience routing ── */

/** The final CTA reads differently depending on who arrived. */
export const AUDIENCES = [
  { who: 'Developers', line: 'Create your first invoice in an afternoon.', href: 'https://docs.pepay.io', cta: 'Read the docs', external: true },
  { who: 'Merchants', line: 'Take payment in any token, settle in one.', href: 'https://pepay-merchant-dashboard.vercel.app/', cta: 'Open the dashboard', external: true },
  { who: 'Agent builders', line: 'Give your agent a way to pay for things.', href: '#agents', cta: 'See how it works', external: false },
  { who: 'Enterprises', line: 'Settlement, reconciliation and access control.', href: 'mailto:contact@pepay.io', cta: 'Talk to Pepay', external: false },
] as const
