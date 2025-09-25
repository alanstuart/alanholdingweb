import React from 'react';
import { useTheme } from '../context/ThemeContext';

const BookingCTA: React.FC = () => {
  const { theme } = useTheme();

  const handleBookingClick = () => {
    window.open('https://cal.com/alan-s.-holding-wtiey5/30min', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className={`max-w-4xl mx-auto text-center p-12 rounded-3xl ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'
        }`}>
          {/* Subtitle */}
          <p className={`text-xl md:text-2xl font-medium mb-8 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Ready to grow your business? Let's talk.
          </p>
          
          {/* Main CTA Button */}
          <button
            onClick={handleBookingClick}
            className={`inline-flex items-center justify-center px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
            }`}
            aria-label="Book a free 30-minute discovery call"
          >
            📅 Book Your Free 30-Minute Discovery Call
          </button>
          
          {/* Additional Info */}
          <p className={`text-sm mt-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            No commitment • Free consultation • Discuss your project needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;