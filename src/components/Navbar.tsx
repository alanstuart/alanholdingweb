import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
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
          <span className="text-xl font-bold tracking-tight">Alan Holding</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="nav-link">Services</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-white hover:bg-gray-800 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-md shadow-lg py-4 border-t border-gray-800">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a href="#services" className="py-2 px-4 hover:bg-gray-800 rounded-md transition-colors" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#projects" className="py-2 px-4 hover:bg-gray-800 rounded-md transition-colors" onClick={() => setIsOpen(false)}>Projects</a>
            <a href="#testimonials" className="py-2 px-4 hover:bg-gray-800 rounded-md transition-colors" onClick={() => setIsOpen(false)}>Testimonials</a>
            <a href="#contact" className="py-2 px-4 hover:bg-gray-800 rounded-md transition-colors" onClick={() => setIsOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;