import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, TrendingUp, ArrowLeft, Share2, Tag } from 'lucide-react';
import { publishedBlogService } from '../services/publishedBlogService';
import type { PublishedBlogPost } from '../types/publishedBlog';
import { useTheme } from '../context/ThemeContext';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PublishedBlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PublishedBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (postSlug: string) => {
    try {
      setIsLoading(true);
      const postData = await publishedBlogService.getPostBySlug(postSlug);

      if (postData) {
        setPost(postData);
        await publishedBlogService.incrementViewCount(postSlug);

        const related = await publishedBlogService.getRelatedPosts(
          postData.category,
          postData.id,
          3
        );
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Failed to load blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-500 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <article className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 mb-8 hover:text-blue-600 transition-colors ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <div className={`flex items-center gap-4 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{getReadingTime(post.content)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={16} />
                  <span>{post.view_count} views</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold">{post.author_name}</p>
                  {post.author_bio && (
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {post.author_bio}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleShare}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-900 shadow'
                }`}
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>

          {post.featured_image_url && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className={`prose prose-lg max-w-none mb-12 ${
            theme === 'dark' ? 'prose-invert' : ''
          }`}>
            <div
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              className="leading-relaxed"
            />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className={`flex flex-wrap items-center gap-2 mb-12 pb-12 border-b ${
              theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <Tag size={18} className="text-gray-400" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className={`rounded-2xl p-8 mb-12 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-cyan-50'
          }`}>
            <h3 className="text-2xl font-bold mb-4">Ready to Grow Your Business?</h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Let's work together to create a website that drives real results for your business.
            </p>
            <Link
              to="/#contact"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </Link>
          </div>

          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className={`group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    {relatedPost.featured_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.featured_image_url}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className={`font-bold mb-2 group-hover:text-blue-600 transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {relatedPost.title}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
