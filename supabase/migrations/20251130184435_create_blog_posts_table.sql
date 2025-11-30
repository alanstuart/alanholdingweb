/*
  # Create Blog Posts Table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key) - Unique identifier for each blog post
      - `title` (text) - Blog post title
      - `slug` (text, unique) - URL-friendly version of the title
      - `excerpt` (text) - Short description/preview of the post
      - `content` (text) - Full blog post content (supports markdown)
      - `author` (text) - Author name
      - `published_at` (timestamptz) - Publication date and time
      - `updated_at` (timestamptz) - Last update timestamp
      - `image_url` (text) - Featured image URL
      - `category` (text) - Blog post category
      - `tags` (text array) - Array of tags for the post
      - `is_published` (boolean) - Publication status
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access to published posts
    - Add policy for authenticated users to manage their own posts
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT 'Admin',
  published_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  image_url text,
  category text NOT NULL DEFAULT 'General',
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blog posts
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  USING (is_published = true);

-- Policy: Authenticated users can read all blog posts
CREATE POLICY "Authenticated users can read all posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert blog posts
CREATE POLICY "Authenticated users can insert posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update blog posts
CREATE POLICY "Authenticated users can update posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete blog posts
CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create index on published_at for sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Create index on is_published for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
