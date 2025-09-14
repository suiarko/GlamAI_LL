'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Plus, Camera, History, Crown, Sparkles, Download, Share2 } from 'lucide-react'

// Mock data - in real app this would come from API
const mockUser = {
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  subscriptionTier: 'free',
  transformationsUsed: 2,
  transformationsLimit: 3
}

const mockTransformations = [
  {
    id: 1,
    style: 'Pixie Cut',
    date: '2024-01-15',
    thumbnail: '/examples/after1.jpg',
    original: '/examples/before1.jpg',
    transformed: '/examples/after1.jpg'
  },
  {
    id: 2,
    style: 'Long Layers',
    date: '2024-01-10',
    thumbnail: '/examples/after2.jpg',
    original: '/examples/before2.jpg',
    transformed: '/examples/after2.jpg'
  }
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleNewTransformation = () => {
    setIsLoading(true)
    // Simulate navigation delay
    setTimeout(() => {
      window.location.href = '/transform'
    }, 500)
  }

  const remainingTransformations = mockUser.transformationsLimit - mockUser.transformationsUsed
  const progressPercentage = (mockUser.transformationsUsed / mockUser.transformationsLimit) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {mockUser.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Ready to transform your look today?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/transform">
                <Button onClick={handleNewTransformation} disabled={isLoading}>
                  <Plus className="w-4 h-4 mr-2" />
                  {isLoading ? 'Loading...' : 'New Transformation'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Usage Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Your Transformations
                </CardTitle>
                <CardDescription>
                  Track your AI hairstyle transformations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {mockUser.transformationsUsed} of {mockUser.transformationsLimit} used
                    </span>
                    <span className="text-sm text-gray-500">
                      {remainingTransformations} remaining
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  
                  {remainingTransformations === 0 ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Crown className="w-5 h-5 text-amber-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">
                            You've used all your free transformations!
                          </p>
                          <p className="text-sm text-amber-700">
                            Upgrade to Pro for unlimited transformations.
                          </p>
                        </div>
                      </div>
                      <Button className="mt-3 bg-amber-600 hover:bg-amber-700">
                        Upgrade to Pro
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Link href="/transform">
                        <Button className="w-full">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Start New Transformation
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transformations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <History className="w-5 h-5 mr-2" />
                    Recent Transformations
                  </div>
                  <Link href="/history">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockTransformations.length > 0 ? (
                  <div className="grid gap-4">
                    {mockTransformations.map((transformation) => (
                      <div
                        key={transformation.id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {transformation.style}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(transformation.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No transformations yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Start your first AI hairstyle transformation
                    </p>
                    <Link href="/transform">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Transformation
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Transformations</span>
                  <span className="font-semibold">{mockUser.transformationsUsed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Type</span>
                  <span className="font-semibold capitalize">{mockUser.subscriptionTier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-semibold">Jan 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
            {mockUser.subscriptionTier === 'free' && (
              <Card className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to Pro
                  </CardTitle>
                  <CardDescription className="text-violet-100">
                    Get unlimited transformations and premium features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">$9.99<span className="text-lg font-normal">/mo</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
                        Unlimited transformations
                      </li>
                      <li className="flex items-center">
                        <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
                        HD quality results
                      </li>
                      <li className="flex items-center">
                        <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
                        No watermark
                      </li>
                      <li className="flex items-center">
                        <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
                        Priority processing
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-violet-600 hover:bg-violet-50">
                      Upgrade Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Best Results:</strong> Use well-lit photos with clear face visibility
                </p>
                <p>
                  <strong>Face Shape:</strong> Our AI analyzes your face shape for the perfect style match
                </p>
                <p>
                  <strong>Try Different Angles:</strong> Experiment with various photo angles for diverse looks
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

