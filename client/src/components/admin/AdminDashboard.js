import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, 
  Mail, 
  TrendingUp, 
  Calendar,
  Eye,
  Heart,
  MessageSquare,
  Upload
} from 'lucide-react';
import { adminAPI, galleryAPI, contactAPI } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalImages: 0,
    totalContacts: 0,
    newContacts: 0,
    featuredImages: 0
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentImages, setRecentImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats and recent data
      const [contactsRes, imagesRes] = await Promise.all([
        adminAPI.getContacts({ limit: 5 }),
        adminAPI.getGalleryImages({ limit: 6 })
      ]);

      setRecentContacts(contactsRes.data.contacts);
      setRecentImages(imagesRes.data.images);
      
      // Calculate stats
      setStats({
        totalImages: imagesRes.data.pagination.total,
        totalContacts: contactsRes.data.pagination.total,
        newContacts: contactsRes.data.contacts.filter(c => c.status === 'new').length,
        featuredImages: imagesRes.data.images.filter(img => img.featured).length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Images',
      value: stats.totalImages,
      icon: Image,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      icon: Mail,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'New Inquiries',
      value: stats.newContacts,
      icon: MessageSquare,
      color: 'bg-primary-600',
      change: '+3'
    },
    {
      title: 'Featured Images',
      value: stats.featuredImages,
      icon: Heart,
      color: 'bg-purple-500',
      change: '+2'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'quoted': return 'bg-purple-500';
      case 'booked': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="p-8 h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening with your portfolio.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800 p-6 rounded-xl border border-dark-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-dark-800 rounded-xl border border-dark-700"
          >
            <div className="p-6 border-b border-dark-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Recent Contacts</h2>
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              {recentContacts.length > 0 ? (
                <div className="space-y-4">
                  {recentContacts.map((contact) => (
                    <div key={contact._id} className="flex items-center space-x-4">
                      <div className={`w-3 h-3 ${getStatusColor(contact.status)} rounded-full`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">
                          {contact.name}
                        </div>
                        <div className="text-gray-400 text-sm truncate">
                          {contact.email}
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No recent contacts
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-dark-800 rounded-xl border border-dark-700"
          >
            <div className="p-6 border-b border-dark-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Recent Uploads</h2>
                <Image className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              {recentImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {recentImages.map((image) => (
                    <div key={image._id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-dark-700">
                        <img
                          src={image.thumbnailUrl || image.imageUrl}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      {image.featured && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                          <Heart className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No recent images
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-dark-800 rounded-xl border border-dark-700 p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/admin/gallery" 
              className="flex items-center space-x-3 p-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              <Upload className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Upload Images</span>
            </a>
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-4 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
            >
              <Eye className="w-5 h-5 text-white" />
              <span className="text-white font-medium">View Site</span>
            </a>
            <a 
              href="/admin/analytics" 
              className="flex items-center space-x-3 p-4 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="text-white font-medium">View Analytics</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
