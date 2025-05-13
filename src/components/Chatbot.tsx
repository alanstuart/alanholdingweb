import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  options?: string[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting when chatbot first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: "👋 Hi there! I'm Alan's virtual assistant. How can I help you today?",
          sender: 'bot',
          options: ['I need a website', 'Tell me about pricing', 'Show me your portfolio', 'I want to talk to Alan']
        }
      ]);
    }
  }, [isOpen, messages.length]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  const handleOptionClick = (option: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option,
      sender: 'user'
    };
    
    setMessages([...messages, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateResponse(option);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  const generateResponse = (message: string): Message => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('website') || lowerMsg.includes('site')) {
      return {
        id: Date.now().toString(),
        text: "Great! I can help with that. What kind of website are you looking for?<br><br>1. A simple 5-page site<br>2. An e-commerce store<br>3. A portfolio/showcase site",
        sender: 'bot'
      };
    } else if (lowerMsg.includes('pricing') || lowerMsg.includes('cost') || lowerMsg.includes('price')) {
      return {
        id: Date.now().toString(),
        text: "Alan offers three packages:<br><br>• Essentials: £299<br>• Performance: £549<br>• Complete Solution: £849<br><br>Plus, there's currently a special 15% discount for the first 5 clients!",
        sender: 'bot',
        options: ['Tell me more about the packages', 'I want to claim the discount']
      };
    } else if (lowerMsg.includes('portfolio') || lowerMsg.includes('project') || lowerMsg.includes('work')) {
      return {
        id: Date.now().toString(),
        text: "You can check out Alan's current projects in the Projects section above, including a supermarket website for BM Super Nelo in Costa Rica. Want me to highlight some specific examples?",
        sender: 'bot',
        options: ['Show e-commerce examples', 'Show tech-focused sites']
      };
    } else if (lowerMsg.includes('talk') || lowerMsg.includes('contact') || lowerMsg.includes('alan')) {
      return {
        id: Date.now().toString(),
        text: "Alan would be happy to chat with you! The quickest way to reach him is by email at alan.s.holding@gmail.com or by filling out the contact form above. Would you like me to guide you there?",
        sender: 'bot',
        options: ['Go to contact form', 'I\'ll email instead']
      };
    } else if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
      return {
        id: Date.now().toString(),
        text: "You're welcome! Is there anything else you'd like to know about Alan's services?",
        sender: 'bot',
        options: ['No, that\'s all for now', 'Yes, I have another question']
      };
    } else {
      return {
        id: Date.now().toString(),
        text: "I'm sorry, I didn't quite understand that. Would you like to know about our website packages, see our portfolio, or get in contact with Alan?",
        sender: 'bot',
        options: ['Website packages', 'Portfolio', 'Contact Alan']
      };
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {/* Chat panel */}
      {isOpen && (
        <div className="chatbot-panel absolute bottom-20 right-0 w-80 md:w-96 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col h-96">
          {/* Chat header */}
          <div className="bg-blue-900 p-4 flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-blue-800 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="chatbot-logo-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00c6ff" />
                    <stop offset="100%" stopColor="#0072ff" />
                  </linearGradient>
                </defs>
                <g>
                  <polygon points="15,85 40,15 65,85 55,85 40,50 25,85" fill="url(#chatbot-logo-gradient)" />
                  <rect x="37" y="65" width="6" height="20" fill="#444" opacity="0.7" />
                  <rect x="75" y="30" width="10" height="55" fill="url(#chatbot-logo-gradient)" />
                  <rect x="100" y="30" width="10" height="55" fill="url(#chatbot-logo-gradient)" />
                  <rect x="75" y="60" width="35" height="10" fill="#444" opacity="0.7" />
                </g>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm">Alan's Assistant</h3>
              <p className="text-xs text-blue-300">Online | Typically replies in minutes</p>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-950">
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div 
                    className={`p-3 rounded-2xl max-w-[80%] inline-block ${
                      message.sender === 'bot' 
                        ? 'bg-gray-800 text-white rounded-tl-none' 
                        : 'bg-blue-600 text-white ml-auto rounded-tr-none'
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{__html: message.text}}></div>
                    
                    {/* Quick Reply Options */}
                    {message.options && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleOptionClick(option)}
                            className="text-xs bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1 transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input area */}
          <div className="p-3 border-t border-gray-800 bg-gray-900">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 rounded-l-lg border-0 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white rounded-r-lg px-3 py-2 hover:bg-blue-700 transition-colors"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Powered by AI technology
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;