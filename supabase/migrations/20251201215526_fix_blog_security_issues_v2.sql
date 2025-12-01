/*
  # Fix Blog Posts Security Issues

  1. Policy Fixes
    - Drop redundant permissive policies for authenticated users
    - Consolidate into a single, more efficient policy structure
    - Keep public read access for published posts
    - Simplify authenticated user permissions

  2. Index Optimization
    - Drop unused indexes that are not being utilized
    - Keep only the index on published_at for sorting performance

  3. Function Security
    - Fix search_path issues for functions that exist
    - Use proper error handling to skip non-existent functions

  4. Security
    - Maintain proper access control
    - Improve query performance
    - Follow PostgreSQL security best practices
*/

-- Drop existing policies to rebuild them correctly
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can read all posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON blog_posts;

-- Create a single, efficient read policy
-- Public users can only see published posts
-- Authenticated users can see all posts (including drafts)
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (is_published = true OR auth.uid() IS NOT NULL);

-- Authenticated users can insert blog posts
CREATE POLICY "Authenticated users can insert posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update blog posts
CREATE POLICY "Authenticated users can update posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can delete blog posts
CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Drop unused indexes
DROP INDEX IF EXISTS idx_blog_posts_slug;
DROP INDEX IF EXISTS idx_blog_posts_is_published;

-- Keep the published_at index as it's used for ordering blog posts
-- The index on published_at is actually useful for the ORDER BY in queries

-- Fix function search paths for functions that exist
DO $$
DECLARE
  func_exists boolean;
BEGIN
  -- Check and fix update_updated_at_column function if it exists
  SELECT EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_updated_at_column'
  ) INTO func_exists;
  
  IF func_exists THEN
    ALTER FUNCTION public.update_updated_at_column() SET search_path = pg_catalog, public;
  END IF;

  -- Check and fix increment_blog_post_views function if it exists
  SELECT EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'increment_blog_post_views'
  ) INTO func_exists;
  
  IF func_exists THEN
    -- Get the function signature first
    DECLARE
      func_signature text;
    BEGIN
      SELECT pg_get_function_identity_arguments(p.oid) INTO func_signature
      FROM pg_proc p
      JOIN pg_namespace n ON p.pronamespace = n.oid
      WHERE n.nspname = 'public' AND p.proname = 'increment_blog_post_views';
      
      EXECUTE format('ALTER FUNCTION public.increment_blog_post_views(%s) SET search_path = pg_catalog, public', func_signature);
    END;
  END IF;
END $$;
