export interface Translations {
  // Navigation
  services: string;
  projects: string;
  testimonials: string;
  contact: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroFeatures: {
    available247: {
      title: string;
      description: string;
    };
    bilingual: {
      title: string;
      description: string;
    };
    appointments: {
      title: string;
      description: string;
    };
    leadCollection: {
      title: string;
      description: string;
    };
    perfectFor: {
      title: string;
      description: string;
    };
    noHiring: {
      title: string;
      description: string;
    };
  };
  heroClosing: string;
  
  // Services Section
  servicesTitle: string;
  servicesSubtitle: string;
  aiVoiceAgents: {
    title: string;
    description: string;
  };
  smartChatbots: {
    title: string;
    description: string;
  };
  digitalSolutions: {
    title: string;
    description: string;
  };
  
  // Special Offer
  offerTitle: string;
  offerDescription: string;
  offerSpots: string;
  offerButton: string;
  offerEndsIn: string;
  offerTimeUnits: {
    days: string;
    hours: string;
    mins: string;
    secs: string;
  };
  
  // Projects Section
  projectsTitle: string;
  projectsSubtitle: string;
  projectCategories: {
    all: string;
    ecommerce: string;
    webApps: string;
    dashboards: string;
    websites: string;
  };
  projectsCallToAction: string;
  requestPortfolio: string;
  
  // Testimonials Section
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  result: string;
  
  // Contact Section
  contactTitle: string;
  contactSubtitle: string;
  sendMessage: string;
  yourName: string;
  emailAddress: string;
  serviceInterestedIn: string;
  selectService: string;
  serviceOptions: {
    website: string;
    ecommerce: string;
    chatbot: string;
    seo: string;
    tech: string;
    other: string;
  };
  yourMessage: string;
  messagePlaceholder: string;
  sendMessageButton: string;
  contactInformation: string;
  email: string;
  scheduleCall: string;
  scheduleCallDescription: string;
  bookCall: string;
  quickResponse: string;
  quickResponseDescription: string;
  
  // Footer
  footerDescription: string;
  quickLinks: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
  allRightsReserved: string;
  
  // Common
  cleanCode: string;
  responsive: string;
  backToTop: string;
  limitedOffer: string;
}

export const translations: Record<'en' | 'es' | 'tr', Translations> = {
  en: {
    // Navigation
    services: 'Services',
    projects: 'Projects',
    testimonials: 'Testimonials',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Your Business Is Losing Sales by Missing Calls Let AI Handle Them 24/7',
    heroSubtitle: 'AI Voice & Chat Agents',
    heroDescription: 'AI voice and chat agents can speak English and Spanish, answer calls, book appointments, and collect leads all with the professionalism of a human assistant.',
    heroFeatures: {
      available247: {
        title: 'Available 24/7 to handle customer interactions',
        description: 'No more "Sorry we missed your call." Your AI never sleeps.'
      },
      bilingual: {
        title: 'Bilingual fluency in English and Spanish',
        description: 'Every caller gets the respect of being understood.'
      },
      appointments: {
        title: 'Books appointments directly into your calendar',
        description: 'Hands off. Clients show up.'
      },
      leadCollection: {
        title: 'Collects name, email, and phone',
        description: 'Captures every lead, even at midnight.'
      },
      perfectFor: {
        title: 'Perfect for clinics, service businesses, and local shops',
        description: 'Anyone with a phone line and a schedule.'
      },
      noHiring: {
        title: 'No hiring. No missed calls. Just results.',
        description: 'Less overhead. More conversions.'
      }
    },
    heroClosing: 'These intelligent agents are launching soon. Stay tuned and get ready to turn missed calls and messages into booked clients.',
    
    // Services Section
    servicesTitle: 'Empowering Businesses with AI-Driven Voice and Chat Solutions',
    servicesSubtitle: 'We help companies automate communication, capture leads, and increase sales using cutting-edge AI tools.',
    aiVoiceAgents: {
      title: 'AI Voice Agents',
      description: 'Automate phone calls with intelligent agents that answer, book appointments, and capture leads 24/7 in English and Spanish.'
    },
    smartChatbots: {
      title: 'Smart Chatbots',
      description: 'Engage website visitors instantly using chatbots that qualify leads, answer FAQs, and drive conversions even while you sleep.'
    },
    digitalSolutions: {
      title: 'Digital Solutions',
      description: 'From web design to automation workflows, we build digital infrastructure that saves time and delivers measurable ROI.'
    },
    
    // Special Offer
    offerTitle: 'EXCLUSIVE: First 5 Clients Only',
    offerDescription: 'Get 15% OFF any website package when you book this month. Limited spots available for businesses serious about their digital presence.',
    offerSpots: 'Only 3 spots remaining!',
    offerButton: 'Claim Your Discount Now',
    offerEndsIn: 'Offer Ends In:',
    offerTimeUnits: {
      days: 'Days',
      hours: 'Hours',
      mins: 'Mins',
      secs: 'Secs'
    },
    
    // Projects Section
    projectsTitle: 'Recent Projects',
    projectsSubtitle: 'Explore my latest work, featuring real-world projects that demonstrate technical expertise and business results.',
    projectCategories: {
      all: 'All Projects',
      ecommerce: 'E-commerce',
      webApps: 'Web Apps',
      dashboards: 'Dashboards',
      websites: 'Websites'
    },
    projectsCallToAction: 'Want to see more examples of my work?',
    requestPortfolio: 'Request Full Portfolio',
    
    // Testimonials Section
    testimonialsTitle: 'Client Success Stories',
    testimonialsSubtitle: "Don't just take my word for it. Here's what clients say about working with me and the results they've achieved.",
    result: 'Result',
    
    // Contact Section
    contactTitle: "Let's Build Something Amazing",
    contactSubtitle: "Ready to discuss your project? Contact me today for a free consultation and let's turn your ideas into reality.",
    sendMessage: 'Send a Message',
    yourName: 'Your Name',
    emailAddress: 'Email Address',
    serviceInterestedIn: 'Service Interested In',
    selectService: 'Select a service',
    serviceOptions: {
      website: 'Website Development',
      ecommerce: 'E-commerce Solution',
      chatbot: 'AI Chatbot Integration',
      seo: 'SEO Optimization',
      tech: 'Tech Integration',
      other: 'Other'
    },
    yourMessage: 'Your Message',
    messagePlaceholder: 'Tell me about your project...',
    sendMessageButton: 'Send Message',
    contactInformation: 'Contact Information',
    email: 'Email',
    scheduleCall: 'Schedule a Call',
    scheduleCallDescription: 'Prefer to talk directly? Book a free 30-minute consultation call.',
    bookCall: 'Book a Call',
    quickResponse: 'Quick Response Guarantee',
    quickResponseDescription: "I'll get back to you within 24 hours with a personalized response and next steps.",
    
    // Footer
    footerDescription: 'Creating websites that deliver real business results. From concept to completion, I build digital solutions that drive growth and engagement.',
    quickLinks: 'Quick Links',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    allRightsReserved: 'All rights reserved.',
    
    // Common
    cleanCode: 'Clean Code',
    responsive: 'Responsive',
    backToTop: 'Back to top',
    limitedOffer: 'Limited Offer'
  },
  es: {
    // Navigation
    services: 'Servicios',
    projects: 'Proyectos',
    testimonials: 'Testimonios',
    contact: 'Contacto',
    
    // Hero Section
    heroTitle: 'Tu Negocio Está Perdiendo Ventas por Llamadas Perdidas Deja que la IA las Maneje 24/7',
    heroSubtitle: 'Agentes de Voz e IA para Chat',
    heroDescription: 'Los agentes de voz e IA para chat pueden hablar inglés y español, responder llamadas, programar citas y capturar clientes potenciales con la profesionalidad de un asistente humano.',
    heroFeatures: {
      available247: {
        title: 'Disponible 24/7 para manejar interacciones con clientes',
        description: 'No más "Lo sentimos, perdimos tu llamada." Tu IA nunca duerme.'
      },
      bilingual: {
        title: 'Fluidez bilingüe en inglés y español',
        description: 'Cada cliente recibe el respeto de ser entendido.'
      },
      appointments: {
        title: 'Programa citas directamente en tu calendario',
        description: 'Sin intervención. Los clientes aparecen.'
      },
      leadCollection: {
        title: 'Recopila nombre, email y teléfono',
        description: 'Captura cada cliente potencial, incluso a medianoche.'
      },
      perfectFor: {
        title: 'Perfecto para clínicas, negocios de servicios y tiendas locales',
        description: 'Cualquiera con una línea telefónica y un horario.'
      },
      noHiring: {
        title: 'Sin contrataciones. Sin llamadas perdidas. Solo resultados.',
        description: 'Menos gastos generales. Más conversiones.'
      }
    },
    heroClosing: 'Estos agentes inteligentes se lanzan pronto. Mantente atento y prepárate para convertir llamadas y mensajes perdidos en clientes programados.',
    
    // Services Section
    servicesTitle: 'Empoderando Negocios con Soluciones de Voz e IA Impulsadas por Inteligencia Artificial',
    servicesSubtitle: 'Ayudamos a las empresas a automatizar la comunicación, capturar clientes potenciales y aumentar las ventas usando herramientas de IA de vanguardia.',
    aiVoiceAgents: {
      title: 'Agentes de Voz IA',
      description: 'Automatiza llamadas telefónicas con agentes inteligentes que responden, programan citas y capturan clientes potenciales 24/7 en inglés y español.'
    },
    smartChatbots: {
      title: 'Chatbots Inteligentes',
      description: 'Involucra a los visitantes del sitio web instantáneamente usando chatbots que califican clientes potenciales, responden preguntas frecuentes y generan conversiones incluso mientras duermes.'
    },
    digitalSolutions: {
      title: 'Soluciones Digitales',
      description: 'Desde diseño web hasta flujos de trabajo de automatización, construimos infraestructura digital que ahorra tiempo y entrega ROI medible.'
    },
    
    // Special Offer
    offerTitle: 'EXCLUSIVO: Solo Primeros 5 Clientes',
    offerDescription: 'Obtén 15% DE DESCUENTO en cualquier paquete de sitio web cuando reserves este mes. Espacios limitados disponibles para negocios serios sobre su presencia digital.',
    offerSpots: '¡Solo quedan 3 espacios!',
    offerButton: 'Reclama Tu Descuento Ahora',
    offerEndsIn: 'La Oferta Termina En:',
    offerTimeUnits: {
      days: 'Días',
      hours: 'Horas',
      mins: 'Mins',
      secs: 'Segs'
    },
    
    // Projects Section
    projectsTitle: 'Proyectos Recientes',
    projectsSubtitle: 'Explora mi trabajo más reciente, presentando proyectos del mundo real que demuestran experiencia técnica y resultados comerciales.',
    projectCategories: {
      all: 'Todos los Proyectos',
      ecommerce: 'E-commerce',
      webApps: 'Aplicaciones Web',
      dashboards: 'Paneles',
      websites: 'Sitios Web'
    },
    projectsCallToAction: '¿Quieres ver más ejemplos de mi trabajo?',
    requestPortfolio: 'Solicitar Portafolio Completo',
    
    // Testimonials Section
    testimonialsTitle: 'Historias de Éxito de Clientes',
    testimonialsSubtitle: 'No solo tomes mi palabra. Esto es lo que dicen los clientes sobre trabajar conmigo y los resultados que han logrado.',
    result: 'Resultado',
    
    // Contact Section
    contactTitle: 'Construyamos Algo Increíble',
    contactSubtitle: '¿Listo para discutir tu proyecto? Contáctame hoy para una consulta gratuita y convirtamos tus ideas en realidad.',
    sendMessage: 'Enviar un Mensaje',
    yourName: 'Tu Nombre',
    emailAddress: 'Dirección de Email',
    serviceInterestedIn: 'Servicio de Interés',
    selectService: 'Selecciona un servicio',
    serviceOptions: {
      website: 'Desarrollo de Sitio Web',
      ecommerce: 'Solución E-commerce',
      chatbot: 'Integración de Chatbot IA',
      seo: 'Optimización SEO',
      tech: 'Integración Tecnológica',
      other: 'Otro'
    },
    yourMessage: 'Tu Mensaje',
    messagePlaceholder: 'Cuéntame sobre tu proyecto...',
    sendMessageButton: 'Enviar Mensaje',
    contactInformation: 'Información de Contacto',
    email: 'Email',
    scheduleCall: 'Programar una Llamada',
    scheduleCallDescription: '¿Prefieres hablar directamente? Reserva una llamada de consulta gratuita de 30 minutos.',
    bookCall: 'Reservar una Llamada',
    quickResponse: 'Garantía de Respuesta Rápida',
    quickResponseDescription: 'Te responderé dentro de 24 horas con una respuesta personalizada y próximos pasos.',
    
    // Footer
    footerDescription: 'Creando sitios web que entregan resultados comerciales reales. Desde el concepto hasta la finalización, construyo soluciones digitales que impulsan el crecimiento y la participación.',
    quickLinks: 'Enlaces Rápidos',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    cookiePolicy: 'Política de Cookies',
    allRightsReserved: 'Todos los derechos reservados.',
    
    // Common
    cleanCode: 'Código Limpio',
    responsive: 'Responsivo',
    backToTop: 'Volver arriba',
    limitedOffer: 'Oferta Limitada'
  },
  tr: {
    // Navigation
    services: 'Hizmetler',
    projects: 'Projeler',
    testimonials: 'Referanslar',
    contact: 'İletişim',
    
    // Hero Section
    heroTitle: 'İşletmeniz Kaçırılan Aramalar Yüzünden Satış Kaybediyor AI\'nın 7/24 Halletmesine İzin Verin',
    heroSubtitle: 'AI Ses ve Sohbet Ajanları',
    heroDescription: 'AI ses ve sohbet ajanları İngilizce ve İspanyolca konuşabilir, aramaları yanıtlayabilir, randevu alabilir ve insan asistanının profesyonelliğiyle müşteri adaylarını toplayabilir.',
    heroFeatures: {
      available247: {
        title: 'Müşteri etkileşimlerini 7/24 yönetmek için hazır',
        description: 'Artık "Üzgünüz, aramanızı kaçırdık" yok. AI\'nız asla uyumaz.'
      },
      bilingual: {
        title: 'İngilizce ve İspanyolca\'da iki dilli akıcılık',
        description: 'Her arayan anlaşılma saygısını görür.'
      },
      appointments: {
        title: 'Randevuları doğrudan takviminize kaydeder',
        description: 'Müdahalesiz. Müşteriler gelir.'
      },
      leadCollection: {
        title: 'İsim, e-posta ve telefon toplar',
        description: 'Gece yarısında bile her müşteri adayını yakalar.'
      },
      perfectFor: {
        title: 'Klinikler, hizmet işletmeleri ve yerel mağazalar için mükemmel',
        description: 'Telefon hattı ve programı olan herkes için.'
      },
      noHiring: {
        title: 'İşe alma yok. Kaçırılan arama yok. Sadece sonuçlar.',
        description: 'Daha az genel gider. Daha fazla dönüşüm.'
      }
    },
    heroClosing: 'Bu akıllı ajanlar yakında başlatılıyor. Takipte kalın ve kaçırılan aramaları ve mesajları rezervasyonlu müşterilere dönüştürmeye hazır olun.',
    
    // Services Section
    servicesTitle: 'AI Destekli Ses ve Sohbet Çözümleriyle İşletmeleri Güçlendirme',
    servicesSubtitle: 'Şirketlerin iletişimi otomatikleştirmesine, müşteri adaylarını yakalamasına ve son teknoloji AI araçlarını kullanarak satışları artırmasına yardımcı oluyoruz.',
    aiVoiceAgents: {
      title: 'AI Ses Ajanları',
      description: 'Telefon aramalarını İngilizce ve İspanyolca olarak 7/24 yanıtlayan, randevu alan ve müşteri adaylarını yakalayan akıllı ajanlarla otomatikleştirin.'
    },
    smartChatbots: {
      title: 'Akıllı Sohbet Botları',
      description: 'Web sitesi ziyaretçilerini müşteri adaylarını nitelendiren, SSS\'leri yanıtlayan ve siz uyurken bile dönüşümleri artıran sohbet botlarıyla anında etkileşime geçirin.'
    },
    digitalSolutions: {
      title: 'Dijital Çözümler',
      description: 'Web tasarımından otomasyon iş akışlarına kadar, zaman kazandıran ve ölçülebilir ROI sağlayan dijital altyapı kuruyoruz.'
    },
    
    // Special Offer
    offerTitle: 'ÖZEL: Sadece İlk 5 Müşteri',
    offerDescription: 'Bu ay rezervasyon yaptırdığınızda herhangi bir web sitesi paketinde %15 İNDİRİM kazanın. Dijital varlıkları konusunda ciddi işletmeler için sınırlı yer mevcuttur.',
    offerSpots: 'Sadece 3 yer kaldı!',
    offerButton: 'İndirimi Şimdi Talep Et',
    offerEndsIn: 'Teklif Bitiş Süresi:',
    offerTimeUnits: {
      days: 'Gün',
      hours: 'Saat',
      mins: 'Dk',
      secs: 'Sn'
    },
    
    // Projects Section
    projectsTitle: 'Son Projeler',
    projectsSubtitle: 'Teknik uzmanlık ve iş sonuçlarını gösteren gerçek dünya projelerini içeren en son çalışmalarımı keşfedin.',
    projectCategories: {
      all: 'Tüm Projeler',
      ecommerce: 'E-ticaret',
      webApps: 'Web Uygulamaları',
      dashboards: 'Panolar',
      websites: 'Web Siteleri'
    },
    projectsCallToAction: 'Çalışmalarımın daha fazla örneğini görmek ister misiniz?',
    requestPortfolio: 'Tam Portföy Talep Et',
    
    // Testimonials Section
    testimonialsTitle: 'Müşteri Başarı Hikayeleri',
    testimonialsSubtitle: 'Sadece benim sözümü almayın. Müşterilerin benimle çalışma ve elde ettikleri sonuçlar hakkında söyledikleri şunlar.',
    result: 'Sonuç',
    
    // Contact Section
    contactTitle: 'Harika Bir Şey İnşa Edelim',
    contactSubtitle: 'Projenizi tartışmaya hazır mısınız? Ücretsiz danışmanlık için bugün benimle iletişime geçin ve fikirlerinizi gerçeğe dönüştürelim.',
    sendMessage: 'Mesaj Gönder',
    yourName: 'Adınız',
    emailAddress: 'E-posta Adresi',
    serviceInterestedIn: 'İlgilendiğiniz Hizmet',
    selectService: 'Bir hizmet seçin',
    serviceOptions: {
      website: 'Web Sitesi Geliştirme',
      ecommerce: 'E-ticaret Çözümü',
      chatbot: 'AI Sohbet Botu Entegrasyonu',
      seo: 'SEO Optimizasyonu',
      tech: 'Teknoloji Entegrasyonu',
      other: 'Diğer'
    },
    yourMessage: 'Mesajınız',
    messagePlaceholder: 'Projeniz hakkında bana anlatın...',
    sendMessageButton: 'Mesaj Gönder',
    contactInformation: 'İletişim Bilgileri',
    email: 'E-posta',
    scheduleCall: 'Arama Planla',
    scheduleCallDescription: 'Doğrudan konuşmayı mı tercih ediyorsunuz? Ücretsiz 30 dakikalık danışmanlık araması rezervasyonu yapın.',
    bookCall: 'Arama Rezervasyonu Yap',
    quickResponse: 'Hızlı Yanıt Garantisi',
    quickResponseDescription: '24 saat içinde kişiselleştirilmiş yanıt ve sonraki adımlarla size geri döneceğim.',
    
    // Footer
    footerDescription: 'Gerçek iş sonuçları sağlayan web siteleri yaratıyorum. Konseptten tamamlanmaya kadar, büyüme ve etkileşimi artıran dijital çözümler inşa ediyorum.',
    quickLinks: 'Hızlı Bağlantılar',
    privacyPolicy: 'Gizlilik Politikası',
    termsOfService: 'Hizmet Şartları',
    cookiePolicy: 'Çerez Politikası',
    allRightsReserved: 'Tüm hakları saklıdır.',
    
    // Common
    cleanCode: 'Temiz Kod',
    responsive: 'Duyarlı',
    backToTop: 'Başa dön',
    limitedOffer: 'Sınırlı Teklif'
  }
};