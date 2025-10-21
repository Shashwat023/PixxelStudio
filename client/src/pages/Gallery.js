import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Grid, List, Search, X } from 'lucide-react';
import { galleryAPI } from '../utils/api';
import ImageModal from '../components/ImageModal';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, []);

  useEffect(() => {
    setPage(1);
    fetchImages(true);
  }, [selectedCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await galleryAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchImages = async (reset = false) => {
    try {
      setLoading(true);
      const params = {
        category: selectedCategory,
        page: reset ? 1 : page,
        limit: 20
      };

      const response = await galleryAPI.getImages(params);
      const newImages = response.data.images;

      if (reset) {
        setImages(newImages);
      } else {
        setImages(prev => [...prev, ...newImages]);
      }

      setHasMore(response.data.pagination.current < response.data.pagination.pages);
      if (!reset) setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images.filter(image =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categoryLabels = {
    all: 'All Work',
    weddings: 'Weddings',
    'pre-weddings': 'Pre-Weddings',
    events: 'Events',
    portraits: 'Portraits'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Portfolio Gallery
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our collection of captured moments, each telling a unique story 
              through the lens of artistic vision and technical excellence.
            </p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12"
          >
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-800 text-gray-400 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  {categoryLabels[category.name]} ({category.count})
                </button>
              ))}
            </div>

            {/* Search and View Controls */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 w-64"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-dark-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded ${
                    viewMode === 'masonry'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16">
        <div className="container-custom">
          {loading && images.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-dark-800 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image._id}
                    variants={itemVariants}
                    layout
                    className={`group cursor-pointer ${
                      viewMode === 'masonry' && index % 3 === 1 ? 'md:mt-12' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative overflow-hidden rounded-lg bg-dark-800">
                      <LazyLoadImage
                        src={image.thumbnailUrl || image.imageUrl}
                        alt={image.title}
                        effect="blur"
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                          viewMode === 'grid' ? 'aspect-square' : 'aspect-[4/5]'
                        }`}
                        placeholderSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PC9zdmc+"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                          {image.description && (
                            <p className="text-sm text-gray-300 line-clamp-2">
                              {image.description}
                            </p>
                          )}
                          <div className="mt-2 text-xs text-primary-400 uppercase tracking-wide">
                            {categoryLabels[image.category]}
                          </div>
                        </div>
                      </div>

                      {/* Featured Badge */}
                      {image.featured && (
                        <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Load More Button */}
          {hasMore && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => fetchImages()}
                className="btn-primary"
              >
                Load More Images
              </button>
            </motion.div>
          )}

          {/* No Results */}
          {!loading && filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No images found</h3>
              <p className="text-gray-400">
                {searchTerm
                  ? `No images match "${searchTerm}". Try a different search term.`
                  : 'No images available in this category.'}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Gallery;
