import React from 'react';
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
  // Sample data - replace with real analytics data
  const stats = [
    {
      title: 'Total Views',
      value: '12,543',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Gallery Views',
      value: '8,234',
      change: '+8.2%',
      icon: Camera,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Contact Inquiries',
      value: '156',
      change: '+23.1%',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Bookings',
      value: '42',
      change: '+15.3%',
      icon: Calendar,
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10'
    }
  ];

  // Chart data
  const visitorData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Website Visitors',
        data: [1200, 1900, 3000, 2500, 3200, 4100, 3800],
        borderColor: '#FF6600',
        backgroundColor: 'rgba(255, 102, 0, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const serviceData = {
    labels: ['Photography', 'Videography', 'Retouching', 'Aerial', 'Lighting', 'Color Grading'],
    datasets: [
      {
        label: 'Service Inquiries',
        data: [45, 32, 28, 15, 22, 18],
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

  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [60, 35, 5],
        backgroundColor: ['#FF6600', '#1f2937', '#6b7280'],
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
            <h3 className="text-xl font-semibold text-white mb-6">Visitor Trends</h3>
            <Line data={visitorData} options={chartOptions} />
          </motion.div>

          {/* Service Inquiries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-dark-800 rounded-xl border border-dark-700 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Service Inquiries</h3>
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
            <h3 className="text-xl font-semibold text-white mb-6">Device Usage</h3>
            <Doughnut data={deviceData} options={doughnutOptions} />
          </motion.div>

          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-dark-800 rounded-xl border border-dark-700 p-6 lg:col-span-2"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Top Pages</h3>
            <div className="space-y-4">
              {[
                { page: '/gallery', views: '3,245', percentage: 85 },
                { page: '/services', views: '2,156', percentage: 65 },
                { page: '/', views: '1,987', percentage: 60 },
                { page: '/about', views: '1,432', percentage: 45 },
                { page: '/contact', views: '987', percentage: 30 },
              ].map((item, index) => (
                <div key={item.page} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{item.page}</span>
                      <span className="text-gray-400 text-sm">{item.views} views</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="bg-primary-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
