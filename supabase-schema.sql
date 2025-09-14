-- GlamAI MVP Database Schema
-- Run this in your Supabase SQL editor

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro')),
  transformations_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transformations table
CREATE TABLE IF NOT EXISTS transformations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  original_image_url TEXT NOT NULL,
  transformed_image_url TEXT NOT NULL,
  style_name TEXT NOT NULL,
  style_image_url TEXT,
  processing_time_ms INTEGER,
  quality_score FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage_limits table
CREATE TABLE IF NOT EXISTS usage_limits (
  user_id UUID REFERENCES profiles(id) PRIMARY KEY,
  free_transformations_used INTEGER DEFAULT 0,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  total_transformations INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hairstyles table (predefined styles)
CREATE TABLE IF NOT EXISTS hairstyles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('short', 'medium', 'long', 'curly')),
  image_url TEXT NOT NULL,
  description TEXT,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create before_after_examples table
CREATE TABLE IF NOT EXISTS before_after_examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  before_url TEXT NOT NULL,
  after_url TEXT NOT NULL,
  style_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transformations ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE hairstyles ENABLE ROW LEVEL SECURITY;
ALTER TABLE before_after_examples ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for transformations
CREATE POLICY "Users can view own transformations" ON transformations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transformations" ON transformations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for usage_limits
CREATE POLICY "Users can view own usage limits" ON usage_limits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own usage limits" ON usage_limits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage limits" ON usage_limits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for hairstyles (public read)
CREATE POLICY "Anyone can view active hairstyles" ON hairstyles
  FOR SELECT USING (is_active = true);

-- RLS Policies for before_after_examples (public read)
CREATE POLICY "Anyone can view active examples" ON before_after_examples
  FOR SELECT USING (is_active = true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transformations_user_id ON transformations(user_id);
CREATE INDEX IF NOT EXISTS idx_transformations_created_at ON transformations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hairstyles_category ON hairstyles(category);
CREATE INDEX IF NOT EXISTS idx_hairstyles_active ON hairstyles(is_active);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.usage_limits (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update transformation count
CREATE OR REPLACE FUNCTION public.increment_transformation_count(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles 
  SET transformations_count = transformations_count + 1,
      updated_at = NOW()
  WHERE id = user_uuid;
  
  UPDATE usage_limits 
  SET free_transformations_used = free_transformations_used + 1,
      total_transformations = total_transformations + 1,
      updated_at = NOW()
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample hairstyles
INSERT INTO hairstyles (name, category, image_url, description, difficulty) VALUES
('Pixie Cut', 'short', '/hairstyles/pixie-cut.jpg', 'Short, edgy pixie cut with textured layers', 'easy'),
('Short Bob', 'short', '/hairstyles/short-bob.jpg', 'Classic short bob that sits just above shoulders', 'medium'),
('Long Layers', 'long', '/hairstyles/long-layers.jpg', 'Long hair with face-framing layers', 'easy'),
('Curly Bob', 'curly', '/hairstyles/curly-bob.jpg', 'Bouncy curly bob with natural texture', 'medium'),
('Wavy Medium', 'medium', '/hairstyles/wavy-medium.jpg', 'Medium-length wavy hair with beachy texture', 'easy'),
('Straight Long', 'long', '/hairstyles/straight-long.jpg', 'Long, sleek straight hair with center part', 'easy'),
('Asymmetrical', 'short', '/hairstyles/asymmetrical.jpg', 'Edgy asymmetrical cut with one side longer', 'hard'),
('Bangs Long', 'long', '/hairstyles/bangs-long.jpg', 'Long hair with full bangs', 'medium'),
('Crown Braid', 'long', '/hairstyles/crown-braid.jpg', 'Elegant crown braid wrapping around head', 'hard'),
('High Ponytail', 'long', '/hairstyles/high-ponytail.jpg', 'High ponytail with volume at crown', 'easy'),
('Updo Elegant', 'long', '/hairstyles/updo-elegant.jpg', 'Sophisticated updo with soft curls', 'hard'),
('Lob Cut', 'medium', '/hairstyles/lob-cut.jpg', 'Long bob that sits just below shoulders', 'medium');

-- Insert sample before/after examples
INSERT INTO before_after_examples (before_url, after_url, style_name, category, description) VALUES
('/examples/before1.jpg', '/examples/after1.jpg', 'Pixie Cut', 'short', 'Dramatic transformation from long to short'),
('/examples/before2.jpg', '/examples/after2.jpg', 'Long Layers', 'long', 'Added face-framing layers for movement'),
('/examples/before3.jpg', '/examples/after3.jpg', 'Curly Bob', 'curly', 'Enhanced natural curls with bob cut'),
('/examples/before4.jpg', '/examples/after4.jpg', 'Wavy Medium', 'medium', 'Beachy waves for effortless style'),
('/examples/before5.jpg', '/examples/after5.jpg', 'Asymmetrical', 'short', 'Bold asymmetrical cut for modern look'),
('/examples/before6.jpg', '/examples/after6.jpg', 'Bangs Long', 'long', 'Added bangs to frame the face');


