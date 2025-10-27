export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Idea' | 'Outline' | 'Draft' | 'Ready to Publish';

export interface FutureBlogPost {
  id: string;
  title: string;
  description: string;
  target_publication_date: string | null;
  category: string;
  priority: Priority;
  status: Status;
  author: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreateBlogPostInput {
  title: string;
  description?: string;
  target_publication_date?: string | null;
  category?: string;
  priority?: Priority;
  status?: Status;
  author?: string;
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
  id: string;
}

export type SortField = 'target_publication_date' | 'priority' | 'status' | 'created_at' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface FilterOptions {
  status?: Status;
  priority?: Priority;
  category?: string;
  searchQuery?: string;
}
