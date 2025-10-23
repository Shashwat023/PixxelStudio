const mongoose = require('mongoose');
const Content = require('./models/Content');
require('dotenv').config();

const sampleContent = [
  {
    section: 'hero',
    title: 'Capturing Life\'s Most Precious Moments',
    subtitle: 'Professional Photography',
    content: 'With over 30+ years of experience, I specialize in creating timeless images that tell your unique story. Every wedding, every moment, every emotion is captured with artistic vision and technical excellence.',
    metadata: {
      primaryButtonText: 'View Portfolio',
      secondaryButtonText: 'Get in Touch'
    },
    isActive: true
  },
  {
    section: 'about',
    title: 'About the Artist',
    subtitle: '30+ Years of Experience',
    content: 'My journey in photography began as a passion and evolved into a calling. I believe that photography is not just about taking pictures—it\'s about preserving memories, emotions, and stories that will be cherished for generations.\n\nEvery wedding, every portrait, every moment I capture is treated with the utmost care and artistic vision. My approach combines photojournalistic storytelling with fine art aesthetics, ensuring that your memories are preserved in the most beautiful and authentic way possible.',
    metadata: {
      experience: '30+ years',
      weddings: '500+',
      clients: '1000+',
      awards: '50+'
    },
    isActive: true
  },
  {
    section: 'services',
    title: 'Photography Services',
    subtitle: 'Professional Excellence',
    content: 'I offer comprehensive photography services tailored to capture your most important moments with artistic excellence and attention to detail.',
    metadata: {
      services: [
        {
          name: 'Wedding Photography',
          description: 'Complete wedding coverage from preparation to celebration',
          features: ['Full Day Coverage', 'Engagement Session', 'Online Gallery', 'Print Release']
        },
        {
          name: 'Pre-Wedding Shoots',
          description: 'Romantic and creative sessions that tell your love story',
          features: ['Location Scouting', 'Outfit Changes', 'Creative Concepts', 'Same Day Previews']
        },
        {
          name: 'Portrait Sessions',
          description: 'Professional portraits with artistic flair',
          features: ['Studio & Outdoor', 'Professional Lighting', 'Retouching Included', 'Multiple Looks']
        }
      ]
    },
    isActive: true
  },
  {
    section: 'testimonials',
    title: 'What Clients Say',
    subtitle: 'Client Testimonials',
    content: 'Don\'t just take our word for it. Here\'s what our clients have to say about their experience.',
    metadata: {
      testimonials: [
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
      ]
    },
    isActive: true
  },
  {
    section: 'contact',
    title: 'Get in Touch',
    subtitle: 'Let\'s Create Something Beautiful Together',
    content: 'Ready to capture your special moments? I\'d love to hear about your vision and discuss how we can bring it to life together.',
    metadata: {
      email: 'hello@pixelstudio.com',
      phone: '+91 98765 43210',
      address: '123 Photography Street\nCreative District\nCity 12345',
      workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
      socialMedia: {
        instagram: 'https://instagram.com/pixelstudio',
        facebook: 'https://facebook.com/pixelstudio',
        twitter: 'https://twitter.com/pixelstudio'
      }
    },
    isActive: true
  }
];

async function seedContent() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/photography-portfolio');
    console.log('Connected to MongoDB');

    // Clear existing content
    await Content.deleteMany({});
    console.log('Cleared existing content');

    // Insert sample content
    await Content.insertMany(sampleContent);
    console.log('Sample content inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
if (require.main === module) {
  seedContent();
}

module.exports = { sampleContent, seedContent };
