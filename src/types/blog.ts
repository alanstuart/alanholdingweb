export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  updated_at: string;
  image_url?: string;
  category: string;
  tags: string[];
  is_published: boolean;
  created_at: string;
}

export interface BlogPostCreate {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  is_published?: boolean;
}

export interface BlogPostUpdate {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  is_published?: boolean;
  updated_at?: string;
}
