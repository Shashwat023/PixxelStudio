const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get content by section
router.get('/:section', async (req, res) => {
  try {
    const content = await Content.findOne({ 
      section: req.params.section,
      isActive: true 
    });
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    console.error('Content fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all active content
router.get('/', async (req, res) => {
  try {
    const content = await Content.find({ isActive: true })
      .sort({ section: 1 });
    
    res.json(content);
  } catch (error) {
    console.error('Content fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
