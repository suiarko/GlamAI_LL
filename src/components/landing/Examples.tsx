'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageIcon } from 'lucide-react'

const examples = [
  {
    id: 1,
    before_url: '/examples/before1.jpg',
    after_url: '/examples/after1.jpg',
    style_name: 'Pixie Cut',
    category: 'short',
    description: 'Dramatic transformation from long to short'
  },
  {
    id: 2,
    before_url: '/examples/before2.jpg',
    after_url: '/examples/after2.jpg',
    style_name: 'Long Layers',
    category: 'long',
    description: 'Added face-framing layers for movement'
  },
  {
    id: 3,
    before_url: '/examples/before3.jpg',
    after_url: '/examples/after3.jpg',
    style_name: 'Curly Bob',
    category: 'curly',
    description: 'Enhanced natural curls with bob cut'
  },
  {
    id: 4,
    before_url: '/examples/before4.jpg',
    after_url: '/examples/after4.jpg',
    style_name: 'Wavy Medium',
    category: 'medium',
    description: 'Beachy waves for effortless style'
  },
  {
    id: 5,
    before_url: '/examples/before5.jpg',
    after_url: '/examples/after5.jpg',
    style_name: 'Asymmetrical',
    category: 'short',
    description: 'Bold asymmetrical cut for modern look'
  },
  {
    id: 6,
    before_url: '/examples/before6.jpg',
    after_url: '/examples/after6.jpg',
    style_name: 'Bangs Long',
    category: 'long',
    description: 'Added bangs to frame the face'
  }
]

export default function Examples() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See the Magic
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real transformations from our users. Try different styles and see what works for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {examples.map((example) => (
            <Card key={example.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                  <p className="text-sm">Before/After Example</p>
                </div>
              </div>
              <CardContent className="p-4">
                <CardTitle className="font-semibold text-gray-900 text-lg">
                  {example.style_name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 capitalize">
                  {example.category} • {example.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-violet-600 to-purple-600 text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Transform Your Look?
              </h3>
              <p className="text-violet-100 mb-6">
                Join thousands of users who have already discovered their perfect hairstyle with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-violet-50 transition-colors">
                  Try Free Now
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  View More Examples
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

