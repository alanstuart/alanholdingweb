import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black bg-opacity-80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="w-10 h-10 mr-2" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
            </defs>
            <g>
              <polygon points="15,85 40,15 65,85 55,85 40,50 25,85" fill="url(#logo-gradient)" />
              <rect x="37" y="65" width="6" height="20" fill="#222" opacity="0.7" />
              <rect x="75" y="30" width="10" height="55" fill="url(#logo-gradient)" />
              <rect x="100" y="30" width="10" height="55" fill="url(#logo-gradient)" />
              <rect x="75" y="60" width="35" height="10" fill="#222" opacity="0.7" />
            </g>
          </svg>
          <span className="text-xl font-bold tracking-tight text-blue-400">
            Alan Holding
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="nav-link">{translations[language].about}</a>
          <a href="#services" className="nav-link">{translations[language].services}</a>
          <a href="#projects" className="nav-link">{translations[language].projects}</a>
          <a href="#testimonials" className="nav-link">{translations[language].testimonials}</a>
          <a href="/blog" className="nav-link">{translations[language].blog}</a>
          <a href="#contact" className="nav-link">{translations[language].contact}</a>
          
          {/* Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className={`flex items-center p-2 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' 
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              }`}
              aria-label="Select language"
            >
              <Globe size={20} />
              <span className="ml-1 mr-1">{currentLanguage?.flag}</span>
              <ChevronDown size={16} />
            </button>
            
            {isLanguageDropdownOpen && (
              <div className={`absolute top-full right-0 mt-2 py-2 w-40 rounded-lg shadow-lg border z-50 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as 'en' | 'es' | 'tr')}
                    className={`w-full text-left px-4 py-2 flex items-center transition-colors ${
                      language === lang.code
                        ? theme === 'dark'
                          ? 'bg-blue-900 text-blue-400'
                          : 'bg-blue-100 text-blue-600'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' 
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          {/* Mobile Language Dropdown */}
          <div className="relative mr-2">
            <button 
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className={`flex items-center p-2 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' 
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              }`}
              aria-label="Select language"
            >
              <Globe size={20} />
              <span className="ml-1">{currentLanguage?.flag}</span>
            </button>
            
            {isLanguageDropdownOpen && (
              <div className={`absolute top-full right-0 mt-2 py-2 w-32 rounded-lg shadow-lg border z-50 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as 'en' | 'es' | 'tr')}
                    className={`w-full text-left px-3 py-2 flex items-center transition-colors ${
                      language === lang.code
                        ? theme === 'dark'
                          ? 'bg-blue-900 text-blue-400'
                          : 'bg-blue-100 text-blue-600'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' 
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-md transition-colors ${
              theme === 'dark' 
                ? 'text-blue-400 hover:bg-gray-800' 
                : 'text-blue-600 hover:bg-gray-100'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 py-4 border-t ${
          theme === 'dark'
            ? 'bg-black bg-opacity-95 backdrop-blur-md border-gray-800 text-blue-400'
            : 'bg-white bg-opacity-95 backdrop-blur-md border-gray-200 text-blue-600'
        }`}>
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a href="#about" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {translations[language].about}
            </a>
            <a href="#services" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {translations[language].services}
            </a>
            <a href="#projects" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {translations[language].projects}
            </a>
            <a href="#testimonials" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {translations[language].testimonials}
            </a>
            <a href="/blog" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {translations[language].blog}
            </a>
            <a href="#contact" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {translations[language].contact}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;