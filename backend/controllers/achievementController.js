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
exports.createAchievement = async (req, res) => {
  const { title, icon, criteria } = req.body;

  if (!title || !icon || !criteria) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const newAchievement = new Achievement({ title, icon, criteria });
    await newAchievement.save();

    res.status(201).json({
      success: true,
      message: 'Achievement created successfully.',
      achievement: newAchievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create achievement',
      error: error.message,
    });
  }
};
