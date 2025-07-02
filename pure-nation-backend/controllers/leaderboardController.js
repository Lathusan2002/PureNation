const User = require('../models/User');

// Helper function to get filtered leaderboard based on query
function filterLeaderboard(users, type) {
  if (type === 'weekly') {
    // Placeholder: In real systems, filter based on timestamp of submissions
    // For now, return sorted by weeklyHours if available
    return users.sort((a, b) => (b.weeklyHours || 0) - (a.weeklyHours || 0));
  } else if (type === 'monthly') {
    return users.sort((a, b) => (b.monthlyHours || 0) - (a.monthlyHours || 0));
  } else {
    // All-time default
    return users.sort((a, b) => (b.volunteerHours || 0) - (a.volunteerHours || 0));
  }
}

// GET /api/leaderboard?type=weekly|monthly|all-time
exports.getLeaderboard = async (req, res) => {
  const { type = 'all-time' } = req.query;

  try {
    const users = await User.find({}, 'name volunteerHours eventsParticipated weeklyHours monthlyHours').lean();

    const leaderboard = filterLeaderboard(users, type).map(user => ({
      id: user._id,
      name: user.name,
      points: (user.volunteerHours || 0) * 50, // Example: 50 points per hour
      eventsParticipated: user.eventsParticipated || 0,
      hoursContributed: user.volunteerHours || 0
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard',
      error: error.message
    });
  }
};
