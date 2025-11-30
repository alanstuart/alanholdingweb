/*
  # Remove Blog Tables

  1. Changes
    - Drop `published_blog_posts` table and all associated objects
    - Drop `future_blog_posts` table and all associated objects
    - Remove all RLS policies for blog tables
  
  2. Security
    - Clean removal of all blog-related database objects
*/

-- Drop published_blog_posts table if it exists
DROP TABLE IF EXISTS published_blog_posts CASCADE;

-- Drop future_blog_posts table if it exists
DROP TABLE IF EXISTS future_blog_posts CASCADE;
