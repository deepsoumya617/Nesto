'use client'

import Container from '@/components/Container'
import { GradientBlob } from '@/components/GradientBlob'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { useAuth } from '@clerk/nextjs'

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) {
    return null
  }
  
  return (
    <div>
      <Header />
      {!isSignedIn && <GradientBlob />}
      <div className="z-40">
        <Container>
          {!isSignedIn && !isLoaded ? (
            <Hero />
          ) : (
            <div>
              
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}
