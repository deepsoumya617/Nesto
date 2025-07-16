'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useAuth } from '@clerk/nextjs'

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isSignedIn } = useAuth()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-grow">{children}</main>
      {!isSignedIn && <Footer />}
    </div>
  )
}
