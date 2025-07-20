'use client'

import Team from '@/components/Team'
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
      <div className="z-40">
        <Hero />

        <section id="whynesto" className="scroll-mt-12 py-20">
          <WhyNesto />
        </section>

        <section id="features" className="scroll-mt-0">
          <Features />
        </section>

        <section id="howitworks" className="scroll-mt-12">
          <HowItWorks />
        </section>

        <section id="github" className="scroll-mt-12">
          <GithubStat />
        </section>

        <section id="team" className="scroll-mt-55 py-20">
          <Team />
        </section>

        <section id="faq" className="scroll-mt-12 py-20">
          <FAQs />
        </section>

        <CTA />
        <Footer />
      </div>
    </div>
  )
}
