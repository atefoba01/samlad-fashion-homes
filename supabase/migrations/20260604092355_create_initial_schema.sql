/*
  # Initialize Samlad Fashion Homes Database Schema

  1. New Tables
    - `palettes` - Color palettes (12 trending + user-created)
    - `saved_palettes` - User's saved palette boards
    - `gallery_posts` - Fashion design portfolio posts
    - `reviews` - Client testimonials with media
    - `contact_submissions` - Contact form submissions

  2. Security
    - Enable RLS on all tables
    - Public read access for palettes, gallery, reviews
    - User-specific access for saved_palettes
    - Allow anonymous submissions for contact

  3. Features
    - Auto-timestamps for auditing
    - JSON storage for color arrays
    - Media URLs for images/videos
    - Rating validation
*/

-- Palettes table (public read, admin write)
CREATE TABLE IF NOT EXISTS palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  colors JSONB NOT NULL, -- Array of {hex, rgb, name}
  category TEXT NOT NULL CHECK (category IN ('wedding', 'traditional', 'birthday', 'corporate', 'casual', 'party', 'trending')),
  likes_count INTEGER DEFAULT 0 CHECK (likes_count >= 0),
  is_trending BOOLEAN DEFAULT false,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE palettes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Palettes are viewable by everyone"
  ON palettes FOR SELECT
  TO public
  USING (true);

-- Saved palettes (user-specific)
CREATE TABLE IF NOT EXISTS saved_palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  palette_id UUID NOT NULL REFERENCES palettes(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, palette_id)
);

ALTER TABLE saved_palettes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved palettes"
  ON saved_palettes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save palettes for themselves"
  ON saved_palettes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved palettes"
  ON saved_palettes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Gallery posts (public read, admin write)
CREATE TABLE IF NOT EXISTS gallery_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery posts are viewable by everyone"
  ON gallery_posts FOR SELECT
  TO public
  USING (true);

-- Reviews (public read, admin write)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  review_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  media_url TEXT,
  media_type TEXT CHECK (media_type IN ('photo', 'video')),
  event_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  TO public
  USING (true);

-- Contact submissions (public write, admin read)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_palettes_category ON palettes(category);
CREATE INDEX IF NOT EXISTS idx_palettes_trending ON palettes(is_trending);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_posts(category);
CREATE INDEX IF NOT EXISTS idx_saved_user ON saved_palettes(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_event ON reviews(event_type);
