'use client'

import { Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out',
    features: [
      '3 Free Transformations',
      'Standard Quality',
      'Watermark on Results',
      'Basic Support'
    ],
    cta: 'Get Started Free',
    popular: false,
    variant: 'outline' as const
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/mo',
    description: 'For unlimited creativity',
    features: [
      'Unlimited Transformations',
      'HD Quality Results',
      'No Watermark',
      'Priority Processing',
      'Advanced Styles',
      'Priority Support'
    ],
    cta: 'Start Pro Trial',
    popular: true,
    variant: 'default' as const
  }
]

export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`pricing-card relative ${
                plan.popular 
                  ? 'border-violet-500 scale-105 shadow-2xl' 
                  : 'border-transparent hover:border-violet-200'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-violet-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {plan.price}
                  {plan.period && (
                    <span className="text-lg text-gray-500 font-normal">
                      {plan.period}
                    </span>
                  )}
                </div>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.variant}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="bg-white max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    How does the free trial work?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    You get 3 free transformations to try our service. No credit card required.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Can I cancel anytime?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Yes, you can cancel your Pro subscription at any time. No questions asked.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    What image formats do you support?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We support JPG, PNG, and WebP formats. Maximum file size is 5MB.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    How long does processing take?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Most transformations are completed in under 15 seconds. Pro users get priority processing.
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

