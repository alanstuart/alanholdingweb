import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { useTheme } from '../context/ThemeContext';

const ModernHero: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: theme === 'dark' ? '#00c6ff' : '#0072ff'
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / 100) * 0.3 * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'transparent' }}
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 z-10 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-black/80 via-gray-900/60 to-blue-900/40' 
          : 'bg-gradient-to-br from-white/90 via-blue-50/80 to-blue-100/60'
      }`} />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-8 ${
              theme === 'dark'
                ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50'
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              Landing Pages & AI Voice Solutions
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                I Transform Businesses with
              </span>
              <span className="block">
                <span className="text-blue-500">
                  Modern Landing Pages
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  {' '}and{' '}
                </span>
                <span className="text-blue-500">
                  AI Voice Agents
                </span>
              </span>
            </h1>

            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              High-impact digital solutions that automate your growth.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            <div className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                : 'bg-white/80 border border-gray-200 hover:bg-white/90 shadow-lg'
            }`}>
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <div className={`w-6 h-6 rounded ${
                  theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                }`} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Landing Page Design & Development
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Responsive, ultra-fast websites optimized to convert visitors into customers.
              </p>
            </div>

            <div className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                : 'bg-white/80 border border-gray-200 hover:bg-white/90 shadow-lg'
            }`}>
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <div className={`w-6 h-6 rounded ${
                  theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                }`} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                AI Voice Agents (Voice Bots)
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Intelligent systems that handle calls, book appointments, and answer questions 24/7 using natural language.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <a
              href="#services"
              className={`group flex items-center px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
            }`}>
              <span>View My Services</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          theme === 'dark' ? 'border-white/30' : 'border-gray-400'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-bounce ${
            theme === 'dark' ? 'bg-white/50' : 'bg-gray-600'
          }`} />
        </div>
      </div>
    </section>
  );
};

export default ModernHero;