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

      {/* Manual Vapi Trigger Button */}
      <button 
        onClick={() => window.vapi?.startConversation()} 
        className="fixed bottom-24 right-24 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50 flex items-center gap-2"
        aria-label="Start voice conversation"
      >
        <span role="img" aria-label="microphone">🎙️</span>
        Talk to Oliver
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