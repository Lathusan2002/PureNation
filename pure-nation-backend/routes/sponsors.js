const express = require('express');
const router = express.Router();
const Sponsor = require('../models/Sponsor');

// @desc    Get all featured sponsors for display
// @route   GET /api/sponsors/featured-sponsors
// @access  Public
router.get('/featured-sponsors', async (req, res) => {
  try {
    const sponsors = await Sponsor.find({ isFeatured: true });
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured sponsors',
      error: error.message
    });
  }
});

// @desc    Submit a new sponsor request (from sponsor.html form)
// @route   POST /api/sponsors/sponsors
// @access  Public
router.post('/sponsors', async (req, res) => {
  const { name, email, organization, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Required fields missing: name, email, and message'
    });
  }

  try {
    const newSponsor = new Sponsor({
      name,
      email,
      organization,
      phone,
      message,
      isFeatured: false 
    });

    await newSponsor.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for becoming a sponsor! We will contact you soon.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit sponsor request',
      error: error.message
    });
  }
});

module.exports = router;
