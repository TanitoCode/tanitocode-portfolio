import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'

const siteUrl = 'https://tanitocode.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TanitoCode — Desarrollador Fullstack',
    template: '%s — TanitoCode',
  },
  description: 'Portfolio de Mario Cristian Sanchez, desarrollador Fullstack con experiencia en desarrollo web, liderazgo técnico y automatización de procesos.',
  keywords: ['desarrollador fullstack', 'React', 'Next.js', 'TypeScript', 'Node.js', 'MySQL', 'automatización', 'portfolio'],
  authors: [{ name: 'Mario Cristian Sanchez', url: siteUrl }],
  creator: 'Mario Cristian Sanchez',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: siteUrl,
    siteName: 'TanitoCode',
    title: 'TanitoCode — Desarrollador Fullstack',
    description: 'Portfolio de Mario Cristian Sanchez, desarrollador Fullstack con experiencia en desarrollo web, liderazgo técnico y automatización de procesos.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TanitoCode — Desarrollador Fullstack',
    description: 'Portfolio de Mario Cristian Sanchez, desarrollador Fullstack con experiencia en desarrollo web, liderazgo técnico y automatización de procesos.',
    creator: '@tanitocode',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',s||(d?'dark':'light'));}catch(e){}})();`,
          }}
        />
        <meta name="theme-color" content="#f7f8f8" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#08090a" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mario Cristian Sanchez',
              url: 'https://tanitocode.dev',
              jobTitle: 'Desarrollador Fullstack',
              knowsAbout: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'MySQL', 'Bootstrap', 'Power BI', 'Google Apps Script'],
              sameAs: [
                'https://github.com/TanitoCode',
                'https://www.linkedin.com/in/mario-cristian-sanchez/',
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <noscript>Este sitio requiere JavaScript para funcionar correctamente.</noscript>
        <Nav />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
