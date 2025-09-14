import Header from '@/components/shared/Header'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Examples from '@/components/landing/Examples'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/shared/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Examples />
      <Pricing />
      <Footer />
    </main>
  )
}

