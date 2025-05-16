import React from 'react';
import { Code, Globe, Search, Cpu, BarChart, Lock, MessageSquare, PenTool } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  pricing?: {
    basic: string;
    standard: string;
    premium: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, pricing }) => {
  return (
    <div className="service-card bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-blue">
      <div className="service-icon mb-4 text-blue-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      {features && (
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-gray-400">
              <span className="text-blue-400 mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      {pricing && (
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="font-bold mb-2">Basic Package {pricing.basic}</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              {title === "Web Development" && (
                <>
                  <li>• 5 page responsive website</li>
                  <li>• Basic SEO setup</li>
                  <li>• Contact form integration</li>
                  <li>• Mobile friendly design</li>
                  <li>• 2 rounds of revisions</li>
                  <li>• 1 month of support</li>
                </>
              )}
              {title === "AI Chatbots" && (
                <>
                  <li>• Simple customer service chatbot</li>
                  <li>• Website or WhatsApp integration</li>
                  <li>• 5 predefined conversation flows</li>
                  <li>• Basic analytics dashboard</li>
                  <li>• 1 revision included</li>
                  <li>• Email support</li>
                </>
              )}
              {title === "Copywriting" && (
                <>
                  <li>• 5 website pages</li>
                  <li>• Basic SEO optimization</li>
                  <li>• Meta descriptions</li>
                  <li>• 2 revisions per page</li>
                  <li>• Brand voice guide</li>
                  <li>• 2 weeks delivery</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-lg border border-blue-500 relative">
            <div className="absolute top-3 right-4 bg-blue-500 text-xs px-2 py-1 rounded-full">Most Popular</div>
            <h4 className="font-bold mb-2">Standard Package {pricing.standard}</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              {title === "Web Development" && (
                <>
                  <li>• Up to 10 custom pages</li>
                  <li>• Advanced SEO optimization</li>
                  <li>• Blog/News section</li>
                  <li>• Social media integration</li>
                  <li>• 4 rounds of revisions</li>
                  <li>• 3 months of support</li>
                </>
              )}
              {title === "AI Chatbots" && (
                <>
                  <li>• Intelligent multi functional chatbot</li>
                  <li>• Multi platform integration</li>
                  <li>• 10 custom conversation flows</li>
                  <li>• Advanced analytics & reporting</li>
                  <li>• Basic training session</li>
                  <li>• 2 months of support</li>
                </>
              )}
              {title === "Copywriting" && (
                <>
                  <li>• 10 website pages</li>
                  <li>• Keyword research & implementation</li>
                  <li>• 4 blog posts</li>
                  <li>• 3 revisions per piece</li>
                  <li>• Content calendar</li>
                  <li>• 3 weeks delivery</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="font-bold mb-2">Premium Package {pricing.premium}</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              {title === "Web Development" && (
                <>
                  <li>• Unlimited pages</li>
                  <li>• Full SEO suite & strategy</li>
                  <li>• E commerce functionality</li>
                  <li>• Custom animations</li>
                  <li>• Unlimited revisions</li>
                  <li>• 6 months of support</li>
                </>
              )}
              {title === "AI Chatbots" && (
                <>
                  <li>• Advanced AI system with learning capabilities</li>
                  <li>• Full multi platform integration</li>
                  <li>• Unlimited conversation flows</li>
                  <li>• Custom analytics dashboard</li>
                  <li>• Full team training</li>
                  <li>• 6 months of support</li>
                </>
              )}
              {title === "Copywriting" && (
                <>
                  <li>• Complete website content</li>
                  <li>• Full SEO content strategy</li>
                  <li>• 8 monthly blog posts</li>
                  <li>• Social media content pack</li>
                  <li>• Unlimited revisions</li>
                  <li>• Priority support</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full">Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Expert Digital Solutions</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            As an AI Automated Agency (AAA), we transform your online presence with our comprehensive range of digital services. Each service is tailored to deliver maximum value and ROI for your business through the power of automation and artificial intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Code size={40} />} 
            title="Web Development" 
            description="Custom built websites that combine stunning design with powerful functionality. Each site is optimized for performance, user experience, and conversion."
            features={[
              "Responsive design for all devices",
              "Fast loading speeds",
              "SEO friendly structure",
              "Secure & scalable architecture"
            ]}
            pricing={{
              basic: "£497",
              standard: "£997",
              premium: "£1,997"
            }}
          />
          
          <ServiceCard 
            icon={<MessageSquare size={40} />} 
            title="AI Chatbots" 
            description="Intelligent chatbots that transform your customer service. Available 24/7, they handle inquiries, qualify leads, and boost engagement automatically."
            features={[
              "Natural language processing",
              "Multi platform integration",
              "Custom conversation flows",
              "Analytics & performance tracking"
            ]}
            pricing={{
              basic: "£497",
              standard: "£997",
              premium: "£1,997"
            }}
          />
          
          <ServiceCard 
            icon={<PenTool size={40} />} 
            title="Copywriting" 
            description="Strategic content that converts visitors into customers. From website copy to blogs, we create engaging content that ranks and resonates."
            features={[
              "SEO optimized content",
              "Conversion focused copy",
              "Brand voice consistency",
              "Regular content updates"
            ]}
            pricing={{
              basic: "£297",
              standard: "£597",
              premium: "£997"
            }}
          />
          
          <ServiceCard 
            icon={<Search size={40} />} 
            title="SEO Services" 
            description="Data driven SEO strategies that improve your search rankings and drive organic traffic to your website."
            features={[
              "Keyword research & analysis",
              "On page optimization",
              "Technical SEO improvements",
              "Monthly performance reports"
            ]}
          />
          
          <ServiceCard 
            icon={<BarChart size={40} />} 
            title="Analytics & CRO" 
            description="Convert more visitors into customers with our conversion rate optimization services and detailed analytics insights."
            features={[
              "User behavior analysis",
              "A/B testing",
              "Conversion funnel optimization",
              "ROI tracking"
            ]}
          />
          
          <ServiceCard 
            icon={<Lock size={40} />} 
            title="Maintenance & Support" 
            description="Keep your digital assets secure and up to date with our comprehensive maintenance and support services."
            features={[
              "Regular security updates",
              "Performance monitoring",
              "Content updates",
              "Technical support"
            ]}
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Ready to transform your digital presence? Let's discuss your project requirements.
          </p>
          <a href="#contact" className="btn-secondary">
            Schedule a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;