const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

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
      return res.status(400).json({ 
        message: 'Name, email, and message are required' 
      });
    }

    // Save to database
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      eventDate: eventDate ? new Date(eventDate) : null,
      eventType,
      budget
    });

    await contact.save();

    // Send email notification
    const transporter = createTransporter();
    
    const emailContent = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Subject: ${subject || 'General Inquiry'}
      Event Type: ${eventType || 'Not specified'}
      Event Date: ${eventDate || 'Not specified'}
      Budget: ${budget || 'Not specified'}
      
      Message:
      ${message}
      
      Submitted at: ${new Date().toLocaleString()}
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject || 'Portfolio Inquiry'}`,
      text: emailContent
    });

    // Send auto-reply to client
    const autoReplyContent = `
      Dear ${name},
      
      Thank you for your interest in my photography services. I have received your inquiry and will get back to you within 24 hours.
      
      Best regards,
      Professional Photographer
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for your inquiry',
      text: autoReplyContent
    });

    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      id: contact._id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to submit contact form. Please try again.' 
    });
  }
});

module.exports = router;
