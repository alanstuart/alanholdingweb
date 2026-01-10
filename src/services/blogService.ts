import { supabase } from '../lib/supabaseClient';
import type { BlogPost, BlogPostCreate, BlogPostUpdate, LocalizedBlogPost } from '../types/blog';

export function getLocalizedPost(post: BlogPost, language: string): LocalizedBlogPost {
  const useSpanish = language === 'es';

  return {
    id: post.id,
    slug: post.slug,
    title: (useSpanish && post.title_es) || post.title,
    excerpt: (useSpanish && post.excerpt_es) || post.excerpt,
    content: (useSpanish && post.content_es) || post.content,
    category: (useSpanish && post.category_es) || post.category,
    author: post.author,
    published_at: post.published_at,
    updated_at: post.updated_at,
    image_url: post.image_url,
    tags: post.tags,
    is_published: post.is_published,
    created_at: post.created_at,
  };
}

export const blogService = {
  async getAllPublishedPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching published blog posts:', error);
      throw error;
    }

    return data || [];
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching blog post by slug:', error);
      throw error;
    }

    return data;
  },

  async getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent blog posts:', error);
      throw error;
    }

    return data || [];
  },

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .eq('category', category)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts by category:', error);
      throw error;
    }

    return data || [];
  },

  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .contains('tags', [tag])
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts by tag:', error);
      throw error;
    }

    return data || [];
  },

  async createPost(post: BlogPostCreate): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }

    return data;
  },

  async updatePost(id: string, updates: BlogPostUpdate): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }

    return data;
  },

  async deletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  },

  async getAllCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('category')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    const categories = [...new Set(data?.map(post => post.category) || [])];
    return categories;
  },

  async getAllTags(): Promise<string[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('tags')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }

    const allTags = data?.flatMap(post => post.tags || []) || [];
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags;
  }
};
