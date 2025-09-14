import { NextRequest, NextResponse } from 'next/server'
import { analyzePhoto } from '@/lib/gemini/client'

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json()

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      )
    }

    // Analyze the photo using Gemini AI
    const analysis = await analyzePhoto(imageBase64)

    return NextResponse.json({
      success: true,
      analysis
    })

  } catch (error) {
    console.error('Error analyzing photo:', error)
    return NextResponse.json(
      { error: 'Failed to analyze photo' },
      { status: 500 }
    )
  }
}

