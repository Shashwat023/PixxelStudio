const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  eventDate: {
    type: Date
  },
  eventType: {
    type: String,
    enum: ['wedding', 'pre-wedding', 'event', 'portrait', 'other'],
    lowercase: true
  },
  budget: {
    type: String,
    enum: ['under-50k', '50k-100k', '100k-200k', '200k-above', 'discuss']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'quoted', 'booked', 'completed', 'cancelled'],
    default: 'new'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for admin queries
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ eventDate: 1 });

module.exports = mongoose.model('Contact', contactSchema);
