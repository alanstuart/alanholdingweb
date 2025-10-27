import { supabase } from '../lib/supabaseClient';
import type { FutureBlogPost, CreateBlogPostInput, UpdateBlogPostInput, SortField, SortOrder, FilterOptions } from '../types/blog';

export const blogService = {
  async getAllBlogPosts(
    sortField: SortField = 'created_at',
    sortOrder: SortOrder = 'desc',
    filters?: FilterOptions
  ): Promise<FutureBlogPost[]> {
    let query = supabase
      .from('future_blog_posts')
      .select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.priority) {
      query = query.eq('priority', filters.priority);
    }

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.searchQuery) {
      query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
    }

    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }

    return data || [];
  },

  async getBlogPostById(id: string): Promise<FutureBlogPost | null> {
    const { data, error } = await supabase
      .from('future_blog_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch blog post: ${error.message}`);
    }

    return data;
  },

  async createBlogPost(input: CreateBlogPostInput): Promise<FutureBlogPost> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User must be authenticated to create blog posts');
    }

    const { data, error } = await supabase
      .from('future_blog_posts')
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

  async updateBlogPost(input: UpdateBlogPostInput): Promise<FutureBlogPost> {
    const { id, ...updates } = input;

    const { data, error } = await supabase
      .from('future_blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update blog post: ${error.message}`);
    }

    return data;
  },

  async deleteBlogPost(id: string): Promise<void> {
    const { error } = await supabase
      .from('future_blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete blog post: ${error.message}`);
    }
  },

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('future_blog_posts')
      .select('category')
      .not('category', 'eq', '');

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    const categories = [...new Set(data.map(item => item.category))];
    return categories.sort();
  },
};
