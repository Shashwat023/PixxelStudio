const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// Get all gallery images with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 50, page = 1 } = req.query;
    
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const images = await Gallery.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-cloudinaryId');

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
    console.error('Gallery fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id).select('-cloudinaryId');
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    console.error('Gallery image fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get categories with counts
router.get('/stats/categories', async (req, res) => {
  try {
    const categories = await Gallery.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const total = await Gallery.countDocuments();
    
    res.json({
      categories: [
        { name: 'all', count: total },
        ...categories.map(cat => ({ name: cat._id, count: cat.count }))
      ]
    });
  } catch (error) {
    console.error('Categories stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
