import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { useTheme } from '../context/ThemeContext';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  featured?: boolean;
}

const ModernProjects: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const projects: Project[] = [
    {
      id: 'project1',
      title: 'BM Super Nelo',
      category: 'e-commerce',
      description: 'Complete digital transformation for Costa Rican supermarket with advanced inventory management and bilingual customer experience.',
      image: 'https://images.pexels.com/photos/4113834/pexels-photo-4113834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      link: 'https://bmsupernelo.com',
      featured: true
    },
    {
      id: 'project2',
      title: 'AI Voice Assistant Platform',
      category: 'ai-solution',
      description: 'Revolutionary voice AI system handling customer inquiries, appointments, and lead generation with human-like conversation.',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['Python', 'TensorFlow', 'WebRTC', 'Cloud Functions'],
      featured: true
    },
    {
      id: 'project3',
      title: 'DataViz Analytics Dashboard',
      category: 'dashboard',
      description: 'Real-time business intelligence platform with interactive visualizations and predictive analytics for financial services.',
      image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL']
    },
    {
      id: 'project4',
      title: 'Smart Chatbot Integration',
      category: 'ai-solution',
      description: 'Intelligent conversational AI that qualifies leads, answers FAQs, and integrates seamlessly with existing business workflows.',
      image: 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['NLP', 'React', 'Node.js', 'OpenAI API']
    }
  ];
  
  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'e-commerce', label: 'E-commerce' },
    { id: 'ai-solution', label: 'AI Solutions' },
    { id: 'dashboard', label: 'Dashboards' },
    { id: 'website', label: 'Websites' }
  ];
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <section id="projects" className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-40 right-20 w-80 h-80 rounded-full blur-3xl opacity-10 ${
          theme === 'dark' ? 'bg-green-500' : 'bg-green-300'
        }`} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            theme === 'dark'
              ? 'bg-green-900/30 text-green-300 border border-green-800/50'
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            <Eye className="w-4 h-4 mr-2" />
            Our Work
          </div>
          
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Featured
            <span className="block text-green-500">Projects</span>
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Explore our latest work showcasing innovative solutions that drive 
            real business results and exceptional user experiences.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : theme === 'dark'
                    ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
                project.featured ? 'lg:col-span-2' : ''
              } ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className={`relative overflow-hidden ${
                project.featured ? 'aspect-[2/1]' : 'aspect-video'
              }`}>
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Technologies */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm text-white rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm text-white rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                {/* View Project Button */}
                <div className={`absolute top-6 right-6 transition-all duration-300 ${
                  hoveredProject === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      aria-label={`View ${project.title} project`}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      theme === 'dark'
                        ? 'bg-blue-900/30 text-blue-300'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  {project.featured && (
                    <div className={`px-3 py-1 text-xs font-bold rounded-full ${
                      theme === 'dark'
                        ? 'bg-yellow-900/30 text-yellow-300'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      FEATURED
                    </div>
                  )}
                </div>
                
                <p className={`text-lg leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className={`px-2 py-1 text-xs rounded ${
                          theme === 'dark'
                            ? 'bg-gray-800 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <button className={`flex items-center text-sm font-semibold transition-colors ${
                    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  }`}>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className={`text-lg mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Want to see more of our work or discuss your project?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
              View Full Portfolio
            </button>
            <button className={`px-8 py-4 rounded-xl font-semibold transition-colors ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
            }`}>
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernProjects;