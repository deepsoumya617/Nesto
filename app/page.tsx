'use client'

import Contributors from '@/components/Contributors'
import CTA from '@/components/CTA'
import FAQs from '@/components/FAQs'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import GithubStat from '@/components/GithubStat'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
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
        <HowItWorks />
        <GithubStat />
        <Contributors />
        <FAQs />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}
