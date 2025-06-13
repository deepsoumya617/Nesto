import Container from '@/components/Container'
import { GradientBlob } from '@/components/GradientBlob'
import Header from '@/components/Header'
import Hero from '@/components/Hero'

export default function HomePage() {
  return (
    <div>
      <Header />
      <GradientBlob/>
      <div className='z-40'>
      <Container>
        <Hero />
      </Container>
      </div>
    </div>
  )
}
