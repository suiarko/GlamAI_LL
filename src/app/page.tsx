import Header from '@/components/shared/Header'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Examples from '@/components/landing/Examples'
// 1. Замінюємо імпорт старого компонента на новий
import PricingSection from '@/components/landing/PricingSection' 
import Footer from '@/components/shared/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background pt-16"> {/* Offset for fixed header */}
      <Header />
      <Hero />
      <Features />
      <Examples />
      {/* 2. Використовуємо новий компонент PricingSection */}
      <PricingSection />
      <Footer />
    </main>
  )
}

