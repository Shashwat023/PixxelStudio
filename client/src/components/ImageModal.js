import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Calendar, Camera, Aperture, Timer, Zap } from 'lucide-react';

const ImageModal = ({ image, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!image) return null;

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.8, y: 50 }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.imageUrl;
    link.download = `${image.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exifIcons = {
    camera: Camera,
    aperture: Aperture,
    shutterSpeed: Timer,
    iso: Zap
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-dark-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid lg:grid-cols-3 h-full">
              {/* Image Section */}
              <div className="lg:col-span-2 relative bg-black flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Details Section */}
              <div className="p-6 lg:p-8 overflow-y-auto">
                <div className="space-y-6">
                  {/* Title and Category */}
                  <div>
                    <div className="text-sm text-primary-600 uppercase tracking-wide font-medium mb-2">
                      {image.category?.replace('-', ' ')}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-3">
                      {image.title}
                    </h2>
                    {image.description && (
                      <p className="text-gray-400 leading-relaxed">
                        {image.description}
                      </p>
                    )}
                  </div>

                  {/* Tags */}
                  {image.tags && image.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {image.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-dark-800 text-gray-300 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EXIF Data */}
                  {image.exifData && Object.keys(image.exifData).length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                        Camera Settings
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {image.exifData.camera && (
                          <div className="flex items-center space-x-3">
                            <Camera className="w-4 h-4 text-primary-600" />
                            <div>
                              <div className="text-xs text-gray-500">Camera</div>
                              <div className="text-sm text-white">{image.exifData.camera}</div>
                            </div>
                          </div>
                        )}
                        
                        {image.exifData.lens && (
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-primary-600 rounded-full flex-shrink-0"></div>
                            <div>
                              <div className="text-xs text-gray-500">Lens</div>
                              <div className="text-sm text-white">{image.exifData.lens}</div>
                            </div>
                          </div>
                        )}

                        {image.exifData.aperture && (
                          <div className="flex items-center space-x-3">
                            <Aperture className="w-4 h-4 text-primary-600" />
                            <div>
                              <div className="text-xs text-gray-500">Aperture</div>
                              <div className="text-sm text-white">f/{image.exifData.aperture}</div>
                            </div>
                          </div>
                        )}

                        {image.exifData.shutterSpeed && (
                          <div className="flex items-center space-x-3">
                            <Timer className="w-4 h-4 text-primary-600" />
                            <div>
                              <div className="text-xs text-gray-500">Shutter</div>
                              <div className="text-sm text-white">{image.exifData.shutterSpeed}</div>
                            </div>
                          </div>
                        )}

                        {image.exifData.iso && (
                          <div className="flex items-center space-x-3">
                            <Zap className="w-4 h-4 text-primary-600" />
                            <div>
                              <div className="text-xs text-gray-500">ISO</div>
                              <div className="text-sm text-white">{image.exifData.iso}</div>
                            </div>
                          </div>
                        )}

                        {image.exifData.focalLength && (
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-primary-600 rounded-sm flex-shrink-0"></div>
                            <div>
                              <div className="text-xs text-gray-500">Focal Length</div>
                              <div className="text-sm text-white">{image.exifData.focalLength}mm</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  {(image.exifData?.dateTaken || image.createdAt) && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
                        Date Captured
                      </h3>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        <span className="text-gray-300">
                          {new Date(image.exifData?.dateTaken || image.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t border-dark-800">
                    <button
                      onClick={handleShare}
                      className="flex-1 bg-dark-800 hover:bg-dark-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
