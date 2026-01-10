import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { blogService, getLocalizedPost } from '../services/blogService';
import type { BlogPost } from '../types/blog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allPosts, allCategories] = await Promise.all([
          blogService.getAllPublishedPosts(),
          blogService.getAllCategories()
        ]);
        setPosts(allPosts);
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const localizedPosts = useMemo(() =>
    posts.map(post => ({ original: post, localized: getLocalizedPost(post, language) })),
    [posts, language]
  );

  const filteredPosts = selectedCategory === 'all'
    ? localizedPosts
    : localizedPosts.filter(({ localized }) => localized.category === selectedCategory || posts.find(p => p.id === localized.id)?.category === selectedCategory);

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

  return (
    <div className={`min-h-screen ${
      theme === 'dark'
        ? 'text-white bg-gradient-to-br from-gray-900 via-black to-gray-900'
        : 'text-gray-800 bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <Navbar isScrolled={true} />

      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.blogTitle}
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.blogSubtitle}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t.allPosts}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className={`text-center py-20 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p className="text-xl">{t.noBlogPosts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(({ localized: post }) => (
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

                  <h2 className={`text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h2>

                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className={`flex items-center gap-1 text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    {t.readMore}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
