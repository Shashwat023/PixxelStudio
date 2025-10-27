import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  User, 
  MessageSquare,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { adminAPI } from '../../utils/api';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, [page]);

  useEffect(() => {
    // Reset and fetch when status changes
    setContacts([]);
    setPage(1);
    fetchContacts(true);
  }, [selectedStatus]);

  const fetchContacts = async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const params = {
        status: selectedStatus === 'all' ? undefined : selectedStatus,
        page: currentPage,
        limit: 20
      };

      const response = await adminAPI.getContacts(params);
      const newContacts = response.data.contacts;

      if (reset) {
        setContacts(newContacts);
      } else {
        // Prevent duplicates by checking if contact already exists
        setContacts(prev => {
          const existingIds = new Set(prev.map(c => c._id));
          const uniqueNewContacts = newContacts.filter(c => !existingIds.has(c._id));
          return [...prev, ...uniqueNewContacts];
        });
      }

      setHasMore(response.data.pagination.current < response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (contactId, newStatus, notes = '') => {
    try {
      const response = await adminAPI.updateContact(contactId, { 
        status: newStatus, 
        notes 
      });
      
      setContacts(prev => prev.map(contact => 
        contact._id === contactId ? response.data.contact : contact
      ));
      
      if (selectedContact && selectedContact._id === contactId) {
        setSelectedContact(response.data.contact);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'bg-gray-500' },
    { value: 'new', label: 'New', color: 'bg-blue-500' },
    { value: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
    { value: 'quoted', label: 'Quoted', color: 'bg-purple-500' },
    { value: 'booked', label: 'Booked', color: 'bg-green-500' },
    { value: 'completed', label: 'Completed', color: 'bg-gray-500' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' }
  ];

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption?.color || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBudgetLabel = (budget) => {
    const budgetLabels = {
      'under-50k': 'Under ₹50,000',
      '50k-100k': '₹50,000 - ₹1,00,000',
      '100k-200k': '₹1,00,000 - ₹2,00,000',
      '200k-above': 'Above ₹2,00,000',
      'discuss': 'Let\'s Discuss'
    };
    return budgetLabels[budget] || 'Not specified';
  };

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
            Contact Management
          </h1>
          <p className="text-gray-400">
            Manage inquiries and client communications
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Contacts List */}
        {loading && contacts.length === 0 ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-dark-800 p-6 rounded-lg animate-pulse">
                <div className="h-4 bg-dark-700 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-dark-700 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-dark-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <motion.div
                key={contact._id}
                layout
                className="bg-dark-800 border border-dark-700 rounded-lg p-6 hover:bg-dark-700 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {contact.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{contact.email}</span>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                      {contact.eventDate && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatEventDate(contact.eventDate)}</span>
                        </div>
                      )}
                      {contact.eventType && (
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span className="capitalize">{contact.eventType.replace('-', ' ')}</span>
                        </div>
                      )}
                    </div>
                    
                    {contact.subject && (
                      <p className="text-white mt-2 font-medium">
                        {contact.subject}
                      </p>
                    )}
                    
                    <p className="text-gray-400 mt-2 line-clamp-2">
                      {contact.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-gray-500">
                        Received {formatDate(contact.createdAt)}
                      </span>
                      {contact.budget && (
                        <span className="text-xs text-primary-400">
                          {getBudgetLabel(contact.budget)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-6">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                      className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary-600"
                    >
                      {statusOptions.slice(1).map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More */}
        {hasMore && !loading && filteredContacts.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="bg-dark-800 hover:bg-dark-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredContacts.length === 0 && (
          <div className="text-center py-16">
            <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No contacts found</h3>
            <p className="text-gray-400">
              {searchTerm ? 'Try a different search term' : 'No contacts match the selected filter'}
            </p>
          </div>
        )}
      </motion.div>

      {/* Contact Detail Modal */}
      <ContactDetailModal
        contact={selectedContact}
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

// Contact Detail Modal Component
const ContactDetailModal = ({ contact, isOpen, onClose, onStatusUpdate }) => {
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (contact) {
      setNotes(contact.notes || '');
      setStatus(contact.status);
    }
  }, [contact]);

  const handleSave = () => {
    if (contact) {
      onStatusUpdate(contact._id, status, notes);
      onClose();
    }
  };

  if (!isOpen || !contact) return null;

  const statusOptions = [
    { value: 'new', label: 'New', color: 'bg-blue-500' },
    { value: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
    { value: 'quoted', label: 'Quoted', color: 'bg-purple-500' },
    { value: 'booked', label: 'Booked', color: 'bg-green-500' },
    { value: 'completed', label: 'Completed', color: 'bg-gray-500' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' }
  ];

  const getBudgetLabel = (budget) => {
    const budgetLabels = {
      'under-50k': 'Under ₹50,000',
      '50k-100k': '₹50,000 - ₹1,00,000',
      '100k-200k': '₹1,00,000 - ₹2,00,000',
      '200k-above': 'Above ₹2,00,000',
      'discuss': 'Let\'s Discuss'
    };
    return budgetLabels[budget] || 'Not specified';
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-dark-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Contact Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Name</label>
                  <p className="text-white font-medium">{contact.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-white">{contact.email}</p>
                </div>
                {contact.phone && (
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white">{contact.phone}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-400">Received</label>
                  <p className="text-white">
                    {new Date(contact.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
              <div className="space-y-3">
                {contact.eventType && (
                  <div>
                    <label className="text-sm text-gray-400">Event Type</label>
                    <p className="text-white capitalize">{contact.eventType.replace('-', ' ')}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-400">Event Date</label>
                  <p className="text-white">{formatEventDate(contact.eventDate)}</p>
                </div>
                {contact.budget && (
                  <div>
                    <label className="text-sm text-gray-400">Budget</label>
                    <p className="text-white">{getBudgetLabel(contact.budget)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subject */}
          {contact.subject && (
            <div>
              <label className="text-sm text-gray-400">Subject</label>
              <p className="text-white font-medium mt-1">{contact.subject}</p>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="text-sm text-gray-400">Message</label>
            <div className="mt-1 p-4 bg-dark-800 rounded-lg">
              <p className="text-white whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>

          {/* Status Update */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 resize-none"
              placeholder="Add internal notes about this contact..."
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
