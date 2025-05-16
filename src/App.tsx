import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpecialOffer from './components/SpecialOffer';
import ParticlesBackground from './components/ParticlesBackground';
import BotpressChat from './components/BotpressChat';
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${
      theme === 'dark' 
        ? 'text-white' 
        : 'text-gray-800'
    }`}>
      {/* Background elements */}
      <ParticlesBackground />
      <div className="grid-overlay fixed inset-0 z-0 opacity-10"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar isScrolled={isScrolled} />
        <Hero />
        <SpecialOffer />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
      
      <BotpressChat />
      
      <button 
        className="back-to-top-btn"
        aria-label="Back to top"
      >
        <span className="sr-only">Back to top</span>
        ↑
      </button>
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