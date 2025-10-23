const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      eventDate,
      eventType,
      budget
    } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // Save to database
    await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      eventDate,
      eventType,
      budget
    });

    res.status(201).json({ message: 'Contact details received successfully.' });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
