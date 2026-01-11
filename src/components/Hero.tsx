import React from 'react';
import { ArrowRight, Laptop, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="code-rain"></div>
        <div className="circuit-pattern"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`text-xs uppercase tracking-widest mb-6 inline-block px-4 py-2 rounded-full ${
            theme === 'dark'
              ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            {t.heroBadge}
          </div>

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.heroMainTitle.weCreate}{' '}
            <span className="text-blue-500">{t.heroMainTitle.modernLandingPages}</span>
            {' '}{t.heroMainTitle.and}{' '}
            <span className="text-blue-500">{t.heroMainTitle.aiVoiceAgents}</span>
          </h1>

          <p className={`text-xl md:text-2xl mb-12 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t.heroTagline}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            <div className={`p-6 rounded-2xl text-left transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                : 'bg-white border border-gray-200 hover:shadow-xl shadow-lg'
            }`}>
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <Laptop className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.heroLandingPageCard.title}
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t.heroLandingPageCard.description}
              </p>
            </div>

            <div className={`p-6 rounded-2xl text-left transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                : 'bg-white border border-gray-200 hover:shadow-xl shadow-lg'
            }`}>
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <Phone className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.heroVoiceAgentCard.title}
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t.heroVoiceAgentCard.description}
              </p>
            </div>
          </div>

          <a
            href="#services"
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25"
          >
            <span>{t.viewServices}</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
