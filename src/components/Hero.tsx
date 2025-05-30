import React from 'react';
import { Phone, MessageSquare, Calendar, Clock, Globe, UserCheck } from 'lucide-react';
import TypeWriter from './TypeWriter';

const Hero: React.FC = () => {
  const typingPhrases = [
    "Handling Business Like a Pro...",
    "Turning Missed Calls into Booked Clients...",
    "Speaking Fluent English and Spanish...",
    "Your AI Receptionist at Work...",
    "No Breaks. No Excuses. Just Results..."
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="code-rain"></div>
        <div className="circuit-pattern"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge text-xs uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
            AI Voice & Chat Agents
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Your Business Is Losing Sales by Missing Calls Let AI Handle Them 24/7
          </h1>

          <div className="mb-8">
            <TypeWriter phrases={typingPhrases} />
          </div>
          
          <p className="text-xl text-blue-300 mb-12">
            AI voice and chat agents can speak English and Spanish, answer calls, book appointments, and collect leads all with the professionalism of a human assistant.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">Available 24/7 to handle customer interactions</p>
                  <p className="text-gray-400">No more "Sorry we missed your call." Your AI never sleeps.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">Bilingual fluency in English and Spanish</p>
                  <p className="text-gray-400">Every caller gets the respect of being understood.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">Books appointments directly into your calendar</p>
                  <p className="text-gray-400">Hands off. Clients show up.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <UserCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">Collects name, email, and phone</p>
                  <p className="text-gray-400">Captures every lead, even at midnight.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">Perfect for clinics, service businesses, and local shops</p>
                  <p className="text-gray-400">Anyone with a phone line and a schedule.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">No hiring. No missed calls. Just results.</p>
                  <p className="text-gray-400">Less overhead. More conversions.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl text-blue-300 italic">
            These intelligent agents are launching soon. Stay tuned and get ready to turn missed calls and messages into booked clients.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;