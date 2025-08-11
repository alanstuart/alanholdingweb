import React from 'react';
import { Github, Linkedin, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="pt-16 pb-8 px-4 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footer-logo-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00c6ff" />
                    <stop offset="100%" stopColor="#0072ff" />
                  </linearGradient>
                </defs>
                <g>
                  <polygon points="15,85 40,15 65,85 55,85 40,50 25,85" fill="url(#footer-logo-gradient)" />
                  <rect x="37" y="65" width="6" height="20" fill="#222" opacity="0.7" />
                  <rect x="75" y="30" width="10" height="55" fill="url(#footer-logo-gradient)" />
                  <rect x="100" y="30" width="10" height="55" fill="url(#footer-logo-gradient)" />
                  <rect x="75" y="60" width="35" height="10" fill="#222" opacity="0.7" />
                </g>
              </svg>
              <span className="text-xl font-bold">Alan Holding</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t.footerDescription}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/alanholding" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/alan-holding-7b8b8b1b8/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">{t.about}</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">{t.services}</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">{t.projects}</a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">{t.testimonials}</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">{t.contact}</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">{t.services}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'en' ? 'Web Development' : language === 'es' ? 'Desarrollo Web' : 'Web Geliştirme'}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'en' ? 'SEO Optimization' : language === 'es' ? 'Optimización SEO' : 'SEO Optimizasyonu'}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'en' ? 'Responsive Design' : language === 'es' ? 'Diseño Responsivo' : 'Duyarlı Tasarım'}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'en' ? 'Tech Integration' : language === 'es' ? 'Integración Tecnológica' : 'Teknoloji Entegrasyonu'}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Alan Holding. {t.allRightsReserved}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">{t.privacyPolicy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.termsOfService}</a>
            <a href="#" className="hover:text-white transition-colors">{t.cookiePolicy}</a>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToTop}
        className="back-to-top-btn"
        aria-label={t.backToTop}
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;