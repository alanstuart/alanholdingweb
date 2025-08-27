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
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 bg-blue-100 text-blue-700 border border-blue-200">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule a Call
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Book Your Discovery Call
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Easily schedule a 30-minute consultation with Alan Holding Digital Solutions.
          </p>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
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
        
        {/* Booking Calendar Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            {/* Cal.com Embed */}
            <div className="w-full">
              <iframe
                src="https://cal.com/alan-s.-holding-wtiey5/30min"
                width="100%"
                height="650"
                frameBorder="0"
                scrolling="no"
                className="rounded-lg"
                title="Book a consultation call with Alan Holding"
              />
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Can't find a suitable time? <a href="mailto:alan.s.holding@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">Email me directly</a> and we'll find a time that works.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;