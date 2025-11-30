import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { blogService } from '../services/blogService';
import type { BlogPost as BlogPostType } from '../types/blog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const fetchedPost = await blogService.getPostBySlug(slug);

        if (fetchedPost) {
          setPost(fetchedPost);

          const related = await blogService.getPostsByCategory(fetchedPost.category);
          setRelatedPosts(related.filter(p => p.id !== fetchedPost.id).slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={`min-h-screen ${
        theme === 'dark'
          ? 'text-white bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'text-gray-800 bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <Navbar isScrolled={true} />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-blue-600 hover:underline">
            {t.backToBlog}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark'
        ? 'text-white bg-gradient-to-br from-gray-900 via-black to-gray-900'
        : 'text-gray-800 bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <Navbar isScrolled={true} />

      <article className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        <Link
          to="/blog"
          className={`inline-flex items-center gap-2 mb-8 transition-colors ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft size={20} />
          {t.backToBlog}
        </Link>

        <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
          {post.category}
        </span>

        <h1 className={`text-5xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
          <span className={`flex items-center gap-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Calendar size={18} />
            {formatDate(post.published_at)}
          </span>
          <span className={`flex items-center gap-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Clock size={18} />
            {calculateReadingTime(post.content)} {t.minutes} {t.readingTime}
          </span>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            By {post.author}
          </span>
          <button
            onClick={handleShare}
            className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Share2 size={18} />
            {t.sharePost}
          </button>
        </div>

        {post.image_url && (
          <div className="mb-12 rounded-xl overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className={`prose prose-lg max-w-none mb-12 ${
          theme === 'dark' ? 'prose-invert' : ''
        }`}>
          <p className="text-xl leading-relaxed mb-8">{post.excerpt}</p>
          <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-gray-700">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Tag size={16} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className={`text-3xl font-bold mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t.relatedPosts}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className={`group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-750'
                      : 'bg-white hover:shadow-xl'
                  }`}
                >
                  {relatedPost.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.image_url}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                      {relatedPost.category}
                    </span>
                    <h3 className={`text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors ${
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
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
