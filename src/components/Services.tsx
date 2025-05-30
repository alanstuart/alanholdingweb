import React from 'react';
import { Phone, MessageSquare, Laptop } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empowering Businesses with AI-Driven Voice and Chat Solutions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We help companies automate communication, capture leads, and increase sales using cutting-edge AI tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI Voice Agents */}
          <div className="service-card bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-blue-600 bg-opacity-20">
              <Phone className="w-8 h-8 text-blue-400" />
            </div>
            
            <h3 className="text-xl font-bold mb-4">AI Voice Agents</h3>
            <p className="text-gray-400 leading-relaxed">
              Automate phone calls with intelligent agents that answer, book appointments, and capture leads 24/7 — in English and Spanish.
            </p>
          </div>

          {/* Smart Chatbots */}
          <div className="service-card bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-blue-600 bg-opacity-20">
              <MessageSquare className="w-8 h-8 text-blue-400" />
            </div>
            
            <h3 className="text-xl font-bold mb-4">Smart Chatbots</h3>
            <p className="text-gray-400 leading-relaxed">
              Engage website visitors instantly using chatbots that qualify leads, answer FAQs, and drive conversions — even while you sleep.
            </p>
          </div>

          {/* Digital Solutions */}
          <div className="service-card bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-blue-600 bg-opacity-20">
              <Laptop className="w-8 h-8 text-blue-400" />
            </div>
            
            <h3 className="text-xl font-bold mb-4">Digital Solutions</h3>
            <p className="text-gray-400 leading-relaxed">
              From web design to automation workflows, we build digital infrastructure that saves time and delivers measurable ROI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;