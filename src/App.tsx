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

declare global {
  interface Window {
    vapi?: {
      startConversation: () => void;
    };
  }
}

function AppContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const [vapiLoaded, setVapiLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);

    // Check for Vapi initialization
    const checkVapi = setInterval(() => {
      if (window.vapi) {
        setVapiLoaded(true);
        clearInterval(checkVapi);
      }
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(checkVapi);
    };
  }, []);

  const startVapiConversation = () => {
    if (window.vapi) {
      window.vapi.startConversation();
    }
  };

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

      {/* Vapi Trigger Button */}
      {vapiLoaded && (
        <button
          onClick={startVapiConversation}
          className="vapi-trigger-btn fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 z-[9999] flex items-center gap-2 font-semibold"
          aria-label="Start voice conversation with Oliver"
        >
          <span role="img" aria-label="microphone">🎙️</span>
          Talk to Oliver
        </button>
      )}
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