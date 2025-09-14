import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GlamAI - Transform Your Hairstyle with AI',
  description: 'Try new looks before visiting the salon. Upload your photo and get instant AI-powered hairstyle transformations.',
  keywords: 'hairstyle, AI, transformation, beauty, salon, hair styling',
  authors: [{ name: 'GlamAI Team' }],
  openGraph: {
    title: 'GlamAI - Transform Your Hairstyle with AI',
    description: 'Try new looks before visiting the salon. Upload your photo and get instant AI-powered hairstyle transformations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlamAI - Transform Your Hairstyle with AI',
    description: 'Try new looks before visiting the salon. Upload your photo and get instant AI-powered hairstyle transformations.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}


