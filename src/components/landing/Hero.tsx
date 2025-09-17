'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    // 1. Головний контейнер тепер використовує лише клас .hero-gradient, який ми визначили в globals.css
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      
      {/* 2. Вміст розміщено по центру */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 3. ТИПОГРАФІКА: Заголовок зроблено жирнішим (font-extrabold) та щільнішим (tracking-tighter) */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
            Transform Your
            {/* 4. КОЛІР: Градієнт в тексті оновлено, щоб він відповідав новій палітрі */}
            <span className="block bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text text-transparent">
              Hairstyle
            </span>
            with AI
          </h1>
          
          {/* 5. ТИПОГРАФІКА: Підзаголовок тепер використовує колір для другорядного тексту і має більший відступ */}
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Try new looks before visiting the salon. Upload your photo and get instant AI-powered hairstyle transformations in seconds.
          </p>
          
          {/* 6. КОЛІР: Кнопки оновлено згідно з новою палітрою */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              // Основна кнопка тепер використовує наш новий акцентний колір
              className="bg-accent text-slate-900 font-bold hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/20"
            >
              <Link href="/signup">
                Try 3 Free Transformations
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              // Другорядна кнопка тепер використовує стандартний 'outline' варіант, який підтягує кольори з теми
              className="bg-transparent backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          {/* Demo Video/Animation - без змін у логіці, лише незначні стилістичні оновлення */}
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-2 md:p-4 border border-white/10 shadow-2xl">
              {isVideoPlaying ? (
                <div className="aspect-video bg-background rounded-xl flex items-center justify-center">
                  <div className="text-center text-foreground">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse text-primary" />
                    <p className="text-lg">AI Transformation in Progress...</p>
                    <p className="text-sm text-foreground/70">This would show a real demo video</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-background rounded-xl flex items-center justify-center cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                  <div className="text-center text-foreground">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 ml-1 text-primary" />
                    </div>
                    <p className="text-lg font-semibold">See AI Magic in Action</p>
                    <p className="text-sm text-foreground/70">Click to watch demo</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-slate-400">
            <span className="text-sm">100% Secure</span>
            <span className="text-sm">No Watermark (Pro)</span>
            <span className="text-sm">Instant Results</span>
          </div>
        </div>
      </div>
    </section>
  )
}
