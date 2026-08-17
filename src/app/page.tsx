import { SiteNav } from '@/components/chrome/site-nav'
import { Hero } from '@/components/sections/hero'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
      </main>
    </>
  )
}
