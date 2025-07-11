'use client'

import Features from '@/components/Features'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhyNesto from '@/components/WhyNesto'

export default function HomePage() {
  return (
    <div>
      <Header />
      {/* <GradientBlob /> */}
      <div className="z-40">
        <Hero />
        <WhyNesto />
        <Features />
      </div>
    </div>
  )
}
