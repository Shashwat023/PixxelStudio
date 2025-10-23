import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Edit, 
  Trash2, 
  Star, 
  Filter,
  Search,
  X,
  Plus,
  Image as ImageIcon
} from 'lucide-react';
import { adminAPI } from '../../utils/api';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [selectedCategory, page]);

  const fetchImages = async (reset = false) => {
    try {
      setLoading(true);
      const params = {
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        page: reset ? 1 : page,
        limit: 20
      };

      const response = await adminAPI.getGalleryImages(params);
      const newImages = response.data.images;

      if (reset) {
        setImages(newImages);
        setPage(1);
      } else {
        // Prevent duplicates by filtering out images that already exist
        setImages(prev => {
          const existingIds = new Set(prev.map(img => img._id));
          const uniqueNewImages = newImages.filter(img => !existingIds.has(img._id));
          return [...prev, ...uniqueNewImages];
        });
      }

      setHasMore(response.data.pagination.current < response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await adminAPI.deleteImage(imageId);
      setImages(prev => prev.filter(img => img._id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleToggleFeatured = async (image) => {
    try {
      const updatedImage = await adminAPI.updateImage(image._id, {
        ...image,
        featured: !image.featured
      });
      
      setImages(prev => prev.map(img => 
        img._id === image._id ? updatedImage.data.image : img
      ));
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image');
    }
  };

  const filteredImages = images
    .filter(image =>
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Remove any potential duplicates based on _id
    .filter((image, index, array) => 
      array.findIndex(img => img._id === image._id) === index
    );

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'weddings', label: 'Weddings' },
    { value: 'pre-weddings', label: 'Pre-Weddings' },
    { value: 'events', label: 'Events' },
    { value: 'portraits', label: 'Portraits' }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Gallery Management
            </h1>
            <p className="text-gray-400">
              Upload, edit, and organize your portfolio images
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-4 md:mt-0 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Upload Images</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
              fetchImages(true);
            }}
            className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Images Grid */}
        {loading && images.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="aspect-square bg-dark-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <motion.div
                key={image._id}
                layout
                className="group relative bg-dark-800 rounded-lg overflow-hidden"
              >
                <div className="aspect-square">
                  <img
                    src={image.thumbnailUrl || image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleFeatured(image)}
                      className={`p-2 rounded-full transition-colors ${
                        image.featured
                          ? 'bg-primary-600 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      title={image.featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      <Star className="w-4 h-4" fill={image.featured ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => setEditingImage(image)}
                      className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                      title="Edit image"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-colors"
                      title="Delete image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Featured Badge */}
                {image.featured && (
                  <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}

                {/* Image Info */}
                <div className="p-4">
                  <h3 className="text-white font-medium truncate mb-1">
                    {image.title}
                  </h3>
                  <p className="text-gray-400 text-sm capitalize">
                    {image.category?.replace('-', ' ')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More */}
        {hasMore && !loading && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setPage(prev => prev + 1);
                fetchImages();
              }}
              className="bg-dark-800 hover:bg-dark-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-16">
            <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No images found</h3>
            <p className="text-gray-400">
              {searchTerm ? 'Try a different search term' : 'Upload your first image to get started'}
            </p>
          </div>
        )}
      </motion.div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={() => {
          setShowUploadModal(false);
          fetchImages(true);
        }}
      />

      {/* Edit Modal */}
      <EditModal
        image={editingImage}
        isOpen={!!editingImage}
        onClose={() => setEditingImage(null)}
        onUpdate={(updatedImage) => {
          setImages(prev => prev.map(img => 
            img._id === updatedImage._id ? updatedImage : img
          ));
          setEditingImage(null);
        }}
      />
    </div>
  );
};

// Upload Modal Component
const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'weddings',
    featured: false,
    tags: ''
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        const uploadData = new FormData();
        uploadData.append('image', file);
        uploadData.append('title', formData.title || file.name);
        uploadData.append('description', formData.description);
        uploadData.append('category', formData.category);
        uploadData.append('featured', formData.featured);
        uploadData.append('tags', formData.tags);

        await adminAPI.uploadImage(uploadData);
      }
      onUpload();
      setFiles([]);
      setFormData({
        title: '',
        description: '',
        category: 'weddings',
        featured: false,
        tags: ''
      });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-dark-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Upload Images</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Select Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700"
            />
            {files.length > 0 && (
              <p className="text-gray-400 text-sm mt-2">
                {files.length} file(s) selected
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
                placeholder="Image title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
              >
                <option value="weddings">Weddings</option>
                <option value="pre-weddings">Pre-Weddings</option>
                <option value="events">Events</option>
                <option value="portraits">Portraits</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600 resize-none"
              placeholder="Image description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
              placeholder="wedding, bride, ceremony"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              className="w-4 h-4 text-primary-600 bg-dark-800 border-dark-700 rounded focus:ring-primary-600"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-white">
              Mark as featured
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || files.length === 0}
              className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Modal Component
const EditModal = ({ image, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'weddings',
    featured: false,
    tags: '',
    order: 0
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (image) {
      // Safely handle tags - check if it's an array or string
      let tagsString = '';
      if (Array.isArray(image.tags)) {
        tagsString = image.tags.join(', ');
      } else if (typeof image.tags === 'string') {
        tagsString = image.tags;
      }
      
      setFormData({
        title: image.title || '',
        description: image.description || '',
        category: image.category || 'weddings',
        featured: image.featured || false,
        tags: tagsString,
        order: image.order || 0
      });
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Safely process tags
      const processedTags = formData.tags 
        ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];
      
      const response = await adminAPI.updateImage(image._id, {
        ...formData,
        tags: processedTags
      });
      onUpdate(response.data.image);
    } catch (error) {
      console.error('Update error:', error);
      
      // Provide more specific error messages
      const errorMessage = error.response?.data?.message || 'Failed to update image. Please try again.';
      alert(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-dark-900 rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Edit Image</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
              >
                <option value="weddings">Weddings</option>
                <option value="pre-weddings">Pre-Weddings</option>
                <option value="events">Events</option>
                <option value="portraits">Portraits</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-600"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="editFeatured"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              className="w-4 h-4 text-primary-600 bg-dark-800 border-dark-700 rounded focus:ring-primary-600"
            />
            <label htmlFor="editFeatured" className="ml-2 text-sm text-white">
              Mark as featured
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {updating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Image</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGallery;
