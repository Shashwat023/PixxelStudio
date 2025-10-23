import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Award, Users, Heart, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';

const Home = () => {
  const stats = [
    { icon: Camera, number: '30+', label: 'Years Experience' },
    { icon: Heart, number: '500+', label: 'Weddings Captured' },
    { icon: Users, number: '1000+', label: 'Happy Clients' },
    { icon: Award, number: '50+', label: 'Awards Won' },
  ];

  const services = [
    {
      title: 'Wedding Photography',
      description: 'Complete wedding coverage from preparation to celebration, capturing every precious moment of your special day.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Full Day Coverage', 'Engagement Session', 'Online Gallery', 'Print Release']
    },
    {
      title: 'Pre-Wedding Shoots',
      description: 'Romantic and creative pre-wedding sessions that tell your unique love story in beautiful locations.',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Location Scouting', 'Outfit Changes', 'Creative Concepts', 'Same Day Previews']
    },
    {
      title: 'Portrait Sessions',
      description: 'Professional portraits that capture your personality and essence with artistic flair and technical excellence.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Studio & Outdoor', 'Professional Lighting', 'Retouching Included', 'Multiple Looks']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah & Michael',
      event: 'Wedding Photography',
      text: 'Absolutely stunning work! Every moment was captured perfectly. The attention to detail and artistic vision exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Priya & Raj',
      event: 'Pre-Wedding Shoot',
      text: 'The pre-wedding shoot was magical. The photographer made us feel comfortable and the results were breathtaking.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      event: 'Portrait Session',
      text: 'Professional, creative, and so easy to work with. The portraits captured my personality beautifully.',
      rating: 5
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Capturing Life's Most
                <span className="text-primary-600"> Precious Moments</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                With over 30+ years of experience in professional photography, I specialize in 
                creating timeless images that tell your unique story. Every wedding, every moment, 
                every emotion is captured with artistic vision and technical excellence.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                My approach combines photojournalistic storytelling with fine art aesthetics, 
                ensuring that your memories are preserved in the most beautiful and authentic way possible.
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center">
                Learn More About Me
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/about.jpg"
                  alt="Photographer at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-600 rounded-2xl flex items-center justify-center">
                <Camera className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Photography Services
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional photography services tailored to capture your most important moments 
              with artistic excellence and attention to detail.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-800 rounded-2xl overflow-hidden hover:bg-dark-700 transition-colors duration-300 group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-white flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="text-primary-600 hover:text-primary-500 font-medium inline-flex items-center transition-colors"
                  >
                    Get Quote
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              What Clients Say
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-800 p-6 rounded-2xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-primary-600">★</div>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.event}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-orange-500">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Capture Your Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's create beautiful memories together. Get in touch to discuss your photography needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Start Your Project
              </Link>
              <Link to="/gallery" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200">
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
