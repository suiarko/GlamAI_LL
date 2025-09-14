import { GoogleGenerativeAI } from '@google/generative-ai'
import { AnalysisResult } from '@/types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function analyzePhoto(imageBase64: string): Promise<AnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const prompt = `
      Analyze this person's face and hair for hairstyle transformation:
      1. Face shape (oval, round, square, heart, oblong)
      2. Current hair: length (short, medium, long), texture (straight, wavy, curly), color
      3. Skin tone (light, medium, dark)
      4. Age range (20s, 30s, 40s, 50s+)
      5. Gender presentation (masculine, feminine, neutral)
      
      Return as JSON with this exact structure:
      {
        "face_shape": "oval",
        "current_hair": {
          "length": "medium",
          "texture": "wavy",
          "color": "brown"
        },
        "skin_tone": "medium",
        "age_range": "30s",
        "gender_presentation": "feminine"
      }
    `
    
    const result = await model.generateContent([prompt, imageBase64])
    const response = await result.response
    const text = response.text()
    
    // Try to parse JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    // Fallback if JSON parsing fails
    return {
      face_shape: 'oval',
      current_hair: {
        length: 'medium',
        texture: 'straight',
        color: 'brown'
      },
      skin_tone: 'medium',
      age_range: '30s',
      gender_presentation: 'neutral'
    }
  } catch (error) {
    console.error('Error analyzing photo:', error)
    // Return default analysis on error
    return {
      face_shape: 'oval',
      current_hair: {
        length: 'medium',
        texture: 'straight',
        color: 'brown'
      },
      skin_tone: 'medium',
      age_range: '30s',
      gender_presentation: 'neutral'
    }
  }
}

export async function generateTransformationPrompt(
  originalImage: string,
  targetStyle: string,
  analysis: AnalysisResult
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
    
    const prompt = `
      Create a detailed prompt for AI image generation to transform the hairstyle in this image:
      
      Original Analysis:
      - Face shape: ${analysis.face_shape}
      - Current hair: ${analysis.current_hair.length} ${analysis.current_hair.texture} ${analysis.current_hair.color}
      - Skin tone: ${analysis.skin_tone}
      - Age: ${analysis.age_range}
      - Gender presentation: ${analysis.gender_presentation}
      
      Target Style: ${targetStyle}
      
      Requirements:
      - Keep the same face, features, and skin tone
      - Transform only the hairstyle to match the target style
      - Maintain natural lighting and shadows
      - Ensure the result looks realistic and professional
      - The hairstyle should complement the face shape
      - Keep the same angle and composition as the original
      
      Generate a detailed prompt for an AI image generator that will create this transformation.
    `
    
    const result = await model.generateContent([prompt, originalImage])
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating transformation prompt:', error)
    return `Transform the hairstyle to ${targetStyle} while keeping the same face and features.`
  }
}

// Mock transformation function for MVP testing
export async function mockTransformImage(
  originalImage: string,
  targetStyle: string
): Promise<string> {
  // In a real implementation, this would call an image generation API
  // For MVP, we'll return a placeholder or use a simple image manipulation
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a mock transformed image URL
      // In production, this would be the actual transformed image
      resolve('/api/placeholder-transformed-image')
    }, 2000)
  })
}


