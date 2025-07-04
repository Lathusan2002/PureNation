const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @desc    Get user profile by ID (no authentication)
// @route   GET /api/user/profile?userId=...
// @access  Public
router.get('/profile', async (req, res) => {
  const userId = req.query.userId; 

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId).select('firstName lastName email district city volunteerHours eventsParticipated');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

    res.json({
      name: fullName,
      email: user.email,
      district: user.district,
      city: user.city,
      volunteerHours: user.volunteerHours || 0,
      eventsParticipated: user.eventsParticipated || 0
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
