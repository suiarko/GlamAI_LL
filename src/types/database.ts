export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: 'free' | 'pro'
          transformations_count: number
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro'
          transformations_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro'
          transformations_count?: number
          created_at?: string
        }
      }
      transformations: {
        Row: {
          id: string
          user_id: string
          original_image_url: string
          transformed_image_url: string
          style_name: string
          style_image_url: string | null
          processing_time_ms: number | null
          quality_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          original_image_url: string
          transformed_image_url: string
          style_name: string
          style_image_url?: string | null
          processing_time_ms?: number | null
          quality_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          original_image_url?: string
          transformed_image_url?: string
          style_name?: string
          style_image_url?: string | null
          processing_time_ms?: number | null
          quality_score?: number | null
          created_at?: string
        }
      }
      usage_limits: {
        Row: {
          user_id: string
          free_transformations_used: number
          last_reset_date: string
          total_transformations: number
        }
        Insert: {
          user_id: string
          free_transformations_used?: number
          last_reset_date?: string
          total_transformations?: number
        }
        Update: {
          user_id?: string
          free_transformations_used?: number
          last_reset_date?: string
          total_transformations?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}


