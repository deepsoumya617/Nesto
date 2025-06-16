import Header from '@/components/Header'

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative w-full lg:h-screen">
      <Header />
      {children}
    </main>
  )
}
