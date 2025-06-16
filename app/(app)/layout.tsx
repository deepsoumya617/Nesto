import Header from '@/components/Header'

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative w-full lg:h-screen p-0 sm:p-5">
      <Header />
      {children}
    </main>
  )
}
