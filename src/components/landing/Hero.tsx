'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-purple-600/20" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Hairstyle
            </span>
            with AI
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Try new looks before visiting the salon. Upload your photo and get instant AI-powered hairstyle transformations in seconds.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-white text-violet-600 hover:bg-violet-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
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
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          {/* Demo Video/Animation */}
          <div className="relative max-w-2xl mx-auto">
            {isVideoPlaying ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                    <p className="text-lg">AI Transformation in Progress...</p>
                    <p className="text-sm opacity-75">This would show a real demo video</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <p className="text-lg font-semibold">See AI Magic in Action</p>
                    <p className="text-sm opacity-75">Click to watch demo</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm">100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-sm">No Watermark (Pro)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span className="text-sm">Instant Results</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500" />
    </section>
  )
}