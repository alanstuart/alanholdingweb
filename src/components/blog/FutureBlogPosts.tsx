import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, BarChart, Grid, List } from 'lucide-react';
import BlogPostCard from './BlogPostCard';
import BlogPostModal from './BlogPostModal';
import { blogService } from '../../services/blogService';
import type { FutureBlogPost, Priority, Status, SortField, SortOrder, CreateBlogPostInput } from '../../types/blog';

type ViewMode = 'grid' | 'list';

const FutureBlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<FutureBlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<FutureBlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<FutureBlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterStatus, setFilterStatus] = useState<Status | ''>('');
  const [filterPriority, setFilterPriority] = useState<Priority | ''>('');
  const [filterCategory, setFilterCategory] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    loadData();
  }, [sortField, sortOrder]);

  useEffect(() => {
    applyFilters();
  }, [posts, searchQuery, filterStatus, filterPriority, filterCategory]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [postsData, categoriesData] = await Promise.all([
        blogService.getAllBlogPosts(sortField, sortOrder),
        blogService.getCategories(),
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('Failed to load blog posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...posts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query)
      );
    }

    if (filterStatus) {
      filtered = filtered.filter((post) => post.status === filterStatus);
    }

    if (filterPriority) {
      filtered = filtered.filter((post) => post.priority === filterPriority);
    }

    if (filterCategory) {
      filtered = filtered.filter((post) => post.category === filterCategory);
    }

    setFilteredPosts(filtered);
  };

  const handleCreatePost = async (data: CreateBlogPostInput) => {
    await blogService.createBlogPost(data);
    await loadData();
  };

  const handleUpdatePost = async (data: CreateBlogPostInput) => {
    if (editingPost) {
      await blogService.updateBlogPost({ id: editingPost.id, ...data });
      await loadData();
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.deleteBlogPost(id);
        await loadData();
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete blog post. Please try again.');
      }
    }
  };

  const handleEditPost = (post: FutureBlogPost) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const getStatusCounts = () => {
    const counts = {
      total: posts.length,
      idea: posts.filter((p) => p.status === 'Idea').length,
      draft: posts.filter((p) => p.status === 'Draft').length,
      ready: posts.filter((p) => p.status === 'Ready to Publish').length,
    };
    return counts;
  };

  const counts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Future Blog Posts</h1>
              <p className="text-gray-600">Manage your upcoming blog post ideas, drafts, and scheduled content</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={20} />
              New Post
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Posts</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{counts.total}</p>
                </div>
                <BarChart className="text-blue-500" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Ideas</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{counts.idea}</p>
                </div>
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Drafts</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{counts.draft}</p>
                </div>
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Ready</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{counts.ready}</p>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as Status | '')}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">All Statuses</option>
                  <option value="Idea">Idea</option>
                  <option value="Outline">Outline</option>
                  <option value="Draft">Draft</option>
                  <option value="Ready to Publish">Ready to Publish</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as Priority | '')}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                {categories.length > 0 && (
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                )}

                <select
                  value={`${sortField}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortField(field as SortField);
                    setSortOrder(order as SortOrder);
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="created_at-desc">Newest First</option>
                  <option value="created_at-asc">Oldest First</option>
                  <option value="target_publication_date-asc">Publication Date (Soon)</option>
                  <option value="target_publication_date-desc">Publication Date (Far)</option>
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                </select>

                <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    aria-label="Grid view"
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    aria-label="List view"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 mb-6">
              {posts.length === 0
                ? "Get started by creating your first blog post idea"
                : "Try adjusting your filters or search query"}
            </p>
            {posts.length === 0 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Create First Post
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
          }>
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        )}
      </div>

      <BlogPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={editingPost ? handleUpdatePost : handleCreatePost}
        post={editingPost}
        categories={categories}
      />
    </div>
  );
};

export default FutureBlogPosts;
