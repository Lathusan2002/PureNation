
// routes/sponsor.js
const express = require('express');
const router = express.Router();
const Sponsor = require('../models/Sponsor');

router.post('/', async (req, res) => {
  try {
    const { name, email, organization, phone, message } = req.body;

    const newSponsor = new Sponsor({
      name,
      email,
      organization,
      phone,
      message
    });

    await newSponsor.save();
    res.status(201).json({ message: 'Sponsorship submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while submitting sponsorship' });
  }
});

module.exports = router;
