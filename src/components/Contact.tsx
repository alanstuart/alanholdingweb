import React, { useState } from 'react';
import { Calendar, Send, Instagram, Facebook } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { useTheme } from '../context/ThemeContext';

// Initialize Supabase client
const supabase = createClient(
  'https://adqxqhksrbcsmfgntrjd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkcXhxaGtzcmJjc21mZ250cmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDY5MzEsImV4cCI6MjA2ODc4MjkzMX0.TW6uTyLMUIzkyTKTsuTMF3msmjSCzFcurjj-SNaOrm8'
);

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            service: formData.service,
            message: formData.message
          }
        ]);

      if (error) {
        throw error;
      }
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookingClick = () => {
    window.open('https://www.instagram.com/alanholding.ds/', '_blank');
  };
  
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t.contactTitle}</h2>
          <p className={`max-w-xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.contactSubtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className={`lg:col-span-3 rounded-xl p-6 border shadow-lg ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800' 
              : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-6">{t.sendMessage}</h3>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className={`mb-6 p-4 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-green-900 bg-opacity-20 border border-green-800 text-green-400' 
                  : 'bg-green-100 border border-green-200 text-green-700'
              }`}>
                ✅ Message sent successfully! We'll get back to you within 24 hours.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className={`mb-6 p-4 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-red-900 bg-opacity-20 border border-red-800 text-red-400' 
                  : 'bg-red-100 border border-red-200 text-red-700'
              }`}>
                ❌ Error sending message. Please try again or contact us directly.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    {t.yourName}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder={language === 'en' ? 'John Doe' : language === 'es' ? 'Juan Pérez' : 'Ahmet Yılmaz'}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    {t.emailAddress}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder={language === 'en' ? 'john@example.com' : language === 'es' ? 'juan@ejemplo.com' : 'ahmet@ornek.com'}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="service" className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  {t.serviceInterestedIn}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                  disabled={isSubmitting}
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
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  {t.yourMessage}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder={t.messagePlaceholder}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`btn-primary w-full flex items-center justify-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {language === 'en' ? 'Sending...' : language === 'es' ? 'Enviando...' : 'Gönderiliyor...'}
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    {t.sendMessageButton}
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`rounded-xl p-6 border shadow-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800'
                : 'bg-white border-gray-200'
            }`}>
              <h3 className="text-xl font-bold mb-6">{t.followUs}</h3>

              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/alanholding.ds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start group"
                >
                  <div className={`flex-shrink-0 p-2 rounded-lg mr-4 transition-colors ${
                    theme === 'dark'
                      ? 'bg-pink-900 bg-opacity-20 group-hover:bg-opacity-30'
                      : 'bg-pink-100 group-hover:bg-pink-200'
                  }`}>
                    <Instagram size={20} className={`${
                      theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
                    }`} />
                  </div>
                  <div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Instagram
                    </p>
                    <p className={`transition-colors ${
                      theme === 'dark'
                        ? 'text-white group-hover:text-pink-400'
                        : 'text-gray-900 group-hover:text-pink-600'
                    }`}>
                      @alanholding.ds
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61571246840990"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start group"
                >
                  <div className={`flex-shrink-0 p-2 rounded-lg mr-4 transition-colors ${
                    theme === 'dark'
                      ? 'bg-blue-900 bg-opacity-20 group-hover:bg-opacity-30'
                      : 'bg-blue-100 group-hover:bg-blue-200'
                  }`}>
                    <Facebook size={20} className={`${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Facebook
                    </p>
                    <p className={`transition-colors ${
                      theme === 'dark'
                        ? 'text-white group-hover:text-blue-400'
                        : 'text-gray-900 group-hover:text-blue-600'
                    }`}>
                      Alan Holding Digital Solutions
                    </p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className={`rounded-xl p-6 border shadow-lg ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className="text-xl font-bold mb-6">{t.scheduleCall}</h3>
              <p className={`mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
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
            
            <div className={`rounded-xl p-6 border shadow-lg ${
              theme === 'dark' 
                ? 'bg-blue-900 bg-opacity-20 border-blue-800' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <h3 className="text-xl font-bold mb-2">{t.quickResponse}</h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
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