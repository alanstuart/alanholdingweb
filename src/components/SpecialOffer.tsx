import React, { useState, useEffect } from 'react';
import { Clock, Tag } from 'lucide-react';

const SpecialOffer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Get or set start date in localStorage
    const getStartDate = () => {
      const savedStartDate = localStorage.getItem('offerStartDate');
      if (savedStartDate) {
        return new Date(savedStartDate);
      }
      
      // If no saved date, set to current date
      const newStartDate = new Date();
      localStorage.setItem('offerStartDate', newStartDate.toISOString());
      return newStartDate;
    };

    const calculateTimeLeft = () => {
      const startDate = getStartDate();
      const endDate = new Date(startDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from start
      const now = new Date();
      const difference = +endDate - +now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Offer has expired
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        localStorage.removeItem('offerStartDate'); // Clear expired date
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden">
          <div className="special-offer-grid p-6 md:p-8 relative">
            <div className="absolute top-0 right-0">
              <div className="bg-black text-white font-bold py-1 px-8 text-xs uppercase tracking-wider transform rotate-45 translate-x-5 translate-y-4 shadow-md">
                Limited Offer
              </div>
            </div>
            
            <div className="offer-content">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-blue-400">EXCLUSIVE:</span> First 5 Clients Only
              </h2>
              <p className="text-gray-300 mb-6">
                Get 15% OFF any website package when you book this month. Limited spots available for businesses serious about their digital presence.
              </p>
              
              <div className="flex items-center mb-6">
                <Tag className="mr-2 text-blue-400" size={20} />
                <span className="text-sm font-semibold">Only 3 spots remaining!</span>
              </div>
              
              <a 
                href="#contact" 
                className="btn-primary inline-block"
              >
                Claim Your Discount Now
              </a>
            </div>
            
            <div className="offer-timer mt-6 md:mt-0">
              <div className="flex items-center mb-4">
                <Clock className="mr-2 text-blue-400" size={20} />
                <span className="text-sm font-semibold">Offer Ends In:</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">Days</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">Hours</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">Mins</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">Secs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;