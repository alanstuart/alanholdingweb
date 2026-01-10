/*
  # Add Spanish Translation Columns to Blog Posts

  1. Changes
    - Add `title_es` column for Spanish title translation
    - Add `excerpt_es` column for Spanish excerpt/summary translation
    - Add `content_es` column for Spanish full content translation
    - Add `category_es` column for Spanish category name translation

  2. Notes
    - Original columns (title, excerpt, content, category) remain as English defaults
    - Spanish columns are optional - will fall back to English if null
    - Turkish language users will see English content (no Turkish blog translations)
*/

ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS title_es text,
ADD COLUMN IF NOT EXISTS excerpt_es text,
ADD COLUMN IF NOT EXISTS content_es text,
ADD COLUMN IF NOT EXISTS category_es text;