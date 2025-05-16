import React, { useEffect, useRef } from 'react';
import { Terminal, Code, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const typewriterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!typewriterRef.current) return;
    
    const phrases = [
      'Web Design & Development',
      'Digital Solutions',
      'Tech Consulting',
      'SEO Optimization'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        if (typewriterRef.current) {
          typewriterRef.current.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
        }
        typingSpeed = 50;
      } else {
        if (typewriterRef.current) {
          typewriterRef.current.textContent = currentPhrase.substring(0, charIndex + 1);
          charIndex++;
        }
        typingSpeed = 150;
      }
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }
      
      setTimeout(type, typingSpeed);
    };
    
    setTimeout(type, 1000);
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="code-rain"></div>
        <div className="circuit-pattern"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="badge text-xs uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
              Professional Web Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Transforming Ideas into Digital Reality
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-300 mb-6 font-light">
              <span ref={typewriterRef} className="typewriter"></span>
              <span className="cursor">|</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Not just websites that look good but digital solutions engineered to deliver real business results. 
              From site architecture to conversion copywriting, every aspect is optimized for performance.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="btn-primary relative overflow-hidden group"
              >
                <span className="relative z-10">Start Your Project</span>
                <span className="btn-shine"></span>
              </a>
              <a 
                href="#services" 
                className="btn-secondary"
              >
                Explore Services
              </a>
            </div>
            
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div className="flex flex-col items-center">
                <div className="tech-badge">
                  <Terminal size={20} />
                </div>
                <p className="text-sm mt-2 text-center text-gray-400">Custom Development</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="tech-badge">
                  <Code size={20} />
                </div>
                <p className="text-sm mt-2 text-center text-gray-400">Clean Code</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="tech-badge">
                  <Globe size={20} />
                </div>
                <p className="text-sm mt-2 text-center text-gray-400">Optimized SEO</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
            <div className="hero-image-container relative">
              <div className="glow-effect absolute"></div>
              <div className="code-effect absolute"></div>
              <div className="hero-image rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Tech workspace with clean design" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="stats-card absolute bottom-5 left-5 bg-black bg-opacity-80 backdrop-blur-md p-4 rounded-lg border border-gray-800 shadow-lg">
                <div className="text-sm text-gray-400">Projects Delivered</div>
                <div className="text-2xl font-bold">50+</div>
              </div>
              <div className="stats-card absolute top-5 right-5 bg-black bg-opacity-80 backdrop-blur-md p-4 rounded-lg border border-gray-800 shadow-lg">
                <div className="text-sm text-gray-400">Client Satisfaction</div>
                <div className="text-2xl font-bold">100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;