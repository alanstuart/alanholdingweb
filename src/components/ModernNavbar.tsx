import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface ModernNavbarProps {
  isScrolled: boolean;
}

const ModernNavbar: React.FC<ModernNavbarProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
  ];
  
  const currentLanguage = languages.find(lang => lang.code === language);
  
  const handleLanguageChange = (langCode: 'en' | 'es' | 'tr') => {
    setLanguage(langCode);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? theme === 'dark'
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <svg className="w-10 h-10" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="modern-logo-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00c6ff" />
                    <stop offset="100%" stopColor="#0072ff" />
                  </linearGradient>
                </defs>
                <g>
                  <polygon points="15,85 40,15 65,85 55,85 40,50 25,85" fill="url(#modern-logo-gradient)" />
                  <rect x="37" y="65" width="6" height="20" fill={theme === 'dark' ? '#333' : '#666'} opacity="0.7" />
                  <rect x="75" y="30" width="10" height="55" fill="url(#modern-logo-gradient)" />
                  <rect x="100" y="30" width="10" height="55" fill="url(#modern-logo-gradient)" />
                  <rect x="75" y="60" width="35" height="10" fill={theme === 'dark' ? '#333' : '#666'} opacity="0.7" />
                </g>
              </svg>
            </div>
            <div className="ml-3">
              <div className={`text-xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Alan Holding
              </div>
              <div className={`text-xs uppercase tracking-wider ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Digital Solutions
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#about" className={`modern-nav-link ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            }`}>
              {translations[language].about}
            </a>
            <a href="#services" className={`modern-nav-link ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            }`}>
              {translations[language].services}
            </a>
            <a href="#projects" className={`modern-nav-link ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            }`}>
              {translations[language].projects}
            </a>
            <a href="#contact" className={`modern-nav-link ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            }`}>
              {translations[language].contact}
            </a>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative hidden md:block">
              <button 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-white/10 text-gray-300 hover:bg-white/20' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Select language"
              >
                <Globe size={18} />
                <span className="ml-2 mr-1">{currentLanguage?.flag}</span>
                <ChevronDown size={14} />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className={`absolute top-full right-0 mt-2 py-2 w-40 rounded-xl shadow-xl border z-50 ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as 'en' | 'es' | 'tr')}
                      className={`w-full text-left px-4 py-2 flex items-center transition-colors ${
                        language === lang.code
                          ? theme === 'dark'
                            ? 'bg-blue-900/50 text-blue-400'
                            : 'bg-blue-100 text-blue-700'
                          : theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-800'
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-white/10 text-gray-300 hover:bg-white/20' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* CTA Button */}
            <a 
              href="#contact"
              className="hidden md:inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Let's Talk
            </a>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-white/10' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 py-6 border-t ${
            theme === 'dark'
              ? 'bg-black/95 backdrop-blur-xl border-white/10'
              : 'bg-white/95 backdrop-blur-xl border-gray-200'
          }`}>
            <div className="container mx-auto px-6 flex flex-col space-y-4">
              <a 
                href="#about" 
                className={`py-3 px-4 rounded-lg transition-colors ${
                  theme === 'dark' ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                }`} 
                onClick={() => setIsOpen(false)}
              >
                {translations[language].about}
              </a>
              <a 
                href="#services" 
                className={`py-3 px-4 rounded-lg transition-colors ${
                  theme === 'dark' ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                }`} 
                onClick={() => setIsOpen(false)}
              >
                {translations[language].services}
              </a>
              <a 
                href="#projects" 
                className={`py-3 px-4 rounded-lg transition-colors ${
                  theme === 'dark' ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                }`} 
                onClick={() => setIsOpen(false)}
              >
                {translations[language].projects}
              </a>
              <a 
                href="#contact" 
                className={`py-3 px-4 rounded-lg transition-colors ${
                  theme === 'dark' ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                }`} 
                onClick={() => setIsOpen(false)}
              >
                {translations[language].contact}
              </a>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <a 
                  href="#contact"
                  className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ModernNavbar;