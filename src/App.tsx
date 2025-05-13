import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpecialOffer from './components/SpecialOffer';
import Chatbot from './components/Chatbot';
import ParticlesBackground from './components/ParticlesBackground';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-x-hidden">
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
        
        <Chatbot />
        <button 
          className="back-to-top-btn"
          aria-label="Back to top"
        >
          <span className="sr-only">Back to top</span>
          ↑
        </button>
      </div>
    </ThemeProvider>
  );
}

export default App;