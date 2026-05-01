import './globals.css'
import Script from 'next/script'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './components/CartContext'
import { Fraunces, Nunito_Sans, Pinyon_Script } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const logoScript = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-logo',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://www.boutiquelittlebits.com'),
  alternates: {
    canonical: 'https://www.boutiquelittlebits.com',
  },
  title: {
    default: 'Boutique Little Bits | Curated Gifts & Joyful Surprises',
    template: '%s | Boutique Little Bits',
  },
  description: 'Shop curated gift sets, personalized friendship bracelets, spa kits, kids gifts, and unique accessories from Bella Vista, AR. Hand-picked gifts for every occasion. Free shipping over $50!',
  keywords: 'gifts, personalized gifts, curated gifts, spa kits, kids gifts, boutique, unique gifts, gift sets, personalized kids gifts, friendship bracelets, gift baskets, Bella Vista Arkansas',
  openGraph: {
    title: 'Boutique Little Bits | Curated Gifts & Joyful Surprises',
    description: 'Shop curated gift sets, personalized friendship bracelets, spa kits, kids gifts, and unique accessories. Hand-picked gifts for every occasion. Free shipping over $50!',
    url: 'https://www.boutiquelittlebits.com',
    siteName: 'Boutique Little Bits',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boutique Little Bits | Curated Gifts & Joyful Surprises',
    description: 'Shop curated gift sets, personalized friendship bracelets, spa kits, kids gifts, and unique accessories. Free shipping over $50!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'xggMgmidX1Tj2UZ1tFQ5wgXuN5pBIbX8kZvF_GusfME',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable} ${logoScript.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G00Z5GWDYB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G00Z5GWDYB');
          `}
        </Script>
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
