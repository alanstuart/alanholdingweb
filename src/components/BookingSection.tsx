import React from 'react';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import CalEmbed from './CalEmbed';

const BookingSection: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const handleEmailBooking = () => {
    const subject = encodeURIComponent('Consultation Booking Request');
    const body = encodeURIComponent(`Hi Alan,

I'd like to schedule a 30-minute consultation call.

My details:
- Name: 
- Preferred Date/Time: 
- Timezone: 
- Project Type: 

Brief Description:


Looking forward to speaking with you!`);
    
    window.location.href = `mailto:alan.s.holding@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="booking" className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 to-black' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`} />
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            theme === 'dark'
              ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule a Call
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Book Your Free Consultation
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed mb-12 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Schedule a 30-minute consultation to discuss how AI voice agents can transform your business, 
            handle calls 24/7, and turn missed opportunities into booked appointments.
          </p>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className={`flex items-center justify-center p-4 rounded-xl shadow-sm border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <Clock className={`w-5 h-5 mr-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              30 Minutes
            </span>
          </div>
          <div className={`flex items-center justify-center p-4 rounded-xl shadow-sm border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <User className={`w-5 h-5 mr-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              One-on-One
            </span>
          </div>
          <div className={`flex items-center justify-center p-4 rounded-xl shadow-sm border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}>
            <CheckCircle className={`w-5 h-5 mr-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Free Consultation
            </span>
          </div>
        </div>
        
        {/* Calendar Container */}
        <div className="max-w-6xl mx-auto">
          <div className={`rounded-2xl shadow-lg border p-4 md:p-8 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <CalEmbed className="rounded-2xl shadow-xl" />
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Can't find a suitable time?{' '}
            <a 
              href="mailto:alan.s.holding@gmail.com" 
              className={`font-medium ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              Email me directly
            </a>
            {' '}and we'll find a time that works.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;