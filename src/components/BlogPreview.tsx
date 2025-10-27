import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { publishedBlogService } from '../services/publishedBlogService';
import type { PublishedBlogPost } from '../types/publishedBlog';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const BlogPreview: React.FC = () => {
  const [posts, setPosts] = useState<PublishedBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const latestPosts = await publishedBlogService.getLatestPosts(3);
      setPosts(latestPosts);
    } catch (error) {
      console.error('Failed to load blog posts:', error);
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

  const blogTitle = {
    en: 'Latest From Our Blog',
    es: 'Últimas del Blog',
    tr: 'Blogdan Son Yazılar'
  };

  const blogSubtitle = {
    en: 'Insights and strategies to help your business grow online',
    es: 'Perspectivas y estrategias para ayudar a crecer tu negocio en línea',
    tr: 'İşletmenizin çevrimiçi büyümesine yardımcı olacak içgörüler ve stratejiler'
  };

  const viewAllText = {
    en: 'View All Articles',
    es: 'Ver Todos los Artículos',
    tr: 'Tüm Makaleleri Gör'
  };

  if (isLoading || posts.length === 0) {
    return null;
  }

  return (
    <section id="blog-preview" className={`py-20 px-4 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {blogTitle[language as keyof typeof blogTitle]}
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {blogSubtitle[language as keyof typeof blogSubtitle]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {post.featured_image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                  {post.category}
                </span>

                <h3 className={`text-xl font-bold mt-4 mb-3 group-hover:text-blue-600 transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>

                <p className={`mb-4 line-clamp-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {post.excerpt}
                </p>

                <div className={`flex items-center justify-between text-sm pt-4 border-t ${
                  theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
                }`}>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{getReadingTime(post.content)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {viewAllText[language as keyof typeof viewAllText]}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
