import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { BRAND } from '@/content/site'
import './globals.css'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

const SITE_URL = 'https://pepay.io'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: BRAND.metaTitle,
    template: '%s — Pepay',
  },
  description: BRAND.metaDescription,
  applicationName: BRAND.name,
  keywords: [
    'crypto payments',
    'stablecoin settlement',
    'payment infrastructure',
    'AI agent payments',
    'MCP payments',
    'x402',
    'invoices',
    'subscriptions',
    'multi-chain',
    'non-custodial',
  ],
  authors: [{ name: BRAND.legalName }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: BRAND.name,
    title: BRAND.metaTitle,
    description: BRAND.metaDescription,
    // The card itself comes from app/opengraph-image.tsx, which composes it
    // from the same ledger module the page renders — so an unfurl cannot state
    // a figure the site does not.
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND.metaTitle,
    description: BRAND.metaDescription,
    creator: '@pepaylabs',
  },
  icons: {
    icon: [{ url: '/images/favicon.svg', type: 'image/svg+xml' }, { url: '/images/favicon.png' }],
    apple: '/images/pepay-labs-rounded.png',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#06090f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

/**
 * Applies the stored theme before first paint.
 *
 * This has to be inline and synchronous: any deferred script runs after the
 * first frame, which is exactly long enough for a dark-mode reader to get a
 * white flash. Dark is the default because the product art, the reels and the
 * stream captures are all dark — a light default would show them letterboxed
 * against the wrong ground for the first paint.
 */
const THEME_SCRIPT = `(function(){try{
var s=localStorage.getItem('pepay-theme');
var d=s?s==='dark':!window.matchMedia('(prefers-color-scheme: light)').matches;
document.documentElement.classList.toggle('dark',d);
}catch(e){document.documentElement.classList.add('dark')}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        {/* First stop for a keyboard or screen-reader user, before the nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent2 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent2-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
