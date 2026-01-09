import React from 'react';
import { Phone, Laptop, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Services: React.FC = () => {
  const { theme } = useTheme();

  const services = [
    {
      icon: Laptop,
      title: 'Landing Page Design & Development',
      description: 'Responsive, ultra-fast websites optimized to convert visitors into customers.',
      features: ['Conversion Optimized', 'Mobile Responsive', 'Ultra-Fast Loading', 'SEO Ready']
    },
    {
      icon: Phone,
      title: 'AI Voice Agents (Voice Bots)',
      description: 'Intelligent systems that handle calls, book appointments, and answer questions 24/7 using natural language.',
      features: ['24/7 Availability', 'Natural Language', 'Appointment Booking', 'Lead Capture']
    }
  ];

  return (
    <section id="services" className={`py-20 px-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 to-black'
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Specialized <span className="text-blue-500">Services</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            High-impact digital solutions designed to automate your growth and convert more visitors into customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-blue-500'
                  : 'bg-white border border-gray-200 hover:shadow-2xl shadow-lg'
              }`}
            >
              <div className={`flex items-center justify-center w-16 h-16 mb-6 rounded-xl ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <service.icon className={`w-8 h-8 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>

              <h3 className={`text-xl font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {service.title}
              </h3>

              <p className={`leading-relaxed mb-6 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                    }`} />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`group/btn flex items-center text-sm font-semibold transition-colors ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}>
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
