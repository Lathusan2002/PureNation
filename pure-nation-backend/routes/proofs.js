const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const User = require('../models/User');

// @desc    Submit proof of volunteering
// @route   POST /api/proof
// @access  Private
router.post('/', async (req, res) => {
  const { userId, eventId, description, photoUrl, hours } = req.body;


  try {
    // Create a new proof submission
    const submission = new Submission({
      userId,
      eventId,
      description,
      photoUrl,
      hours
    });

    await submission.save();

    // Update user's volunteer hours
    const user = await User.findById(userId);
    user.volunteerHours = (user.volunteerHours || 0) + Number(hours);
    await user.save();

    res.status(201).json({
      message: 'Proof submitted successfully!',
      submission
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to submit proof',
      error: err.message
    });
  }
});

module.exports = router;
