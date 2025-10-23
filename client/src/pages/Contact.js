import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { contactAPI } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    eventDate: '',
    eventType: '',
    budget: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await contactAPI.submit(formData);

      if (response.status >= 200 && response.status < 300) {
        setStatus({
          type: 'success',
          message: "Thank you for contacting us! Your details have been received."
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          eventDate: '',
          eventType: '',
          budget: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Unexpected response from server. Please try again.'
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({
        type: 'error',
        message: 'Unable to submit form right now. Please try again later.'
      });
    }
    finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'pixxelstudiolab@gmail.com',
      link: 'mailto:pixxelstudiolab@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 9839340599, 6307704482',
      link: 'tel:+919839340599'
    },
    {
      icon: MapPin,
      title: 'Studio Location',
      content: 'SH-16/57 D-1 B-1 Shivpur, Varanasi, Uttar Pradesh 221003',
      link: 'https://www.google.com/maps/place/25%C2%B021\'08.1%22N+82%C2%B057\'23.1%22E/@25.352739,82.955368,16z/data=!4m4!3m3!8m2!3d25.35225!4d82.9564167?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Sat: 10:00 AM - 7:00 PM',
      link: null
    }
  ];

  const eventTypes = [
    { value: '', label: 'Select Event Type' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'pre-wedding', label: 'Pre-Wedding Shoot' },
    { value: 'event', label: 'Event Photography' },
    { value: 'portrait', label: 'Portrait Session' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: '', label: 'Select Budget Range' },
    { value: 'under-50k', label: 'Under ₹50,000' },
    { value: '50k-100k', label: '₹50,000 - ₹1,00,000' },
    { value: '100k-200k', label: '₹1,00,000 - ₹2,00,000' },
    { value: '200k-above', label: 'Above ₹2,00,000' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Let's Create Something
              <span className="text-primary-600"> Beautiful</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to capture your special moments? I'd love to hear about your vision 
              and discuss how we can bring it to life together.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-800 p-6 rounded-xl text-center hover:bg-dark-700 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-400">{info.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Send Me a Message
              </h2>
              <p className="text-gray-400 mb-8">
                Fill out the form below and I'll get back to you as soon as possible. 
                The more details you provide, the better I can understand your needs.
              </p>

              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg mb-6 flex items-center space-x-3 ${
                    status.type === 'success'
                      ? 'bg-green-900/20 border border-green-700 text-green-400'
                      : 'bg-red-900/20 border border-red-700 text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-white mb-2">
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600 transition-colors"
                    >
                      {eventTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-white mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600 transition-colors"
                    >
                      {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 transition-colors"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 transition-colors resize-none"
                    placeholder="Tell me about your vision, requirements, and any specific details you'd like to share..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  Studio Location
                </h3>
                <div className="aspect-video bg-dark-800 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.393939699314!2d82.9712958753878!3d25.35804597760639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2de70808587d%3A0x1d9c1b538e1322e7!2sThe%20Pixxel%20Studio!5e0!3m2!1sen!2sin!4v1716378931051!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Studio Location"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div className="bg-dark-800 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      How far in advance should I book?
                    </h4>
                    <p className="text-gray-400">
                      I recommend booking 6-12 months in advance for weddings, especially during peak season. 
                      For other sessions, 2-4 weeks notice is usually sufficient.
                    </p>
                  </div>
                  <div className="bg-dark-800 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Do you travel for destination weddings?
                    </h4>
                    <p className="text-gray-400">
                      Yes! I love destination weddings and am available to travel anywhere. 
                      Travel costs will be discussed based on the location and duration.
                    </p>
                  </div>
                  <div className="bg-dark-800 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      When will I receive my photos?
                    </h4>
                    <p className="text-gray-400">
                      You'll receive a preview gallery within 48 hours and the complete edited gallery 
                      within 4-6 weeks for weddings, 2-3 weeks for other sessions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
