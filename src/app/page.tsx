import { SiteNav } from '@/components/chrome/site-nav'
import { Footer } from '@/components/chrome/footer'
import { Hero } from '@/components/sections/hero'
import { What } from '@/components/sections/what'
import { Rail } from '@/components/sections/rail'
import { Products } from '@/components/sections/products'
import { Merchant } from '@/components/sections/merchant'
import { Streams } from '@/components/sections/streams'
import { Agents } from '@/components/sections/agents'
import { Developers } from '@/components/sections/developers'
import { Proof } from '@/components/sections/proof'
import { Security } from '@/components/sections/security'
import { Enterprise } from '@/components/sections/enterprise'
import { Apps } from '@/components/sections/apps'
import { Roadmap } from '@/components/sections/roadmap'
import { Cta } from '@/components/sections/cta'

/**
 * The narrative.
 *
 * Ordered so each section answers exactly one question, and so the reader has
 * earned the answer before it arrives:
 *
 *   Hero        What is this?          — and shows the mechanism working
 *   What        Why should I care?     — the before/after
 *   Rail        How does it work?      — the architecture, once
 *   Products    What can I use?
 *   Merchant    Can I actually use it? — the real dashboard
 *   Streams     What is different?     — duration as a primitive
 *   Agents      Why does it matter?    — the case that compounds
 *   Developers  Can I build with it?
 *   Proof       Is any of this real?   — the ledger, after the claims
 *   Security    Can I trust it?        — and what we will not claim
 *   Enterprise  Can my company use it?
 *   Apps        Who else is on it?
 *   Roadmap     What is next?
 *   Cta         What do I do now?
 *
 * Proof deliberately sits after the product sections rather than in the hero.
 * A volume figure means nothing to a reader who does not yet know what was
 * being sold; the same figure lands hard once they do.
 *
 * Tone alternates band by band (`canvas` / `raised`) so thirteen sections read
 * as a sequence rather than as one long scroll.
 */
export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <What />
        <Rail />
        <Products />
        <Merchant />
        <Streams />
        <Agents />
        <Developers />
        <Proof />
        <Security />
        <Enterprise />
        <Apps />
        <Roadmap />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
