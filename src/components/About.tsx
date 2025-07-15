import React from 'react';
import { Users, Target, Cog, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { useTheme } from '../context/ThemeContext';

const About: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full">
            {t.about}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            {t.aboutTitle}
          </h2>
          <p className={`max-w-xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.aboutSubtitle}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Main Description */}
          <div className={`service-card p-8 rounded-xl mb-8 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800' 
              : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            <p className={`text-lg leading-relaxed mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t.aboutDescription}
            </p>
          </div>
          
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Mission */}
            <div className={`service-card p-6 rounded-xl ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800' 
                : 'bg-white border border-gray-200 shadow-lg'
            }`}>
              <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-blue-600 bg-opacity-20' 
                  : 'bg-blue-100'
              }`}>
                <Target className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {language === 'en' ? 'Our Mission' : language === 'es' ? 'Nuestra Misión' : 'Misyonumuz'}
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t.aboutMission}
              </p>
            </div>
            
            {/* Services */}
            <div className={`service-card p-6 rounded-xl ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800' 
                : 'bg-white border border-gray-200 shadow-lg'
            }`}>
              <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-blue-600 bg-opacity-20' 
                  : 'bg-blue-100'
              }`}>
                <Cog className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {language === 'en' ? 'What We Do' : language === 'es' ? 'Lo Que Hacemos' : 'Ne Yapıyoruz'}
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t.aboutServices}
              </p>
            </div>
            
            {/* Approach */}
            <div className={`service-card p-6 rounded-xl ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800' 
                : 'bg-white border border-gray-200 shadow-lg'
            }`}>
              <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-blue-600 bg-opacity-20' 
                  : 'bg-blue-100'
              }`}>
                <Users className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {language === 'en' ? 'Our Approach' : language === 'es' ? 'Nuestro Enfoque' : 'Yaklaşımımız'}
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t.aboutApproach}
              </p>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className={`text-center p-8 rounded-xl ${
            theme === 'dark' 
              ? 'bg-blue-900 bg-opacity-20 border border-blue-800' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {t.aboutCTA}
            </h3>
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t.aboutLinkedInText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#contact" 
                className="btn-primary"
              >
                {t.contact}
              </a>
              <a 
                href="https://www.linkedin.com/in/alan-holding" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`btn-secondary flex items-center ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700 text-blue-400' 
                    : 'bg-white hover:bg-gray-100 text-blue-600 border border-gray-200'
                }`}
              >
                <Linkedin size={18} className="mr-2" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;