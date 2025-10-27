import { supabase } from '../lib/supabaseClient';
import type { PublishedBlogPost, CreatePublishedBlogPostInput, UpdatePublishedBlogPostInput, BlogListFilters } from '../types/publishedBlog';

export const publishedBlogService = {
  async getAllPublishedPosts(filters?: BlogListFilters): Promise<PublishedBlogPost[]> {
    let query = supabase
      .from('published_blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch published blog posts: ${error.message}`);
    }

    return data || [];
  },

  async getPostBySlug(slug: string): Promise<PublishedBlogPost | null> {
    const { data, error } = await supabase
      .from('published_blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch blog post: ${error.message}`);
    }

    return data;
  },

  async getFeaturedPosts(limit: number = 3): Promise<PublishedBlogPost[]> {
    const { data, error } = await supabase
      .from('published_blog_posts')
      .select('*')
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch featured posts: ${error.message}`);
    }

    return data || [];
  },

  async getLatestPosts(limit: number = 3): Promise<PublishedBlogPost[]> {
    const { data, error } = await supabase
      .from('published_blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch latest posts: ${error.message}`);
    }

    return data || [];
  },

  async getRelatedPosts(category: string, currentPostId: string, limit: number = 3): Promise<PublishedBlogPost[]> {
    const { data, error } = await supabase
      .from('published_blog_posts')
      .select('*')
      .eq('category', category)
      .neq('id', currentPostId)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch related posts: ${error.message}`);
    }

    return data || [];
  },

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('published_blog_posts')
      .select('category')
      .not('category', 'eq', '');

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    const categories = [...new Set(data.map(item => item.category))];
    return categories.sort();
  },

  async incrementViewCount(slug: string): Promise<void> {
    const { error } = await supabase.rpc('increment_blog_post_views', { post_slug: slug });

    if (error) {
      console.error('Failed to increment view count:', error);
    }
  },

  async createPost(input: CreatePublishedBlogPostInput): Promise<PublishedBlogPost> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User must be authenticated to create blog posts');
    }

    const { data, error } = await supabase
      .from('published_blog_posts')
      .insert({
        ...input,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create blog post: ${error.message}`);
    }

    return data;
  },

  async updatePost(input: UpdatePublishedBlogPostInput): Promise<PublishedBlogPost> {
    const { id, ...updates } = input;

    const { data, error } = await supabase
      .from('published_blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update blog post: ${error.message}`);
    }

    return data;
  },

  async deletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from('published_blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete blog post: ${error.message}`);
    }
  },
};
