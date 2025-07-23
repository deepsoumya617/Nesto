import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import { Inter, Geist, Geist_Mono, Roboto_Slab } from 'next/font/google'
import { ThemeProvider } from '@/components/themes/theme-provider'
import { MobileMenu } from '@/components/MobileMenu'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geist = Geist({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-geist-mono',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-roboto-slab',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nestoai.vercel.app'),
  title: 'Nesto',
  description:
    'A unified space to capture code, write notes, and harness AI — designed for modern developers who move fast.',
  authors: [{ name: 'Soumyadeep Ghosh' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      {
        url: '/android-chrome-192x192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        url: '/android-chrome-512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Nesto',
    description:
      'A unified space to capture code, write notes, and harness AI — designed for modern developers who move fast.',
    url: 'https://nestoai.vercel.app',
    siteName: 'Nesto',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Nesto - Your Code, Your Thoughts, Your AI',
      },
      {
        url: '#',
        width: 500,
        height: 500,
        alt: 'Nesto Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nesto',
    description:
      'A unified space to capture code, write notes, and harness AI — designed for modern developers who move fast.',
    images: '/og.png',
    creator: '@_deep_soumya617',
    site: '@_deep_soumya617',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords: [
    'nesto',
    'nestoai',
    'nesto app',
    'nesto code manager',
    'developer notes app',
    'AI code assistant',
    'code snippet manager',
    'developer productivity tool',
    'AI for developers',
    'save code snippets online',
    'AI-powered code explanation',
    'debug code with AI',
    'ask AI for code help',
    'open source developer tools',
    'smart notes for developers',
    'AI snippet generator',
    'write and organize code notes',
    'developer knowledge base',
    'nextjs code app',
    'tailwind nextjs dashboard',
    'snippets and notes manager',
    'code + notes workspace',
    'developer notes workspace',
    'unified coding workspace',
    'code organization for developers',
    'markdown notes with code',
    'rich text editor for developers',
    'developer friendly dashboard',
    'github gist importer',
    'manage public gists',
    'developer personal assistant',
    'CodeMirror note editor',
    'prisma postgresql setup',
    'zustand state management',
    'mobile-first code workspace',
    'recharts developer stats',
    'clerk auth integration',
    'openai integration for code',
    'multilingual dev tools',
    'AI coding help',
    'snippets collaboration',
    'developer collaboration tools',
    'save AI-generated code',
    'public snippet sharing',
    'workspace for code snippets',
    'real-time code collaboration',
    'developer-focused app',
    'modern dev tools',
    'code-first note-taking',
  ],
  alternates: {
    canonical: 'https://nestoai.vercel.app',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Nesto',
      url: 'https://nestoai.vercel.app',
      image: '',
      description:
        'A unified space to capture code, write notes, and harness AI — designed for modern developers who move fast.',
      author: {
        '@type': 'Person',
        name: 'Soumyadeep Ghosh',
        sameAs: [
          'https://x.com/_deep_soumya617',
          'https://github.com/deepsoumya617',
        ],
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: 'light' }}
      suppressHydrationWarning
    >
      <head>
        <Analytics />
        <SpeedInsights />
      </head>
      <body
        className={`${inter.variable} ${geist.variable} ${geistMono.variable} ${robotoSlab.variable} font-base antialiased`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <main className="flex-grow">{children}</main>
            <MobileMenu />
            <Toaster richColors position="bottom-right" closeButton />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
