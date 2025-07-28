const Achievement = require('../models/Achievement');

// GET /api/achievements
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().lean();

    return res.status(200).json({
      success: true,
      message: 'Achievements fetched successfully',
      data: achievements,
    });
  } catch (err) {
    console.error('Error fetching achievements:', err);

    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching achievements',
    });
  }
};


// (Optional) POST /api/achievements — Admin-only feature
const Achievement = require('../models/Achievement');

// POST /api/achievements
exports.createAchievement = async (req, res) => {
  try {
    const { title, icon, criteria } = req.body;

    // Validate input
    if (!title || !icon || !criteria) {
      return res.status(400).json({
        success: false,
        message: 'Title, icon, and criteria are required.',
      });
    }

    const achievement = await Achievement.create({ title, icon, criteria });

    return res.status(201).json({
      success: true,
      message: 'Achievement created successfully.',
      data: achievement,
    });
  } catch (err) {
    console.error('Error creating achievement:', err);

    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the achievement.',
    });
  }
};

