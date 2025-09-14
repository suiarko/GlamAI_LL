#!/usr/bin/env tsx

/**
 * Seed script for GlamAI MVP
 * Populates the database with sample data for testing
 */

import { createClient } from '@supabase/supabase-js'
import { Database } from '../src/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

const sampleHairstyles = [
  {
    name: 'Pixie Cut',
    category: 'short' as const,
    image_url: '/hairstyles/pixie-cut.jpg',
    description: 'Short, edgy pixie cut with textured layers and side-swept bangs',
    difficulty: 'easy' as const
  },
  {
    name: 'Short Bob',
    category: 'short' as const,
    image_url: '/hairstyles/short-bob.jpg',
    description: 'Classic short bob that sits just above the shoulders',
    difficulty: 'medium' as const
  },
  {
    name: 'Long Layers',
    category: 'long' as const,
    image_url: '/hairstyles/long-layers.jpg',
    description: 'Long hair with face-framing layers and subtle movement',
    difficulty: 'easy' as const
  },
  {
    name: 'Curly Bob',
    category: 'curly' as const,
    image_url: '/hairstyles/curly-bob.jpg',
    description: 'Bouncy curly bob with natural texture and defined ringlets',
    difficulty: 'medium' as const
  },
  {
    name: 'Wavy Medium',
    category: 'medium' as const,
    image_url: '/hairstyles/wavy-medium.jpg',
    description: 'Medium-length wavy hair with beachy texture and natural movement',
    difficulty: 'easy' as const
  },
  {
    name: 'Straight Long',
    category: 'long' as const,
    image_url: '/hairstyles/straight-long.jpg',
    description: 'Long, sleek straight hair with center part and smooth finish',
    difficulty: 'easy' as const
  },
  {
    name: 'Asymmetrical',
    category: 'short' as const,
    image_url: '/hairstyles/asymmetrical.jpg',
    description: 'Edgy asymmetrical cut with one side longer than the other',
    difficulty: 'hard' as const
  },
  {
    name: 'Bangs Long',
    category: 'long' as const,
    image_url: '/hairstyles/bangs-long.jpg',
    description: 'Long hair with full bangs that sit just above the eyebrows',
    difficulty: 'medium' as const
  },
  {
    name: 'Crown Braid',
    category: 'long' as const,
    image_url: '/hairstyles/crown-braid.jpg',
    description: 'Elegant crown braid that wraps around the head',
    difficulty: 'hard' as const
  },
  {
    name: 'High Ponytail',
    category: 'long' as const,
    image_url: '/hairstyles/high-ponytail.jpg',
    description: 'High ponytail with volume at the crown and smooth sides',
    difficulty: 'easy' as const
  },
  {
    name: 'Updo Elegant',
    category: 'long' as const,
    image_url: '/hairstyles/updo-elegant.jpg',
    description: 'Sophisticated updo with soft curls and elegant finish',
    difficulty: 'hard' as const
  },
  {
    name: 'Lob Cut',
    category: 'medium' as const,
    image_url: '/hairstyles/lob-cut.jpg',
    description: 'Long bob (lob) that sits just below the shoulders with subtle layers',
    difficulty: 'medium' as const
  }
]

const sampleExamples = [
  {
    before_url: '/examples/before1.jpg',
    after_url: '/examples/after1.jpg',
    style_name: 'Pixie Cut',
    category: 'short',
    description: 'Dramatic transformation from long flowing hair to edgy pixie cut'
  },
  {
    before_url: '/examples/before2.jpg',
    after_url: '/examples/after2.jpg',
    style_name: 'Long Layers',
    category: 'long',
    description: 'Added face-framing layers for movement and dimension'
  },
  {
    before_url: '/examples/before3.jpg',
    after_url: '/examples/after3.jpg',
    style_name: 'Curly Bob',
    category: 'curly',
    description: 'Enhanced natural curls with a modern bob cut'
  },
  {
    before_url: '/examples/before4.jpg',
    after_url: '/examples/after4.jpg',
    style_name: 'Wavy Medium',
    category: 'medium',
    description: 'Beachy waves for an effortless, carefree style'
  },
  {
    before_url: '/examples/before5.jpg',
    after_url: '/examples/after5.jpg',
    style_name: 'Asymmetrical',
    category: 'short',
    description: 'Bold asymmetrical cut for a modern, edgy look'
  },
  {
    before_url: '/examples/before6.jpg',
    after_url: '/examples/after6.jpg',
    style_name: 'Bangs Long',
    category: 'long',
    description: 'Added bangs to frame the face and add character'
  }
]

async function seedHairstyles() {
  console.log('🌿 Seeding hairstyles...')
  
  const { data, error } = await supabase
    .from('hairstyles')
    .insert(sampleHairstyles)
    .select()

  if (error) {
    console.error('Error seeding hairstyles:', error)
    return false
  }

  console.log(`✅ Seeded ${data?.length || 0} hairstyles`)
  return true
}

async function seedExamples() {
  console.log('🖼️ Seeding before/after examples...')
  
  const { data, error } = await supabase
    .from('before_after_examples')
    .insert(sampleExamples)
    .select()

  if (error) {
    console.error('Error seeding examples:', error)
    return false
  }

  console.log(`✅ Seeded ${data?.length || 0} examples`)
  return true
}

async function createDemoUser() {
  console.log('👤 Creating demo user...')
  
  // Note: In production, users are created through Supabase Auth
  // This is just for demo purposes
  const demoUser = {
    id: 'demo-user-id',
    email: 'demo@glamai.com',
    full_name: 'Demo User',
    subscription_tier: 'free' as const,
    transformations_count: 0
  }

  const { error } = await supabase
    .from('profiles')
    .upsert(demoUser)

  if (error) {
    console.error('Error creating demo user:', error)
    return false
  }

  console.log('✅ Demo user created')
  return true
}

async function main() {
  console.log('🚀 Starting GlamAI database seeding...')
  
  try {
    // Check if data already exists
    const { data: existingHairstyles } = await supabase
      .from('hairstyles')
      .select('id')
      .limit(1)

    if (existingHairstyles && existingHairstyles.length > 0) {
      console.log('⚠️ Data already exists, skipping seed')
      return
    }

    // Seed data
    const hairstylesSuccess = await seedHairstyles()
    const examplesSuccess = await seedExamples()
    const demoUserSuccess = await createDemoUser()

    if (hairstylesSuccess && examplesSuccess && demoUserSuccess) {
      console.log('🎉 Database seeding completed successfully!')
    } else {
      console.error('❌ Some seeding operations failed')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run the seed script
if (require.main === module) {
  main()
}

export { seedHairstyles, seedExamples, createDemoUser }


