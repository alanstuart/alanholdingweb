import React, { useRef, useEffect, useState } from 'react';
import { Calendar, Clock, User, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const BookingSection: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [isCalLoaded, setIsCalLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const calContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Cal.com is already loaded
    if (window.Cal && window.Cal.loaded) {
      setIsCalLoaded(true);
      initializeCal();
      return;
    }

    // Wait for Cal.com to load
    const checkCalLoaded = () => {
      if (window.Cal && window.Cal.loaded) {
        setIsCalLoaded(true);
        initializeCal();
      } else {
        // If Cal.com doesn't load within 10 seconds, show fallback
        setTimeout(() => {
          if (!isCalLoaded) {
            setShowFallback(true);
          }
        }, 10000);
      }
    };

    // Check immediately and then periodically
    checkCalLoaded();
    const interval = setInterval(checkCalLoaded, 500);

    return () => clearInterval(interval);
  }, []);

  const initializeCal = () => {
    if (!calContainerRef.current || !window.Cal) return;

    try {
      // Initialize Cal.com inline embed
      window.Cal('inline', {
        elementOrSelector: calContainerRef.current,
        calLink: 'alan-s.-holding-wtiey5/30min',
        config: {
          layout: 'month_view',
          theme: theme === 'dark' ? 'dark' : 'light'
        }
      });
    } catch (error) {
      console.error('Error initializing Cal.com:', error);
      setShowFallback(true);
    }
  };

  const handleDirectBooking = () => {
    window.open('https://cal.com/alan-s.-holding-wtiey5/30min', '_blank');
  };

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
        
        {/* Cal.com Embed Container */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-8">
            {!showFallback ? (
              <div 
                ref={calContainerRef}
                className="w-full min-h-[600px] cal-embed-container"
                style={{ minHeight: '600px' }}
              >
                {!isCalLoaded && (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading calendar...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Fallback UI when Cal.com fails to load */
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Book Your Consultation
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Click the button below to open our booking calendar in a new window.
                </p>
                <button 
                  onClick={handleDirectBooking}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Open Booking Calendar
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Or email us directly at{' '}
                  <a href="mailto:alan.s.holding@gmail.com" className="text-blue-600 hover:text-blue-700">
                    alan.s.holding@gmail.com
                  </a>
                </p>
              </div>
            )}
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

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Cal: any;
  }
}

export default BookingSection;