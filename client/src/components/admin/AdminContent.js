import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Save, 
  Eye, 
  EyeOff,
  Edit,
  Image,
  Type,
  AlignLeft
} from 'lucide-react';
import { adminAPI } from '../../utils/api';

const AdminContent = () => {
  const [contentSections, setContentSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getContent();
      setContentSections(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section, formData) => {
    try {
      setSaving(true);
      const response = await adminAPI.updateContent(section, formData);
      
      setContentSections(prev => 
        prev.map(content => 
          content.section === section ? response.data.content : content
        )
      );
      
      setEditingSection(null);
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  const sectionLabels = {
    hero: 'Hero Section',
    about: 'About Section',
    services: 'Services Section',
    testimonials: 'Testimonials',
    contact: 'Contact Information'
  };

  const sectionDescriptions = {
    hero: 'Main banner content and call-to-action',
    about: 'About the photographer and experience',
    services: 'Photography services offered',
    testimonials: 'Client testimonials and reviews',
    contact: 'Contact information and studio details'
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
            Content Management
          </h1>
          <p className="text-gray-400">
            Edit website content, text, and information sections
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {Object.keys(sectionLabels).map((sectionKey) => {
            const content = contentSections.find(c => c.section === sectionKey);
            const isEditing = editingSection === sectionKey;

            return (
              <motion.div
                key={sectionKey}
                layout
                className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden"
              >
                <div className="p-6 border-b border-dark-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-1">
                        {sectionLabels[sectionKey]}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {sectionDescriptions[sectionKey]}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {content && (
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            content.isActive ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <span className="text-sm text-gray-400">
                            {content.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => setEditingSection(isEditing ? null : sectionKey)}
                        className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {isEditing ? (
                  <ContentEditor
                    section={sectionKey}
                    content={content}
                    onSave={handleSave}
                    onCancel={() => setEditingSection(null)}
                    saving={saving}
                  />
                ) : (
                  <ContentPreview content={content} />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

// Content Editor Component
const ContentEditor = ({ section, content, onSave, onCancel, saving }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    isActive: true,
    metadata: {}
  });

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || '',
        subtitle: content.subtitle || '',
        content: content.content || '',
        isActive: content.isActive !== false,
        metadata: content.metadata || {}
      });
    }
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(section, formData);
  };

  const handleMetadataChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Basic Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Type className="w-4 h-4 inline mr-2" />
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600"
            placeholder="Section title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <AlignLeft className="w-4 h-4 inline mr-2" />
            Subtitle
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600"
            placeholder="Section subtitle"
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          <FileText className="w-4 h-4 inline mr-2" />
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          rows={8}
          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 resize-none"
          placeholder="Section content..."
        />
      </div>

      {/* Section-specific fields */}
      {section === 'hero' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Hero Settings</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Primary Button Text
              </label>
              <input
                type="text"
                value={formData.metadata.primaryButtonText || ''}
                onChange={(e) => handleMetadataChange('primaryButtonText', e.target.value)}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600"
                placeholder="View Portfolio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Secondary Button Text
              </label>
              <input
                type="text"
                value={formData.metadata.secondaryButtonText || ''}
                onChange={(e) => handleMetadataChange('secondaryButtonText', e.target.value)}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600"
                placeholder="Get in Touch"
              />
            </div>
          </div>
        </div>
      )}

      {section === 'contact' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.metadata.email || ''}
                onChange={(e) => handleMetadataChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600"
                placeholder="hello@pixelstudio.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.metadata.phone || ''}
                onChange={(e) => handleMetadataChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Address
            </label>
            <textarea
              value={formData.metadata.address || ''}
              onChange={(e) => handleMetadataChange('address', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 resize-none"
              placeholder="123 Photography Street, Creative District, City 12345"
            />
          </div>
        </div>
      )}

      {/* Active Toggle */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id={`active-${section}`}
          checked={formData.isActive}
          onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
          className="w-4 h-4 text-primary-600 bg-dark-700 border-dark-600 rounded focus:ring-primary-600"
        />
        <label htmlFor={`active-${section}`} className="ml-2 text-sm text-white">
          Section is active and visible on website
        </label>
      </div>

      {/* Actions */}
      <div className="flex space-x-4 pt-4 border-t border-dark-700">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

// Content Preview Component
const ContentPreview = ({ content }) => {
  if (!content) {
    return (
      <div className="p-6 text-center text-gray-400">
        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No content available for this section</p>
        <p className="text-sm">Click edit to add content</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {content.title && (
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wide">Title</label>
          <h3 className="text-lg font-semibold text-white">{content.title}</h3>
        </div>
      )}

      {content.subtitle && (
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wide">Subtitle</label>
          <p className="text-gray-300">{content.subtitle}</p>
        </div>
      )}

      {content.content && (
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wide">Content</label>
          <div className="text-gray-300 whitespace-pre-wrap bg-dark-700 p-4 rounded-lg">
            {content.content}
          </div>
        </div>
      )}

      {content.metadata && Object.keys(content.metadata).length > 0 && (
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wide">Additional Settings</label>
          <div className="bg-dark-700 p-4 rounded-lg">
            {Object.entries(content.metadata).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-1">
                <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-white">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-dark-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Last updated: {content.updatedAt ? new Date(content.updatedAt).toLocaleDateString() : 'Never'}
          </span>
          <div className="flex items-center space-x-2">
            {content.isActive ? (
              <>
                <Eye className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Visible</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-red-500" />
                <span className="text-red-500">Hidden</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
