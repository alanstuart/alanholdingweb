/*
  # Published Blog Posts System

  ## Overview
  This migration creates a public-facing blog system for showcasing expertise and attracting clients.
  This is separate from the future_blog_posts planning system.

  ## New Tables
  
  ### `published_blog_posts`
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text, required) - Blog post title
  - `slug` (text, required, unique) - SEO-friendly URL slug
  - `excerpt` (text) - Short excerpt/summary for previews (2-3 sentences)
  - `content` (text, required) - Full blog post content (supports markdown/HTML)
  - `featured_image_url` (text) - URL to featured/hero image
  - `author_name` (text) - Author display name
  - `author_bio` (text) - Short author biography
  - `category` (text) - Blog post category/topic
  - `tags` (text[]) - Array of tags for the post
  - `published_at` (timestamptz) - Publication date and time
  - `view_count` (integer) - Number of times the post has been viewed
  - `is_featured` (boolean) - Whether to feature this post prominently
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `user_id` (uuid) - Reference to auth.users for ownership

  ## Security
  - Enable Row Level Security (RLS) on the table
  - Public SELECT access for all published posts (no authentication required)
  - Authenticated users can INSERT, UPDATE, DELETE their own posts
  - Policies for SELECT, INSERT, UPDATE, DELETE operations

  ## Indexes
  - Index on `slug` for fast lookups by URL
  - Index on `category` for filtering by category
  - Index on `published_at` for date-based sorting
  - Index on `user_id` for user-specific queries
*/

-- Create function for updating updated_at timestamp if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the published_blog_posts table
CREATE TABLE IF NOT EXISTS published_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text DEFAULT '',
  content text NOT NULL,
  featured_image_url text DEFAULT '',
  author_name text DEFAULT 'Alan Holding',
  author_bio text DEFAULT '',
  category text DEFAULT 'Web Development',
  tags text[] DEFAULT '{}',
  published_at timestamptz DEFAULT now(),
  view_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_published_blog_posts_slug ON published_blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_published_blog_posts_category ON published_blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_published_blog_posts_published_at ON published_blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_published_blog_posts_user_id ON published_blog_posts(user_id);

-- Enable Row Level Security
ALTER TABLE published_blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON published_blog_posts;
DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON published_blog_posts;
DROP POLICY IF EXISTS "Users can update own blog posts" ON published_blog_posts;
DROP POLICY IF EXISTS "Users can delete own blog posts" ON published_blog_posts;

-- Create RLS policies

-- Anyone can view published blog posts (public access)
CREATE POLICY "Anyone can view published blog posts"
  ON published_blog_posts
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users can create their own blog posts
CREATE POLICY "Authenticated users can create blog posts"
  ON published_blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can update their own blog posts
CREATE POLICY "Users can update own blog posts"
  ON published_blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can delete their own blog posts
CREATE POLICY "Users can delete own blog posts"
  ON published_blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS update_published_blog_posts_updated_at ON published_blog_posts;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_published_blog_posts_updated_at
  BEFORE UPDATE ON published_blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count (can be called from frontend)
CREATE OR REPLACE FUNCTION increment_blog_post_views(post_slug text)
RETURNS void AS $$
BEGIN
  UPDATE published_blog_posts
  SET view_count = view_count + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;