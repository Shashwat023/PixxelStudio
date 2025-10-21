import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, Edit, Plane, Lightbulb, Palette } from 'lucide-react';

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: 'photography',
      icon: Camera,
      title: 'Photography',
      description: 'Specializing in capturing timeless moments with a keen eye for detail and creativity.',
      features: ['Wedding Photography', 'Portrait Sessions', 'Event Coverage', 'Commercial Shoots'],
      gallery: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'videography',
      icon: Video,
      title: 'Videography',
      description: 'Professional video production services for events, weddings, corporate projects, and more.',
      features: ['Wedding Films', 'Event Videos', 'Corporate Videos', 'Music Videos'],
      gallery: [
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'retouching',
      icon: Edit,
      title: 'Photo Retouching',
      description: 'Enhancing and perfecting images to achieve the desired aesthetic and quality.',
      features: ['Color Correction', 'Skin Retouching', 'Background Removal', 'Creative Editing'],
      gallery: [
        'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'aerial',
      icon: Plane,
      title: 'Aerial Photography',
      description: 'Stunning aerial views to add a unique perspective to your projects or events.',
      features: ['Drone Photography', 'Aerial Videos', 'Real Estate Aerials', 'Landscape Shots'],
      gallery: [
        'https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'lighting',
      icon: Lightbulb,
      title: 'Lighting Setup',
      description: 'Expertise in creating the perfect lighting environment to achieve the desired mood and ambiance.',
      features: ['Studio Lighting', 'Event Lighting', 'Portrait Lighting', 'Creative Setups'],
      gallery: [
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'colorgrading',
      icon: Palette,
      title: 'Video Color Grading',
      description: 'Enhancing video footage with professional color grading and editing techniques to ensure cinematic quality.',
      features: ['Color Correction', 'Cinematic Grading', 'Mood Enhancement', 'Style Matching'],
      gallery: [
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  const handleServiceClick = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      {/* <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Our <span className="text-primary-600">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive creative services to bring your vision to life. From photography to post-production, 
              we offer professional solutions tailored to your unique needs.
            </p>
          </motion.div>
        </div>
      </section> */}

      {/* Services Section */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Our <span className="text-primary-600">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Each service is crafted with precision and creativity to ensure your vision is brought to life beautifully. 
              Let's collaborate to create stunning visual content that exceeds your expectations.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {expandedService ? (
              // Expanded View - 1x3 text + 2x3 gallery layout
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              >
                {/* Text Content - 1x3 */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="lg:col-span-1 space-y-6"
                >
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/50">
                    {/* Service Icon & Title */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center">
                        {React.createElement(services.find(s => s.id === expandedService).icon, { 
                          className: "w-8 h-8 text-white" 
                        })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-white">
                          {services.find(s => s.id === expandedService).title}
                        </h3>
                        <p className="text-primary-600 text-sm font-medium">Professional Service</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {services.find(s => s.id === expandedService).description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      <h4 className="text-white font-semibold">What's Included:</h4>
                      {services.find(s => s.id === expandedService).features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="flex items-center text-gray-300"
                        >
                          <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                        Get Quote for {services.find(s => s.id === expandedService).title}
                      </button>
                      <button 
                        onClick={() => setExpandedService(null)}
                        className="w-full bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        View All Services
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Gallery - 2x3 */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                    {services.find(s => s.id === expandedService).gallery.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 + imgIndex * 0.1 }}
                        className="aspect-square rounded-xl overflow-hidden bg-dark-700 group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img 
                          src={image} 
                          alt={`${services.find(s => s.id === expandedService).title} sample ${imgIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              // Grid View - Clean minimal cards
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              >
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                    onClick={() => handleServiceClick(service.id)}
                    whileHover={{ y: -8 }}
                  >
                    {/* Minimal Service Card */}
                    <div className="relative bg-transparent border border-dark-700/50 hover:border-primary-600/50 rounded-2xl p-8 transition-all duration-500 hover:bg-dark-800/30 backdrop-blur-sm">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-12 h-12 text-primary-600" strokeWidth={1.5} />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 leading-relaxed text-sm">
                        {service.description}
                      </p>

                      {/* Subtle Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your creative needs and bring your vision to life with our professional services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Contact Us
              </a>
              <a
                href="/gallery"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200"
              >
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
