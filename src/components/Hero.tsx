import React from 'react';
import { Phone, MessageSquare, Calendar, Clock, Globe, UserCheck } from 'lucide-react';
import TypeWriter from './TypeWriter';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const typingPhrases = [
    language === 'en' ? "Handling Business Like a Pro..." : "Manejando Negocios Como un Profesional...",
    language === 'en' ? "Turning Missed Calls into Booked Clients..." : "Convirtiendo Llamadas Perdidas en Clientes Reservados...",
    language === 'en' ? "Speaking Fluent English and Spanish..." : "Hablando Inglés y Español con Fluidez...",
    language === 'en' ? "Your AI Receptionist at Work..." : "Tu Recepcionista IA en Acción...",
    language === 'en' ? "No Breaks. No Excuses. Just Results..." : "Sin Descansos. Sin Excusas. Solo Resultados..."
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="code-rain"></div>
        <div className="circuit-pattern"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge text-xs uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
            {t.heroSubtitle}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            {t.heroTitle}
          </h1>

          <div className="mb-8">
            <TypeWriter phrases={typingPhrases} />
          </div>
          
          <p className="text-xl text-blue-300 mb-12">
            {t.heroDescription}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">{t.heroFeatures.available247.title}</p>
                  <p className="text-gray-400">{t.heroFeatures.available247.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">{t.heroFeatures.bilingual.title}</p>
                  <p className="text-gray-400">{t.heroFeatures.bilingual.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">{t.heroFeatures.appointments.title}</p>
                  <p className="text-gray-400">{t.heroFeatures.appointments.description}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <UserCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">{t.heroFeatures.leadCollection.title}</p>
                  <p className="text-gray-400">{t.heroFeatures.leadCollection.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">{t.heroFeatures.perfectFor.title}</p>
                  <p className="text-gray-400">{t.heroFeatures.perfectFor.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">{t.heroFeatures.noHiring.title}</p>
                  <p className="text-gray-400">{t.heroFeatures.noHiring.description}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl text-blue-300 italic">
            {t.heroClosing}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;