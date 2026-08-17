# Pepay — flagship site

One definitive Pepay site, consolidated from the existing body of work rather
than started from a blank page.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

---

## What this is

A Next.js 15 marketing site whose job is to make a stranger understand Pepay in
under thirty seconds, and to give an investor, merchant, developer, agent
builder or enterprise buyer somewhere to go next.

The visual language is **not new**. It is Pepay's own marketing design system,
lifted out of the merchant dashboard (`pepaymerchant/pepay-merchant-dashboard`)
where it was worked out, and carried across intact — tokens, elevation scale,
motion curve, section rhythm and primitives. Building a fresh look would have
thrown away the best design work in the estate.

---

## The audit

Twenty-one local projects and five deployed references were reviewed before any
code was written. What each contributed:

| Source | Verdict | What was taken |
|---|---|---|
| `pepaymerchant/pepay-merchant-dashboard` | **Foundation** | The `--pep-*` design system, the UI/motion kit, the section vocabulary, the compressed product media, and `tpv.json` |
| `pepay-merchant-dashboard/openapi.json` | **Source of truth** | ~180 shipped endpoints — the basis for every product claim |
| `virtualpepay` (Virtuals deck) | **Reference** | `STRATEGY.md` and `DECK-DESIGN.md`: the claim discipline, the framing rules, the "one primitive not nine products" instinct |
| `bnb-paycopy` | **Reference** | x402 Flex, the MCP bridge, the router/registry architecture, network strategy |
| `pepay-streams` | **Evidence** | Foundry/Diamond contract repo; `deployments.json` establishes testnet-only status |
| `streams video` (~800 MB raw) | **Superseded** | Already compressed to 138–503 KB with poster frames in the dashboard's `public/streams/` — those were used instead |
| `pepay-enterprise/one` | **Duplicate** | A fork of the merchant dashboard; nothing unique |
| `grab`, `jackpotpepayapp`, `BNBCARDS`, `WLFICARDS`, `bnbpaysdk`, `shadcn-admin`, … | **Archive** | Product context only; no assets carried forward |

Nothing was discarded before being understood, and nothing strong was rebuilt
for novelty.

---

## The audit question — read this first

**Pepay is not currently audited by CertiK, and this site does not say it is.**

Every primary source in the estate says the engagement is queued:

| Source | Says |
|---|---|
| `bnb-pay/README.md` | "Core contracts are **queued** with CertiK (links added post-delivery)" |
| `bnb-pay/README.md` | "Core contracts **will be** audited by CertiK. Links will be added when complete." |
| `bnb-pay/SPEC.md` | lists "Professional audit (CertiK, Trail of Bits, or equivalent)" as future work |
| `virtualproduct/src/deck.config.ts` | `AUDIT_HREF = undefined`, with a note that the badge reads "Audited by" *on instruction* and must be reverted if unsigned |

`pepay-streams/audit/` is real and is used on the site — but it is **self-run
static analysis** (Slither 0.11.3, Semgrep 1.143.0), not a third-party audit.
Those are different claims and the site does not conflate them.

**To publish the audit**, set one constant in `src/content/site.ts`:

```ts
export const AUDIT = {
  firm: 'CertiK',
  href: 'https://skynet.certik.com/projects/…',   // ← the report URL
}
```

That flips the security card to `live`, changes the copy to "Completed", and
renders a linked **Audited by CertiK** badge. No prose needs editing anywhere —
which is the point: the claim cannot drift out of step with reality.

---

## Claim discipline

This is the part that matters most, and it is enforced structurally rather than
by good intentions.

**No figure on this site is typed by hand.** Volume, transaction, wallet, chain
and settlement numbers all resolve from `src/data/tpv.json` through
`src/content/metrics.ts`. Change the export, and the page changes.

**Every forward-looking claim carries a status** — `live`, `soon` or `vision` —
declared in `src/content/site.ts` and rendered by one `<Status>` component:

- `live` — runs in production today and appears in the ledger
- `soon` — built and demonstrable, not launched
- `vision` — direction, never presented as a product

**Limits are stated, not omitted.** The enterprise section carries a
"What Pepay does not have yet" panel, and the footer repeats the material
disclosures:

- Contracts are **queued** with CertiK. No completed audit report exists.
- Streams contracts are on **BSC testnet**, not mainnet.
- Pepay holds **no banking licence, no bank accounts and no fiat rails.**
  On/off-ramps appear once, as `vision`.
- The proof figures are a **weekly snapshot over a fixed window**, not a live
  feed — the window is printed twice on the page.

Non-ledger facts (auth scheme, rate limits, invoice range, webhook events) are
quoted from `docs.pepay.io` and cited in the content file.

---

## Structure

```
src/
  app/          layout (metadata, OG, no-flash theme), page (the narrative), globals.css
  content/      site.ts     every string + status; the only place copy lives
                metrics.ts  the ledger adapter — the only place figures come from
  components/
    ui/         primitives, motion, data display, atmosphere
    product/    payment-demo, rail-diagram, lazy-video
    sections/   one file per band
    chrome/     nav, footer, theme toggle
  data/         tpv.json — regenerated from the transaction export
```

Each section answers exactly one question, in this order:

`Hero` what is this · `What` why care · `Rail` how it works · `Products` what I
can use · `Merchant` can I use it · `Streams` what is different · `Agents` why
it matters · `Developers` can I build · `Proof` is it real · `Enterprise` can my
company · `Apps` who else · `Roadmap` what next · `CTA` what now.

Proof sits **after** the product sections deliberately: a volume figure means
nothing to a reader who does not yet know what was being sold.

---

## Implementation notes

**Reduced motion never changes the tree.** The server cannot see
`prefers-reduced-motion`, so a primitive that returns different markup when
motion is off will not match what the server sent and React discards the
subtree — which blanked headlines for reduced-motion readers. Every primitive in
`ui/motion.tsx` renders identical markup either way and only varies the
animation props.

**Grid children carry `min-w-0`.** A grid item defaults to `min-width: auto`,
which let video and code blocks force their column past the viewport. This was
272 px of horizontal overflow at 390 px until fixed.

**Mobile is designed, not stacked.** The rail diagram is a 1000-unit SVG on
desktop and a separate vertical layout below `md` — scaling the wide version
down renders its labels at about five pixels.

**Media is lazy and pre-compressed.** Videos withhold their `src` until an
observer says they are close, carry poster frames, and use phone-sized encodes
where one exists. No re-encoding was needed; the dashboard had already done it.

**Two recordings were pulled rather than shipped.** `payouts.mp4` carried a line
reading *"Streamflow has been audited by 4 major auditors"* — stale boilerplate
from a different protocol, still sitting in the Streams UI — plus a *"Stake
$PEPAY for rewards up to 15% APY"* promo banner. `airdrop-create.mp4` carried the
same APY banner and a devnet notice. Both are scrolling captures, so a fixed
crop could not remove the text and neither clip had a clean segment. An audit
claim this site explicitly disclaims, and a yield promise it makes nowhere else,
do not ship because the footage was convenient. Payroll is carried by the
duration diagram instead, which is clearer than the recording was.

**Content never imports components.** `content/site.ts` takes `StatusKind` from
`lib/status`, not from the UI barrel. That edge closes a cycle
(content → ui/index → primitives → motion) which runs through a `'use client'`
boundary and corrupts the RSC client manifest at prerender — it failed the build
with a misleading "Could not find the module … in the React Client Manifest".

Verified at 1440 / 1280 / 1024 / 768 / 390 in both themes: no console errors, no
hydration errors, no horizontal overflow.

---

© Pepay Labs · MIT
