'use client'

import { Camera, Palette, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Camera,
    title: 'Upload Your Photo',
    description: 'Simply drag and drop your photo or click to upload. We support JPG, PNG, and WebP formats up to 5MB.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Palette,
    title: 'Choose a Style',
    description: 'Browse through our curated collection of hairstyles. From short pixie cuts to long flowing waves.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Get Instant Result',
    description: 'Our AI analyzes your face shape and applies the perfect hairstyle transformation in seconds.',
    color: 'from-yellow-500 to-orange-500'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your look in just three simple steps. No complex settings, no waiting.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card p-8 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </CardTitle>
                
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Step Number */}
                <div className="mt-6 inline-flex items-center justify-center w-8 h-8 bg-violet-100 text-violet-600 rounded-full font-bold text-sm">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose GlamAI?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">✨ AI-Powered Precision</h4>
                  <p className="text-gray-600 text-sm">
                    Our advanced AI analyzes your face shape, skin tone, and current hair to create the perfect transformation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🎨 Professional Quality</h4>
                  <p className="text-gray-600 text-sm">
                    Get salon-quality results that look natural and professional, ready to show your stylist.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">⚡ Instant Results</h4>
                  <p className="text-gray-600 text-sm">
                    No waiting, no appointments. Get your transformation in seconds, not hours.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🔒 Privacy First</h4>
                  <p className="text-gray-600 text-sm">
                    Your photos are processed securely and never stored. Complete privacy guaranteed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

