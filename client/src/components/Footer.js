import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Wedding Photography',
    'Pre-Wedding Shoots',
    'Event Photography',
    'Portrait Sessions',
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="container-custom">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <img src="/logo_black.jpg" alt="PixelStudio Logo" className="h-10 w-auto" />
              </div>
              <span className="text-lg font-display font-bold text-white">
                The Pixxel Studio
              </span>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed">
              Capturing life's most precious moments with 25+ years of professional photography experience. 
              Specializing in weddings, pre-weddings, and portrait photography.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-dark-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-primary-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-dark-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-dark-400 text-sm">
                <Mail size={16} className="text-primary-600" />
                <span>hello@pixelstudio.com</span>
              </div>
              <div className="flex items-center space-x-3 text-dark-400 text-sm">
                <Phone size={16} className="text-primary-600" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3 text-dark-400 text-sm">
                <MapPin size={16} className="text-primary-600 mt-0.5" />
                <span>123 Photography Street,<br />Creative District, City 12345</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-dark-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-dark-400 text-sm">
              © {currentYear} The Pixxel Studio. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-dark-400 text-sm">
              <span>Made with</span>
              <Heart size={14} className="text-primary-600 fill-current" />
              <span>for capturing memories</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
