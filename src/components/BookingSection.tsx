import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const BookingSection: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      {/* Keep existing sparkles/particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orbs"></div>
        <div className="animated-grid"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 bg-blue-100 text-blue-700 border border-blue-200">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule a Call
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Book a Free Patient Acquisition Consultation
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Schedule a 30-minute consultation to discuss how AI voice agents can transform your practice, 
            handle calls 24/7, and turn missed opportunities into booked appointments.
          </p>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <Clock className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-gray-700 font-medium">30 Minutes</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <User className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-gray-700 font-medium">One-on-One</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <Calendar className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-gray-700 font-medium">Free Consultation</span>
          </div>
        </div>
        
        {/* Cal.com Embed Container - Enhanced for full visibility */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-8 pb-24">
            {/* Cal.com Inline Web Component */}
            <div className="w-full h-[1600px] md:h-[1700px] lg:h-[1600px] overflow-hidden">
              <cal-inline 
                cal-link="alan-s.-holding-wtiey5/30min"
                style="width: 100%; height: 100%; border: none; overflow: visible;"
                config={JSON.stringify({
                  layout: 'month_view',
                  theme: 'light'
                })}
              />
            </div>
            
            {/* Fallback iframe if web component doesn't load */}
            <noscript>
              <iframe
                src="https://cal.com/alan-s.-holding-wtiey5/30min"
                width="100%"
                height="1600"
                frameBorder="0"
                scrolling="no"
                className="rounded-lg"
                title="Book a consultation call with Alan Holding"
              />
            </noscript>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Can't find a suitable time? <a href="mailto:alan.s.holding@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">Email me directly</a> and we'll find a time that works.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;