import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Award, Heart, Users, Star, Quote } from 'lucide-react';

const About = () => {
  const achievements = [
    { icon: Camera, number: '25+', label: 'Years of Experience' },
    { icon: Heart, number: '500+', label: 'Weddings Captured' },
    { icon: Users, number: '1000+', label: 'Happy Clients' },
    { icon: Award, number: '50+', label: 'Awards Won' },
  ];

  const skills = [
    { name: 'Wedding Photography', level: 95 },
    { name: 'Portrait Photography', level: 90 },
    { name: 'Event Photography', level: 88 },
    { name: 'Photo Editing', level: 92 },
    { name: 'Lighting Design', level: 85 },
    { name: 'Creative Direction', level: 90 },
  ];

  const timeline = [
    {
      year: '1998',
      title: 'Started Photography Journey',
      description: 'Began as an assistant photographer, learning the fundamentals of composition and lighting.'
    },
    {
      year: '2002',
      title: 'First Wedding Assignment',
      description: 'Captured my first wedding, discovering my passion for documenting love stories.'
    },
    {
      year: '2008',
      title: 'Studio Establishment',
      description: 'Opened my own photography studio, specializing in weddings and portraits.'
    },
    {
      year: '2015',
      title: 'International Recognition',
      description: 'Won first international photography award for wedding photography excellence.'
    },
    {
      year: '2020',
      title: 'Digital Evolution',
      description: 'Embraced digital transformation, offering virtual consultations and online galleries.'
    },
    {
      year: '2023',
      title: 'Mentorship Program',
      description: 'Started mentoring upcoming photographers, sharing knowledge and experience.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Every shot is taken with genuine love for the craft and respect for the moment.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality images that exceed expectations.'
    },
    {
      icon: Users,
      title: 'Connection',
      description: 'Building meaningful relationships with clients to capture authentic emotions.'
    },
    {
      icon: Camera,
      title: 'Artistry',
      description: 'Combining technical expertise with creative vision to create timeless art.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                About the
                <span className="text-primary-600"> Artist</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                With over 25 years of experience behind the lens, I've dedicated my life to 
                capturing the most precious moments that define our human experience.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                My journey in photography began as a passion and evolved into a calling. 
                Every wedding, every portrait, every moment I capture is treated with the 
                utmost care and artistic vision. I believe that photography is not just about 
                taking pictures—it's about preserving memories, emotions, and stories that 
                will be cherished for generations.
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium italic">
                    "Photography is the story I fail to put into words."
                  </p>
                  <p className="text-gray-400 text-sm">- My Photography Philosophy</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Professional photographer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-600 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm">Years</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
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
              Achievements & Milestones
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Numbers that reflect the journey of passion, dedication, and countless beautiful moments captured.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary-600/20 group-hover:bg-primary-600/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <achievement.icon className="w-10 h-10 text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-400">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Skills & Expertise
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Years of experience have honed my skills across various aspects of photography, 
                from technical mastery to creative vision.
              </p>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-primary-600 font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-800 rounded-full h-2">
                      <motion.div
                        className="bg-primary-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-800 p-6 rounded-xl hover:bg-dark-700 transition-colors duration-300"
                >
                  <value.icon className="w-8 h-8 text-primary-600 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              My Journey
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A timeline of growth, learning, and memorable milestones that shaped my photography career.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-600/30"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start"
                  >
                    {/* Timeline Dot */}
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-8 flex-shrink-0 relative z-10">
                      {item.year}
                    </div>
                    
                    {/* Content */}
                    <div className="bg-dark-800 p-6 rounded-xl flex-1 hover:bg-dark-700 transition-colors duration-300">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
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
              Let's Create Something Beautiful Together
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Ready to capture your special moments? I'd love to hear your story and discuss how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Get in Touch
              </a>
              <a
                href="/gallery"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200"
              >
                View My Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
