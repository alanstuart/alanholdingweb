import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  
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
          <span className={`text-xl font-bold tracking-tight ${theme === 'light' ? 'text-blue-600' : 'text-white'}`}>
            Alan Holding
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="nav-link">{language === 'en' ? 'Services' : 'Servicios'}</a>
          <a href="#projects" className="nav-link">{language === 'en' ? 'Projects' : 'Proyectos'}</a>
          <a href="#testimonials" className="nav-link">{language === 'en' ? 'Testimonials' : 'Testimonios'}</a>
          <a href="#contact" className="nav-link">{language === 'en' ? 'Contact' : 'Contacto'}</a>
          <button 
            onClick={toggleLanguage}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
            aria-label="Toggle language"
          >
            <Globe size={20} />
            <span className="ml-1">{language.toUpperCase()}</span>
          </button>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleLanguage}
            className={`p-2 mr-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
            aria-label="Toggle language"
          >
            <Globe size={20} />
          </button>
          <button 
            onClick={toggleTheme}
            className={`p-2 mr-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
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
                ? 'text-white hover:bg-gray-800' 
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
            ? 'bg-black bg-opacity-95 backdrop-blur-md border-gray-800 text-white'
            : 'bg-white bg-opacity-95 backdrop-blur-md border-gray-200 text-blue-600'
        }`}>
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a href="#services" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {language === 'en' ? 'Services' : 'Servicios'}
            </a>
            <a href="#projects" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {language === 'en' ? 'Projects' : 'Proyectos'}
            </a>
            <a href="#testimonials" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {language === 'en' ? 'Testimonials' : 'Testimonios'}
            </a>
            <a href="#contact" className={`py-2 px-4 rounded-md transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`} onClick={() => setIsOpen(false)}>
              {language === 'en' ? 'Contact' : 'Contacto'}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;