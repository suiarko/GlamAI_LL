export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription_tier: 'free' | 'pro'
  transformations_count: number
  created_at: string
}

export interface Transformation {
  id: string
  user_id: string
  original_image_url: string
  transformed_image_url: string
  style_name: string
  style_image_url?: string
  processing_time_ms?: number
  quality_score?: number
  created_at: string
}

export interface UsageLimit {
  user_id: string
  free_transformations_used: number
  last_reset_date: string
  total_transformations: number
}

export interface Hairstyle {
  id: string
  name: string
  category: 'short' | 'medium' | 'long' | 'curly'
  image_url: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface TransformRequest {
  image: File
  style: string
  styleImage?: string
}

export interface TransformResponse {
  success: boolean
  originalUrl: string
  transformedUrl: string
  remainingTransformations: number
  error?: string
}

export interface AnalysisResult {
  face_shape: 'oval' | 'round' | 'square' | 'heart' | 'oblong'
  current_hair: {
    length: 'short' | 'medium' | 'long'
    texture: 'straight' | 'wavy' | 'curly'
    color: string
  }
  skin_tone: string
  age_range: string
  gender_presentation: 'masculine' | 'feminine' | 'neutral'
}

export interface BeforeAfterExample {
  id: string
  before_url: string
  after_url: string
  style_name: string
  category: string
  description: string
}


