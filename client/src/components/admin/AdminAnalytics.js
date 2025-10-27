import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Users, Eye, Camera, Calendar } from 'lucide-react';
import { adminAPI } from '../../utils/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-dark-800 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-dark-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Contacts',
      value: analytics.totalContacts.toString(),
      change: `${analytics.contactsChange >= 0 ? '+' : ''}${analytics.contactsChange}%`,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Gallery Images',
      value: analytics.totalGalleryImages.toString(),
      change: 'Total',
      icon: Camera,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Recent Inquiries',
      value: analytics.recentContacts.toString(),
      change: 'Last 30 days',
      icon: Eye,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Bookings',
      value: analytics.bookedEvents.toString(),
      change: `${analytics.completedEvents} completed`,
      icon: Calendar,
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10'
    }
  ];

  // Prepare chart data from real analytics
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Create array for last 7 months
  const last7Months = [];
  const contactsData = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last7Months.push(monthNames[date.getMonth()]);
    
    // Find matching data from analytics
    const matchingData = analytics.contactsOverTime.find(
      item => item._id.year === date.getFullYear() && item._id.month === date.getMonth() + 1
    );
    contactsData.push(matchingData ? matchingData.count : 0);
  }

  const visitorData = {
    labels: last7Months,
    datasets: [
      {
        label: 'Contact Inquiries',
        data: contactsData,
        borderColor: '#FF6600',
        backgroundColor: 'rgba(255, 102, 0, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Event type data
  const eventTypeLabels = {
    'wedding': 'Wedding',
    'pre-wedding': 'Pre-Wedding',
    'event': 'Event',
    'portrait': 'Portrait',
    'other': 'Other'
  };
  
  const eventLabels = analytics.contactsByEventType.map(item => eventTypeLabels[item._id] || item._id);
  const eventCounts = analytics.contactsByEventType.map(item => item.count);

  const serviceData = {
    labels: eventLabels.length > 0 ? eventLabels : ['No Data'],
    datasets: [
      {
        label: 'Event Type Inquiries',
        data: eventCounts.length > 0 ? eventCounts : [0],
        backgroundColor: [
          '#FF6600',
          '#ef4444',
          '#22c55e',
          '#8b5cf6',
          '#eab308',
          '#ec4899',
        ],
      },
    ],
  };

  // Status distribution data
  const statusLabels = {
    'new': 'New',
    'contacted': 'Contacted',
    'quoted': 'Quoted',
    'booked': 'Booked',
    'completed': 'Completed',
    'cancelled': 'Cancelled'
  };
  
  const statusNames = analytics.contactsByStatus.map(item => statusLabels[item._id] || item._id);
  const statusCounts = analytics.contactsByStatus.map(item => item.count);

  const deviceData = {
    labels: statusNames.length > 0 ? statusNames : ['No Data'],
    datasets: [
      {
        data: statusCounts.length > 0 ? statusCounts : [0],
        backgroundColor: ['#3b82f6', '#eab308', '#8b5cf6', '#22c55e', '#6b7280', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          color: '#374151',
        },
      },
      y: {
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          color: '#374151',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Analytics</h1>
            <p className="text-gray-400">Track your website performance and user engagement</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <TrendingUp className="w-5 h-5" />
            <span>Last 30 days</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800 rounded-xl border border-dark-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Visitor Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-dark-800 rounded-xl border border-dark-700 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Contact Inquiry Trends</h3>
            <Line data={visitorData} options={chartOptions} />
          </motion.div>

          {/* Service Inquiries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-dark-800 rounded-xl border border-dark-700 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Event Type Distribution</h3>
            <Bar data={serviceData} options={chartOptions} />
          </motion.div>
        </div>

        {/* Device Usage & Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Device Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-dark-800 rounded-xl border border-dark-700 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Contact Status</h3>
            <Doughnut data={deviceData} options={doughnutOptions} />
          </motion.div>

          {/* Gallery Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-dark-800 rounded-xl border border-dark-700 p-6 lg:col-span-2"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Gallery Categories</h3>
            <div className="space-y-4">
              {analytics.imagesByCategory.length > 0 ? (
                analytics.imagesByCategory.map((item, index) => {
                  const maxCount = Math.max(...analytics.imagesByCategory.map(i => i.count));
                  const percentage = (item.count / maxCount) * 100;
                  const categoryNames = {
                    'weddings': 'Weddings',
                    'pre-weddings': 'Pre-Weddings',
                    'events': 'Events',
                    'portraits': 'Portraits'
                  };
                  
                  return (
                    <div key={item._id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium capitalize">
                            {categoryNames[item._id] || item._id}
                          </span>
                          <span className="text-gray-400 text-sm">{item.count} images</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="bg-primary-600 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-center py-8">No gallery data available</p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
