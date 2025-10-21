const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['weddings', 'pre-weddings', 'events', 'portraits'],
    lowercase: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  exifData: {
    camera: String,
    lens: String,
    focalLength: String,
    aperture: String,
    shutterSpeed: String,
    iso: String,
    dateTaken: Date
  },
  tags: [{
    type: String,
    trim: true
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
gallerySchema.index({ category: 1, featured: -1, order: 1 });
gallerySchema.index({ tags: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
