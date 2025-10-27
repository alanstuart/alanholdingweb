/*
  # Future Blog Posts Management System

  ## Overview
  This migration creates a comprehensive system for managing future blog post ideas, drafts, and scheduled content.

  ## New Tables
  
  ### `future_blog_posts`
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text, required) - Blog post title
  - `description` (text) - Brief summary or description (2-3 sentences)
  - `target_publication_date` (date) - Planned publication date
  - `category` (text) - Category or tag for the post
  - `priority` (text) - Priority level: High, Medium, or Low
  - `status` (text) - Current status: Idea, Outline, Draft, Ready to Publish
  - `author` (text) - Author name or assignment
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `user_id` (uuid) - Reference to auth.users for ownership

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Users can only access their own blog posts
  - Policies for SELECT, INSERT, UPDATE, DELETE operations

  ## Indexes
  - Index on `user_id` for efficient user-specific queries
  - Index on `status` for filtering by status
  - Index on `target_publication_date` for date-based sorting
*/

-- Create the future_blog_posts table
CREATE TABLE IF NOT EXISTS future_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  target_publication_date date,
  category text DEFAULT '',
  priority text DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  status text DEFAULT 'Idea' CHECK (status IN ('Idea', 'Outline', 'Draft', 'Ready to Publish')),
  author text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_future_blog_posts_user_id ON future_blog_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_future_blog_posts_status ON future_blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_future_blog_posts_target_date ON future_blog_posts(target_publication_date);

-- Enable Row Level Security
ALTER TABLE future_blog_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users can view their own blog posts
CREATE POLICY "Users can view own blog posts"
  ON future_blog_posts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own blog posts
CREATE POLICY "Users can create own blog posts"
  ON future_blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own blog posts
CREATE POLICY "Users can update own blog posts"
  ON future_blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own blog posts
CREATE POLICY "Users can delete own blog posts"
  ON future_blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_future_blog_posts_updated_at ON future_blog_posts;
CREATE TRIGGER update_future_blog_posts_updated_at
  BEFORE UPDATE ON future_blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();