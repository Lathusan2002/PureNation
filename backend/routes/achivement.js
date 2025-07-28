const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find({});
    res.status(200).json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievements',
      error: error.message,
    });
  }
});

module.exports = router;
