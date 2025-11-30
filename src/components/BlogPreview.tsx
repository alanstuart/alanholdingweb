import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { blogService } from '../services/blogService';
import type { BlogPost } from '../types/blog';

const BlogPreview: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const recentPosts = await blogService.getRecentPosts(3);
        setPosts(recentPosts);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading || posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.latestPosts}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.blogSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-750'
                  : 'bg-white hover:shadow-xl'
              }`}
            >
              {post.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <span className={`flex items-center gap-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar size={16} />
                    {formatDate(post.published_at)}
                  </span>
                  <span className={`flex items-center gap-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Clock size={16} />
                    {calculateReadingTime(post.content)} {t.minutes}
                  </span>
                </div>

                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                  {post.category}
                </span>

                <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>

                <p className={`mb-4 line-clamp-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  {t.readMore}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 ${
              theme === 'dark'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {t.allPosts}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
