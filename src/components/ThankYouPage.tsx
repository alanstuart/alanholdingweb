import React from 'react';
import { CheckCircle, ArrowLeft, Clock, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThankYouPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            {/* Hero Section */}
            <div className="text-center mb-12">
              {/* Large Green Checkmark */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your Call is Booked!
              </h1>
              
              {/* Subtext */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                We've sent a confirmation email with your calendar invite and Google Meet link. 
                Please check your inbox.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Preparation Tips */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Prepare for Your Call
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Bring your questions about your project</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Be ready at your chosen time</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">You'll receive reminders automatically</span>
                  </div>
                </div>
              </div>

              {/* Right Column - FAQ */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Quick FAQ
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start mb-2">
                      <Clock className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <h4 className="font-semibold text-gray-900">How do I reschedule?</h4>
                    </div>
                    <p className="text-gray-600 text-sm ml-7">
                      Use the link in your confirmation email to reschedule or cancel your appointment anytime.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-start mb-2">
                      <Globe className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <h4 className="font-semibold text-gray-900">What timezone are meetings booked in?</h4>
                    </div>
                    <p className="text-gray-600 text-sm ml-7">
                      All meetings are automatically adjusted to your local timezone when you book.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="text-center">
              <a 
                href="/"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </a>
            </div>
          </div>

          {/* Additional Note */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Need immediate assistance? <a href="https://www.instagram.com/alanholding.ds/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">Contact me on Instagram</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;