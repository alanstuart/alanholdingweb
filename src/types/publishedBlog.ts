export interface PublishedBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  author_name: string;
  author_bio: string;
  category: string;
  tags: string[];
  published_at: string;
  view_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreatePublishedBlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  author_name?: string;
  author_bio?: string;
  category?: string;
  tags?: string[];
  published_at?: string;
  is_featured?: boolean;
}

export interface UpdatePublishedBlogPostInput extends Partial<CreatePublishedBlogPostInput> {
  id: string;
}

export interface BlogListFilters {
  category?: string;
  limit?: number;
  offset?: number;
}
