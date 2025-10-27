import React from 'react';
import { Calendar, User, Edit, Trash2, Tag } from 'lucide-react';
import type { FutureBlogPost } from '../../types/blog';

interface BlogPostCardProps {
  post: FutureBlogPost;
  onEdit: (post: FutureBlogPost) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  High: 'bg-red-100 text-red-800 border-red-300',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Low: 'bg-green-100 text-green-800 border-green-300',
};

const statusColors = {
  Idea: 'bg-gray-100 text-gray-800',
  Outline: 'bg-blue-100 text-blue-800',
  Draft: 'bg-purple-100 text-purple-800',
  'Ready to Publish': 'bg-green-100 text-green-800',
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onEdit, onDelete }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1 line-clamp-2">
            {post.title}
          </h3>
          <div className="flex gap-2 ml-3 flex-shrink-0">
            <button
              onClick={() => onEdit(post)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Edit post"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete post"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
          {post.description || 'No description provided'}
        </p>

        <div className="space-y-3 mt-auto">
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[post.status]}`}>
              {post.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[post.priority]}`}>
              {post.priority} Priority
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-gray-400" />
              <span>{formatDate(post.target_publication_date)}</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-1">
                <User size={16} className="text-gray-400" />
                <span className="truncate max-w-[150px]">{post.author}</span>
              </div>
            )}
          </div>

          {post.category && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Tag size={16} className="text-gray-400" />
              <span className="font-medium">{post.category}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
