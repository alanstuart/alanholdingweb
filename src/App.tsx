import React, { useState, useEffect } from 'react';
import ModernHero from './components/ModernHero';
import ModernNavbar from './components/ModernNavbar';
import About from './components/About';
import ModernServices from './components/ModernServices';
import ModernProjects from './components/ModernProjects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpecialOffer from './components/SpecialOffer';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${
      theme === 'dark' 
        ? 'text-white bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'text-gray-800 bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Content */}
      <div className="relative">
        <ModernNavbar isScrolled={isScrolled} />
        <ModernHero />
        <About />
        <SpecialOffer />
        <ModernServices />
        <ModernProjects />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;