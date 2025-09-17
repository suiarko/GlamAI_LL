'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { openCheckout } from '@/lib/paddle'

// Data for pricing plans
const plans = [
  {
    name: 'Free',
    description: 'Get a feel for our AI.',
    price: { monthly: '$0', yearly: '$0' },
    features: [
      { text: '5 AI transformations per day', included: true },
      { text: 'Basic hairstyle library (30+ styles)', included: true },
      { text: 'Standard processing speed', included: true },
      { text: 'Results with watermark', included: true },
      { text: 'HD quality results', included: false },
      { text: 'AI Style Consultant', included: false },
      { text: 'Client management tools', included: false },
    ],
    isFeatured: false,
  },
  {
    name: 'Premium',
    description: 'For creative individuals.',
    price: { monthly: '$7.99', yearly: '$29.99' },
    priceIds: {
        monthly: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_MONTHLY_PRICE_ID!,
        yearly: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_YEARLY_PRICE_ID!,
    },
    features: [
      { text: 'Unlimited AI transformations', included: true },
      { text: 'Full hairstyle library (500+ styles)', included: true },
      { text: 'Priority processing speed', included: true },
      { text: 'No watermark on results', included: true },
      { text: 'HD quality results (1024x1024)', included: true },
      { text: 'AI Style Consultant', included: true },
      { text: 'Style Diary & Look Calendar', included: true },
    ],
    isFeatured: true,
  },
  {
    name: 'Professional',
    description: 'For stylists and salons.',
    price: { monthly: null, yearly: '$99.99' },
     priceIds: {
        monthly: null,
        yearly: process.env.NEXT_PUBLIC_PADDLE_PRO_YEARLY_PRICE_ID!,
    },
    features: [
      { text: 'All Premium features, plus:', included: true },
      { text: '4K export quality', included: true },
      { text: 'Client management tools', included: true },
      { text: 'Shareable client preview links', included: true },
      { text: 'Add your salon\'s logo', included: true },
      { text: 'Priority support', included: true },
    ],
    isFeatured: false,
  },
]

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)

  const handleCheckout = (planName: string) => {
    const plan = plans.find(p => p.name === planName);
    if (!plan || !plan.priceIds) return;

    let priceId;
    if (plan.name === 'Professional') {
        priceId = plan.priceIds.yearly;
    } else {
        priceId = isYearly ? plan.priceIds.yearly : plan.priceIds.monthly;
    }
    
    if (priceId) {
        openCheckout(priceId);
    } else {
        alert('This plan is not available for the selected billing cycle.');
    }
  }

  return (
    <section id="pricing" className="bg-background py-20 sm:py-32 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground">
                The Perfect Plan for You
            </h2>
            <p className="mt-4 text-lg text-slate-400">
                Start for free, then unlock creative freedom with Premium. 
                Simple, transparent pricing.
            </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
            <span className={`font-medium ${!isYearly ? 'text-accent' : 'text-slate-400'}`}>Monthly</span>
            <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                id="billing-cycle"
            />
            <span className={`font-medium ${isYearly ? 'text-accent' : 'text-slate-400'}`}>
                Yearly <span className="text-xs text-accent/80">(Save over 60%)</span>
            </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative border rounded-2xl p-8 flex flex-col ${
                plan.isFeatured ? 'border-accent/50 bg-card shadow-2xl shadow-accent/10' : 'border-border bg-card/50'
              }`}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                    <span className="bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold rounded-full border border-accent-foreground/20 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Most Popular
                    </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-slate-400 mt-2 min-h-[40px]">{plan.description}</p>
              
              <div className="mt-6">
                {plan.name === 'Professional' && !isYearly ? (
                    <div className="flex items-baseline text-foreground">
                        <span className="text-2xl">Available Annually</span>
                    </div>
                ) : (
                    <span className="text-5xl font-extrabold tracking-tight text-foreground">
                        {isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                )}
                 <span className="text-slate-500 ml-2">
                    {plan.name !== 'Free' && (isYearly ? '/year' : '/month')}
                 </span>
              </div>
              
              <Button
                onClick={() => handleCheckout(plan.name)}
                disabled={plan.name === 'Free'}
                className={`w-full mt-8 ${plan.isFeatured ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                size="lg"
              >
                {plan.name === 'Free' ? 'Your Current Plan' : `Upgrade to ${plan.name}`}
              </Button>

              <ul className="mt-8 space-y-4 text-sm text-slate-300 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? <CheckCircle2 className="w-5 h-5 text-accent" /> : <XCircle className="w-5 h-5 text-slate-600"/>}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
