import React from 'react';
import { Phone, Laptop, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ModernServices: React.FC = () => {
  const { theme } = useTheme();

  const services = [
    {
      icon: Laptop,
      title: 'Landing Page Design & Development',
      description: 'Responsive, ultra-fast websites optimized to convert visitors into customers.',
      features: ['Conversion Optimized', 'Mobile Responsive', 'Ultra-Fast Loading', 'SEO Ready'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'AI Voice Agents (Voice Bots)',
      description: 'Intelligent systems that handle calls, book appointments, and answer questions 24/7 using natural language.',
      features: ['24/7 Availability', 'Natural Language', 'Appointment Booking', 'Lead Capture'],
      color: 'from-teal-500 to-emerald-500'
    }
  ];
  
  return (
    <section id="services" className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
          theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
        }`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          theme === 'dark' ? 'bg-teal-500' : 'bg-teal-300'
        }`} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            theme === 'dark'
              ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            <Sparkles className="w-4 h-4 mr-2" />
            What I Offer
          </div>

          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Specialized
            <span className="block text-blue-500">Services</span>
          </h2>

          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            High-impact digital solutions designed to automate your growth
            and convert more visitors into customers.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`group relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                  : 'bg-white border border-gray-200 hover:shadow-2xl'
              }`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`relative w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>
                
                <p className={`text-lg mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${service.color}`} />
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <button className={`group/btn flex items-center text-sm font-semibold transition-colors ${
                  theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center p-12 rounded-3xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-blue-900/20 to-teal-900/20 border border-blue-800/30'
            : 'bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200'
        }`}>
          <h3 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Transform Your Business?
          </h3>
          <p className={`text-lg mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Let's discuss how our solutions can drive your success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
              Start Your Project
            </button>
            <button className={`px-8 py-4 rounded-xl font-semibold transition-colors ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
            }`}>
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernServices;