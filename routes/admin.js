const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');
const Gallery = require('../models/Gallery');
const Contact = require('../models/Contact');
const Content = require('../models/Content');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return process.env.CLOUDINARY_CLOUD_NAME && 
         process.env.CLOUDINARY_API_KEY && 
         process.env.CLOUDINARY_API_SECRET;
};

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload image to gallery
router.post('/gallery', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    if (!isCloudinaryConfigured()) {
      return res.status(500).json({ 
        message: 'Cloudinary not configured. Please set up CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file.' 
      });
    }

    const { title, description, category, featured, tags, exifData } = req.body;

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'photography-portfolio',
          transformation: [
            { quality: 'auto', fetch_format: 'auto' },
            { width: 2000, height: 2000, crop: 'limit' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    // Create thumbnail
    const thumbnailResult = await cloudinary.uploader.upload(result.secure_url, {
      folder: 'photography-portfolio/thumbnails',
      transformation: [
        { width: 500, height: 500, crop: 'fill', quality: 'auto' }
      ]
    });

    // Save to database
    const galleryItem = new Gallery({
      title,
      description,
      category,
      imageUrl: result.secure_url,
      thumbnailUrl: thumbnailResult.secure_url,
      cloudinaryId: result.public_id,
      featured: featured === 'true',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      exifData: exifData ? JSON.parse(exifData) : {}
    });

    await galleryItem.save();

    res.status(201).json({
      message: 'Image uploaded successfully',
      image: galleryItem
    });

  } catch (error) {
    console.error('Gallery upload error:', error);
    res.status(500).json({ message: 'Failed to upload image. Please check your Cloudinary configuration.' });
  }
});

// Get all gallery items for admin
router.get('/gallery', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, category } = req.query;
    
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const images = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Gallery.countDocuments(query);

    res.json({
      images,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Admin gallery fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update gallery item
router.put('/gallery/:id', auth, async (req, res) => {
  try {
    const { title, description, category, featured, tags, order } = req.body;
    
    // Handle featured - accept both boolean and string formats
    let featuredValue = featured;
    if (typeof featured === 'string') {
      featuredValue = featured === 'true';
    } else if (typeof featured === 'boolean') {
      featuredValue = featured;
    } else {
      featuredValue = false;
    }
    
    // Handle tags - accept both array and comma-separated string formats
    let tagsArray = [];
    if (Array.isArray(tags)) {
      tagsArray = tags;
    } else if (typeof tags === 'string' && tags) {
      tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    }
    
    const updatedImage = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        featured: featuredValue,
        tags: tagsArray,
        order: parseInt(order) || 0
      },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({
      message: 'Image updated successfully',
      image: updatedImage
    });
  } catch (error) {
    console.error('Gallery update error:', error);
    res.status(500).json({ message: 'Failed to update image' });
  }
});

// Delete gallery item
router.delete('/gallery/:id', auth, async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Delete from database
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Gallery delete error:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
});

// Get all contacts
router.get('/contacts', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Admin contacts fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update contact status
router.put('/contacts/:id', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({
      message: 'Contact updated successfully',
      contact: updatedContact
    });
  } catch (error) {
    console.error('Contact update error:', error);
    res.status(500).json({ message: 'Failed to update contact' });
  }
});

// Get analytics data
router.get('/analytics', auth, async (req, res) => {
  try {
    // Get total contacts count
    const totalContacts = await Contact.countDocuments();
    
    // Get contacts by status
    const contactsByStatus = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Get contacts by event type
    const contactsByEventType = await Contact.aggregate([
      { $match: { eventType: { $exists: true, $ne: null } } },
      { $group: { _id: '$eventType', count: { $sum: 1 } } }
    ]);
    
    // Get total gallery images
    const totalGalleryImages = await Gallery.countDocuments();
    
    // Get images by category
    const imagesByCategory = await Gallery.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    // Get contacts over time (last 7 months)
    const sevenMonthsAgo = new Date();
    sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 6);
    
    const contactsOverTime = await Contact.aggregate([
      { $match: { createdAt: { $gte: sevenMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    // Get recent contacts count (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentContacts = await Contact.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    
    // Get previous 30 days count for comparison
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const previousContacts = await Contact.countDocuments({ 
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } 
    });
    
    // Calculate percentage change
    const contactsChange = previousContacts > 0 
      ? ((recentContacts - previousContacts) / previousContacts * 100).toFixed(1)
      : 0;
    
    // Get booked events count
    const bookedEvents = await Contact.countDocuments({ status: 'booked' });
    const completedEvents = await Contact.countDocuments({ status: 'completed' });
    
    res.json({
      totalContacts,
      recentContacts,
      contactsChange,
      bookedEvents,
      completedEvents,
      totalGalleryImages,
      contactsByStatus,
      contactsByEventType,
      imagesByCategory,
      contactsOverTime
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get/Update content sections
router.get('/content', auth, async (req, res) => {
  try {
    const content = await Content.find().sort({ section: 1 });
    res.json(content);
  } catch (error) {
    console.error('Admin content fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/content/:section', auth, async (req, res) => {
  try {
    const { title, subtitle, content, metadata, isActive } = req.body;
    
    const updatedContent = await Content.findOneAndUpdate(
      { section: req.params.section },
      { title, subtitle, content, metadata, isActive },
      { new: true, upsert: true }
    );

    res.json({
      message: 'Content updated successfully',
      content: updatedContent
    });
  } catch (error) {
    console.error('Content update error:', error);
    res.status(500).json({ message: 'Failed to update content' });
  }
});

module.exports = router;
