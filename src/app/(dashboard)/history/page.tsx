'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Search, Filter, Download, Share2, Trash2, Calendar, Sparkles } from 'lucide-react'

// Mock transformation data
const mockTransformations = [
  {
    id: 1,
    style: 'Pixie Cut',
    category: 'short',
    date: '2024-01-15T10:30:00Z',
    thumbnail: '/examples/after1.jpg',
    original: '/examples/before1.jpg',
    transformed: '/examples/after1.jpg',
    processingTime: 12.5,
    qualityScore: 4.8
  },
  {
    id: 2,
    style: 'Long Layers',
    category: 'long',
    date: '2024-01-10T14:20:00Z',
    thumbnail: '/examples/after2.jpg',
    original: '/examples/before2.jpg',
    transformed: '/examples/after2.jpg',
    processingTime: 8.2,
    qualityScore: 4.6
  },
  {
    id: 3,
    style: 'Curly Bob',
    category: 'curly',
    date: '2024-01-08T16:45:00Z',
    thumbnail: '/examples/after3.jpg',
    original: '/examples/before3.jpg',
    transformed: '/examples/after3.jpg',
    processingTime: 15.1,
    qualityScore: 4.9
  },
  {
    id: 4,
    style: 'Wavy Medium',
    category: 'medium',
    date: '2024-01-05T09:15:00Z',
    thumbnail: '/examples/after4.jpg',
    original: '/examples/before4.jpg',
    transformed: '/examples/after4.jpg',
    processingTime: 11.3,
    qualityScore: 4.7
  },
  {
    id: 5,
    style: 'Asymmetrical',
    category: 'short',
    date: '2024-01-02T13:30:00Z',
    thumbnail: '/examples/after5.jpg',
    original: '/examples/before5.jpg',
    transformed: '/examples/after5.jpg',
    processingTime: 9.8,
    qualityScore: 4.5
  },
  {
    id: 6,
    style: 'Bangs Long',
    category: 'long',
    date: '2023-12-28T11:00:00Z',
    thumbnail: '/examples/after6.jpg',
    original: '/examples/before6.jpg',
    transformed: '/examples/after6.jpg',
    processingTime: 13.7,
    qualityScore: 4.8
  }
]

const categories = ['all', 'short', 'medium', 'long', 'curly']

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'quality'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredTransformations = mockTransformations
    .filter(transformation => {
      const matchesSearch = transformation.style.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || transformation.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case 'name':
          comparison = a.style.localeCompare(b.style)
          break
        case 'quality':
          comparison = a.qualityScore - b.qualityScore
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getQualityColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600'
    if (score >= 4.0) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Transformation History
                </h1>
                <p className="text-gray-600">
                  View and manage all your AI hairstyle transformations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search transformations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'quality')}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="quality">Sort by Quality</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transformations Grid */}
        {filteredTransformations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransformations.map((transformation) => (
              <Card key={transformation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Transformation Preview</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{transformation.style}</h3>
                    <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                      {transformation.category}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(transformation.date)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Processing: {transformation.processingTime}s</span>
                      <span className={`font-medium ${getQualityColor(transformation.qualityScore)}`}>
                        Quality: {transformation.qualityScore}/5
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No transformations found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start creating your first AI hairstyle transformation'
                }
              </p>
              <Link href="/transform">
                <Button>
                  Create New Transformation
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Stats Summary */}
        {filteredTransformations.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredTransformations.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Transformations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(filteredTransformations.reduce((acc, t) => acc + t.processingTime, 0) / filteredTransformations.length).toFixed(1)}s
                  </div>
                  <div className="text-sm text-gray-600">Avg Processing Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(filteredTransformations.reduce((acc, t) => acc + t.qualityScore, 0) / filteredTransformations.length).toFixed(1)}/5
                  </div>
                  <div className="text-sm text-gray-600">Avg Quality Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Set(filteredTransformations.map(t => t.category)).size}
                  </div>
                  <div className="text-sm text-gray-600">Categories Tried</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

