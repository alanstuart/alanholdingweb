import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingSection from './components/BookingSection';
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
        ? 'text-white bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'text-gray-800 bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Content */}
      <div className="relative">
        <Navbar isScrolled={isScrolled} />
        <Hero />
        <About />
        <SpecialOffer />
        <Services />
        <Projects />
        <Testimonials />
        <BookingSection />
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