import React, { useState } from 'react';
import { ExternalLink, Code, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [activeCategory, setActiveCategory] = useState('all');
  
  const projects: Project[] = [
    {
      id: 'project1',
      title: 'BM Super Nelo',
      category: 'e-commerce',
      description: 'Complete digital presence for a Costa Rican supermarket, featuring product catalog, inventory integration, and bilingual support.',
      image: 'https://images.pexels.com/photos/4113834/pexels-photo-4113834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      link: 'https://bmsupernelo.com'
    },
    {
      id: 'project2',
      title: 'Tech Innovations Portal',
      category: 'web-app',
      description: 'A modern web application for a tech company showcasing their latest innovations and research projects.',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['Vue.js', 'Firebase', 'GraphQL', 'Netlify']
    },
    {
      id: 'project3',
      title: 'DataViz Dashboard',
      category: 'dashboard',
      description: 'Interactive data visualization dashboard for a financial services company, featuring real-time analytics and reporting.',
      image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL']
    },
    {
      id: 'project4',
      title: 'AlanHolding.co.uk',
      category: 'website',
      description: 'Personal portfolio and service website showcasing web design and digital solution offerings.',
      image: 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['React', 'Tailwind CSS', 'Vite', 'Netlify']
    }
  ];
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const categories = [
    { id: 'all', label: t.projectCategories.all },
    { id: 'e-commerce', label: t.projectCategories.ecommerce },
    { id: 'web-app', label: t.projectCategories.webApps },
    { id: 'dashboard', label: t.projectCategories.dashboards },
    { id: 'website', label: t.projectCategories.websites }
  ];
  
  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="badge bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t.projectsTitle}</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t.projectsSubtitle}
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card group">
              <div className="relative overflow-hidden rounded-xl border border-gray-800 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-blue">
                {/* Project Image with Overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  
                  {/* Project Technologies */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-black bg-opacity-70 backdrop-blur-sm text-blue-400 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* View Project Link */}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 p-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`View ${project.title} project`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded capitalize">
                      {project.category.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Code size={16} className="mr-1" />
                      <span>{t.cleanCode}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Layers size={16} className="mr-1" />
                      <span>{t.responsive}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            {t.projectsCallToAction}
          </p>
          <a href="#contact" className="btn-secondary">
            {t.requestPortfolio}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;