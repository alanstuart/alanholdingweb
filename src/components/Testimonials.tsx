import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
  stars: number;
  result: string;
}

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 'testimonial1',
      quote: "Working with Alan was a game-changer for my small café. The website he designed not only looks beautiful but actually brings in new customers every week. Our online bookings doubled within the first month!",
      author: "Maria G.",
      position: "Owner",
      company: "Sweet Moment Café",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      stars: 5,
      result: "+100% bookings in 30 days"
    },
    {
      id: 'testimonial2',
      quote: "His AI solutions saved us hours each week and boosted customer engagement. The simple chatbot Alan set up handles basic questions, freeing our team to focus on more complex customer needs.",
      author: "Carlos M.",
      position: "CTO",
      company: "TechSupport Solutions",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      stars: 5,
      result: "15 hours saved weekly"
    },
    {
      id: 'testimonial3',
      quote: "The copy Alan wrote captured our brand voice perfectly. As a boutique clothing store, getting our unique personality across online was crucial. Now our website reflects who we are and converts visitors into shoppers.",
      author: "Sofia R.",
      position: "Marketing Director",
      company: "Urban Style Boutique",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      stars: 5,
      result: "35% increase in online sales"
    }
  ];
  
  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, clientWidth } = sliderRef.current;
    const scrollTo = direction === 'left'
      ? scrollLeft - clientWidth
      : scrollLeft + clientWidth;
    
    sliderRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };
  
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t.testimonialsTitle}</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t.testimonialsSubtitle}
          </p>
        </div>
        
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors md:-left-6"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors md:-right-6"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Testimonials Slider */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6 px-1 py-4"
          >
            {testimonials.map(testimonial => (
              <div 
                key={testimonial.id} 
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-gray-700 opacity-20">
                    <MessageSquare size={40} />
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < testimonial.stars ? "text-blue-400 fill-blue-400" : "text-gray-600"} 
                      />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-300 mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-500">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">{testimonial.position}, {testimonial.company}</div>
                    </div>
                  </div>
                  
                  {/* Result Badge */}
                  <div className="absolute bottom-6 right-6">
                    <div className="bg-blue-900 bg-opacity-50 text-blue-300 text-xs py-1 px-2 rounded-full">
                      {t.result}: {testimonial.result}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;