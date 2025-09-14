'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Upload, Check, Sparkles, Download, Share2, RotateCcw } from 'lucide-react'

// Mock hairstyle data
const hairstyles = [
  { id: 'pixie-cut', name: 'Pixie Cut', category: 'short', image: '/hairstyles/pixie-cut.jpg' },
  { id: 'short-bob', name: 'Short Bob', category: 'short', image: '/hairstyles/short-bob.jpg' },
  { id: 'long-layers', name: 'Long Layers', category: 'long', image: '/hairstyles/long-layers.jpg' },
  { id: 'curly-bob', name: 'Curly Bob', category: 'curly', image: '/hairstyles/curly-bob.jpg' },
  { id: 'wavy-medium', name: 'Wavy Medium', category: 'medium', image: '/hairstyles/wavy-medium.jpg' },
  { id: 'straight-long', name: 'Straight Long', category: 'long', image: '/hairstyles/straight-long.jpg' },
  { id: 'asymmetrical', name: 'Asymmetrical', category: 'short', image: '/hairstyles/asymmetrical.jpg' },
  { id: 'bangs-long', name: 'Bangs Long', category: 'long', image: '/hairstyles/bangs-long.jpg' },
  { id: 'crown-braid', name: 'Crown Braid', category: 'long', image: '/hairstyles/crown-braid.jpg' },
  { id: 'high-ponytail', name: 'High Ponytail', category: 'long', image: '/hairstyles/high-ponytail.jpg' },
  { id: 'updo-elegant', name: 'Updo Elegant', category: 'long', image: '/hairstyles/updo-elegant.jpg' },
  { id: 'lob-cut', name: 'Lob Cut', category: 'medium', image: '/hairstyles/lob-cut.jpg' }
]

const categories = [
  { id: 'all', name: 'All Styles', count: hairstyles.length },
  { id: 'short', name: 'Short', count: hairstyles.filter(h => h.category === 'short').length },
  { id: 'medium', name: 'Medium', count: hairstyles.filter(h => h.category === 'medium').length },
  { id: 'long', name: 'Long', count: hairstyles.filter(h => h.category === 'long').length },
  { id: 'curly', name: 'Curly', count: hairstyles.filter(h => h.category === 'curly').length }
]

type Step = 'upload' | 'select' | 'processing' | 'result'

export default function TransformPage() {
  const [currentStep, setCurrentStep] = useState<Step>('upload')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [processingMessage, setProcessingMessage] = useState('')
  const router = useRouter()

  const steps = [
    { id: 'upload', title: 'Upload Photo', number: 1 },
    { id: 'select', title: 'Choose Style', number: 2 },
    { id: 'processing', title: 'Processing', number: 3 },
    { id: 'result', title: 'Result', number: 4 }
  ]

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  const handleImageUpload = (file: File) => {
    setSelectedImage(file)
    setCurrentStep('select')
  }

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId)
  }

  const handleStartTransformation = async () => {
    if (!selectedImage || !selectedStyle) return

    setCurrentStep('processing')
    setIsProcessing(true)
    setProgress(0)
    setProcessingMessage('Analyzing your face shape...')

    // Simulate processing steps
    const steps = [
      { message: 'Analyzing your face shape...', progress: 20 },
      { message: 'Understanding the hairstyle...', progress: 40 },
      { message: 'Applying AI magic...', progress: 60 },
      { message: 'Fine-tuning details...', progress: 80 },
      { message: 'Finalizing result...', progress: 100 }
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setProcessingMessage(step.message)
      setProgress(step.progress)
    }

    setIsProcessing(false)
    setCurrentStep('result')
  }

  const handleTryAnother = () => {
    setCurrentStep('select')
    setSelectedStyle(null)
  }

  const handleNewTransformation = () => {
    setCurrentStep('upload')
    setSelectedImage(null)
    setSelectedStyle(null)
  }

  const filteredHairstyles = selectedCategory === 'all' 
    ? hairstyles 
    : hairstyles.filter(h => h.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Hairstyle Transformation
                </h1>
                <p className="text-gray-600">
                  Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex].title}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStepIndex 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStepIndex ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  <span className={`ml-2 text-sm ${
                    index <= currentStepIndex ? 'text-violet-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      index < currentStepIndex ? 'bg-violet-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Upload Step */}
        {currentStep === 'upload' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Upload Your Photo</CardTitle>
              <CardDescription className="text-center">
                Choose a clear, well-lit photo of yourself for the best results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drag and drop your photo here
                </h3>
                <p className="text-gray-500 mb-4">
                  or click to browse files
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file)
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
                <p className="text-xs text-gray-400 mt-4">
                  Supports JPG, PNG, WebP up to 5MB
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Style Selection Step */}
        {currentStep === 'select' && (
          <div className="max-w-6xl mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Choose Your Style</CardTitle>
                <CardDescription>
                  Select the hairstyle you'd like to try
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>

                {/* Hairstyle Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredHairstyles.map((hairstyle) => (
                    <div
                      key={hairstyle.id}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedStyle === hairstyle.id
                          ? 'border-violet-500 ring-2 ring-violet-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleStyleSelect(hairstyle.id)}
                    >
                      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-center">{hairstyle.name}</h3>
                        <p className="text-xs text-gray-500 text-center capitalize">{hairstyle.category}</p>
                      </div>
                      {selectedStyle === hairstyle.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('upload')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleStartTransformation}
                    disabled={!selectedStyle}
                  >
                    Transform Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Processing Step */}
        {currentStep === 'processing' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Processing Your Transformation</CardTitle>
              <CardDescription className="text-center">
                Our AI is working its magic on your photo
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-12 h-12 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {processingMessage}
                </h3>
                <Progress value={progress} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-gray-500 mt-2">
                  {progress}% complete
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Result Step */}
        {currentStep === 'result' && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Your Transformation is Ready!</CardTitle>
                <CardDescription className="text-center">
                  Here's how you would look with your new hairstyle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Before/After Comparison */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Before & After</h3>
                    <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Sparkles className="w-16 h-16 mx-auto mb-2" />
                          <p>Before/After Comparison</p>
                          <p className="text-sm">Would show actual transformation</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Result
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleTryAnother}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Try Another Style
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={handleNewTransformation}
                      >
                        Start New Transformation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

