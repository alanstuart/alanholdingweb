import React, { useState } from 'react';
import { Mail, Calendar, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log(formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      service: '',
      message: ''
    });
    // Show success message or redirect
  };

  const handleBookingClick = () => {
    window.location.href = `mailto:alan.s.holding@gmail.com?subject=Booking Request&body=Hi Alan, I'd like to schedule a consultation call. Here are my details:%0A%0AName: %0APreferred Date/Time: %0ATimezone: %0AProject Type: %0A%0ABrief Description of Project: %0A%0ALooking forward to speaking with you!`;
  };
  
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t.contactTitle}</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t.contactSubtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
            <h3 className="text-xl font-bold mb-6">{t.sendMessage}</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">{t.yourName}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={language === 'en' ? 'John Doe' : 'Juan Pérez'}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">{t.emailAddress}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={language === 'en' ? 'john@example.com' : 'juan@ejemplo.com'}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-2">{t.serviceInterestedIn}</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="" disabled>{t.selectService}</option>
                  <option value="website">{t.serviceOptions.website}</option>
                  <option value="ecommerce">{t.serviceOptions.ecommerce}</option>
                  <option value="chatbot">{t.serviceOptions.chatbot}</option>
                  <option value="seo">{t.serviceOptions.seo}</option>
                  <option value="tech">{t.serviceOptions.tech}</option>
                  <option value="other">{t.serviceOptions.other}</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">{t.yourMessage}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={t.messagePlaceholder}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                {t.sendMessageButton}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
              <h3 className="text-xl font-bold mb-6">{t.contactInformation}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-20 rounded-lg mr-4">
                    <Mail size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t.email}</p>
                    <a href="mailto:alan.s.holding@gmail.com" className="text-white hover:text-blue-400 transition-colors">
                      alan.s.holding@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
              <h3 className="text-xl font-bold mb-6">{t.scheduleCall}</h3>
              <p className="text-gray-400 mb-4">
                {t.scheduleCallDescription}
              </p>
              <button 
                onClick={handleBookingClick}
                className="btn-secondary w-full flex items-center justify-center"
              >
                <Calendar size={18} className="mr-2" />
                {t.bookCall}
              </button>
            </div>
            
            <div className="bg-blue-900 bg-opacity-20 rounded-xl p-6 border border-blue-800 shadow-lg">
              <h3 className="text-xl font-bold mb-2">{t.quickResponse}</h3>
              <p className="text-gray-300">
                {t.quickResponseDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;